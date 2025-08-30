'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Video,
  Coffee,
  GraduationCap
} from 'lucide-react'
import { format } from 'date-fns'

export default function SchedulePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState('week')

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [schedule] = useState([
    {
      id: 1,
      title: 'Data Structures Lecture',
      type: 'lecture',
      class: 'CS301',
      date: '2024-09-16',
      startTime: '10:00',
      endTime: '11:30',
      room: 'CS-101',
      students: 45,
      description: 'Binary Search Trees - Implementation and Operations',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Database Systems Lab',
      type: 'lab',
      class: 'CS401',
      date: '2024-09-16',
      startTime: '14:00',
      endTime: '16:00',
      room: 'CS-Lab-1',
      students: 38,
      description: 'SQL Queries and Joins Practice',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Office Hours',
      type: 'office_hours',
      class: 'All',
      date: '2024-09-16',
      startTime: '16:30',
      endTime: '17:30',
      room: 'Faculty-205',
      students: null,
      description: 'Student consultation and doubt clearing',
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Software Engineering Lecture',
      type: 'lecture',
      class: 'CS501',
      date: '2024-09-17',
      startTime: '11:30',
      endTime: '13:00',
      room: 'CS-301',
      students: 32,
      description: 'Design Patterns - Singleton and Factory',
      status: 'scheduled'
    },
    {
      id: 5,
      title: 'Faculty Meeting',
      type: 'meeting',
      class: 'Department',
      date: '2024-09-17',
      startTime: '15:00',
      endTime: '16:00',
      room: 'Conference Room',
      students: null,
      description: 'Monthly department meeting',
      status: 'scheduled'
    },
    {
      id: 6,
      title: 'Data Structures Lecture',
      type: 'lecture',
      class: 'CS301',
      date: '2024-09-18',
      startTime: '10:00',
      endTime: '11:30',
      room: 'CS-101',
      students: 45,
      description: 'AVL Trees and Rotations',
      status: 'scheduled'
    },
    {
      id: 7,
      title: 'Research Seminar',
      type: 'seminar',
      class: 'Research',
      date: '2024-09-18',
      startTime: '14:00',
      endTime: '15:30',
      room: 'Auditorium',
      students: null,
      description: 'Machine Learning in Computer Vision',
      status: 'scheduled'
    }
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return <BookOpen className="w-4 h-4" />
      case 'lab':
        return <Users className="w-4 h-4" />
      case 'office_hours':
        return <Coffee className="w-4 h-4" />
      case 'meeting':
        return <Video className="w-4 h-4" />
      case 'seminar':
        return <GraduationCap className="w-4 h-4" />
      default:
        return <CalendarIcon className="w-4 h-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const typeColors: { [key: string]: string } = {
      lecture: 'bg-blue-500',
      lab: 'bg-green-500',
      office_hours: 'bg-purple-500',
      meeting: 'bg-orange-500',
      seminar: 'bg-red-500'
    }
    
    return (
      <Badge variant="default" className={typeColors[type] || 'bg-gray-500'}>
        {type.replace('_', ' ').toUpperCase()}
      </Badge>
    )
  }

  const getScheduleForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    return schedule.filter(item => item.date === dateString)
  }

  const getWeekSchedule = () => {
    const today = new Date()
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
    const weekDays = []
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      weekDays.push({
        date: day,
        schedule: getScheduleForDate(day)
      })
    }
    
    return weekDays
  }

  const todaySchedule = getScheduleForDate(new Date())
  const weekSchedule = getWeekSchedule()

  const stats = {
    todayClasses: todaySchedule.filter(s => s.type === 'lecture' || s.type === 'lab').length,
    weeklyHours: schedule.reduce((total, item) => {
      const start = new Date(`2024-01-01 ${item.startTime}`)
      const end = new Date(`2024-01-01 ${item.endTime}`)
      return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    }, 0),
    totalStudents: schedule.reduce((total, item) => total + (item.students || 0), 0),
    upcomingEvents: schedule.filter(s => new Date(s.date) >= new Date()).length
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
                <h1 className="text-2xl sm:text-3xl font-bold">Schedule & Timetable</h1>
                <p className="text-muted-foreground">Manage your teaching schedule and appointments</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day View</SelectItem>
                    <SelectItem value="week">Week View</SelectItem>
                    <SelectItem value="month">Month View</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                      <DialogDescription>Schedule a new class, meeting, or event</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Event Title</label>
                          <Input placeholder="Enter event title" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Event Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lecture">Lecture</SelectItem>
                              <SelectItem value="lab">Lab Session</SelectItem>
                              <SelectItem value="office_hours">Office Hours</SelectItem>
                              <SelectItem value="meeting">Meeting</SelectItem>
                              <SelectItem value="seminar">Seminar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">Date</label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Start Time</label>
                          <Input type="time" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">End Time</label>
                          <Input type="time" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Room/Location</label>
                          <Input placeholder="Enter room number" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Class/Subject</label>
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
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea placeholder="Enter event description" rows={3} />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Create Event</Button>
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
                    <p className="text-sm font-medium text-muted-foreground">Today&apos;s Classes</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.todayClasses}</p>
                  </div>
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Weekly Hours</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.weeklyHours.toFixed(1)}</p>
                  </div>
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.totalStudents}</p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                    <p className="text-xl sm:text-2xl font-bold">{stats.upcomingEvents}</p>
                  </div>
                  <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>{format(new Date(), 'EEEE, MMMM d, yyyy')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.length > 0 ? (
                    todaySchedule.map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{event.title}</p>
                            {getTypeBadge(event.type)}
                          </div>
                          <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.startTime} - {event.endTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {event.room}
                            </div>
                            {event.students && (
                              <div className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {event.students} students
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No events scheduled for today</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next few scheduled events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule
                    .filter(event => new Date(event.date) >= new Date())
                    .slice(0, 5)
                    .map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{event.title}</p>
                          <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarIcon className="w-3 h-3 mr-1" />
                              {format(new Date(event.date), 'MMM d, yyyy')}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.startTime} - {event.endTime}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {event.room}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Week View */}
          {viewMode === 'week' && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Complete week overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4">
                  {weekSchedule.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="text-center">
                        <p className="font-medium">{format(day.date, 'EEE')}</p>
                        <p className="text-sm text-muted-foreground">{format(day.date, 'MMM d')}</p>
                      </div>
                      <div className="space-y-2">
                        {day.schedule.map((event) => (
                          <div key={event.id} className="p-2 bg-muted rounded text-xs">
                            <p className="font-medium truncate">{event.title}</p>
                            <p className="text-muted-foreground">{event.startTime}</p>
                            <p className="text-muted-foreground">{event.room}</p>
                          </div>
                        ))}
                        {day.schedule.length === 0 && (
                          <div className="p-2 text-center text-muted-foreground text-xs">
                            No events
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
