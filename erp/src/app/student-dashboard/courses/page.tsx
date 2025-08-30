'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clock, Users, Calendar, Play, FileText, CheckCircle, Award } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function CoursesPage() {
  // const [selectedCourse, setSelectedCourse] = useState<string | null>(null) // Removed - not used

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const enrolledCourses = [
    {
      id: 1,
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      instructor: 'Dr. Sarah Wilson',
      credits: 4,
      progress: 75,
      status: 'ongoing',
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'Room 301, Block A',
      assignments: 3,
      completedAssignments: 2,
      nextClass: '2024-02-15 10:00 AM'
    },
    {
      id: 2,
      code: 'CS302',
      name: 'Database Management Systems',
      instructor: 'Prof. Michael Chen',
      credits: 4,
      progress: 60,
      status: 'ongoing',
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'Room 205, Block B',
      assignments: 4,
      completedAssignments: 2,
      nextClass: '2024-02-16 2:00 PM'
    },
    {
      id: 3,
      code: 'CS303',
      name: 'Computer Networks',
      instructor: 'Dr. Emily Rodriguez',
      credits: 3,
      progress: 80,
      status: 'ongoing',
      schedule: 'Mon, Wed - 11:00 AM',
      room: 'Room 102, Block C',
      assignments: 2,
      completedAssignments: 2,
      nextClass: '2024-02-17 11:00 AM'
    },
    {
      id: 4,
      code: 'CS304',
      name: 'Software Engineering',
      instructor: 'Prof. David Kumar',
      credits: 3,
      progress: 90,
      status: 'completed',
      schedule: 'Tue, Fri - 9:00 AM',
      room: 'Room 401, Block A',
      assignments: 5,
      completedAssignments: 5,
      grade: 'A'
    }
  ]

  const courseResources = [
    { type: 'Lecture Notes', count: 12, icon: FileText },
    { type: 'Assignments', count: 8, icon: BookOpen },
    { type: 'Video Lectures', count: 15, icon: Play },
    { type: 'Practice Tests', count: 5, icon: CheckCircle }
  ]

  const upcomingClasses = [
    { course: 'Data Structures', time: '10:00 AM', room: 'Room 301', type: 'Lecture' },
    { course: 'DBMS', time: '2:00 PM', room: 'Room 205', type: 'Lab' },
    { course: 'Networks', time: '11:00 AM', room: 'Room 102', type: 'Tutorial' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // const getProgressColor = (progress: number) => {
  //   if (progress >= 80) return 'text-green-500'
  //   if (progress >= 60) return 'text-yellow-500'
  //   return 'text-red-500'
  // } // Removed - not used

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar studentData={studentData} />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">Track your enrolled courses and academic progress</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                <Award className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {enrolledCourses.reduce((sum, course) => sum + course.credits, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Credit hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)}%
                </div>
                <p className="text-xs text-muted-foreground">Course completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <FileText className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {enrolledCourses.reduce((sum, course) => sum + course.completedAssignments, 0)}/
                  {enrolledCourses.reduce((sum, course) => sum + course.assignments, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="enrolled" className="space-y-6">
            <TabsList>
              <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
              <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
              <TabsTrigger value="resources">Course Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled">
              <div className="grid gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{course.name}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            {course.code} • {course.instructor} • {course.credits} Credits
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(course.status)}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </Badge>
                          {course.grade && (
                            <Badge className="bg-green-100 text-green-800">
                              Grade: {course.grade}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Course Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        {/* Course Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">{course.schedule}</p>
                              <p className="text-xs text-gray-500">{course.room}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">
                                {course.completedAssignments}/{course.assignments} Assignments
                              </p>
                              <p className="text-xs text-gray-500">Completed</p>
                            </div>
                          </div>
                          {course.nextClass && (
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="font-medium text-sm">Next Class</p>
                                <p className="text-xs text-gray-500">{course.nextClass}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Course Materials
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4 mr-1" />
                            Classmates
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Assignments
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingClasses.map((class_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 text-center">
                            <p className="font-medium">{class_.time}</p>
                          </div>
                          <div>
                            <p className="font-medium">{class_.course}</p>
                            <p className="text-sm text-gray-500">{class_.room} • {class_.type}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{class_.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseResources.map((resource, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <resource.icon className="h-6 w-6 text-blue-500" />
                        <div>
                          <CardTitle className="text-lg">{resource.type}</CardTitle>
                          <CardDescription>{resource.count} items available</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        Access {resource.type}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
