'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Download,
  Calendar as CalendarIcon,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  Award,
  FileSpreadsheet,
  FileText,
  PieChart,
  Activity,
  Target,
  CheckCircle
} from 'lucide-react'
import { format } from 'date-fns'

export default function ReportsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedDateFrom, setSelectedDateFrom] = useState<Date>(new Date(2024, 8, 1))
  const [selectedDateTo, setSelectedDateTo] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState('all')
  const [reportType, setReportType] = useState('performance')

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [performanceData] = useState({
    classes: [
      {
        name: 'Data Structures',
        code: 'CS301',
        students: 45,
        avgGPA: 3.2,
        avgAttendance: 78.5,
        passRate: 87,
        assignments: 8,
        completedAssignments: 6,
        trend: 'up'
      },
      {
        name: 'Database Systems',
        code: 'CS401',
        students: 38,
        avgGPA: 3.4,
        avgAttendance: 82.3,
        passRate: 92,
        assignments: 6,
        completedAssignments: 5,
        trend: 'up'
      },
      {
        name: 'Software Engineering',
        code: 'CS501',
        students: 32,
        avgGPA: 3.1,
        avgAttendance: 75.2,
        passRate: 84,
        assignments: 7,
        completedAssignments: 4,
        trend: 'down'
      }
    ],
    overall: {
      totalStudents: 115,
      avgGPA: 3.23,
      avgAttendance: 78.7,
      overallPassRate: 87.8,
      totalAssignments: 21,
      gradedAssignments: 15
    }
  })

  const [attendanceData] = useState([
    {
      class: 'Data Structures',
      code: 'CS301',
      totalClasses: 32,
      avgAttendance: 78.5,
      studentsAbove90: 12,
      studentsBelow75: 8,
      trend: 'stable'
    },
    {
      class: 'Database Systems',
      code: 'CS401',
      totalClasses: 28,
      avgAttendance: 82.3,
      studentsAbove90: 15,
      studentsBelow75: 5,
      trend: 'up'
    },
    {
      class: 'Software Engineering',
      code: 'CS501',
      totalClasses: 30,
      avgAttendance: 75.2,
      studentsAbove90: 8,
      studentsBelow75: 12,
      trend: 'down'
    }
  ])

  const [assignmentData] = useState([
    {
      class: 'Data Structures',
      code: 'CS301',
      totalAssignments: 8,
      submitted: 6,
      graded: 5,
      avgScore: 78.5,
      onTime: 85,
      late: 15
    },
    {
      class: 'Database Systems',
      code: 'CS401',
      totalAssignments: 6,
      submitted: 5,
      graded: 5,
      avgScore: 82.3,
      onTime: 92,
      late: 8
    },
    {
      class: 'Software Engineering',
      code: 'CS501',
      totalAssignments: 7,
      submitted: 4,
      graded: 3,
      avgScore: 75.2,
      onTime: 78,
      late: 22
    }
  ])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'up':
        return <Badge variant="default" className="bg-green-500">Improving</Badge>
      case 'down':
        return <Badge variant="destructive">Declining</Badge>
      default:
        return <Badge variant="secondary">Stable</Badge>
    }
  }

  const generateReport = () => {
    alert(`Generating ${reportType} report for ${selectedClass === 'all' ? 'all classes' : selectedClass} from ${format(selectedDateFrom, 'MMM dd, yyyy')} to ${format(selectedDateTo, 'MMM dd, yyyy')}`)
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Reports & Analytics</h1>
                <p className="text-muted-foreground">Generate comprehensive reports on student performance and class analytics</p>
              </div>
              <Button onClick={generateReport} className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Report Configuration */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Configure your report parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Report</SelectItem>
                      <SelectItem value="attendance">Attendance Report</SelectItem>
                      <SelectItem value="assignments">Assignment Report</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="CS301">Data Structures (CS301)</SelectItem>
                      <SelectItem value="CS401">Database Systems (CS401)</SelectItem>
                      <SelectItem value="CS501">Software Engineering (CS501)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">From Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDateFrom ? format(selectedDateFrom, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDateFrom}
                        onSelect={(date) => date && setSelectedDateFrom(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium">To Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDateTo ? format(selectedDateTo, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDateTo}
                        onSelect={(date) => date && setSelectedDateTo(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">{performanceData.overall.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average GPA</p>
                    <p className="text-2xl font-bold">{performanceData.overall.avgGPA}</p>
                  </div>
                  <Award className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold">{performanceData.overall.avgAttendance}%</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                    <p className="text-2xl font-bold">{performanceData.overall.overallPassRate}%</p>
                  </div>
                  <Target className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <Tabs defaultValue="performance">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto sm:h-10">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="export">Export Options</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Performance Analysis</CardTitle>
                  <CardDescription>Academic performance metrics by class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.classes.map((classData) => (
                      <div key={classData.code} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{classData.name}</h4>
                            <p className="text-sm text-muted-foreground">{classData.code} • {classData.students} students</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(classData.trend)}
                            {getTrendBadge(classData.trend)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{classData.avgGPA}</p>
                            <p className="text-sm text-muted-foreground">Average GPA</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{classData.avgAttendance}%</p>
                            <p className="text-sm text-muted-foreground">Attendance</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{classData.passRate}%</p>
                            <p className="text-sm text-muted-foreground">Pass Rate</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{classData.completedAssignments}/{classData.assignments}</p>
                            <p className="text-sm text-muted-foreground">Assignments</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Analysis</CardTitle>
                  <CardDescription>Student attendance patterns and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceData.map((classData) => (
                      <div key={classData.code} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{classData.class}</h4>
                            <p className="text-sm text-muted-foreground">{classData.code} • {classData.totalClasses} classes conducted</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(classData.trend)}
                            {getTrendBadge(classData.trend)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{classData.avgAttendance}%</p>
                            <p className="text-sm text-muted-foreground">Average Attendance</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{classData.studentsAbove90}</p>
                            <p className="text-sm text-muted-foreground">Students Above 90%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{classData.studentsBelow75}</p>
                            <p className="text-sm text-muted-foreground">Students Below 75%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Analysis</CardTitle>
                  <CardDescription>Assignment submission and grading statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignmentData.map((classData) => (
                      <div key={classData.code} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{classData.class}</h4>
                            <p className="text-sm text-muted-foreground">{classData.code}</p>
                          </div>
                          <Badge variant="outline">{classData.totalAssignments} Total Assignments</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{classData.submitted}/{classData.totalAssignments}</p>
                            <p className="text-sm text-muted-foreground">Submitted</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{classData.graded}/{classData.submitted}</p>
                            <p className="text-sm text-muted-foreground">Graded</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">{classData.avgScore}%</p>
                            <p className="text-sm text-muted-foreground">Avg Score</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-orange-600">{classData.onTime}%</p>
                            <p className="text-sm text-muted-foreground">On Time</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{classData.late}%</p>
                            <p className="text-sm text-muted-foreground">Late</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                  <CardDescription>Download reports in various formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileSpreadsheet className="w-8 h-8 text-green-500" />
                        <div>
                          <h4 className="font-medium">Excel Report</h4>
                          <p className="text-sm text-muted-foreground">Detailed spreadsheet with all data</p>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Excel
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="w-8 h-8 text-red-500" />
                        <div>
                          <h4 className="font-medium">PDF Report</h4>
                          <p className="text-sm text-muted-foreground">Formatted report document</p>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <BarChart3 className="w-8 h-8 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Analytics Dashboard</h4>
                          <p className="text-sm text-muted-foreground">Interactive charts and graphs</p>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Dashboard
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <PieChart className="w-8 h-8 text-purple-500" />
                        <div>
                          <h4 className="font-medium">Grade Distribution</h4>
                          <p className="text-sm text-muted-foreground">Grade analysis charts</p>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Charts
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <CheckCircle className="w-8 h-8 text-orange-500" />
                        <div>
                          <h4 className="font-medium">Summary Report</h4>
                          <p className="text-sm text-muted-foreground">Executive summary</p>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Summary
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Activity className="w-8 h-8 text-cyan-500" />
                        <div>
                          <h4 className="font-medium">Custom Report</h4>
                          <p className="text-sm text-muted-foreground">Build your own report</p>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Create Custom
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
