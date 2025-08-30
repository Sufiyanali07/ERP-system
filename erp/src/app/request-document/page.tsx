'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FileText, Clock, CheckCircle, AlertCircle, Download, Send } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function RequestDocumentPage() {
  const [selectedDocument, setSelectedDocument] = useState('')
  const [urgency, setUrgency] = useState('')
  const [purpose, setPurpose] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const documentTypes = [
    { value: 'transcript', label: 'Official Transcript', fee: 500, processingTime: '3-5 days' },
    { value: 'bonafide', label: 'Bonafide Certificate', fee: 100, processingTime: '1-2 days' },
    { value: 'character', label: 'Character Certificate', fee: 100, processingTime: '1-2 days' },
    { value: 'migration', label: 'Migration Certificate', fee: 1000, processingTime: '5-7 days' },
    { value: 'provisional', label: 'Provisional Certificate', fee: 300, processingTime: '2-3 days' },
    { value: 'duplicate', label: 'Duplicate Marksheet', fee: 200, processingTime: '3-4 days' },
    { value: 'noc', label: 'No Objection Certificate', fee: 150, processingTime: '2-3 days' },
    { value: 'conduct', label: 'Conduct Certificate', fee: 100, processingTime: '1-2 days' }
  ]

  const recentRequests = [
    {
      id: 1,
      type: 'Bonafide Certificate',
      requestDate: '2024-02-08',
      status: 'ready',
      urgency: 'normal',
      purpose: 'Bank loan application'
    },
    {
      id: 2,
      type: 'Official Transcript',
      requestDate: '2024-02-05',
      status: 'processing',
      urgency: 'urgent',
      purpose: 'University application'
    },
    {
      id: 3,
      type: 'Character Certificate',
      requestDate: '2024-02-01',
      status: 'completed',
      urgency: 'normal',
      purpose: 'Job application'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'ready': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'ready': return <Download className="h-4 w-4" />
      case 'processing': return <Clock className="h-4 w-4" />
      case 'pending': return <AlertCircle className="h-4 w-4" />
      default: return null
    }
  }

  const selectedDocumentInfo = documentTypes.find(doc => doc.value === selectedDocument)

  const handleSubmitRequest = () => {
    if (!selectedDocument || !urgency || !purpose) {
      alert('Please fill in all required fields')
      return
    }
    // Handle form submission
    alert('Document request submitted successfully!')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar studentData={studentData} />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Request Document</h1>
            <p className="text-gray-600 mt-2">Request official documents and certificates</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Request Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>New Document Request</CardTitle>
                  <CardDescription>Fill out the form to request a new document</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type *</Label>
                    <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((doc) => (
                          <SelectItem key={doc.value} value={doc.value}>
                            {doc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDocumentInfo && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{selectedDocumentInfo.label}</h4>
                        <Badge variant="outline">₹{selectedDocumentInfo.fee}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Processing Time: {selectedDocumentInfo.processingTime}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal (Standard processing)</SelectItem>
                        <SelectItem value="urgent">Urgent (+50% fee, faster processing)</SelectItem>
                        <SelectItem value="emergency">Emergency (+100% fee, same day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose *</Label>
                    <Input
                      id="purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="e.g., University application, Job application"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Any additional details or special requirements"
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Required Information</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Valid student ID</p>
                      <p>• Fee payment (online or offline)</p>
                      <p>• Processing time may vary based on document type</p>
                      <p>• Urgent requests require additional fees</p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSubmitRequest}
                    className="w-full"
                    disabled={!selectedDocument || !urgency || !purpose}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Requests & Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Track your document request status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{request.type}</p>
                            <p className="text-sm text-gray-500">Requested on {request.requestDate}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Purpose: {request.purpose}</p>
                        {request.status === 'ready' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Document Fees</CardTitle>
                  <CardDescription>Standard fees for different documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documentTypes.map((doc) => (
                      <div key={doc.value} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{doc.label}</p>
                          <p className="text-xs text-gray-500">{doc.processingTime}</p>
                        </div>
                        <Badge variant="outline">₹{doc.fee}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Important Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>• All fees are non-refundable</p>
                    <p>• Documents will be available for download once ready</p>
                    <p>• Physical copies can be collected from the office</p>
                    <p>• Urgent processing available for additional charges</p>
                    <p>• Contact office for any queries: +91-XXX-XXX-XXXX</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
