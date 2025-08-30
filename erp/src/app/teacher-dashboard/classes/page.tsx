'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Users, 
  BookOpen, 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MoreHorizontal
} from 'lucide-react'

export default function ClassesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSemester, setFilterSemester] = useState('all')

  // Button handlers
  const handleAddNewClass = () => {
    alert('Add New Class functionality - would open class creation form')
  }

  const handleViewClass = (classId: number) => {
    alert(`Viewing class ID: ${classId}`)
  }

  const handleEditClass = (classId: number) => {
    alert(`Editing class ID: ${classId}`)
  }

  const handleMoreOptions = (classId: number) => {
    alert(`More options for class ID: ${classId}`)
  }

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [classes] = useState([
    {
      id: 1,
      subject: 'Data Structures and Algorithms',
      code: 'CS301',
      semester: 3,
      students: 45,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'CS-101',
      duration: '1.5 hours',
      status: 'active',
      nextClass: '2024-09-15 10:00',
      totalClasses: 45,
      completedClasses: 32
    },
    {
      id: 2,
      subject: 'Database Management Systems',
      code: 'CS401',
      semester: 4,
      students: 38,
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'CS-205',
      duration: '2 hours',
      status: 'active',
      nextClass: '2024-09-16 14:00',
      totalClasses: 40,
      completedClasses: 28
    },
    {
      id: 3,
      subject: 'Software Engineering',
      code: 'CS501',
      semester: 5,
      students: 32,
      schedule: 'Mon, Wed - 11:30 AM',
      room: 'CS-301',
      duration: '1.5 hours',
      status: 'active',
      nextClass: '2024-09-15 11:30',
      totalClasses: 42,
      completedClasses: 30
    },
    {
      id: 4,
      subject: 'Computer Networks',
      code: 'CS402',
      semester: 4,
      students: 35,
      schedule: 'Fri - 3:00 PM',
      room: 'CS-202',
      duration: '3 hours',
      status: 'completed',
      nextClass: null,
      totalClasses: 15,
      completedClasses: 15
    }
  ])

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = filterSemester === 'all' || cls.semester.toString() === filterSemester
    return matchesSearch && matchesSemester
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>
      case 'upcoming':
        return <Badge variant="outline">Upcoming</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
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
                <h1 className="text-2xl sm:text-3xl font-bold">My Classes</h1>
                <p className="text-muted-foreground">Manage and monitor all your assigned classes</p>
              </div>
              <Button onClick={handleAddNewClass} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add New Class
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                    <p className="text-sm font-medium text-muted-foreground">Active Classes</p>
                    <p className="text-2xl font-bold">{classes.filter(c => c.status === 'active').length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
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
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                    <p className="text-2xl font-bold">
                      {Math.round(classes.reduce((sum, cls) => sum + getProgressPercentage(cls.completedClasses, cls.totalClasses), 0) / classes.length)}%
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>Search and filter your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search classes by name or code..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={filterSemester} onValueChange={setFilterSemester}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="3">Semester 3</SelectItem>
                    <SelectItem value="4">Semester 4</SelectItem>
                    <SelectItem value="5">Semester 5</SelectItem>
                    <SelectItem value="6">Semester 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Classes Table */}
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{cls.subject}</p>
                          <p className="text-sm text-muted-foreground">{cls.duration}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{cls.code}</TableCell>
                      <TableCell>{cls.semester}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                          {cls.students}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{cls.schedule}</p>
                          {cls.nextClass && (
                            <p className="text-xs text-muted-foreground">
                              Next: {new Date(cls.nextClass).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                          {cls.room}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{cls.completedClasses}/{cls.totalClasses}</span>
                            <span>{getProgressPercentage(cls.completedClasses, cls.totalClasses)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${getProgressPercentage(cls.completedClasses, cls.totalClasses)}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(cls.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewClass(cls.id)} className="w-full sm:w-auto">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditClass(cls.id)} className="w-full sm:w-auto">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleMoreOptions(cls.id)} className="w-full sm:w-auto">
                            <MoreHorizontal className="w-4 h-4" />
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
        </div>
      </div>
    </div>
  )
}
