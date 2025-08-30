'use client'

import { useState } from 'react'
import FacultySidebar from '@/components/faculty-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Users, Send, Inbox } from 'lucide-react'

export default function MessagesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  return (
    <div className="min-h-screen bg-background">
      <FacultySidebar 
        facultyData={facultyData} 
        onSidebarToggle={setSidebarCollapsed}
      />
      <div className="transition-all duration-300 lg:ml-64">
        <div className="p-3 sm:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with students and colleagues
            </p>
          </div>

          {/* Messages Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inbox</CardTitle>
                <Inbox className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 unread messages
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sent</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Messages sent today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contacts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">
                  Active contacts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Groups</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">
                  Active groups
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Placeholder Content */}
          <Card>
            <CardHeader>
              <CardTitle>Messages System</CardTitle>
              <CardDescription>
                The messaging system is currently under development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This feature will allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Send and receive messages from students and colleagues</li>
                <li>Create group conversations for class discussions</li>
                <li>Share files and attachments</li>
                <li>Set message priorities and notifications</li>
                <li>Archive and organize conversations</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button className="w-full sm:w-auto" disabled>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Compose Message
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" disabled>
                  <Users className="mr-2 h-4 w-4" />
                  View Contacts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
