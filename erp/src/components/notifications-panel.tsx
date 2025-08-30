'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Calendar,
  FileText,
  DollarSign,
  BookOpen,
  X
} from 'lucide-react'

interface Notification {
  id: number
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  category: 'fee' | 'exam' | 'document' | 'general'
}

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'warning',
      title: 'Fee Payment Due',
      message: 'Your tuition fee payment is due in 3 days. Please make the payment to avoid late charges.',
      timestamp: '2024-08-28T10:30:00',
      read: false,
      category: 'fee'
    },
    {
      id: 2,
      type: 'info',
      title: 'Exam Schedule Released',
      message: 'Final examination schedule for Semester 6 has been published. Check your exam dates.',
      timestamp: '2024-08-27T14:15:00',
      read: false,
      category: 'exam'
    },
    {
      id: 3,
      type: 'success',
      title: 'Document Ready',
      message: 'Your Bonafide Certificate is ready for collection from the admin office.',
      timestamp: '2024-08-26T09:45:00',
      read: true,
      category: 'document'
    },
    {
      id: 4,
      type: 'info',
      title: 'Library Books Due',
      message: 'You have 2 library books due for return by September 5th, 2024.',
      timestamp: '2024-08-25T16:20:00',
      read: true,
      category: 'general'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Assignment Submission',
      message: 'Database Systems assignment submission deadline is tomorrow at 11:59 PM.',
      timestamp: '2024-08-24T11:00:00',
      read: false,
      category: 'general'
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type: string, category: string) => {
    if (category === 'fee') return <DollarSign className="w-4 h-4" />
    if (category === 'exam') return <Calendar className="w-4 h-4" />
    if (category === 'document') return <FileText className="w-4 h-4" />
    if (category === 'general') return <BookOpen className="w-4 h-4" />
    
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      case 'error':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600'
      case 'warning':
        return 'text-orange-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-blue-600'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    // Use a consistent date format to avoid hydration mismatch
    const date = new Date(timestamp)
    
    // Format as DD/MM/YYYY to ensure consistency between server and client
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}/${month}/${year}`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <CardDescription>Stay updated with important announcements</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border rounded-lg transition-colors ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-background'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`mt-1 ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type, notification.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 w-8 p-0"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
