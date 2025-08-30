'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Users, 
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  CheckCircle,
  Eye,
  MessageSquare
} from 'lucide-react'

export default function StudentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('all')

  // Button handlers
  const handleSendMessage = () => {
    alert('Send Message functionality - would open message composer')
  }

  const handleViewStudent = (studentId: string) => {
    alert(`Viewing student ID: ${studentId}`)
  }

  const handleMessageStudent = (studentId: string) => {
    alert(`Messaging student ID: ${studentId}`)
  }

  const handleViewDetails = (studentId: string) => {
    alert(`Viewing details for student ID: ${studentId}`)
  }

  const handleViewHistory = (studentId: string) => {
    alert(`Viewing history for student ID: ${studentId}`)
  }

  const handleSendFeeReminder = (studentId: string) => {
    alert(`Fee reminder sent to student ID: ${studentId}`)
  }

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [students] = useState([
    {
      id: 1,
      name: 'John Doe',
      studentId: 'ST2024001',
      email: 'john.doe@college.edu',
      phone: '+1 234-567-8901',
      class: 'Data Structures',
      semester: 3,
      attendance: 85,
      grade: 'A-',
      gpa: 3.7,
      status: 'active',
      lastActivity: '2024-09-14',
      assignments: { submitted: 8, total: 10 },
      fees: { status: 'partial', amount: 18000 },
      performance: 'good'
    },
    {
      id: 2,
      name: 'Jane Smith',
      studentId: 'ST2024002',
      email: 'jane.smith@college.edu',
      phone: '+1 234-567-8902',
      class: 'Database Systems',
      semester: 4,
      attendance: 92,
      grade: 'A',
      gpa: 3.9,
      status: 'active',
      lastActivity: '2024-09-15',
      assignments: { submitted: 9, total: 10 },
      fees: { status: 'paid', amount: 0 },
      performance: 'excellent'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      studentId: 'ST2024003',
      email: 'mike.johnson@college.edu',
      phone: '+1 234-567-8903',
      class: 'Software Engineering',
      semester: 5,
      attendance: 78,
      grade: 'B+',
      gpa: 3.3,
      status: 'active',
      lastActivity: '2024-09-13',
      assignments: { submitted: 7, total: 10 },
      fees: { status: 'overdue', amount: 43000 },
      performance: 'average'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      studentId: 'ST2024004',
      email: 'sarah.wilson@college.edu',
      phone: '+1 234-567-8904',
      class: 'Data Structures',
      semester: 3,
      attendance: 95,
      grade: 'A+',
      gpa: 4.0,
      status: 'active',
      lastActivity: '2024-09-15',
      assignments: { submitted: 10, total: 10 },
      fees: { status: 'paid', amount: 0 },
      performance: 'excellent'
    },
    {
      id: 5,
      name: 'David Brown',
      studentId: 'ST2024005',
      email: 'david.brown@college.edu',
      phone: '+1 234-567-8905',
      class: 'Database Systems',
      semester: 4,
      attendance: 65,
      grade: 'C',
      gpa: 2.5,
      status: 'warning',
      lastActivity: '2024-09-10',
      assignments: { submitted: 5, total: 10 },
      fees: { status: 'partial', amount: 25000 },
      performance: 'poor'
    }
  ])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = filterClass === 'all' || student.class === filterClass
    return matchesSearch && matchesClass
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'warning':
        return <Badge variant="destructive">Warning</Badge>
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge variant="default" className="bg-green-500">Excellent</Badge>
      case 'good':
        return <Badge variant="default" className="bg-blue-500">Good</Badge>
      case 'average':
        return <Badge variant="secondary">Average</Badge>
      case 'poor':
        return <Badge variant="destructive">Poor</Badge>
      default:
        return <Badge variant="outline">{performance}</Badge>
    }
  }

  const getFeeStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500">Paid</Badge>
      case 'partial':
        return <Badge variant="secondary">Partial</Badge>
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 75) return 'text-blue-600'
    if (attendance >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    warning: students.filter(s => s.status === 'warning').length,
    avgAttendance: Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length),
    avgGPA: (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-background">
      <FacultySidebar 
        facultyData={facultyData} 
        onSidebarToggle={setSidebarCollapsed}
      />
      <div className="transition-all duration-300 lg:ml-64">
        <div className="p-3 sm:p-6">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Students</h1>
                <p className="text-muted-foreground">Monitor and manage students across all your classes</p>
              </div>
              <Button onClick={handleSendMessage} className="w-full sm:w-auto">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.active}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Warning</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.warning}</p>
                  </div>
                  <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.avgAttendance}%</p>
                  </div>
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg GPA</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.avgGPA}</p>
                  </div>
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="fees">Fee Status</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Directory</CardTitle>
                  <CardDescription>Complete list of students in your classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search students by name, ID, or email..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <Select value={filterClass} onValueChange={setFilterClass}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="Data Structures">Data Structures</SelectItem>
                        <SelectItem value="Database Systems">Database Systems</SelectItem>
                        <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{student.class}</p>
                              <p className="text-xs text-muted-foreground">Semester {student.semester}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="w-3 h-3 mr-1" />
                                {student.email}
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="w-3 h-3 mr-1" />
                                {student.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                              {student.attendance}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.grade}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(student.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewStudent(student.studentId)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleMessageStudent(student.studentId)}>
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message
                              </Button>
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

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>Academic performance and assignment tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>GPA</TableHead>
                        <TableHead>Assignments</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">{student.gpa}</span>
                              {student.gpa >= 3.5 ? (
                                <TrendingUp className="w-4 h-4 ml-1 text-green-500" />
                              ) : student.gpa >= 2.5 ? (
                                <TrendingUp className="w-4 h-4 ml-1 text-blue-500" />
                              ) : (
                                <TrendingDown className="w-4 h-4 ml-1 text-red-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">
                                {student.assignments.submitted}/{student.assignments.total} submitted
                              </div>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${(student.assignments.submitted / student.assignments.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getPerformanceBadge(student.performance)}</TableCell>
                          <TableCell>{new Date(student.lastActivity).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(student.studentId)}>View Details</Button>
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
                  <CardTitle>Attendance Tracking</CardTitle>
                  <CardDescription>Monitor student attendance across all classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Attendance Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Attended</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                                {student.attendance}%
                              </span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    student.attendance >= 90 ? 'bg-green-500' :
                                    student.attendance >= 75 ? 'bg-blue-500' :
                                    student.attendance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${student.attendance}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {student.attendance >= 75 ? (
                              <Badge variant="default" className="bg-green-500">Good</Badge>
                            ) : student.attendance >= 60 ? (
                              <Badge variant="secondary">Warning</Badge>
                            ) : (
                              <Badge variant="destructive">Critical</Badge>
                            )}
                          </TableCell>
                          <TableCell>{new Date(student.lastActivity).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" onClick={() => handleViewHistory(student.studentId)}>View History</Button>
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
                  <CardTitle>Fee Status</CardTitle>
                  <CardDescription>Monitor student fee payment status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Fee Status</TableHead>
                        <TableHead>Pending Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.studentId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{getFeeStatusBadge(student.fees.status)}</TableCell>
                          <TableCell>
                            {student.fees.amount > 0 ? (
                              <span className="font-medium text-red-600">₹{student.fees.amount.toLocaleString()}</span>
                            ) : (
                              <span className="text-green-600">₹0</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewDetails(student.studentId)}>View Details</Button>
                              {student.fees.amount > 0 && (
                                <Button size="sm" onClick={() => handleSendFeeReminder(student.studentId)}>Send Reminder</Button>
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
          </Tabs>
        </div>
      </div>
    </div>
  )
}
