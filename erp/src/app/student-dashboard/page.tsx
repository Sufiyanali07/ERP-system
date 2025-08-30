'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import StudentSidebar from '@/components/student-sidebar'
import NotificationsPanel from '@/components/notifications-panel'
import AcademicCalendar from '@/components/academic-calendar'
import { 
  CreditCard, 
  FileText, 
  Calendar, 
  DollarSign, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Trophy,
  User
} from 'lucide-react'

export default function StudentDashboard() {
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
  const [studentData] = useState({
    name: 'John Doe',
    studentId: 'ST2024001',
    email: 'john.doe@college.edu',
    department: 'Computer Science',
    semester: 6,
    course: 'B.Tech CSE'
  })

  const [fees, setFees] = useState([
    {
      id: 1,
      type: 'Tuition Fee',
      amount: 50000,
      dueDate: '2024-09-15',
      status: 'pending',
      semester: 6
    },
    {
      id: 2,
      type: 'Hostel Fee',
      amount: 25000,
      dueDate: '2024-09-20',
      status: 'pending',
      semester: 6
    },
    {
      id: 3,
      type: 'Library Fee',
      amount: 2000,
      dueDate: '2024-08-30',
      status: 'paid',
      semester: 6,
      paidDate: '2024-08-25',
      transactionId: 'TXN123456'
    }
  ])

  const [documents, setDocuments] = useState([
    {
      id: 1,
      type: 'Transcript',
      status: 'pending',
      requestDate: '2024-08-20',
      urgency: 'normal'
    },
    {
      id: 2,
      type: 'Bonafide Certificate',
      status: 'ready',
      requestDate: '2024-08-15',
      approvedDate: '2024-08-22',
      urgency: 'urgent'
    }
  ])

  const [exams, setExams] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      date: '2024-09-10',
      time: '10:00 AM - 1:00 PM',
      venue: 'Hall A-101',
      type: 'Final'
    },
    {
      id: 2,
      subject: 'Database Systems',
      date: '2024-09-12',
      time: '2:00 PM - 5:00 PM',
      venue: 'Hall B-205',
      type: 'Final'
    }
  ])

  const [results, setResults] = useState([
    {
      id: 1,
      subject: 'Operating Systems',
      marks: 85,
      maxMarks: 100,
      grade: 'A',
      semester: 5
    },
    {
      id: 2,
      subject: 'Computer Networks',
      marks: 78,
      maxMarks: 100,
      grade: 'B+',
      semester: 5
    }
  ])

  const handlePayFee = (feeId: number) => {
    setFees(fees.map(fee => 
      fee.id === feeId 
        ? { ...fee, status: 'paid', paidDate: new Date().toISOString().split('T')[0], transactionId: `TXN${Date.now()}` }
        : fee
    ))
  }

  const handleDocumentRequest = (docType: string, urgency: string) => {
    const newDoc = {
      id: documents.length + 1,
      type: docType,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      urgency
    }
    setDocuments([...documents, newDoc])
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'overdue':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Overdue</Badge>
      case 'ready':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Ready</Badge>
      case 'approved':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar 
        studentData={studentData} 
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
                <h1 className="text-2xl sm:text-3xl font-bold">Student Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {studentData.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-left sm:text-right">
                  <p className="font-medium">{studentData.studentId}</p>
                  <p className="text-sm text-muted-foreground">{studentData.course} - Semester {studentData.semester}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Fees</p>
                  <p className="text-2xl font-bold">₹{fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0).toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Document Requests</p>
                  <p className="text-2xl font-bold">{documents.filter(d => d.status === 'pending').length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Exams</p>
                  <p className="text-2xl font-bold">{exams.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current CGPA</p>
                  <p className="text-2xl font-bold">8.5</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="fees" className="text-xs sm:text-sm">Fees</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
            <TabsTrigger value="exams" className="text-xs sm:text-sm">Exams</TabsTrigger>
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
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Library Fee Paid</p>
                          <p className="text-sm text-muted-foreground">Aug 25, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">Bonafide Certificate Ready</p>
                          <p className="text-sm text-muted-foreground">Aug 22, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Transcript Request Submitted</p>
                          <p className="text-sm text-muted-foreground">Aug 20, 2024</p>
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
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                        <a href="/pay-now">
                          <CreditCard className="w-6 h-6 mb-2" />
                          Pay Fees
                        </a>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                        <a href="/request-document">
                          <FileText className="w-6 h-6 mb-2" />
                          Request Document
                        </a>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                        <a href="/view-timetable">
                          <Calendar className="w-6 h-6 mb-2" />
                          View Timetable
                        </a>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                        <a href="/check-results">
                          <BookOpen className="w-6 h-6 mb-2" />
                          Check Results
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <AcademicCalendar />
              </div>
              
              <div className="space-y-6">
                <NotificationsPanel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Payment</CardTitle>
                <CardDescription>Manage your fee payments and download receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">Fee Type</TableHead>
                        <TableHead className="min-w-[100px]">Amount</TableHead>
                        <TableHead className="min-w-[100px]">Due Date</TableHead>
                        <TableHead className="min-w-[80px]">Status</TableHead>
                        <TableHead className="min-w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {fees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium text-sm">{fee.type}</TableCell>
                        <TableCell className="text-sm">₹{fee.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{formatDate(fee.dueDate)}</TableCell>
                        <TableCell>{getStatusBadge(fee.status)}</TableCell>
                        <TableCell>
                          {fee.status === 'pending' ? (
                            <Button size="sm" className="text-xs px-2 py-1" asChild>
                              <a href="/student-dashboard/fees">
                                Pay Now
                              </a>
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1" asChild>
                              <a href="/student-dashboard/fees">
                                <Download className="w-4 h-4 mr-2" />
                                Receipt
                              </a>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request New Document</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="docType">Document Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transcript">Transcript</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="bonafide">Bonafide Certificate</SelectItem>
                        <SelectItem value="noc">No Objection Certificate</SelectItem>
                        <SelectItem value="recommendation">Recommendation Letter</SelectItem>
                        <SelectItem value="marksheet">Marksheet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal (7-10 days)</SelectItem>
                        <SelectItem value="urgent">Urgent (3-5 days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" asChild>
                    <a href="/request-document">Submit Request</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Document Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.type}</TableCell>
                          <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          <TableCell>{formatDate(doc.requestDate)}</TableCell>
                          <TableCell>
                            {doc.status === 'ready' && (
                              <Button size="sm" asChild>
                                <a href="/student-dashboard/documents">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Timetable</CardTitle>
                <CardDescription>Upcoming examinations schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.subject}</TableCell>
                        <TableCell>{formatDate(exam.date)}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                        <TableCell>{exam.venue}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{exam.type}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Results</CardTitle>
                <CardDescription>Your examination results and grades</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Marks Obtained</TableHead>
                      <TableHead>Max Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Semester</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.subject}</TableCell>
                        <TableCell>{result.marks}</TableCell>
                        <TableCell>{result.maxMarks}</TableCell>
                        <TableCell>
                          <Badge variant="default">{result.grade}</Badge>
                        </TableCell>
                        <TableCell>{result.semester}</TableCell>
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
