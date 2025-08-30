'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Download,
  Upload,
  Eye,
  Users,
  BookOpen
} from 'lucide-react'

export default function AssignmentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Button handlers
  const handleSaveAsDraft = () => {
    alert('Assignment saved as draft')
  }

  const handleAssignToStudents = () => {
    alert('Assignment assigned to students successfully!')
  }

  const handleViewAssignment = (assignmentId: number) => {
    alert(`Viewing assignment ID: ${assignmentId}`)
  }

  const handleEditAssignment = (assignmentId: number) => {
    alert(`Editing assignment ID: ${assignmentId}`)
  }

  const handleDownloadSubmission = (submissionId: number) => {
    alert(`Downloading submission ID: ${submissionId}`)
  }

  const handleGradeSubmission = (submissionId: number) => {
    alert(`Grading submission ID: ${submissionId}`)
  }
  const [activeTab2, setActiveTab2] = useState('assignments')

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [assignments] = useState([
    {
      id: 1,
      title: 'Binary Search Tree Implementation',
      class: 'Data Structures',
      classCode: 'CS301',
      description: 'Implement a complete binary search tree with insertion, deletion, and traversal operations',
      dueDate: '2024-09-20',
      assignedDate: '2024-09-10',
      maxMarks: 100,
      status: 'active',
      submissions: 32,
      totalStudents: 45,
      graded: 15,
      avgScore: 78
    },
    {
      id: 2,
      title: 'Database Normalization Exercise',
      class: 'Database Systems',
      classCode: 'CS401',
      description: 'Normalize the given database schema up to 3NF and explain the process',
      dueDate: '2024-09-18',
      assignedDate: '2024-09-08',
      maxMarks: 50,
      status: 'overdue',
      submissions: 35,
      totalStudents: 38,
      graded: 35,
      avgScore: 82
    },
    {
      id: 3,
      title: 'Software Design Patterns',
      class: 'Software Engineering',
      classCode: 'CS501',
      description: 'Implement Singleton, Factory, and Observer patterns with real-world examples',
      dueDate: '2024-09-25',
      assignedDate: '2024-09-12',
      maxMarks: 75,
      status: 'active',
      submissions: 18,
      totalStudents: 32,
      graded: 0,
      avgScore: 0
    },
    {
      id: 4,
      title: 'Network Protocol Analysis',
      class: 'Computer Networks',
      classCode: 'CS402',
      description: 'Analyze TCP/IP packet flow using Wireshark and create a detailed report',
      dueDate: '2024-09-15',
      assignedDate: '2024-09-05',
      maxMarks: 60,
      status: 'completed',
      submissions: 35,
      totalStudents: 35,
      graded: 35,
      avgScore: 85
    }
  ])

  const [submissions] = useState([
    {
      id: 1,
      assignmentId: 1,
      studentName: 'John Doe',
      studentId: 'ST2024001',
      submittedDate: '2024-09-15',
      status: 'submitted',
      grade: 85,
      feedback: 'Good implementation, but could improve error handling',
      late: false
    },
    {
      id: 2,
      assignmentId: 1,
      studentName: 'Jane Smith',
      studentId: 'ST2024002',
      submittedDate: '2024-09-14',
      status: 'graded',
      grade: 92,
      feedback: 'Excellent work with comprehensive test cases',
      late: false
    },
    {
      id: 3,
      assignmentId: 1,
      studentName: 'Mike Johnson',
      studentId: 'ST2024003',
      submittedDate: '2024-09-16',
      status: 'pending',
      grade: null,
      feedback: '',
      late: false
    },
    {
      id: 4,
      assignmentId: 2,
      studentName: 'Sarah Wilson',
      studentId: 'ST2024004',
      submittedDate: '2024-09-17',
      status: 'graded',
      grade: 88,
      feedback: 'Clear understanding of normalization concepts',
      late: false
    }
  ])

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus
    const matchesClass = filterClass === 'all' || assignment.classCode === filterClass
    return matchesSearch && matchesStatus && matchesClass
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>
      case 'draft':
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSubmissionStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="default">Submitted</Badge>
      case 'graded':
        return <Badge variant="default" className="bg-green-500">Graded</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'late':
        return <Badge variant="destructive">Late</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSubmissionRate = (submissions: number, total: number) => {
    return Math.round((submissions / total) * 100)
  }

  const stats = {
    totalAssignments: assignments.length,
    activeAssignments: assignments.filter(a => a.status === 'active').length,
    overdueAssignments: assignments.filter(a => a.status === 'overdue').length,
    pendingGrading: assignments.reduce((sum, a) => sum + (a.submissions - a.graded), 0)
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
                <h1 className="text-2xl sm:text-3xl font-bold">Assignments</h1>
                <p className="text-muted-foreground">Create, manage, and grade assignments</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Assignment</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new assignment for your students.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Assignment Title</label>
                      <Input placeholder="Enter assignment title" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Class</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CS301">Data Structures (CS301)</SelectItem>
                          <SelectItem value="CS401">Database Systems (CS401)</SelectItem>
                          <SelectItem value="CS501">Software Engineering (CS501)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Enter assignment description" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Due Date</label>
                        <Input type="date" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Maximum Marks</label>
                        <Input type="number" placeholder="100" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleSaveAsDraft}>Save as Draft</Button>
                      <Button onClick={handleAssignToStudents}>Assign to Students</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.totalAssignments}</p>
                  </div>
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.activeAssignments}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.overdueAssignments}</p>
                  </div>
                  <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Grading</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.pendingGrading}</p>
                  </div>
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Management</CardTitle>
                  <CardDescription>View and manage all your assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search assignments..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterClass} onValueChange={setFilterClass}>
                      <SelectTrigger className="w-full sm:w-48">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="CS301">Data Structures</SelectItem>
                        <SelectItem value="CS401">Database Systems</SelectItem>
                        <SelectItem value="CS501">Software Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead>Graded</TableHead>
                        <TableHead>Avg Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAssignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{assignment.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Max: {assignment.maxMarks} marks
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{assignment.class}</p>
                              <p className="text-xs text-muted-foreground">{assignment.classCode}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(assignment.dueDate) < new Date() ? 'Overdue' : 
                                 Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + ' days left'}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{assignment.submissions}/{assignment.totalStudents}</span>
                                <span>{getSubmissionRate(assignment.submissions, assignment.totalStudents)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${getSubmissionRate(assignment.submissions, assignment.totalStudents)}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{assignment.graded}/{assignment.submissions}</span>
                                <span>{assignment.submissions > 0 ? Math.round((assignment.graded / assignment.submissions) * 100) : 0}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${assignment.submissions > 0 ? (assignment.graded / assignment.submissions) * 100 : 0}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {assignment.avgScore > 0 ? (
                              <span className="font-medium">{assignment.avgScore}%</span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewAssignment(assignment.id)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEditAssignment(assignment.id)}>
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
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

            <TabsContent value="submissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Submissions</CardTitle>
                  <CardDescription>Review and grade student submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Submitted Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => {
                        const assignment = assignments.find(a => a.id === submission.assignmentId)
                        return (
                          <TableRow key={submission.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{submission.studentName}</p>
                                <p className="text-sm text-muted-foreground">{submission.studentId}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{assignment?.title}</p>
                                <p className="text-xs text-muted-foreground">{assignment?.classCode}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{new Date(submission.submittedDate).toLocaleDateString()}</p>
                                {submission.late && (
                                  <Badge variant="destructive" className="text-xs">Late</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{getSubmissionStatusBadge(submission.status)}</TableCell>
                            <TableCell>
                              {submission.grade ? (
                                <span className="font-medium">{submission.grade}/{assignment?.maxMarks}</span>
                              ) : (
                                <span className="text-muted-foreground">Not graded</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleDownloadSubmission(submission.id)}>
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
                                <Button size="sm" onClick={() => handleGradeSubmission(submission.id)}>
                                  Grade
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
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
