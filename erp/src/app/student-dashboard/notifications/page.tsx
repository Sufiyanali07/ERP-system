'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, CheckCircle, Clock, AlertTriangle, Calendar, BookOpen, CreditCard, FileText } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Fee Payment Due',
      message: 'Your semester fee payment is due on March 15, 2024. Please make the payment to avoid late charges.',
      timestamp: '2 hours ago',
      read: false,
      priority: 'high',
      icon: CreditCard,
      category: 'finance'
    },
    {
      id: 2,
      title: 'Assignment Submission',
      message: 'Data Structures assignment is due tomorrow. Please submit your work before the deadline.',
      timestamp: '4 hours ago',
      read: false,
      priority: 'medium',
      icon: BookOpen,
      category: 'academic'
    },
    {
      id: 3,
      title: 'Document Verification',
      message: 'Your transcript request has been processed and is ready for download.',
      timestamp: '1 day ago',
      read: true,
      priority: 'low',
      icon: FileText,
      category: 'documents'
    },
    {
      id: 4,
      title: 'Exam Schedule Released',
      message: 'Mid-semester examination schedule has been published. Check your exam dates.',
      timestamp: '2 days ago',
      read: false,
      priority: 'medium',
      icon: Calendar,
      category: 'academic'
    }
  ])

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'bg-blue-100 text-blue-800'
      case 'academic': return 'bg-purple-100 text-purple-800'
      case 'assignment': return 'bg-orange-100 text-orange-800'
      case 'document': return 'bg-green-100 text-green-800'
      case 'library': return 'bg-indigo-100 text-indigo-800'
      case 'registration': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'high') return notification.priority === 'high'
    return filter === 'read' ? notification.read : notification.category === filter
  })

  const unreadCount = notifications.filter(n => !n.read).length
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar 
        studentData={studentData} 
        onSidebarToggle={setSidebarCollapsed}
      />
      
      <div className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } p-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">Stay updated with important announcements and reminders</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
                <Bell className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{notifications.length}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unread</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
                <p className="text-xs text-muted-foreground">Urgent items</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Read</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {notifications.length - unreadCount}
                </div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
              <TabsTrigger value="unread" onClick={() => setFilter('unread')}>Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="high" onClick={() => setFilter('high')}>High Priority</TabsTrigger>
              <TabsTrigger value="read" onClick={() => setFilter('read')}>Read</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">All Notifications</h3>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark All as Read
                  </Button>
                </div>
                
                {filteredNotifications.map((notification) => (
                  <Card key={notification.id} className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <notification.icon className={`h-5 w-5 mt-1 ${notification.priority === 'high' ? 'text-red-500' : 'text-gray-500'}`} />
                          <div className="flex-1">
                            <CardTitle className={`text-lg ${!notification.read ? 'font-bold' : 'font-medium'}`}>
                              {notification.title}
                            </CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {notification.timestamp}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                          </Badge>
                          <Badge className={getTypeColor(notification.category)}>
                            {notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}
                          </Badge>
                          {!notification.read && (
                            <Badge className="bg-blue-100 text-blue-800">New</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{notification.message}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{notification.timestamp}</span>
                        </div>
                        <div className="flex space-x-2">
                          {!notification.read && (
                            <Button variant="outline" size="sm" onClick={() => {
                              setNotifications(prev => prev.map(n => 
                                n.id === notification.id ? { ...n, read: true } : n
                              ));
                            }}>
                              Mark as Read
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => {
                            console.log('Viewing notification details:', notification.id);
                          }}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unread">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Unread Notifications</h3>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark All as Read
                  </Button>
                </div>
                
                {filteredNotifications.map((notification) => (
                  <Card key={notification.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <notification.icon className={`h-5 w-5 mt-1 ${notification.priority === 'high' ? 'text-red-500' : 'text-gray-500'}`} />
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold">{notification.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {notification.timestamp}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">New</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{notification.message}</p>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setNotifications(prev => prev.map(n => 
                            n.id === notification.id ? { ...n, read: true } : n
                          ));
                        }}>
                          Mark as Read
                        </Button>
                        <Button size="sm" onClick={() => {
                          console.log('Taking action for notification:', notification.id);
                        }}>
                          Take Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="high">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">High Priority Notifications</h3>
                
                {filteredNotifications.map((notification) => (
                  <Card key={notification.id} className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <notification.icon className="h-5 w-5 mt-1 text-red-500" />
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-red-700">{notification.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {notification.timestamp}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{notification.message}</p>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setNotifications(prev => prev.filter(n => n.id !== notification.id));
                        }}>
                          Dismiss
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => {
                          console.log('Taking urgent action for notification:', notification.id);
                        }}>
                          Take Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="read">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Read Notifications</h3>
                
                {filteredNotifications.map((notification) => (
                  <Card key={notification.id} className="opacity-75 hover:opacity-100 hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 mt-1 text-green-500" />
                          <div className="flex-1">
                            <CardTitle className="text-lg">{notification.title}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {notification.timestamp}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Read</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{notification.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
