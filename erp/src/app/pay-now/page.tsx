'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import StudentSidebar from '@/components/student-sidebar'
import Link from 'next/link'
import { 
  CreditCard, 
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  User,
  Building,
  Lock
} from 'lucide-react'

export default function PayNowPage() {
  const [studentData] = useState({
    name: 'John Doe',
    studentId: 'ST2024001',
    email: 'john.doe@college.edu',
    department: 'Computer Science',
    semester: 6,
    course: 'B.Tech CSE'
  })

  const [selectedFees, setSelectedFees] = useState<number[]>([])
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)

  const [fees] = useState([
    {
      id: 1,
      type: 'Tuition Fee',
      amount: 50000,
      dueDate: '2024-09-15',
      status: 'pending',
      semester: 6,
      description: 'Semester 6 tuition fee'
    },
    {
      id: 2,
      type: 'Hostel Fee',
      amount: 25000,
      dueDate: '2024-09-20',
      status: 'pending',
      semester: 6,
      description: 'Hostel accommodation fee for semester 6'
    },
    {
      id: 3,
      type: 'Lab Fee',
      amount: 5000,
      dueDate: '2024-09-10',
      status: 'pending',
      semester: 6,
      description: 'Computer lab and equipment usage fee'
    },
    {
      id: 4,
      type: 'Exam Fee',
      amount: 3000,
      dueDate: '2024-09-05',
      status: 'pending',
      semester: 6,
      description: 'Final examination fee'
    }
  ])

  const pendingFees = fees.filter(fee => fee.status === 'pending')
  const totalAmount = selectedFees.reduce((sum, feeId) => {
    const fee = fees.find(f => f.id === feeId)
    return sum + (fee?.amount || 0)
  }, 0)

  const handleFeeSelection = (feeId: number, checked: boolean) => {
    if (checked) {
      setSelectedFees([...selectedFees, feeId])
    } else {
      setSelectedFees(selectedFees.filter(id => id !== feeId))
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert('Payment processed successfully!')
    }, 3000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>
      case 'overdue':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar studentData={studentData} />
      <div className="flex-1 lg:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/student-dashboard">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold">Fee Payment</h1>
                  <p className="text-muted-foreground">Pay your pending fees securely</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{studentData.studentId}</p>
                  <p className="text-sm text-muted-foreground">{studentData.course} - Semester {studentData.semester}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fee Selection */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Fees to Pay</CardTitle>
                  <CardDescription>Choose the fees you want to pay now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingFees.map((fee) => (
                      <div key={fee.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                        <input
                          type="checkbox"
                          id={`fee-${fee.id}`}
                          checked={selectedFees.includes(fee.id)}
                          onChange={(e) => handleFeeSelection(fee.id, e.target.checked)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor={`fee-${fee.id}`} className="font-medium cursor-pointer">
                                {fee.type}
                              </label>
                              <p className="text-sm text-muted-foreground">{fee.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₹{fee.amount.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            {getStatusBadge(fee.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment method</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center cursor-pointer">
                        <Building className="w-4 h-4 mr-2" />
                        UPI Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center cursor-pointer">
                        <Building className="w-4 h-4 mr-2" />
                        Net Banking
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" type="password" />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="mt-4">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" />
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="mt-4">
                      <Label htmlFor="bank">Select Bank</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">State Bank of India</SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                          <SelectItem value="pnb">Punjab National Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payment Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedFees.map(feeId => {
                      const fee = fees.find(f => f.id === feeId)
                      return fee ? (
                        <div key={fee.id} className="flex justify-between">
                          <span className="text-sm">{fee.type}</span>
                          <span className="font-medium">₹{fee.amount.toLocaleString()}</span>
                        </div>
                      ) : null
                    })}
                    
                    {selectedFees.length > 0 && (
                      <>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total Amount</span>
                          <span>₹{totalAmount.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-green-600">
                      <Lock className="w-4 h-4 mr-2" />
                      SSL Encrypted Payment
                    </div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      PCI DSS Compliant
                    </div>
                    <div className="flex items-center text-green-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Bank-level Security
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                className="w-full" 
                size="lg"
                disabled={selectedFees.length === 0 || isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? (
                  <>Processing Payment...</>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ₹{totalAmount.toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
