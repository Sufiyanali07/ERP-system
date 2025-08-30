'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Calendar, AlertCircle, CheckCircle, Clock, Download } from 'lucide-react'
import StudentSidebar from '@/components/student-sidebar'

export default function FeesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const studentData = {
    name: 'John Doe',
    studentId: 'STU2024001',
    course: 'Computer Science Engineering',
    semester: 6
  }

  const feeStructure = [
    { item: 'Tuition Fee', amount: 45000, status: 'paid' },
    { item: 'Library Fee', amount: 2000, status: 'pending' },
    { item: 'Lab Fee', amount: 5000, status: 'paid' },
    { item: 'Examination Fee', amount: 3000, status: 'pending' },
    { item: 'Development Fee', amount: 8000, status: 'paid' },
    { item: 'Hostel Fee', amount: 25000, status: 'overdue' }
  ]

  const paymentHistory = [
    { date: '2024-01-15', description: 'Semester 6 - Tuition Fee', amount: 45000, status: 'Completed' },
    { date: '2024-01-10', description: 'Semester 6 - Lab Fee', amount: 5000, status: 'Completed' },
    { date: '2023-12-20', description: 'Semester 5 - Full Payment', amount: 88000, status: 'Completed' }
  ]

  const totalPending = feeStructure
    .filter(fee => fee.status === 'pending' || fee.status === 'overdue')
    .reduce((sum, fee) => sum + fee.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'overdue': return <AlertCircle className="h-4 w-4" />
      default: return null
    }
  }

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
              <h1 className="text-2xl sm:text-3xl font-bold">Fee Payment</h1>
              <p className="text-muted-foreground mt-2">Manage your fee payments and view payment history</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹{totalPending.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">2 pending payments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Semester {studentData.semester}</div>
                <p className="text-xs text-muted-foreground">Academic Year 2024-25</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Due Date</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 Days</div>
                <p className="text-xs text-muted-foreground">Next payment due</p>
              </CardContent>
            </Card>
          </div>

            {/* Fee Structure */}
            <Card className="mb-6 sm:mb-8">
              <CardHeader>
                <CardTitle>Fee Structure - Semester {studentData.semester}</CardTitle>
                <CardDescription>Current semester fee breakdown and payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feeStructure.map((fee, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(fee.status)}
                        <div>
                          <p className="font-medium">{fee.item}</p>
                          <p className="text-sm text-muted-foreground">₹{fee.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end space-x-3">
                        <Badge className={getStatusColor(fee.status)}>
                          {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                        </Badge>
                        {(fee.status === 'pending' || fee.status === 'overdue') && (
                          <Button size="sm" asChild>
                            <a href="/pay-now">Pay Now</a>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <p className="text-lg font-semibold">Total Pending Amount</p>
                    <p className="text-2xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
                  </div>
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <a href="/pay-now">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay All Pending
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent fee payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3">
                      <div className="text-left sm:text-right">
                        <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-green-600">{payment.status}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/student-dashboard/documents">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
