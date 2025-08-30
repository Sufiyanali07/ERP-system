'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  Calendar,
  CheckSquare,
  Clock,
  AlertCircle,
  User,
  GraduationCap,
  BarChart3,
  FileText,
  MessageSquare,
  TrendingUp
} from 'lucide-react'

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Consistent date formatting to prevent hydration mismatch
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  
  const [facultyData] = useState({
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  })

  const [classes] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      code: 'CS301',
      semester: 3,
      students: 45,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'CS-101'
    },
    {
      id: 2,
      subject: 'Database Systems',
      code: 'CS401',
      semester: 4,
      students: 38,
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'CS-205'
    },
    {
      id: 3,
      subject: 'Software Engineering',
      code: 'CS501',
      semester: 5,
      students: 32,
      schedule: 'Mon, Wed - 11:00 AM',
      room: 'CS-301'
    }
  ])

  const [assignments] = useState([
    {
      id: 1,
      title: 'Binary Tree Implementation',
      subject: 'Data Structures',
      dueDate: '2024-09-15',
      submissions: 35,
      totalStudents: 45,
      status: 'active'
    },
    {
      id: 2,
      title: 'Database Design Project',
      subject: 'Database Systems',
      dueDate: '2024-09-20',
      submissions: 28,
      totalStudents: 38,
      status: 'active'
    },
    {
      id: 3,
      title: 'UML Diagrams',
      subject: 'Software Engineering',
      dueDate: '2024-09-10',
      submissions: 32,
      totalStudents: 32,
      status: 'completed'
    }
  ])

  // Button handlers
  const handleMarkAttendance = () => {
    window.location.href = '/teacher-dashboard/attendance'
  }

  const handleCreateAssignment = () => {
    window.location.href = '/teacher-dashboard/assignments'
  }

  const handleGradeSubmissions = () => {
    window.location.href = '/teacher-dashboard/grades'
  }

  const handleSendMessage = () => {
    window.location.href = '/teacher-dashboard/messages'
  }

  const handleViewClass = (classId: number) => {
    window.location.href = '/teacher-dashboard/classes'
  }

  const handleManageClass = (classId: number) => {
    window.location.href = '/teacher-dashboard/classes'
  }

  const handleGradeAssignment = (assignmentId: number) => {
    window.location.href = '/teacher-dashboard/assignments'
  }

  const handleViewAssignment = (assignmentId: number) => {
    window.location.href = '/teacher-dashboard/assignments'
  }

  const handleViewStudents = () => {
    window.location.href = '/teacher-dashboard/students'
  }

  const handleReviewRequest = (requestId: number) => {
    alert(`Reviewing request ID: ${requestId}`)
  }

  const handleApproveRequest = (requestId: number) => {
    alert(`Request ID: ${requestId} approved successfully!`)
  }

  const handleViewFeeDetails = (studentId: string) => {
    window.location.href = '/teacher-dashboard/students'
  }

  const handleSendReminder = (studentId: string) => {
    alert(`Fee reminder sent to student ID: ${studentId}`)
  }

  const handleDownloadDocument = (docId: number) => {
    alert(`Downloading document ID: ${docId}`)
  }

  const handleGradeDocument = (docId: number) => {
    alert(`Grading document ID: ${docId}`)
  }

  const handleReviewDocument = (docId: number) => {
    alert(`Reviewing document ID: ${docId}`)
  }

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'submission',
      message: 'New assignment submission from John Doe',
      subject: 'Data Structures',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'attendance',
      message: 'Attendance marked for CS401 - Database Systems',
      subject: 'Database Systems',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'grade',
      message: 'Grades updated for UML Diagrams assignment',
      subject: 'Software Engineering',
      time: '1 day ago'
    }
  ])

  const [upcomingClasses] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      time: '10:00 AM',
      room: 'CS-101',
      date: 'Today'
    },
    {
      id: 2,
      subject: 'Database Systems',
      time: '2:00 PM',
      room: 'CS-205',
      date: 'Today'
    },
    {
      id: 3,
      subject: 'Software Engineering',
      time: '11:00 AM',
      room: 'CS-301',
      date: 'Tomorrow'
    }
  ])

  // Student data integrated from student dashboard
  const [studentRequests] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'ST2024001',
      requestType: 'Document Request',
      document: 'Transcript',
      status: 'pending',
      submittedDate: '2024-09-12',
      class: 'Data Structures'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'ST2024002',
      requestType: 'Grade Review',
      document: 'Assignment 2',
      status: 'approved',
      submittedDate: '2024-09-10',
      class: 'Database Systems'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentId: 'ST2024003',
      requestType: 'Extension Request',
      document: 'Project Submission',
      status: 'pending',
      submittedDate: '2024-09-13',
      class: 'Software Engineering'
    }
  ])

  const [studentFeeStatus] = useState([
    {
      studentId: 'ST2024001',
      studentName: 'John Doe',
      class: 'Data Structures',
      totalFees: 63000,
      paidAmount: 45000,
      pendingAmount: 18000,
      status: 'partial',
      lastPayment: '2024-08-15'
    },
    {
      studentId: 'ST2024002',
      studentName: 'Jane Smith',
      class: 'Database Systems',
      totalFees: 63000,
      paidAmount: 63000,
      pendingAmount: 0,
      status: 'paid',
      lastPayment: '2024-09-01'
    },
    {
      studentId: 'ST2024003',
      studentName: 'Mike Johnson',
      class: 'Software Engineering',
      totalFees: 63000,
      paidAmount: 20000,
      pendingAmount: 43000,
      status: 'overdue',
      lastPayment: '2024-07-20'
    }
  ])

  const [studentDocuments] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'ST2024001',
      documentType: 'Assignment Submission',
      fileName: 'binary_tree_implementation.pdf',
      subject: 'Data Structures',
      submittedDate: '2024-09-12',
      status: 'submitted',
      grade: null
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'ST2024002',
      documentType: 'Project Report',
      fileName: 'database_design_project.pdf',
      subject: 'Database Systems',
      submittedDate: '2024-09-10',
      status: 'graded',
      grade: 'A-'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentId: 'ST2024003',
      documentType: 'Lab Report',
      fileName: 'uml_diagrams_analysis.pdf',
      subject: 'Software Engineering',
      submittedDate: '2024-09-08',
      status: 'reviewed',
      grade: 'B+'
    }
  ])

  const [studentNotifications] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'ST2024001',
      type: 'assignment_due',
      message: 'Assignment due in 2 days',
      subject: 'Data Structures',
      priority: 'medium',
      sent: false
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'ST2024002',
      type: 'fee_reminder',
      message: 'Fee payment successful',
      subject: 'General',
      priority: 'low',
      sent: true
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentId: 'ST2024003',
      type: 'grade_update',
      message: 'New grade posted for UML Diagrams',
      subject: 'Software Engineering',
      priority: 'high',
      sent: true
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <FileText className="w-4 h-4 text-blue-500" />
      case 'attendance':
        return <CheckSquare className="w-4 h-4 text-green-500" />
      case 'grade':
        return <BarChart3 className="w-4 h-4 text-purple-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <FacultySidebar 
        facultyData={facultyData} 
        onSidebarToggle={setSidebarCollapsed}
      />
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-3 sm:p-6">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Teacher Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {facultyData.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-left sm:text-right">
                  <p className="font-medium">{facultyData.employeeId}</p>
                  <p className="text-sm text-muted-foreground">{facultyData.designation} - {facultyData.department}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                    <p className="text-2xl font-bold">{classes.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{classes.reduce((sum, cls) => sum + cls.students, 0)}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Assignments</p>
                    <p className="text-2xl font-bold">{assignments.filter(a => a.status === 'active').length}</p>
                  </div>
                  <ClipboardList className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Submissions</p>
                    <p className="text-2xl font-bold">
                      {assignments.filter(a => a.status === 'active').reduce((sum, a) => sum + (a.totalStudents - a.submissions), 0)}
                    </p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              <TabsTrigger value="assignments" className="text-xs sm:text-sm">Assignments</TabsTrigger>
              <TabsTrigger value="requests" className="text-xs sm:text-sm">Requests</TabsTrigger>
              <TabsTrigger value="fees" className="text-xs sm:text-sm">Fees</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            {getActivityIcon(activity.type)}
                            <div className="flex-1">
                              <p className="font-medium">{activity.message}</p>
                              <p className="text-sm text-muted-foreground">{activity.subject} • {activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Assignment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assignments.map((assignment) => (
                          <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{assignment.title}</p>
                              <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {assignment.submissions}/{assignment.totalStudents} submitted
                              </p>
                              <p className="text-xs text-muted-foreground">Due: {formatDate(assignment.dueDate)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {upcomingClasses.map((cls) => (
                          <div key={cls.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{cls.subject}</p>
                                <p className="text-sm text-muted-foreground">{cls.room}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{cls.time}</p>
                                <p className="text-xs text-muted-foreground">{cls.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" onClick={handleMarkAttendance}>
                          <CheckSquare className="w-4 h-4 mr-2" />
                          Mark Attendance
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={handleCreateAssignment}>
                          <ClipboardList className="w-4 h-4 mr-2" />
                          Create Assignment
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={handleGradeSubmissions}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Grade Submissions
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={handleSendMessage}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="classes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Classes</CardTitle>
                  <CardDescription>Overview of all your assigned classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Semester</TableHead>
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
                          <TableCell>{cls.code}</TableCell>
                          <TableCell>{cls.semester}</TableCell>
                          <TableCell>{cls.students}</TableCell>
                          <TableCell>{cls.schedule}</TableCell>
                          <TableCell>{cls.room}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewClass(cls.id)}>View</Button>
                              <Button size="sm" onClick={() => handleManageClass(cls.id)}>Manage</Button>
                            </div>
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
                  <CardTitle>Assignment Management</CardTitle>
                  <CardDescription>Track and manage student assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[120px]">Assignment</TableHead>
                          <TableHead className="min-w-[100px]">Subject</TableHead>
                          <TableHead className="min-w-[100px]">Due Date</TableHead>
                          <TableHead className="min-w-[120px]">Submissions</TableHead>
                          <TableHead className="min-w-[80px]">Status</TableHead>
                          <TableHead className="min-w-[120px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium text-sm">{assignment.title}</TableCell>
                          <TableCell className="text-sm">{assignment.subject}</TableCell>
                          <TableCell className="text-sm">{formatDate(assignment.dueDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{assignment.submissions}/{assignment.totalStudents}</span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                              <Button size="sm" variant="outline" className="text-xs px-2 py-1" onClick={() => handleGradeAssignment(assignment.id)}>Grade</Button>
                              <Button size="sm" className="text-xs px-2 py-1" onClick={() => handleViewAssignment(assignment.id)}>View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>Overview of students across all your classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {classes.map((cls) => (
                      <Card key={cls.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{cls.subject}</CardTitle>
                          <CardDescription>{cls.code} - Semester {cls.semester}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Total Students</span>
                              <span className="font-medium">{cls.students}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Attendance Rate</span>
                              <span className="font-medium">85%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Average Grade</span>
                              <span className="font-medium">B+</span>
                            </div>
                            <Button className="w-full mt-4" variant="outline" onClick={handleViewStudents}>
                              View Students
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Requests</CardTitle>
                  <CardDescription>Manage document requests, grade reviews, and extension requests from students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Request Type</TableHead>
                        <TableHead>Document/Item</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.studentName}</p>
                              <p className="text-sm text-muted-foreground">{request.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{request.requestType}</TableCell>
                          <TableCell>{request.document}</TableCell>
                          <TableCell>{request.class}</TableCell>
                          <TableCell>{formatDate(request.submittedDate)}</TableCell>
                          <TableCell>
                            <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleReviewRequest(request.id)}>Review</Button>
                              <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                                {request.status === 'pending' ? 'Approve' : 'View'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Fee Status</CardTitle>
                  <CardDescription>Monitor fee payment status of students in your classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Total Fees</TableHead>
                        <TableHead>Paid Amount</TableHead>
                        <TableHead>Pending</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Payment</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentFeeStatus.map((student) => (
                        <TableRow key={student.studentId}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.studentName}</p>
                              <p className="text-sm text-muted-foreground">{student.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>₹{student.totalFees.toLocaleString()}</TableCell>
                          <TableCell>₹{student.paidAmount.toLocaleString()}</TableCell>
                          <TableCell>₹{student.pendingAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={
                              student.status === 'paid' ? 'default' : 
                              student.status === 'partial' ? 'secondary' : 'destructive'
                            }>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(student.lastPayment)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewFeeDetails(student.studentId)}>View Details</Button>
                              {student.status !== 'paid' && (
                                <Button size="sm" onClick={() => handleSendReminder(student.studentId)}>Send Reminder</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Document Submissions</CardTitle>
                  <CardDescription>Review and grade student document submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Document Type</TableHead>
                        <TableHead>File Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{doc.studentName}</p>
                              <p className="text-sm text-muted-foreground">{doc.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{doc.documentType}</TableCell>
                          <TableCell className="font-mono text-sm">{doc.fileName}</TableCell>
                          <TableCell>{doc.subject}</TableCell>
                          <TableCell>{formatDate(doc.submittedDate)}</TableCell>
                          <TableCell>
                            <Badge variant={
                              doc.status === 'graded' ? 'default' : 
                              doc.status === 'reviewed' ? 'secondary' : 'outline'
                            }>
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {doc.grade ? (
                              <Badge variant="default">{doc.grade}</Badge>
                            ) : (
                              <span className="text-muted-foreground">Not graded</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(doc.id)}>Download</Button>
                              <Button size="sm" onClick={() => doc.status === 'submitted' ? handleGradeDocument(doc.id) : handleReviewDocument(doc.id)}>
                                {doc.status === 'submitted' ? 'Grade' : 'Review'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
