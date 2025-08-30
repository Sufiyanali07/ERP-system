'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  FileText, 
  Clock,
  TrendingUp,
  MessageSquare
} from 'lucide-react'

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [facultyData] = useState({
    name: 'Dr. Sarah Johnson',
    employeeId: 'FAC2024001',
    email: 'sarah.johnson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems']
  })

  const [studentApplications] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'ST2024001',
      applicationType: 'Leave Application',
      reason: 'Medical Emergency',
      submittedDate: '2024-08-25',
      status: 'pending',
      urgency: 'normal'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'ST2024002',
      applicationType: 'Assignment Extension',
      reason: 'Family Function',
      submittedDate: '2024-08-24',
      status: 'approved',
      urgency: 'normal'
    },
    {
      id: 3,
      studentName: 'Mike Wilson',
      studentId: 'ST2024003',
      applicationType: 'Re-evaluation Request',
      reason: 'Discrepancy in marks',
      submittedDate: '2024-08-23',
      status: 'pending',
      urgency: 'normal'
    }
  ])

  const [classes] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      semester: 3,
      section: 'A',
      totalStudents: 45,
      schedule: 'Mon, Wed - 11:00 AM',
      room: 'CS-205'
    },
    {
      id: 2,
      subject: 'Database Systems',
      semester: 5,
      section: 'B',
      totalStudents: 38,
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'CS-301'
    },
    {
      id: 3,
      subject: 'Algorithms',
      semester: 4,
      section: 'A',
      totalStudents: 42,
      schedule: 'Mon, Wed - 11:00 AM',
      room: 'CS-205'
    }
  ])

  const [attendance] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      date: '2024-08-28',
      totalStudents: 45,
      present: 42,
      absent: 3,
      percentage: 92.1
    },
    {
      id: 2,
      subject: 'Database Systems',
      date: '2024-08-27',
      totalStudents: 38,
      present: 35,
      absent: 3,
      percentage: 92.1
    }
  ])

  const [assignments] = useState([
    {
      id: 1,
      title: 'Binary Tree Implementation',
      subject: 'Data Structures',
      dueDate: '2024-09-05',
      submitted: 35,
      total: 45,
      status: 'active'
    },
    {
      id: 2,
      title: 'Database Design Project',
      subject: 'Database Systems',
      dueDate: '2024-09-10',
      submitted: 28,
      total: 38,
      status: 'active'
    }
  ])

  const handleApplicationAction = () => {
    // Function implementation removed for demo
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500"><ClipboardCheck className="w-3 h-3 mr-1" />Approved</Badge>
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'rejected':
        return <Badge variant="destructive"><FileText className="w-3 h-3 mr-1" />Rejected</Badge>
      case 'active':
        return <Badge variant="default"><BookOpen className="w-3 h-3 mr-1" />Active</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    return urgency === 'urgent' 
      ? <Badge variant="destructive">Urgent</Badge>
      : <Badge variant="outline">Normal</Badge>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {facultyData.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{facultyData.employeeId}</p>
                <p className="text-sm text-muted-foreground">{facultyData.designation} - {facultyData.department}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{classes.reduce((sum, cls) => sum + cls.totalStudents, 0)}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
                  <p className="text-2xl font-bold">{studentApplications.filter(app => app.status === 'pending').length}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Classes</p>
                  <p className="text-2xl font-bold">{classes.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold">
                    {attendance.length > 0 
                      ? `${(attendance.reduce((sum, att) => sum + att.percentage, 0) / attendance.length).toFixed(1)}%`
                      : '0%'
                    }
                  </p>
                </div>
                <ClipboardCheck className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <ClipboardCheck className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Assignment Extension Approved</p>
                        <p className="text-sm text-muted-foreground">Jane Smith - Aug 24, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Leave Application Pending</p>
                        <p className="text-sm text-muted-foreground">John Doe - Aug 25, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Attendance Marked</p>
                        <p className="text-sm text-muted-foreground">Data Structures - Aug 28, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <ClipboardCheck className="w-6 h-6 mb-2" />
                      Mark Attendance
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <FileText className="w-6 h-6 mb-2" />
                      Review Applications
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <TrendingUp className="w-6 h-6 mb-2" />
                      Grade Assignments
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <MessageSquare className="w-6 h-6 mb-2" />
                      Send Notice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Data Structures</p>
                        <p className="text-sm text-muted-foreground">Semester 3 - Section A</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">10:00 AM - 11:00 AM</p>
                      <p className="text-sm text-muted-foreground">Room CS-201</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Algorithms</p>
                        <p className="text-sm text-muted-foreground">Semester 4 - Section A</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">11:00 AM - 12:00 PM</p>
                      <p className="text-sm text-muted-foreground">Room CS-205</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Applications</CardTitle>
                <CardDescription>Review and manage student requests and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Application Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{app.studentName}</p>
                            <p className="text-sm text-muted-foreground">{app.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{app.applicationType}</TableCell>
                        <TableCell>{app.reason}</TableCell>
                        <TableCell>{new Date(app.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>{getUrgencyBadge(app.urgency)}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>
                          {app.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleApplicationAction()}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleApplicationAction()}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Classes</CardTitle>
                <CardDescription>Manage your assigned classes and students</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell className="font-medium">{cls.subject}</TableCell>
                        <TableCell>{cls.semester}</TableCell>
                        <TableCell>{cls.section}</TableCell>
                        <TableCell>{cls.totalStudents}</TableCell>
                        <TableCell>{cls.schedule}</TableCell>
                        <TableCell>{cls.room}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View Students</Button>
                            <Button size="sm" variant="outline">Attendance</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>Track and manage student attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((att) => (
                      <TableRow key={att.id}>
                        <TableCell className="font-medium">{att.subject}</TableCell>
                        <TableCell>{new Date(att.date).toLocaleDateString()}</TableCell>
                        <TableCell>{att.totalStudents}</TableCell>
                        <TableCell className="text-green-600">{att.present}</TableCell>
                        <TableCell className="text-red-600">{att.absent}</TableCell>
                        <TableCell>
                          <Badge variant={att.percentage >= 90 ? "default" : att.percentage >= 75 ? "secondary" : "destructive"}>
                            {att.percentage.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>Manage assignments and track submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{assignment.subject}</TableCell>
                        <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{assignment.submitted}/{assignment.total}</span>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline">Grade</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Settings</CardTitle>
                <CardDescription>Access your personal settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Configure your account settings, notifications, and preferences.</p>
                  <Button 
                    onClick={() => window.location.href = '/teacher-dashboard/settings'}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
