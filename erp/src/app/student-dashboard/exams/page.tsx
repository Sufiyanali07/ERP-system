'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, MapPin, BookOpen, AlertCircle, CheckCircle, Download } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const upcomingExams = [
    {
      id: 1,
      subject: 'Data Structures and Algorithms',
      code: 'CS301',
      date: '2024-02-15',
      time: '10:00 AM - 1:00 PM',
      venue: 'Hall A, Block 2',
      type: 'Mid-Term',
      status: 'scheduled',
      syllabus: 'Chapters 1-5'
    },
    {
      id: 2,
      subject: 'Database Management Systems',
      code: 'CS302',
      date: '2024-02-18',
      time: '2:00 PM - 5:00 PM',
      venue: 'Hall B, Block 1',
      type: 'End-Term',
      status: 'scheduled',
      syllabus: 'Full Syllabus'
    },
    {
      id: 3,
      subject: 'Computer Networks',
      code: 'CS303',
      date: '2024-02-22',
      time: '9:00 AM - 12:00 PM',
      venue: 'Hall C, Block 3',
      type: 'Mid-Term',
      status: 'scheduled',
      syllabus: 'Chapters 1-7'
    }
  ]

  const completedExams = [
    {
      id: 4,
      subject: 'Software Engineering',
      code: 'CS201',
      date: '2024-01-20',
      time: '10:00 AM - 1:00 PM',
      venue: 'Hall A, Block 2',
      type: 'Mid-Term',
      status: 'completed',
      marks: 85,
      maxMarks: 100
    },
    {
      id: 5,
      subject: 'Operating Systems',
      code: 'CS202',
      date: '2024-01-15',
      time: '2:00 PM - 5:00 PM',
      venue: 'Hall B, Block 1',
      type: 'End-Term',
      status: 'completed',
      marks: 78,
      maxMarks: 100
    }
  ]

  const examSchedule = [
    { time: '9:00 AM', subject: 'Computer Networks', venue: 'Hall C' },
    { time: '10:00 AM', subject: 'Data Structures', venue: 'Hall A' },
    { time: '2:00 PM', subject: 'DBMS', venue: 'Hall B' },
    { time: '3:00 PM', subject: 'Machine Learning', venue: 'Hall D' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'ongoing': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Mid-Term': return 'bg-orange-100 text-orange-800'
      case 'End-Term': return 'bg-purple-100 text-purple-800'
      case 'Quiz': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDaysUntilExam = (examDate: string) => {
    const today = new Date()
    const exam = new Date(examDate)
    const diffTime = exam.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar studentData={studentData} />
      
      <div className="transition-all duration-300 lg:ml-64">
        <div className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold">Exam Schedule</h1>
              <p className="text-muted-foreground mt-2">View your upcoming examinations and download hall tickets</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingExams.length}</div>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </CardContent>
              </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Exam</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getDaysUntilExam(upcomingExams[0]?.date)} Days
                </div>
                <p className="text-xs text-muted-foreground">{upcomingExams[0]?.subject}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedExams.length}</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <BookOpen className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">Overall performance</p>
              </CardContent>
            </Card>
            </div>

            {/* Exam Tabs */}
            <Tabs defaultValue="upcoming" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6">
                  {upcomingExams.map((exam) => (
                    <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <CardTitle className="text-lg sm:text-xl">{exam.subject}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                              {exam.code} • {exam.type}
                            </CardDescription>
                          </div>
                          <Badge variant={exam.status === 'scheduled' ? 'default' : 'secondary'}>
                            {exam.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{new Date(exam.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">{exam.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{exam.venue}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Syllabus Coverage</span>
                          </div>
                          <p className="text-sm text-blue-700">{exam.syllabus}</p>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <Button size="sm" variant="outline" className="w-full sm:w-auto">
                            <Download className="w-4 h-4 mr-2" />
                            Hall Ticket
                          </Button>
                          <Button size="sm" variant="outline" className="w-full sm:w-auto">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6">
                  {completedExams.map((exam) => (
                    <Card key={exam.id} className="opacity-75">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <CardTitle className="text-lg sm:text-xl">{exam.subject}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                              {exam.code} • {exam.type}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{new Date(exam.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">{exam.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{exam.venue}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exam Results</CardTitle>
                    <CardDescription>Your examination results will appear here once published</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No results available yet</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
