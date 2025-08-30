'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trophy, TrendingUp, Download, BookOpen, Award, FileText, Calendar } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function CheckResultsPage() {
  const [selectedSemester, setSelectedSemester] = useState('6')

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const latestResults = {
    semester: 6,
    sgpa: 8.7,
    cgpa: 8.5,
    rank: 12,
    totalStudents: 120,
    subjects: [
      { code: 'CS301', name: 'Data Structures', credits: 4, grade: 'A', marks: 85 },
      { code: 'CS302', name: 'Database Systems', credits: 4, grade: 'A+', marks: 92 },
      { code: 'CS303', name: 'Computer Networks', credits: 3, grade: 'B+', marks: 78 },
      { code: 'CS304', name: 'Software Engineering', credits: 3, grade: 'A', marks: 88 },
      { code: 'CS305', name: 'Machine Learning', credits: 4, grade: 'A+', marks: 94 }
    ]
  }

  const semesterHistory = [
    { semester: 6, sgpa: 8.7, cgpa: 8.5, status: 'Current' },
    { semester: 5, sgpa: 8.4, cgpa: 8.3, status: 'Completed' },
    { semester: 4, sgpa: 8.2, cgpa: 8.1, status: 'Completed' },
    { semester: 3, sgpa: 7.9, cgpa: 7.8, status: 'Completed' },
    { semester: 2, sgpa: 8.0, cgpa: 7.9, status: 'Completed' },
    { semester: 1, sgpa: 7.8, cgpa: 7.8, status: 'Completed' }
  ]

  const upcomingResults = [
    { exam: 'Mid-Term Exam', subject: 'Machine Learning', date: '2024-02-20', status: 'Pending' },
    { exam: 'Assignment 3', subject: 'Software Engineering', date: '2024-02-18', status: 'Under Review' },
    { exam: 'Lab Test', subject: 'Database Systems', date: '2024-02-15', status: 'Evaluated' }
  ]

  const achievements = [
    { title: 'Dean\'s List', semester: 'Semester 5', description: 'SGPA above 8.5' },
    { title: 'Best Project Award', semester: 'Semester 4', description: 'Outstanding project in Web Development' },
    { title: 'Academic Excellence', semester: 'Semester 3', description: 'Top 10% of the class' }
  ]

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-blue-100 text-blue-800'
      case 'B+': return 'bg-yellow-100 text-yellow-800'
      case 'B': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-blue-100 text-blue-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Under Review': return 'bg-orange-100 text-orange-800'
      case 'Evaluated': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar studentData={studentData} />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Academic Results</h1>
                <p className="text-gray-600 mt-2">View your latest results and academic performance</p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestResults.cgpa}</div>
                <p className="text-xs text-muted-foreground">Out of 10.0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest SGPA</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestResults.sgpa}</div>
                <p className="text-xs text-muted-foreground">Semester {latestResults.semester}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                <Award className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{latestResults.rank}</div>
                <p className="text-xs text-muted-foreground">Out of {latestResults.totalStudents}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Excellent</div>
                <p className="text-xs text-muted-foreground">Top 10% of class</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="latest" className="space-y-6">
            <TabsList>
              <TabsTrigger value="latest">Latest Results</TabsTrigger>
              <TabsTrigger value="history">Academic History</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Results</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="latest">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Semester {latestResults.semester} Results</CardTitle>
                        <CardDescription>Your latest semester performance</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">SGPA: {latestResults.sgpa}</div>
                        <div className="text-lg text-gray-600">CGPA: {latestResults.cgpa}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {latestResults.subjects.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{subject.name}</p>
                            <p className="text-sm text-gray-500">{subject.code} • {subject.credits} Credits</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium">{subject.marks}/100</p>
                              <p className="text-sm text-gray-500">{subject.marks}%</p>
                            </div>
                            <Badge className={getGradeColor(subject.grade)}>
                              {subject.grade}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Total Credits:</span>
                          <span className="font-medium">{latestResults.subjects.reduce((sum, s) => sum + s.credits, 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Marks:</span>
                          <span className="font-medium">
                            {Math.round(latestResults.subjects.reduce((sum, s) => sum + s.marks, 0) / latestResults.subjects.length)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>A+ Grades:</span>
                          <span className="font-medium">{latestResults.subjects.filter(s => s.grade === 'A+').length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Class Rank:</span>
                          <span className="font-medium">{latestResults.rank}/{latestResults.totalStudents}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Download Marksheet
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          View Detailed Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Trophy className="h-4 w-4 mr-2" />
                          Compare with Previous
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Academic History</CardTitle>
                  <CardDescription>Your semester-wise academic performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {semesterHistory.map((sem) => (
                      <div key={sem.semester} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Semester {sem.semester}</p>
                          <Badge className={getStatusColor(sem.status)}>
                            {sem.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">SGPA</p>
                            <p className="font-bold">{sem.sgpa}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">CGPA</p>
                            <p className="font-bold">{sem.cgpa}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Results</CardTitle>
                  <CardDescription>Results that are being processed or awaited</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{result.exam}</p>
                          <p className="text-sm text-gray-500">{result.subject}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Expected</p>
                            <p className="font-medium">{result.date}</p>
                          </div>
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Achievements</CardTitle>
                  <CardDescription>Your notable academic accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Award className="h-6 w-6 text-yellow-500 mt-1" />
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <Badge variant="outline" className="mt-2">
                              {achievement.semester}
                            </Badge>
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
