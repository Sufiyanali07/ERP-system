'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, FileText, Image, Video, Archive, Search, Calendar, Filter } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const downloads = [
    {
      id: 1,
      name: 'Data Structures - Lecture Notes.pdf',
      type: 'pdf',
      size: '2.4 MB',
      downloadDate: '2024-02-10',
      category: 'academic',
      course: 'CS301',
      downloads: 1,
      icon: FileText
    },
    {
      id: 2,
      name: 'Semester 6 Timetable.pdf',
      type: 'pdf',
      size: '156 KB',
      downloadDate: '2024-02-09',
      category: 'schedule',
      course: 'General',
      downloads: 3,
      icon: FileText
    },
    {
      id: 3,
      name: 'Assignment 1 - Binary Trees.zip',
      type: 'zip',
      size: '890 KB',
      downloadDate: '2024-02-08',
      category: 'assignment',
      course: 'CS301',
      downloads: 1,
      icon: Archive
    },
    {
      id: 4,
      name: 'Database Lab Manual.pdf',
      type: 'pdf',
      size: '3.2 MB',
      downloadDate: '2024-02-07',
      category: 'lab',
      course: 'CS302',
      downloads: 2,
      icon: FileText
    },
    {
      id: 5,
      name: 'Network Protocols Video.mp4',
      type: 'mp4',
      size: '45.6 MB',
      downloadDate: '2024-02-06',
      category: 'video',
      course: 'CS303',
      downloads: 1,
      icon: Video
    },
    {
      id: 6,
      name: 'Fee Receipt - Semester 6.pdf',
      type: 'pdf',
      size: '245 KB',
      downloadDate: '2024-02-05',
      category: 'financial',
      course: 'General',
      downloads: 2,
      icon: FileText
    },
    {
      id: 7,
      name: 'Campus Map.jpg',
      type: 'jpg',
      size: '1.8 MB',
      downloadDate: '2024-02-04',
      category: 'general',
      course: 'General',
      downloads: 1,
      icon: Image
    },
    {
      id: 8,
      name: 'Exam Guidelines.pdf',
      type: 'pdf',
      size: '678 KB',
      downloadDate: '2024-02-03',
      category: 'exam',
      course: 'General',
      downloads: 4,
      icon: FileText
    }
  ]

  const availableDownloads = [
    {
      id: 9,
      name: 'Software Engineering - Project Guidelines',
      type: 'pdf',
      size: '1.2 MB',
      category: 'academic',
      course: 'CS304',
      uploadDate: '2024-02-11',
      icon: FileText
    },
    {
      id: 10,
      name: 'Machine Learning - Dataset',
      type: 'csv',
      size: '5.4 MB',
      category: 'dataset',
      course: 'CS305',
      uploadDate: '2024-02-10',
      icon: Archive
    },
    {
      id: 11,
      name: 'Academic Calendar 2024-25',
      type: 'pdf',
      size: '890 KB',
      category: 'schedule',
      course: 'General',
      uploadDate: '2024-02-09',
      icon: FileText
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800'
      case 'zip': return 'bg-yellow-100 text-yellow-800'
      case 'mp4': return 'bg-purple-100 text-purple-800'
      case 'jpg': return 'bg-green-100 text-green-800'
      case 'csv': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800'
      case 'assignment': return 'bg-orange-100 text-orange-800'
      case 'lab': return 'bg-purple-100 text-purple-800'
      case 'exam': return 'bg-red-100 text-red-800'
      case 'financial': return 'bg-green-100 text-green-800'
      case 'video': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = download.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || download.category === filterType
    return matchesSearch && matchesFilter
  })

  const totalSize = downloads.reduce((sum, download) => {
    const size = parseFloat(download.size.split(' ')[0])
    const unit = download.size.split(' ')[1]
    return sum + (unit === 'MB' ? size : size / 1024)
  }, 0)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar studentData={studentData} />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Downloads</h1>
            <p className="text-gray-600 mt-2">Access and manage your downloaded files and resources</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                <Download className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{downloads.length}</div>
                <p className="text-xs text-muted-foreground">Files downloaded</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Size</CardTitle>
                <Archive className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
                <p className="text-xs text-muted-foreground">Storage used</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Academic Files</CardTitle>
                <FileText className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {downloads.filter(d => d.category === 'academic').length}
                </div>
                <p className="text-xs text-muted-foreground">Course materials</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <Download className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableDownloads.length}</div>
                <p className="text-xs text-muted-foreground">New files</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="downloaded" className="space-y-6">
            <TabsList>
              <TabsTrigger value="downloaded">My Downloads</TabsTrigger>
              <TabsTrigger value="available">Available Files</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
            </TabsList>

            <TabsContent value="downloaded">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Downloaded Files</CardTitle>
                      <CardDescription>Files you have downloaded</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search files..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-64"
                        />
                      </div>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border rounded-md text-sm"
                      >
                        <option value="all">All Categories</option>
                        <option value="academic">Academic</option>
                        <option value="assignment">Assignment</option>
                        <option value="lab">Lab</option>
                        <option value="exam">Exam</option>
                        <option value="financial">Financial</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDownloads.map((download) => (
                      <div key={download.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <download.icon className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="font-medium">{download.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{download.size}</span>
                              <span>•</span>
                              <span>{download.course}</span>
                              <span>•</span>
                              <span>Downloaded {download.downloadDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getTypeColor(download.type)}>
                            {download.type.toUpperCase()}
                          </Badge>
                          <Badge className={getCategoryColor(download.category)}>
                            {download.category.charAt(0).toUpperCase() + download.category.slice(1)}
                          </Badge>
                          <div className="text-sm text-gray-500">
                            {download.downloads}x
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="available">
              <Card>
                <CardHeader>
                  <CardTitle>Available Downloads</CardTitle>
                  <CardDescription>New files available for download</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableDownloads.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <file.icon className="h-8 w-8 text-green-500" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{file.course}</span>
                              <span>•</span>
                              <span>Uploaded {file.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getTypeColor(file.type)}>
                            {file.type.toUpperCase()}
                          </Badge>
                          <Badge className={getCategoryColor(file.category)}>
                            {file.category.charAt(0).toUpperCase() + file.category.slice(1)}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">New</Badge>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid gap-6">
                {['academic', 'assignment', 'lab', 'exam', 'financial'].map((category) => {
                  const categoryFiles = downloads.filter(d => d.category === category)
                  if (categoryFiles.length === 0) return null
                  
                  return (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle className="capitalize">{category} Files</CardTitle>
                        <CardDescription>{categoryFiles.length} files in this category</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categoryFiles.map((file) => (
                            <div key={file.id} className="p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-start space-x-3">
                                <file.icon className="h-6 w-6 text-blue-500 mt-1" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{file.name}</p>
                                  <p className="text-xs text-gray-500 mt-1">{file.size} • {file.course}</p>
                                  <div className="flex justify-between items-center mt-2">
                                    <Badge className={getTypeColor(file.type)}>
                                      {file.type.toUpperCase()}
                                    </Badge>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
