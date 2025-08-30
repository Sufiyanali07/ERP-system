'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, CheckCircle } from 'lucide-react'

interface ReceiptProps {
  receiptData: {
    transactionId: string
    studentName: string
    studentId: string
    feeType: string
    amount: number
    paymentDate: string
    semester: number
    academicYear: string
  }
}

export default function ReceiptGenerator({ receiptData }: ReceiptProps) {
  const handleDownload = () => {
    // Create receipt content
    const receiptContent = `
      NEXTCOLLEGE - OFFICIAL RECEIPT
      ================================
      
      Receipt No: ${receiptData.transactionId}
      Date: ${new Date(receiptData.paymentDate).toLocaleDateString()}
      
      Student Details:
      Name: ${receiptData.studentName}
      Student ID: ${receiptData.studentId}
      Semester: ${receiptData.semester}
      Academic Year: ${receiptData.academicYear}
      
      Payment Details:
      Fee Type: ${receiptData.feeType}
      Amount: ₹${receiptData.amount.toLocaleString()}
      Payment Status: PAID
      
      ================================
      This is a computer generated receipt.
      For queries, contact: accounts@nextcollege.edu
    `

    // Create and download file
    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Receipt_${receiptData.transactionId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-xl text-green-600">Payment Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Receipt No:</span>
            <span>{receiptData.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Student:</span>
            <span>{receiptData.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Student ID:</span>
            <span>{receiptData.studentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Fee Type:</span>
            <span>{receiptData.feeType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Amount:</span>
            <span className="text-lg font-bold">₹{receiptData.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>{new Date(receiptData.paymentDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <Badge variant="default" className="bg-green-500">PAID</Badge>
          </div>
        </div>
        
        <Button onClick={handleDownload} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download Receipt
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>This is a computer generated receipt.</p>
          <p>For queries, contact: accounts@nextcollege.edu</p>
        </div>
      </CardContent>
    </Card>
  )
}
