const express = require('express');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');
const User = require('../models/User');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/messages
// @desc    Get messages for authenticated user
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { type = 'received', page = 1, limit = 20, search = '' } = req.query;
    const userId = req.user._id;

    let query = {};
    
    // Filter by message type (sent/received)
    if (type === 'sent') {
      query.sender = userId;
    } else {
      query.recipient = userId;
      query.archived = false;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const messages = await Message.find(query)
      .populate('sender', 'firstName lastName email role')
      .populate('recipient', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Message.countDocuments(query);

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages'
    });
  }
});

// @route   POST /api/messages
// @desc    Send a new message
// @access  Private
router.post('/', [
  authenticateToken,
  body('recipient').isMongoId().withMessage('Valid recipient ID required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('content').trim().notEmpty().withMessage('Message content is required'),
  body('messageType').optional().isIn(['direct', 'announcement', 'assignment', 'grade', 'general']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { recipient, subject, content, messageType, priority, parentMessage } = req.body;

    // Verify recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }

    // Create message
    const message = new Message({
      sender: req.user._id,
      recipient,
      subject,
      content,
      messageType: messageType || 'direct',
      priority: priority || 'medium',
      parentMessage
    });

    await message.save();

    // Populate sender and recipient info
    await message.populate('sender', 'firstName lastName email role');
    await message.populate('recipient', 'firstName lastName email role');

    // If this is a reply, add to parent's replies array
    if (parentMessage) {
      await Message.findByIdAndUpdate(parentMessage, {
        $push: { replies: message._id }
      });
    }

    // Emit real-time notification
    const io = req.app.get('io');
    if (io) {
      io.to(`user-${recipient}`).emit('new-message', {
        message,
        sender: {
          id: req.user._id,
          name: `${req.user.firstName} ${req.user.lastName}`,
          role: req.user.role
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message'
    });
  }
});

// @route   GET /api/messages/:id
// @desc    Get specific message
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'firstName lastName email role')
      .populate('recipient', 'firstName lastName email role')
      .populate('replies');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user is sender or recipient
    if (message.sender._id.toString() !== req.user._id.toString() && 
        message.recipient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Mark as read if user is recipient and message is unread
    if (message.recipient._id.toString() === req.user._id.toString() && !message.isRead) {
      await message.markAsRead();
    }

    res.json({
      success: true,
      data: message
    });

  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching message'
    });
  }
});

// @route   PUT /api/messages/:id/read
// @desc    Mark message as read
// @access  Private
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Only recipient can mark as read
    if (message.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await message.markAsRead();

    res.json({
      success: true,
      message: 'Message marked as read'
    });

  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking message as read'
    });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Only sender or recipient can delete
    if (message.sender.toString() !== req.user._id.toString() && 
        message.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting message'
    });
  }
});

// @route   GET /api/messages/users/contacts
// @desc    Get list of users for messaging (faculty and students)
// @access  Private
router.get('/users/contacts', authenticateToken, async (req, res) => {
  try {
    const { search = '', role = '' } = req.query;
    
    let query = { _id: { $ne: req.user._id }, isActive: true };
    
    // Filter by role if specified
    if (role) {
      query.role = role;
    }

    // Search by name or email
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query, 'firstName lastName email role')
      .sort({ firstName: 1 })
      .limit(50);

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
});

// @route   GET /api/messages/stats
// @desc    Get message statistics
// @access  Private
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Promise.all([
      Message.countDocuments({ recipient: userId, isRead: false }),
      Message.countDocuments({ recipient: userId }),
      Message.countDocuments({ sender: userId }),
      Message.countDocuments({ recipient: userId, starred: true })
    ]);

    res.json({
      success: true,
      data: {
        unread: stats[0],
        received: stats[1],
        sent: stats[2],
        starred: stats[3]
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching message statistics'
    });
  }
});

module.exports = router;
