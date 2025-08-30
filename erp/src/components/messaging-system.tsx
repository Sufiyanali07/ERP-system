'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Send, 
  Search, 
  MessageCircle, 
  Star, 
  Archive,
  Reply,
  Plus
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface Message {
  _id: string
  sender: User
  recipient: User
  subject: string
  content: string
  messageType: string
  priority: string
  isRead: boolean
  readAt?: string
  createdAt: string
  starred?: boolean
  replyCount?: number
}

export default function MessagingSystem() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [contacts, setContacts] = useState<User[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [, setSelectedContact] = useState<User | null>(null)
  const [isComposing, setIsComposing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [messageType, setMessageType] = useState<'received' | 'sent'>('received')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ unread: 0, received: 0, sent: 0, starred: 0 })
  
  const [composeForm, setComposeForm] = useState({
    recipient: '',
    subject: '',
    content: '',
    priority: 'medium'
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token')
  }

  // Fetch messages
  const fetchMessages = useCallback(async (type: 'received' | 'sent' = 'received') => {
    try {
      setLoading(true)
      const token = getAuthToken()
      
      const response = await fetch(`https://next-erp-backend.vercel.app/api/messages?type=${type}&search=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (data.success) {
        setMessages(data.data.messages)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch messages",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Fetch messages error:', error)
      toast({
        title: "Error",
        description: "Unable to connect to server",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [searchTerm, toast])

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      const token = getAuthToken()
      
      const response = await fetch('https://next-erp-backend.vercel.app/api/messages/users/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (data.success) {
        setContacts(data.data)
      }
    } catch (error) {
      console.error('Fetch contacts error:', error)
    }
  }, [])

  // Fetch message stats
  const fetchStats = useCallback(async () => {
    try {
      const token = getAuthToken()
      
      const response = await fetch('https://next-erp-backend.vercel.app/api/messages/stats/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Fetch stats error:', error)
    }
  }, [])

  // Send message
  const sendMessage = async () => {
    try {
      if (!composeForm.recipient || !composeForm.subject || !composeForm.content) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      const token = getAuthToken()
      
      const response = await fetch('https://next-erp-backend.vercel.app/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipient: composeForm.recipient,
          subject: composeForm.subject,
          content: composeForm.content,
          priority: composeForm.priority,
          messageType: 'direct'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Message sent successfully"
        })
        
        // Reset form
        setComposeForm({
          recipient: '',
          subject: '',
          content: '',
          priority: 'medium'
        })
        setIsComposing(false)
        setSelectedContact(null)
        
        // Refresh messages
        fetchMessages(messageType)
        fetchStats()
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send message",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Send message error:', error)
      toast({
        title: "Error",
        description: "Unable to send message",
        variant: "destructive"
      })
    }
  }

  // Mark message as read
  const markAsRead = async (messageId: string) => {
    try {
      const token = getAuthToken()
      
      await fetch(`https://next-erp-backend.vercel.app/api/messages/${messageId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      // Update local state
      setMessages(messages.map(msg => 
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ))
      
      fetchStats()
    } catch (error) {
      console.error('Mark as read error:', error)
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-blue-500'
      case 'low': return 'bg-gray-500'
      default: return 'bg-blue-500'
    }
  }

  // Initialize data
  useEffect(() => {
    fetchMessages(messageType)
    fetchContacts()
    fetchStats()
  }, [messageType, searchTerm, fetchMessages, fetchContacts, fetchStats])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-[600px]">
      {/* Sidebar - Message Stats & Navigation */}
      <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setIsComposing(true)} 
              className="w-full"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Compose
            </Button>
            
            <div className="space-y-2">
              <Button
                variant={messageType === 'received' ? 'default' : 'ghost'}
                onClick={() => setMessageType('received')}
                className="w-full justify-start"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Inbox
                {stats.unread > 0 && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    {stats.unread}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant={messageType === 'sent' ? 'default' : 'ghost'}
                onClick={() => setMessageType('sent')}
                className="w-full justify-start"
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Sent ({stats.sent})
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Star className="w-4 h-4 mr-2" />
                Starred ({stats.starred})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-24 sm:h-32">
              <div className="space-y-2">
                {contacts.slice(0, 5).map((contact) => (
                  <div
                    key={contact._id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => {
                      setSelectedContact(contact)
                      setComposeForm(prev => ({ ...prev, recipient: contact._id }))
                      setIsComposing(true)
                    }}
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {contact.firstName[0]}{contact.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contact.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Message List */}
      <div className="lg:col-span-1 space-y-4 order-1 lg:order-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] sm:h-[400px]">
              <div className="space-y-1 p-4">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedMessage?._id === message._id 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted'
                      } ${!message.isRead && messageType === 'received' ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                      onClick={() => {
                        setSelectedMessage(message)
                        if (!message.isRead && messageType === 'received') {
                          markAsRead(message._id)
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {messageType === 'sent' 
                              ? message.recipient.firstName[0] + message.recipient.lastName[0]
                              : message.sender.firstName[0] + message.sender.lastName[0]
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm truncate ${!message.isRead && messageType === 'received' ? 'font-semibold' : ''}`}>
                              {messageType === 'sent' 
                                ? `${message.recipient.firstName} ${message.recipient.lastName}`
                                : `${message.sender.firstName} ${message.sender.lastName}`
                              }
                            </p>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}></div>
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(message.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className={`text-sm truncate ${!message.isRead && messageType === 'received' ? 'font-medium' : 'text-muted-foreground'}`}>
                            {message.subject}
                          </p>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Message Content / Compose */}
      <div className="lg:col-span-2 order-3">
        <Card className="h-full">
          {isComposing ? (
            <>
              <CardHeader>
                <CardTitle>Compose Message</CardTitle>
                <CardDescription>Send a new message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">To:</label>
                  <select
                    value={composeForm.recipient}
                    onChange={(e) => setComposeForm(prev => ({ ...prev, recipient: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select recipient...</option>
                    {contacts.map((contact) => (
                      <option key={contact._id} value={contact._id}>
                        {contact.firstName} {contact.lastName} ({contact.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject:</label>
                  <Input
                    value={composeForm.subject}
                    onChange={(e) => setComposeForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter subject..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority:</label>
                  <select
                    value={composeForm.priority}
                    onChange={(e) => setComposeForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message:</label>
                  <Textarea
                    value={composeForm.content}
                    onChange={(e) => setComposeForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Type your message..."
                    rows={8}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={sendMessage}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsComposing(false)
                    setSelectedContact(null)
                    setComposeForm({ recipient: '', subject: '', content: '', priority: 'medium' })
                  }}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </>
          ) : selectedMessage ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                    <CardDescription>
                      From: {selectedMessage.sender.firstName} {selectedMessage.sender.lastName} ({selectedMessage.sender.role})
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedMessage.priority === 'urgent' ? 'destructive' : 'secondary'}>
                      {selectedMessage.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatTimestamp(selectedMessage.createdAt)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setComposeForm({
                        recipient: selectedMessage.sender._id,
                        subject: `Re: ${selectedMessage.subject}`,
                        content: '',
                        priority: 'medium'
                      })
                      setIsComposing(true)
                    }}
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Star
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Select a message to read</p>
                <p className="text-sm">Choose a message from the list to view its content</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
