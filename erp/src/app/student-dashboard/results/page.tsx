'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trophy, TrendingUp, Download, BookOpen, Award, FileText } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function ResultsPage() {
  const [selectedSemester, setSelectedSemester] = useState('6')

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const semesterResults = [
    {
      semester: 6,
      subjects: [
        { code: 'CS301', name: 'Data Structures and Algorithms', credits: 4, grade: 'A', marks: 85, maxMarks: 100 },
        { code: 'CS302', name: 'Database Management Systems', credits: 4, grade: 'A+', marks: 92, maxMarks: 100 },
        { code: 'CS303', name: 'Computer Networks', credits: 3, grade: 'B+', marks: 78, maxMarks: 100 },
        { code: 'CS304', name: 'Software Engineering', credits: 3, grade: 'A', marks: 88, maxMarks: 100 },
        { code: 'CS305', name: 'Machine Learning', credits: 4, grade: 'A+', marks: 94, maxMarks: 100 }
      ],
      sgpa: 8.7,
      cgpa: 8.5,
      status: 'Pass',
      rank: 12
    },
    {
      semester: 5,
      subjects: [
        { code: 'CS201', name: 'Operating Systems', credits: 4, grade: 'A', marks: 82, maxMarks: 100 },
        { code: 'CS202', name: 'Computer Architecture', credits: 3, grade: 'B+', marks: 76, maxMarks: 100 },
        { code: 'CS203', name: 'Theory of Computation', credits: 3, grade: 'A+', marks: 91, maxMarks: 100 },
        { code: 'CS204', name: 'Compiler Design', credits: 4, grade: 'A', marks: 84, maxMarks: 100 },
        { code: 'CS205', name: 'Web Technologies', credits: 3, grade: 'A+', marks: 89, maxMarks: 100 }
      ],
      sgpa: 8.4,
      cgpa: 8.3,
      status: 'Pass',
      rank: 15
    }
  ]

  const overallStats = {
    totalCredits: 140,
    completedCredits: 122,
    overallCGPA: 8.5,
    totalSemesters: 6,
    completedSemesters: 5,
    currentRank: 12,
    totalStudents: 120
  }

  const gradePoints = {
    'A+': 10,
    'A': 9,
    'B+': 8,
    'B': 7,
    'C+': 6,
    'C': 5,
    'D': 4,
    'F': 0
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-blue-100 text-blue-800'
      case 'B+': return 'bg-yellow-100 text-yellow-800'
      case 'B': return 'bg-orange-100 text-orange-800'
      case 'C+': return 'bg-red-100 text-red-800'
      case 'C': return 'bg-red-200 text-red-900'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const currentSemesterData = semesterResults.find(s => s.semester.toString() === selectedSemester)

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar studentData={studentData} />
      
      <div className="transition-all duration-300 lg:ml-64">
        <div className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold">Academic Results</h1>
              <p className="text-muted-foreground mt-2">View your semester results and academic performance</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall CGPA</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.overallCGPA}</div>
                <p className="text-xs text-muted-foreground">Out of 10.0</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                <Award className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.currentRank}</div>
                <p className="text-xs text-muted-foreground">Out of {overallStats.totalStudents}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.completedCredits}</div>
                <p className="text-xs text-muted-foreground">Out of {overallStats.totalCredits}</p>
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

            <Tabs defaultValue="semester" className="space-y-6">
            <TabsList>
              <TabsTrigger value="semester">Semester Results</TabsTrigger>
              <TabsTrigger value="overall">Overall Performance</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="semester">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Semester Results</CardTitle>
                      <CardDescription>View results by semester</CardDescription>
                    </div>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesterResults.map((sem) => (
                          <SelectItem key={sem.semester} value={sem.semester.toString()}>
                            Semester {sem.semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {currentSemesterData && (
                    <div className="space-y-6">
                      {/* Semester Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">SGPA</p>
                          <p className="text-2xl font-bold">{currentSemesterData.sgpa}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">CGPA</p>
                          <p className="text-2xl font-bold">{currentSemesterData.cgpa}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Status</p>
                          <Badge className="bg-green-100 text-green-800">{currentSemesterData.status}</Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Rank</p>
                          <p className="text-2xl font-bold">{currentSemesterData.rank}</p>
                        </div>
                      </div>

                      {/* Subject Results */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Subject-wise Results</h3>
                        {currentSemesterData.subjects.map((subject, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium">{subject.name}</p>
                              <p className="text-sm text-gray-500">{subject.code} • {subject.credits} Credits</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <p className="font-medium">{subject.marks}/{subject.maxMarks}</p>
                                <p className="text-sm text-gray-500">{Math.round((subject.marks / subject.maxMarks) * 100)}%</p>
                              </div>
                              <Badge className={getGradeColor(subject.grade)}>
                                {subject.grade}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overall">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Progress</CardTitle>
                    <CardDescription>Your academic journey overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {semesterResults.map((semester) => (
                        <div key={semester.semester} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Semester {semester.semester}</p>
                            <p className="text-sm text-gray-500">{semester.subjects.length} Subjects</p>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-sm text-gray-500">SGPA</p>
                              <p className="font-bold">{semester.sgpa}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-500">CGPA</p>
                              <p className="font-bold">{semester.cgpa}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-500">Rank</p>
                              <p className="font-bold">{semester.rank}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">{semester.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>Detailed performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Grade Distribution</h4>
                        <div className="space-y-2">
                          {Object.entries(gradePoints).map(([grade]) => {
                            const count = semesterResults.flatMap(s => s.subjects).filter(sub => sub.grade === grade).length
                            return count > 0 ? (
                              <div key={grade} className="flex justify-between items-center">
                                <Badge className={getGradeColor(grade)}>{grade}</Badge>
                                <span className="text-sm">{count} subjects</span>
                              </div>
                            ) : null
                          })}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Academic Highlights</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Highest SGPA:</span>
                            <span className="font-medium">8.7</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Best Rank:</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">A+ Grades:</span>
                            <span className="font-medium">4</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transcript">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Official Transcript</CardTitle>
                      <CardDescription>Complete academic record</CardDescription>
                    </div>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Transcript
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600 mb-2">Official Transcript</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Complete academic record with all semester results, grades, and CGPA
                      </p>
                      <Button size="lg">
                        <Download className="h-4 w-4 mr-2" />
                        Generate & Download
                      </Button>
                    </div>
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
