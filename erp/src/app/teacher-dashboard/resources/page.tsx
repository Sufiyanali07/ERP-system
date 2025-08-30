'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FacultySidebar from '@/components/faculty-sidebar'
import { 
  Upload,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Share,
  BookOpen,
  FileText,
  Video,
  Image,
  File,
  Link,
  Folder,
  Star,
  Clock
} from 'lucide-react'

export default function ResourcesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterClass, setFilterClass] = useState('all')
  const [activeTab, setActiveTab] = useState('my-resources')

  const facultyData = {
    name: 'Dr. Sarah Wilson',
    employeeId: 'FAC2024032',
    email: 'sarah.wilson@college.edu',
    department: 'Computer Science',
    designation: 'Associate Professor'
  }

  const [resources] = useState([
    {
      id: 1,
      title: 'Binary Search Trees - Lecture Slides',
      description: 'Comprehensive slides covering BST operations, complexity analysis, and implementation examples',
      type: 'presentation',
      class: 'Data Structures',
      classCode: 'CS301',
      fileType: 'pptx',
      fileSize: '2.5 MB',
      uploadDate: '2024-09-10',
      downloads: 45,
      shared: true,
      starred: true,
      tags: ['algorithms', 'trees', 'data-structures']
    },
    {
      id: 2,
      title: 'Database Normalization Tutorial',
      description: 'Step-by-step guide to database normalization with practical examples',
      type: 'document',
      class: 'Database Systems',
      classCode: 'CS401',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      uploadDate: '2024-09-08',
      downloads: 38,
      shared: true,
      starred: false,
      tags: ['database', 'normalization', 'sql']
    },
    {
      id: 3,
      title: 'Software Design Patterns Video Series',
      description: 'Video lectures explaining common design patterns with code examples',
      type: 'video',
      class: 'Software Engineering',
      classCode: 'CS501',
      fileType: 'mp4',
      fileSize: '156 MB',
      uploadDate: '2024-09-12',
      downloads: 32,
      shared: true,
      starred: true,
      tags: ['design-patterns', 'software-engineering', 'oop']
    },
    {
      id: 4,
      title: 'Algorithm Complexity Cheat Sheet',
      description: 'Quick reference for Big O notation and algorithm complexity analysis',
      type: 'document',
      class: 'Data Structures',
      classCode: 'CS301',
      fileType: 'pdf',
      fileSize: '0.5 MB',
      uploadDate: '2024-09-05',
      downloads: 67,
      shared: true,
      starred: false,
      tags: ['algorithms', 'complexity', 'big-o']
    },
    {
      id: 5,
      title: 'Java Programming Examples',
      description: 'Collection of Java code examples for various programming concepts',
      type: 'code',
      class: 'Programming Fundamentals',
      classCode: 'CS101',
      fileType: 'zip',
      fileSize: '3.2 MB',
      uploadDate: '2024-09-01',
      downloads: 89,
      shared: true,
      starred: true,
      tags: ['java', 'programming', 'examples']
    },
    {
      id: 6,
      title: 'Network Protocol Diagrams',
      description: 'Visual diagrams explaining TCP/IP, HTTP, and other network protocols',
      type: 'image',
      class: 'Computer Networks',
      classCode: 'CS402',
      fileType: 'png',
      fileSize: '4.1 MB',
      uploadDate: '2024-08-28',
      downloads: 43,
      shared: false,
      starred: false,
      tags: ['networking', 'protocols', 'diagrams']
    }
  ])

  const [folders] = useState([
    {
      id: 1,
      name: 'Data Structures Materials',
      description: 'All resources for CS301 course',
      resourceCount: 12,
      lastModified: '2024-09-15',
      shared: true
    },
    {
      id: 2,
      name: 'Database Systems',
      description: 'CS401 course materials and assignments',
      resourceCount: 8,
      lastModified: '2024-09-12',
      shared: true
    },
    {
      id: 3,
      name: 'Research Papers',
      description: 'Collection of relevant research papers',
      resourceCount: 25,
      lastModified: '2024-09-10',
      shared: false
    }
  ])

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType === 'all' || resource.type === filterType
    const matchesClass = filterClass === 'all' || resource.classCode === filterClass
    return matchesSearch && matchesType && matchesClass
  })

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-red-500" />
      case 'ppt':
      case 'pptx':
        return <FileText className="w-5 h-5 text-orange-500" />
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Video className="w-5 h-5 text-purple-500" />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-5 h-5 text-green-500" />
      case 'zip':
      case 'rar':
        return <File className="w-5 h-5 text-blue-500" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    const typeColors: { [key: string]: string } = {
      document: 'bg-blue-500',
      presentation: 'bg-orange-500',
      video: 'bg-purple-500',
      image: 'bg-green-500',
      code: 'bg-gray-500',
      link: 'bg-cyan-500'
    }
    
    return (
      <Badge variant="default" className={typeColors[type] || 'bg-gray-500'}>
        {type.toUpperCase()}
      </Badge>
    )
  }

  const formatFileSize = (sizeStr: string) => {
    return sizeStr
  }

  const stats = {
    totalResources: resources.length,
    sharedResources: resources.filter(r => r.shared).length,
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0),
    starredResources: resources.filter(r => r.starred).length
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
                <h1 className="text-2xl sm:text-3xl font-bold">Resources</h1>
                <p className="text-muted-foreground">Manage and share educational resources with students</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Resource
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Upload New Resource</DialogTitle>
                    <DialogDescription>Add a new educational resource for your students</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Resource Title</label>
                      <Input placeholder="Enter resource title" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Describe the resource content" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                      <div>
                        <label className="text-sm font-medium">Resource Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="presentation">Presentation</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="code">Code</SelectItem>
                            <SelectItem value="link">Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tags (comma separated)</label>
                      <Input placeholder="e.g., algorithms, data-structures, programming" />
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                      <Button variant="outline" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="share" />
                      <label htmlFor="share" className="text-sm">Share with students immediately</label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Upload Resource</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                    <p className="text-2xl font-bold">{stats.totalResources}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Shared Resources</p>
                    <p className="text-2xl font-bold">{stats.sharedResources}</p>
                  </div>
                  <Share className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                    <p className="text-2xl font-bold">{stats.totalDownloads}</p>
                  </div>
                  <Download className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Starred</p>
                    <p className="text-2xl font-bold">{stats.starredResources}</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
              <TabsTrigger value="my-resources">My Resources</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
              <TabsTrigger value="shared">Shared Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="my-resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Library</CardTitle>
                  <CardDescription>Manage your educational resources and materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search resources..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="document">Documents</SelectItem>
                        <SelectItem value="presentation">Presentations</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="image">Images</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterClass} onValueChange={setFilterClass}>
                      <SelectTrigger className="w-full sm:w-48">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="CS301">Data Structures</SelectItem>
                        <SelectItem value="CS401">Database Systems</SelectItem>
                        <SelectItem value="CS501">Software Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(resource.fileType)}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{resource.title}</h4>
                                <p className="text-xs text-muted-foreground">{resource.class}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {resource.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                              {resource.shared && <Share className="w-4 h-4 text-green-500" />}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {resource.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-3">
                            {getTypeBadge(resource.type)}
                            <span className="text-xs text-muted-foreground">{formatFileSize(resource.fileSize)}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {resource.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {resource.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{resource.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              {resource.downloads} downloads
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(resource.uploadDate).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="w-full sm:w-auto">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="w-full sm:w-auto">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="folders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Folders</CardTitle>
                  <CardDescription>Organize your resources into folders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {folders.map((folder) => (
                      <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Folder className="w-6 h-6 text-blue-500" />
                              <div>
                                <h4 className="font-medium">{folder.name}</h4>
                                <p className="text-xs text-muted-foreground">{folder.resourceCount} resources</p>
                              </div>
                            </div>
                            {folder.shared && <Share className="w-4 h-4 text-green-500" />}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {folder.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Last modified: {new Date(folder.lastModified).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shared" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shared Resources</CardTitle>
                  <CardDescription>Resources shared with students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resources.filter(r => r.shared).map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(resource.fileType)}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{resource.title}</h4>
                                <p className="text-xs text-muted-foreground">{resource.class}</p>
                              </div>
                            </div>
                            <Badge variant="default" className="bg-green-500">Shared</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {resource.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              {resource.downloads} downloads
                            </div>
                            <span>{formatFileSize(resource.fileSize)}</span>
                          </div>
                        </CardContent>
                      </Card>
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
