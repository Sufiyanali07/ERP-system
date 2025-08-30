'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageSquare, Send, Search, Plus, Clock, User, Users, Star } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Professor - Data Structures',
      lastMessage: 'Your assignment submission was excellent. Keep up the good work!',
      timestamp: '2024-02-10 2:30 PM',
      unread: 2,
      avatar: '/api/placeholder/32/32',
      online: true
    },
    {
      id: 2,
      name: 'Academic Office',
      role: 'Administration',
      lastMessage: 'Please submit your semester registration form by February 15th.',
      timestamp: '2024-02-09 10:15 AM',
      unread: 1,
      avatar: '/api/placeholder/32/32',
      online: false
    },
    {
      id: 3,
      name: 'Study Group - CS301',
      role: 'Group Chat',
      lastMessage: 'Meeting tomorrow at 4 PM in library for project discussion.',
      timestamp: '2024-02-08 6:45 PM',
      unread: 0,
      avatar: '/api/placeholder/32/32',
      online: false,
      isGroup: true
    },
    {
      id: 4,
      name: 'Library Services',
      role: 'Support',
      lastMessage: 'Your book renewal request has been approved.',
      timestamp: '2024-02-07 11:20 AM',
      unread: 0,
      avatar: '/api/placeholder/32/32',
      online: false
    }
  ]

  const messages = [
    {
      id: 1,
      conversationId: 1,
      sender: 'Dr. Sarah Wilson',
      content: 'Hello John, I reviewed your latest assignment on binary trees. The implementation is solid and your analysis is thorough.',
      timestamp: '2024-02-10 2:25 PM',
      isOwn: false
    },
    {
      id: 2,
      conversationId: 1,
      sender: 'You',
      content: 'Thank you, Professor! I spent extra time on the complexity analysis section.',
      timestamp: '2024-02-10 2:27 PM',
      isOwn: true
    },
    {
      id: 3,
      conversationId: 1,
      sender: 'Dr. Sarah Wilson',
      content: 'Your assignment submission was excellent. Keep up the good work!',
      timestamp: '2024-02-10 2:30 PM',
      isOwn: false
    },
    {
      id: 4,
      conversationId: 1,
      sender: 'Dr. Sarah Wilson',
      content: 'I have some additional resources that might help you with the upcoming project. Would you like me to share them?',
      timestamp: '2024-02-10 2:32 PM',
      isOwn: false
    }
  ]

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedConv = conversations.find(c => c.id === selectedConversation)
  const conversationMessages = messages.filter(m => m.conversationId === selectedConversation)

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0)

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Add message logic here
      setNewMessage('')
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar studentData={studentData} />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-2">Communicate with faculty, staff, and classmates</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversations.length}</div>
                <p className="text-xs text-muted-foreground">Conversations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread</CardTitle>
                <Badge className="bg-red-100 text-red-800">{totalUnread}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{totalUnread}</div>
                <p className="text-xs text-muted-foreground">New messages</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faculty</CardTitle>
                <User className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {conversations.filter(c => c.role.includes('Professor')).length}
                </div>
                <p className="text-xs text-muted-foreground">Active chats</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Groups</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {conversations.filter(c => c.isGroup).length}
                </div>
                <p className="text-xs text-muted-foreground">Study groups</p>
              </CardContent>
            </Card>
          </div>

          {/* Messages Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Conversations</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[450px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                        selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>
                              {conversation.isGroup ? <Users className="h-5 w-5" /> : conversation.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm truncate">{conversation.name}</p>
                            {conversation.unread > 0 && (
                              <Badge className="bg-red-500 text-white text-xs ml-2">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{conversation.role}</p>
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2">
              {selectedConv ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConv.avatar} />
                        <AvatarFallback>
                          {selectedConv.isGroup ? <Users className="h-5 w-5" /> : selectedConv.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedConv.name}</CardTitle>
                        <CardDescription>{selectedConv.role}</CardDescription>
                      </div>
                      {selectedConv.online && (
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    {/* Messages */}
                    <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                      {conversationMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.isOwn
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 min-h-[60px] resize-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="self-end"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">Select a conversation</p>
                    <p className="text-sm text-gray-500">Choose a conversation from the list to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
