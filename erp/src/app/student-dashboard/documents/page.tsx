'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Download, Upload, Search, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function DocumentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const documents = [
    {
      id: 1,
      name: 'Admission Letter',
      type: 'PDF',
      size: '245 KB',
      uploadDate: '2024-01-15',
      status: 'verified',
      category: 'admission'
    },
    {
      id: 2,
      name: 'Fee Receipt - Semester 6',
      type: 'PDF',
      size: '156 KB',
      uploadDate: '2024-01-20',
      status: 'verified',
      category: 'financial'
    },
    {
      id: 3,
      name: 'ID Card Photo',
      type: 'JPG',
      size: '89 KB',
      uploadDate: '2024-01-10',
      status: 'pending',
      category: 'personal'
    },
    {
      id: 4,
      name: 'Medical Certificate',
      type: 'PDF',
      size: '198 KB',
      uploadDate: '2024-01-25',
      status: 'rejected',
      category: 'medical'
    },
    {
      id: 5,
      name: 'Transcript - Semester 5',
      type: 'PDF',
      size: '312 KB',
      uploadDate: '2023-12-15',
      status: 'verified',
      category: 'academic'
    }
  ]

  const requiredDocuments = [
    { name: 'Passport Size Photo', status: 'pending', deadline: '2024-02-15' },
    { name: 'Address Proof', status: 'missing', deadline: '2024-02-10' },
    { name: 'Parent Signature Form', status: 'submitted', deadline: '2024-02-20' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'missing': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'rejected': return <AlertTriangle className="h-4 w-4" />
      case 'submitted': return <CheckCircle className="h-4 w-4" />
      case 'missing': return <AlertTriangle className="h-4 w-4" />
      default: return null
    }
  }

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar 
        studentData={studentData} 
        onSidebarToggle={setSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
              <p className="text-muted-foreground mt-2">Manage your academic and personal documents</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documents.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {documents.filter(d => d.status === 'verified').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {documents.filter(d => d.status === 'pending').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Action Required</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {requiredDocuments.filter(d => d.status === 'missing').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="uploaded" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="uploaded" className="text-xs sm:text-sm">Uploaded</TabsTrigger>
              <TabsTrigger value="required" className="text-xs sm:text-sm">Required</TabsTrigger>
              <TabsTrigger value="upload" className="text-xs sm:text-sm">Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="uploaded">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Your Documents</CardTitle>
                      <CardDescription>All your uploaded documents and their verification status</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search documents..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8 w-64"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • {doc.size} • Uploaded on {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-3">
                          <Badge className={getStatusColor(doc.status)}>
                            {getStatusIcon(doc.status)}
                            <span className="ml-1">{doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}</span>
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => window.open('#', '_blank')}>
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

            <TabsContent value="required">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>Documents that need to be submitted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              Deadline: {doc.deadline}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </Badge>
                          {doc.status === 'missing' && (
                            <Button size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Document</CardTitle>
                  <CardDescription>Upload a new document to your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                    <Button onClick={() => document.getElementById('file-upload')?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          console.log('Files selected:', Array.from(files).map(f => f.name));
                          // Handle file upload logic here
                        }
                      }}
                    />
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
