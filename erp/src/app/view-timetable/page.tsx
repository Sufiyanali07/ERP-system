'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Clock, MapPin, User, Download, Printer, Share } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function ViewTimetablePage() {
  const [selectedWeek, setSelectedWeek] = useState('current')
  const [selectedView, setSelectedView] = useState('weekly')

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const weeklySchedule = {
    Monday: [
      { time: '9:00 AM', subject: 'Data Structures', type: 'Lecture', room: 'A-101', faculty: 'Dr. Smith' },
      { time: '10:00 AM', subject: 'Database Systems', type: 'Lecture', room: 'B-205', faculty: 'Prof. Johnson' },
      { time: '2:00 PM', subject: 'Computer Networks', type: 'Lab', room: 'Lab-1', faculty: 'Dr. Wilson' },
      { time: '3:00 PM', subject: 'Computer Networks', type: 'Lab', room: 'Lab-1', faculty: 'Dr. Wilson' }
    ],
    Tuesday: [
      { time: '9:00 AM', subject: 'Software Engineering', type: 'Lecture', room: 'C-301', faculty: 'Dr. Brown' },
      { time: '11:00 AM', subject: 'Machine Learning', type: 'Lecture', room: 'A-102', faculty: 'Prof. Davis' },
      { time: '2:00 PM', subject: 'Database Systems', type: 'Lab', room: 'Lab-2', faculty: 'Prof. Johnson' }
    ],
    Wednesday: [
      { time: '9:00 AM', subject: 'Data Structures', type: 'Lecture', room: 'A-101', faculty: 'Dr. Smith' },
      { time: '10:00 AM', subject: 'Operating Systems', type: 'Lecture', room: 'B-203', faculty: 'Dr. Miller' },
      { time: '1:00 PM', subject: 'Software Engineering', type: 'Tutorial', room: 'C-301', faculty: 'Dr. Brown' }
    ],
    Thursday: [
      { time: '9:00 AM', subject: 'Machine Learning', type: 'Lecture', room: 'A-102', faculty: 'Prof. Davis' },
      { time: '11:00 AM', subject: 'Computer Networks', type: 'Lecture', room: 'B-204', faculty: 'Dr. Wilson' },
      { time: '2:00 PM', subject: 'Data Structures', type: 'Lab', room: 'Lab-3', faculty: 'Dr. Smith' }
    ],
    Friday: [
      { time: '9:00 AM', subject: 'Operating Systems', type: 'Lecture', room: 'B-203', faculty: 'Dr. Miller' },
      { time: '10:00 AM', subject: 'Software Engineering', type: 'Lecture', room: 'C-301', faculty: 'Dr. Brown' },
      { time: '2:00 PM', subject: 'Machine Learning', type: 'Lab', room: 'Lab-4', faculty: 'Prof. Davis' }
    ]
  }

  const examSchedule = [
    { date: '2024-02-15', subject: 'Data Structures', time: '10:00 AM - 1:00 PM', room: 'Hall A', type: 'Mid-Term' },
    { date: '2024-02-18', subject: 'Database Systems', time: '2:00 PM - 5:00 PM', room: 'Hall B', type: 'End-Term' },
    { date: '2024-02-22', subject: 'Computer Networks', time: '9:00 AM - 12:00 PM', room: 'Hall C', type: 'Mid-Term' },
    { date: '2024-02-25', subject: 'Software Engineering', time: '10:00 AM - 1:00 PM', room: 'Hall A', type: 'End-Term' }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Lecture': return 'bg-blue-100 text-blue-800'
      case 'Lab': return 'bg-green-100 text-green-800'
      case 'Tutorial': return 'bg-purple-100 text-purple-800'
      case 'Mid-Term': return 'bg-orange-100 text-orange-800'
      case 'End-Term': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCurrentDayClasses = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    return weeklySchedule[today as keyof typeof weeklySchedule] || []
  }

  const todayClasses = getCurrentDayClasses()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar studentData={studentData} />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Class Timetable</h1>
                <p className="text-gray-600 mt-2">View your weekly schedule and upcoming classes</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today&apos;s Classes</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayClasses.length}</div>
                <p className="text-xs text-muted-foreground">Scheduled for today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
                <Clock className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Total class hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subjects</CardTitle>
                <User className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">Active subjects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2:00 PM</div>
                <p className="text-xs text-muted-foreground">Computer Networks</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="weekly" className="space-y-6">
            <TabsList>
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="daily">Today&apos;s Schedule</TabsTrigger>
              <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Weekly Timetable</CardTitle>
                      <CardDescription>Your complete weekly class schedule</CardDescription>
                    </div>
                    <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Week</SelectItem>
                        <SelectItem value="next">Next Week</SelectItem>
                        <SelectItem value="previous">Previous Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Time</th>
                          <th className="text-left p-3 font-medium">Monday</th>
                          <th className="text-left p-3 font-medium">Tuesday</th>
                          <th className="text-left p-3 font-medium">Wednesday</th>
                          <th className="text-left p-3 font-medium">Thursday</th>
                          <th className="text-left p-3 font-medium">Friday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timeSlots.map((time) => (
                          <tr key={time} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium text-gray-600">{time}</td>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
                              const daySchedule = weeklySchedule[day as keyof typeof weeklySchedule]
                              const classAtTime = daySchedule.find(cls => cls.time === time)
                              
                              return (
                                <td key={day} className="p-3">
                                  {classAtTime ? (
                                    <div className="p-2 rounded-lg border bg-white">
                                      <div className="flex justify-between items-start mb-1">
                                        <p className="font-medium text-sm">{classAtTime.subject}</p>
                                        <Badge className={getTypeColor(classAtTime.type)}>
                                          {classAtTime.type}
                                        </Badge>
                                      </div>
                                      <div className="text-xs text-gray-500 space-y-1">
                                        <div className="flex items-center">
                                          <MapPin className="h-3 w-3 mr-1" />
                                          {classAtTime.room}
                                        </div>
                                        <div className="flex items-center">
                                          <User className="h-3 w-3 mr-1" />
                                          {classAtTime.faculty}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="h-16"></div>
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Schedule</CardTitle>
                  <CardDescription>Your classes scheduled for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayClasses.length > 0 ? (
                      todayClasses.map((cls, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-lg">{cls.subject}</h3>
                              <p className="text-gray-600">{cls.faculty}</p>
                            </div>
                            <Badge className={getTypeColor(cls.type)}>
                              {cls.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {cls.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {cls.room}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No classes scheduled for today</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exams">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Schedule</CardTitle>
                  <CardDescription>Upcoming examination dates and timings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {examSchedule.map((exam, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{exam.subject}</h3>
                            <p className="text-gray-600">{exam.date}</p>
                          </div>
                          <Badge className={getTypeColor(exam.type)}>
                            {exam.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exam.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {exam.room}
                          </div>
                        </div>
                      </div>
                    ))}
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
