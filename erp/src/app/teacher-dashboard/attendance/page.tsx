'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Save,
  Download,
  Upload,
  Search,
  Filter,
  AlertTriangle
} from 'lucide-react'
import { format } from 'date-fns'

export default function AttendancePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState('CS101')
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({})
  const [searchTerm, setSearchTerm] = useState('')

  // Button handlers
  const handleExport = () => {
    alert('Export attendance functionality - would download attendance report')
  }

  const handleImport = () => {
    alert('Import attendance functionality - would open file upload dialog')
  }

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [classes] = useState([
    { id: 'CS301', name: 'Data Structures', students: 45 },
    { id: 'CS401', name: 'Database Systems', students: 38 },
    { id: 'CS501', name: 'Software Engineering', students: 32 }
  ])

  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      studentId: 'ST2024001',
      name: 'John Doe',
      class: 'CS301',
      present: true,
      attendanceRate: 85,
      totalClasses: 32,
      attendedClasses: 27,
      status: 'good'
    },
    {
      id: 2,
      studentId: 'ST2024002',
      name: 'Jane Smith',
      class: 'CS301',
      present: true,
      attendanceRate: 92,
      totalClasses: 32,
      attendedClasses: 29,
      status: 'excellent'
    },
    {
      id: 3,
      studentId: 'ST2024003',
      name: 'Mike Johnson',
      class: 'CS301',
      present: false,
      attendanceRate: 78,
      totalClasses: 32,
      attendedClasses: 25,
      status: 'warning'
    },
    {
      id: 4,
      studentId: 'ST2024004',
      name: 'Sarah Wilson',
      class: 'CS301',
      present: true,
      attendanceRate: 95,
      totalClasses: 32,
      attendedClasses: 30,
      status: 'excellent'
    },
    {
      id: 5,
      studentId: 'ST2024005',
      name: 'David Brown',
      class: 'CS301',
      present: false,
      attendanceRate: 65,
      totalClasses: 32,
      attendedClasses: 21,
      status: 'critical'
    }
  ])

  const filteredStudents = attendanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = student.class === selectedClass
    return matchesSearch && matchesClass
  })

  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, present }
          : student
      )
    )
  }

  const markAllPresent = () => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.class === selectedClass 
          ? { ...student, present: true }
          : student
      )
    )
  }

  const markAllAbsent = () => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.class === selectedClass 
          ? { ...student, present: false }
          : student
      )
    )
  }

  const saveAttendance = () => {
    // Save attendance logic here
    alert('Attendance saved successfully!')
  }

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge variant="default" className="bg-green-500">Excellent</Badge>
      case 'good':
        return <Badge variant="default" className="bg-blue-500">Good</Badge>
      case 'warning':
        return <Badge variant="secondary">Warning</Badge>
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600'
    if (rate >= 75) return 'text-blue-600'
    if (rate >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const currentClassData = classes.find(c => c.id === selectedClass)
  const presentCount = filteredStudents.filter(s => s.present).length
  const absentCount = filteredStudents.filter(s => !s.present).length
  const attendancePercentage = filteredStudents.length > 0 ? Math.round((presentCount / filteredStudents.length) * 100) : 0

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
                <h1 className="text-2xl sm:text-3xl font-bold">Attendance Management</h1>
                <p className="text-muted-foreground">Mark and track student attendance</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" onClick={handleImport}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button onClick={saveAttendance} className="w-full sm:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Attendance
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{presentCount}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-600">{absentCount}</p>
                  </div>
                  <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                    <p className="text-xl sm:text-2xl font-bold">{attendancePercentage}%</p>
                  </div>
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-xl sm:text-2xl font-bold">{currentClassData?.students || 0}</p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Marking */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Select date and class to mark attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name} ({cls.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-10 w-full sm:w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <Button variant="outline" onClick={markAllPresent}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All Present
                </Button>
                <Button variant="outline" onClick={markAllAbsent}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Mark All Absent
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${getAttendanceColor(student.attendanceRate)}`}>
                            {student.attendanceRate}%
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                student.attendanceRate >= 90 ? 'bg-green-500' :
                                student.attendanceRate >= 75 ? 'bg-blue-500' :
                                student.attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${student.attendanceRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getAttendanceStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={student.present}
                          onCheckedChange={(checked) => 
                            handleAttendanceChange(student.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={!student.present}
                          onCheckedChange={(checked) => 
                            handleAttendanceChange(student.id, !(checked as boolean))
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Low Attendance Alerts</CardTitle>
                <CardDescription>Students with attendance below 75%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents
                    .filter(student => student.attendanceRate < 75)
                    .map((student) => (
                      <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.studentId}</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-medium text-red-600">{student.attendanceRate}%</p>
                          <p className="text-xs text-muted-foreground">
                            {student.attendedClasses}/{student.totalClasses} classes
                          </p>
                        </div>
                      </div>
                    ))}
                  {filteredStudents.filter(student => student.attendanceRate < 75).length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No students with low attendance
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Summary</CardTitle>
                <CardDescription>Overall attendance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Class Average</span>
                    <span className="font-bold">
                      {Math.round(filteredStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / filteredStudents.length || 0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Students Above 90%</span>
                    <span className="font-bold text-green-600">
                      {filteredStudents.filter(s => s.attendanceRate >= 90).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Students 75-89%</span>
                    <span className="font-bold text-blue-600">
                      {filteredStudents.filter(s => s.attendanceRate >= 75 && s.attendanceRate < 90).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Students Below 75%</span>
                    <span className="font-bold text-red-600">
                      {filteredStudents.filter(s => s.attendanceRate < 75).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
