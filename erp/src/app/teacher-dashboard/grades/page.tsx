'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Plus,
  TrendingUp,
  TrendingDown,
  Award,
  BarChart3,
  Users,
  BookOpen,
  Calculator,
  FileSpreadsheet
} from 'lucide-react'

export default function GradesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('gradebook')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('all')
  const [filterSubject, setFilterSubject] = useState('all')

  // Button handlers
  const handleImportGrades = () => {
    alert('Import Grades functionality - would open file upload dialog')
  }

  const handleExportReport = () => {
    alert('Export Report functionality - would download grade report')
  }

  const handleSaveGrade = () => {
    alert('Grade saved successfully!')
  }

  const handleEditGrade = (studentId: string) => {
    alert(`Editing grade for student ID: ${studentId}`)
  }

  const handleExportExcel = () => {
    alert('Exporting gradebook to Excel format')
  }

  const handleExportPDF = () => {
    alert('Exporting analytics report to PDF format')
  }

  const handleGenerateCards = () => {
    alert('Generating individual student grade cards')
  }

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [grades] = useState([
    {
      id: 1,
      studentId: 'ST2024001',
      studentName: 'John Doe',
      class: 'Data Structures',
      classCode: 'CS301',
      assignments: {
        'Assignment 1': 85,
        'Assignment 2': 78,
        'Midterm': 82,
        'Assignment 3': 90,
        'Final Project': null
      },
      totalMarks: 335,
      maxMarks: 400,
      percentage: 83.75,
      grade: 'A-',
      gpa: 3.7,
      attendance: 85
    },
    {
      id: 2,
      studentId: 'ST2024002',
      studentName: 'Jane Smith',
      class: 'Data Structures',
      classCode: 'CS301',
      assignments: {
        'Assignment 1': 92,
        'Assignment 2': 88,
        'Midterm': 95,
        'Assignment 3': 94,
        'Final Project': null
      },
      totalMarks: 369,
      maxMarks: 400,
      percentage: 92.25,
      grade: 'A',
      gpa: 3.9,
      attendance: 92
    },
    {
      id: 3,
      studentId: 'ST2024003',
      studentName: 'Mike Johnson',
      class: 'Data Structures',
      classCode: 'CS301',
      assignments: {
        'Assignment 1': 75,
        'Assignment 2': 70,
        'Midterm': 68,
        'Assignment 3': 72,
        'Final Project': null
      },
      totalMarks: 285,
      maxMarks: 400,
      percentage: 71.25,
      grade: 'B-',
      gpa: 2.7,
      attendance: 78
    },
    {
      id: 4,
      studentId: 'ST2024004',
      studentName: 'Sarah Wilson',
      class: 'Database Systems',
      classCode: 'CS401',
      assignments: {
        'Quiz 1': 95,
        'Assignment 1': 88,
        'Midterm': 92,
        'Quiz 2': 90,
        'Final Project': null
      },
      totalMarks: 365,
      maxMarks: 400,
      percentage: 91.25,
      grade: 'A',
      gpa: 3.9,
      attendance: 95
    }
  ])

  const [classStats] = useState([
    {
      class: 'Data Structures',
      classCode: 'CS301',
      totalStudents: 45,
      avgGPA: 3.2,
      avgPercentage: 78.5,
      passRate: 87,
      gradeDistribution: {
        'A+': 5, 'A': 8, 'A-': 7, 'B+': 10, 'B': 8, 'B-': 4, 'C+': 2, 'C': 1, 'F': 0
      }
    },
    {
      class: 'Database Systems',
      classCode: 'CS401',
      totalStudents: 38,
      avgGPA: 3.4,
      avgPercentage: 82.3,
      passRate: 92,
      gradeDistribution: {
        'A+': 6, 'A': 9, 'A-': 8, 'B+': 8, 'B': 5, 'B-': 2, 'C+': 0, 'C': 0, 'F': 0
      }
    }
  ])

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = filterClass === 'all' || grade.classCode === filterClass
    return matchesSearch && matchesClass
  })

  const getGradeBadge = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      'A+': 'bg-green-600',
      'A': 'bg-green-500',
      'A-': 'bg-green-400',
      'B+': 'bg-blue-500',
      'B': 'bg-blue-400',
      'B-': 'bg-blue-300',
      'C+': 'bg-yellow-500',
      'C': 'bg-yellow-400',
      'C-': 'bg-yellow-300',
      'D': 'bg-orange-500',
      'F': 'bg-red-500'
    }
    
    return (
      <Badge variant="default" className={gradeColors[grade] || 'bg-gray-500'}>
        {grade}
      </Badge>
    )
  }

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 85) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (percentage >= 70) return <TrendingUp className="w-4 h-4 text-blue-500" />
    return <TrendingDown className="w-4 h-4 text-red-500" />
  }

  const calculateClassAverage = (assignmentName: string) => {
    const scores = filteredGrades
      .map(g => g.assignments[assignmentName as keyof typeof g.assignments])
      .filter(score => score !== null && score !== undefined && !isNaN(Number(score))) as number[]
    
    if (scores.length === 0) return '0'
    const average = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    return isNaN(average) ? '0' : average.toString()
  }

  const overallStats = {
    totalStudents: filteredGrades.length,
    avgGPA: filteredGrades.length > 0 ? 
      (filteredGrades.reduce((sum, g) => sum + g.gpa, 0) / filteredGrades.length).toFixed(2) : '0.00',
    avgPercentage: filteredGrades.length > 0 ?
      Math.round(filteredGrades.reduce((sum, g) => sum + g.percentage, 0) / filteredGrades.length) : 0,
    passRate: filteredGrades.length > 0 ?
      Math.round((filteredGrades.filter(g => g.percentage >= 60).length / filteredGrades.length) * 100) : 0
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
                <h1 className="text-2xl sm:text-3xl font-bold">Grades & Assessment</h1>
                <p className="text-muted-foreground">Manage student grades and track academic performance</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={handleImportGrades} className="w-full sm:w-auto">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Grades
                </Button>
                <Button variant="outline" onClick={handleExportReport} className="w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Grade
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Grade</DialogTitle>
                      <DialogDescription>Enter grade information for a student</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map(grade => (
                            <SelectItem key={grade.id} value={grade.studentId}>
                              {grade.studentName} ({grade.studentId})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment1">Assignment 1</SelectItem>
                          <SelectItem value="assignment2">Assignment 2</SelectItem>
                          <SelectItem value="midterm">Midterm Exam</SelectItem>
                          <SelectItem value="final">Final Project</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="number" placeholder="Enter marks obtained" />
                      <Input type="number" placeholder="Enter maximum marks" />
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleSaveGrade}>Save Grade</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-xl sm:text-2xl font-bold">{overallStats.totalStudents}</p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average GPA</p>
                    <p className="text-xl sm:text-2xl font-bold">{overallStats.avgGPA}</p>
                  </div>
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Class Average</p>
                    <p className="text-xl sm:text-2xl font-bold">{overallStats.avgPercentage}%</p>
                  </div>
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                    <p className="text-xl sm:text-2xl font-bold">{overallStats.passRate}%</p>
                  </div>
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="gradebook" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Gradebook</CardTitle>
                  <CardDescription>View and manage individual student grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search students..."
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
                        <SelectItem value="CS301">Data Structures</SelectItem>
                        <SelectItem value="CS401">Database Systems</SelectItem>
                        <SelectItem value="CS501">Software Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Assignment 1</TableHead>
                          <TableHead>Assignment 2</TableHead>
                          <TableHead>Midterm</TableHead>
                          <TableHead>Assignment 3</TableHead>
                          <TableHead>Final Project</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>GPA</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrades.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{student.studentName}</p>
                                <p className="text-sm text-muted-foreground">{student.studentId}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{student.class}</p>
                                <p className="text-xs text-muted-foreground">{student.classCode}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {student.assignments['Assignment 1'] || '-'}
                            </TableCell>
                            <TableCell>
                              {student.assignments['Assignment 2'] || '-'}
                            </TableCell>
                            <TableCell>
                              {student.assignments['Midterm'] || '-'}
                            </TableCell>
                            <TableCell>
                              {student.assignments['Assignment 3'] || '-'}
                            </TableCell>
                            <TableCell>
                              {student.assignments['Final Project'] || 'Pending'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{student.percentage.toFixed(1)}%</span>
                                {getPerformanceIcon(student.percentage)}
                              </div>
                            </TableCell>
                            <TableCell>{getGradeBadge(student.grade)}</TableCell>
                            <TableCell className="font-medium">{student.gpa}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline" onClick={() => handleEditGrade(student.studentId)}>
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Class Averages */}
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Class Averages</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Assignment 1</p>
                        <p className="font-medium">{calculateClassAverage('Assignment 1')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Assignment 2</p>
                        <p className="font-medium">{calculateClassAverage('Assignment 2')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Midterm</p>
                        <p className="font-medium">{calculateClassAverage('Midterm')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Assignment 3</p>
                        <p className="font-medium">{calculateClassAverage('Assignment 3')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Final Project</p>
                        <p className="font-medium">Pending</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Overall</p>
                        <p className="font-medium">{overallStats.avgPercentage}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {classStats.map((classData) => (
                  <Card key={classData.classCode}>
                    <CardHeader>
                      <CardTitle>{classData.class}</CardTitle>
                      <CardDescription>{classData.classCode} - Performance Analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Students</p>
                            <p className="text-xl font-bold">{classData.totalStudents}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Average GPA</p>
                            <p className="text-xl font-bold">{classData.avgGPA}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Class Average</p>
                            <p className="text-xl font-bold">{classData.avgPercentage}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pass Rate</p>
                            <p className="text-xl font-bold">{classData.passRate}%</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Grade Distribution</h4>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            {Object.entries(classData.gradeDistribution).map(([grade, count]) => (
                              <div key={grade} className="flex justify-between">
                                <span>{grade}:</span>
                                <span className="font-medium">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Reports</CardTitle>
                  <CardDescription>Generate and export various grade reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="w-8 h-8 text-green-500" />
                        <div>
                          <h4 className="font-medium">Class Grade Report</h4>
                          <p className="text-sm text-muted-foreground">Complete grade sheet for all students</p>
                        </div>
                      </div>
                      <Button className="w-full mt-3" variant="outline" onClick={handleExportExcel}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Excel
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-8 h-8 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Performance Analytics</h4>
                          <p className="text-sm text-muted-foreground">Statistical analysis and trends</p>
                        </div>
                      </div>
                      <Button className="w-full mt-3" variant="outline" onClick={handleExportPDF}>
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-3">
                        <Award className="w-8 h-8 text-purple-500" />
                        <div>
                          <h4 className="font-medium">Grade Summary</h4>
                          <p className="text-sm text-muted-foreground">Individual student grade cards</p>
                        </div>
                      </div>
                      <Button className="w-full mt-3" variant="outline" onClick={handleGenerateCards}>
                        <Download className="w-4 h-4 mr-2" />
                        Generate Cards
                      </Button>
                    </Card>
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
