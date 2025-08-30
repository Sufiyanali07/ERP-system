'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AdminSidebar from '@/components/admin-sidebar'
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp,
  Building,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  CreditCard,
  UserCheck,
  BarChart3
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  const [adminData] = useState({
    name: 'Admin User',
    adminId: 'ADM001',
    email: 'admin@gmail.com',
    role: 'System Administrator'
  })

  const [overviewStats] = useState({
    totalStudents: 1250,
    totalFaculty: 85,
    totalDepartments: 8,
    pendingFees: 2500000,
    collectedFees: 15750000,
    activeTeachers: 82,
    pendingRequests: 15
  })

  const [departmentData] = useState([
    {
      id: 1,
      name: 'Computer Science',
      students: 320,
      faculty: 18,
      activeFaculty: 17,
      pendingRequests: 3
    },
    {
      id: 2,
      name: 'Electronics',
      students: 280,
      faculty: 15,
      activeFaculty: 15,
      pendingRequests: 2
    },
    {
      id: 3,
      name: 'Mechanical',
      students: 250,
      faculty: 12,
      activeFaculty: 11,
      pendingRequests: 1
    },
    {
      id: 4,
      name: 'Civil',
      students: 200,
      faculty: 10,
      activeFaculty: 10,
      pendingRequests: 0
    },
    {
      id: 5,
      name: 'Chemical',
      students: 150,
      faculty: 8,
      activeFaculty: 8,
      pendingRequests: 2
    },
    {
      id: 6,
      name: 'Biotechnology',
      students: 50,
      faculty: 6,
      activeFaculty: 5,
      pendingRequests: 1
    }
  ])

  const [facultyRequests, setFacultyRequests] = useState([
    {
      id: 1,
      facultyName: 'Dr. John Smith',
      employeeId: 'FAC2024015',
      department: 'Computer Science',
      requestType: 'Leave Application',
      reason: 'Conference Attendance',
      submittedDate: '2024-08-25',
      status: 'pending',
      urgency: 'normal'
    },
    {
      id: 2,
      facultyName: 'Prof. Sarah Wilson',
      employeeId: 'FAC2024032',
      department: 'Electronics',
      requestType: 'Equipment Request',
      reason: 'Lab Upgrade',
      submittedDate: '2024-08-24',
      status: 'pending',
      urgency: 'urgent'
    }
  ])

  const [financialData, setFinancialData] = useState({
    monthlyFeeCollection: [
      { month: 'Jan', collected: 2500000, pending: 500000 },
      { month: 'Feb', collected: 2800000, pending: 400000 },
      { month: 'Mar', collected: 2600000, pending: 600000 },
      { month: 'Apr', collected: 3000000, pending: 300000 },
      { month: 'May', collected: 2900000, pending: 450000 },
      { month: 'Jun', collected: 2700000, pending: 550000 },
      { month: 'Jul', collected: 2850000, pending: 400000 },
      { month: 'Aug', collected: 2650000, pending: 500000 }
    ],
    feeTypeDistribution: [
      { name: 'Tuition', value: 12000000, color: '#0088FE' },
      { name: 'Hostel', value: 2500000, color: '#00C49F' },
      { name: 'Library', value: 800000, color: '#FFBB28' },
      { name: 'Lab', value: 1200000, color: '#FF8042' },
      { name: 'Exam', value: 500000, color: '#8884D8' }
    ]
  })

  const [studentFees] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'ST2024001',
      department: 'Computer Science',
      semester: 6,
      totalFees: 75000,
      paidAmount: 50000,
      pendingAmount: 25000,
      status: 'partial',
      lastPayment: '2024-08-15'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'ST2024002',
      department: 'Electronics',
      semester: 4,
      totalFees: 70000,
      paidAmount: 70000,
      pendingAmount: 0,
      status: 'paid',
      lastPayment: '2024-08-20'
    },
    {
      id: 3,
      studentName: 'Mike Wilson',
      studentId: 'ST2024003',
      department: 'Mechanical',
      semester: 8,
      totalFees: 80000,
      paidAmount: 0,
      pendingAmount: 80000,
      status: 'pending',
      lastPayment: null
    }
  ])

  const handleRequestAction = (requestId: number, action: 'approve' | 'reject') => {
    setFacultyRequests(requests => 
      requests.map(req => 
        req.id === requestId 
          ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
          : req
      )
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'rejected':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      case 'paid':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>
      case 'partial':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Partial</Badge>
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
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        adminData={adminData} 
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
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {adminData.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-left sm:text-right">
                  <p className="font-medium">{adminData.adminId}</p>
                  <p className="text-sm text-muted-foreground">{adminData.role}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{overviewStats.totalStudents.toLocaleString()}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                  <p className="text-2xl font-bold">{overviewStats.totalFaculty}</p>
                  <p className="text-xs text-green-600">{overviewStats.activeTeachers} Active</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Fees</p>
                  <p className="text-2xl font-bold">₹{(overviewStats.pendingFees / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Collected Fees</p>
                  <p className="text-2xl font-bold">₹{(overviewStats.collectedFees / 1000000).toFixed(1)}M</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="students" className="text-xs sm:text-sm">Students</TabsTrigger>
            <TabsTrigger value="faculty" className="text-xs sm:text-sm">Faculty</TabsTrigger>
            <TabsTrigger value="departments" className="text-xs sm:text-sm">Departments</TabsTrigger>
            <TabsTrigger value="finance" className="text-xs sm:text-sm">Finance</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Fee Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financialData.monthlyFeeCollection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${(Number(value) / 1000000).toFixed(1)}M`, '']} />
                      <Bar dataKey="collected" fill="#22c55e" name="Collected" />
                      <Bar dataKey="pending" fill="#ef4444" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fee Distribution by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={financialData.feeTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {financialData.feeTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${(Number(value) / 1000000).toFixed(1)}M`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Fee Payment Received</p>
                        <p className="text-sm text-muted-foreground">Jane Smith - ₹70,000</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Faculty Leave Request</p>
                        <p className="text-sm text-muted-foreground">Dr. John Smith</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">New Student Admission</p>
                        <p className="text-sm text-muted-foreground">Computer Science</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Building className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Departments</h3>
                    <p className="text-3xl font-bold text-blue-600">{overviewStats.totalDepartments}</p>
                    <p className="text-sm text-muted-foreground">Active Departments</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
                    <p className="text-3xl font-bold text-orange-600">{overviewStats.pendingRequests}</p>
                    <p className="text-sm text-muted-foreground">Require Attention</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Students and faculty distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Total Faculty</TableHead>
                      <TableHead>Active Faculty</TableHead>
                      <TableHead>Pending Requests</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-medium">{dept.name}</TableCell>
                        <TableCell>{dept.students}</TableCell>
                        <TableCell>{dept.faculty}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{dept.activeFaculty}</span>
                            {dept.activeFaculty === dept.faculty ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {dept.pendingRequests > 0 ? (
                            <Badge variant="secondary">{dept.pendingRequests}</Badge>
                          ) : (
                            <Badge variant="outline">0</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Requests</CardTitle>
                <CardDescription>Pending requests from faculty members</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Request Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facultyRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.facultyName}</p>
                            <p className="text-sm text-muted-foreground">{request.employeeId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.department}</TableCell>
                        <TableCell>{request.requestType}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          {request.status === 'pending' && (
                            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                              <Button 
                                size="sm" 
                                onClick={() => handleRequestAction(request.id, 'approve')}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRequestAction(request.id, 'reject')}
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

          <TabsContent value="finances" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">₹{((overviewStats.collectedFees + overviewStats.pendingFees) / 1000000).toFixed(1)}M</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                      <p className="text-2xl font-bold">
                        {((overviewStats.collectedFees / (overviewStats.collectedFees + overviewStats.pendingFees)) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                      <p className="text-2xl font-bold">₹{(overviewStats.pendingFees / 1000000).toFixed(1)}M</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Fee Status</CardTitle>
                <CardDescription>Detailed view of student fee payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Total Fees</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentFees.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.studentName}</p>
                            <p className="text-sm text-muted-foreground">{student.studentId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.semester}</TableCell>
                        <TableCell>₹{student.totalFees.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">₹{student.paidAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-red-600">₹{student.pendingAmount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        <TableCell>
                          {student.lastPayment ? new Date(student.lastPayment).toLocaleDateString() : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <GraduationCap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{overviewStats.totalStudents}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                    <p className="text-2xl font-bold">{Math.floor(overviewStats.totalStudents * 0.95)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">Applications</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <CreditCard className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">Fee Defaulters</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Overview of student activities and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">New Admissions</p>
                        <p className="text-sm text-muted-foreground">This Month: 45 students</p>
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Fee Collections</p>
                        <p className="text-sm text-muted-foreground">This Month: ₹2.65M collected</p>
                      </div>
                    </div>
                    <Button variant="outline">View Report</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Pending Documents</p>
                        <p className="text-sm text-muted-foreground">18 document requests pending</p>
                      </div>
                    </div>
                    <Button variant="outline">Process</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  )
}
