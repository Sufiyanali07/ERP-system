'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, EyeOff, GraduationCap, Users, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('student')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        userType: 'student',
        studentId: '',
        program: '',
        yearOfStudy: '',
        employeeId: '',
        department: '',
        position: '',
        specialization: ''
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setFormData(prev => ({
            ...prev,
            userType: value
        }))
    }

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "Please ensure both password fields match.",
                variant: "destructive"
            })
            return false
        }
        
        if (formData.password.length < 8) {
            toast({
                title: "Password Too Short",
                description: "Password must be at least 8 characters long.",
                variant: "destructive"
            })
            return false
        }
        
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) return
        
        setIsLoading(true)
        
        try {
            // Real API call to backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    role: formData.userType === 'teacher' ? 'faculty' : formData.userType,
                    phone: formData.phone,
                    dateOfBirth: formData.dateOfBirth,
                    department: formData.department || formData.program,
                    course: formData.program,
                    designation: formData.position,
                    qualification: formData.specialization
                }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast({
                    title: "Account Created Successfully!",
                    description: `Welcome to NextCollege! Your ${formData.userType} account has been created.`,
                })
                
                router.push('/login')
            } else {
                // Signup failed - show error message
                toast({
                    title: "Signup Failed",
                    description: data.message || "Failed to create account. Please try again.",
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error('Signup error:', error)
            toast({
                title: "Signup Error",
                description: "Unable to connect to server. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="space-y-1">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4 self-start">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                    <CardDescription className="text-center">
                        Join NextCollege and start your educational journey
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="student" className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                Student
                            </TabsTrigger>
                            <TabsTrigger value="teacher" className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Teacher
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="student" className="space-y-4 mt-6">
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <GraduationCap className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold">Student Registration</h3>
                                <p className="text-sm text-muted-foreground">Join as a student to access courses and campus resources</p>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="teacher" className="space-y-4 mt-6">
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold">Faculty Registration</h3>
                                <p className="text-sm text-muted-foreground">Join as faculty to manage courses and students</p>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold border-b pb-2">Personal Information</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            className="pl-10"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Enter your last name"
                                            className="pl-10"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            className="pl-10"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {activeTab === 'student' && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold border-b pb-2">Student Information</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="studentId">Student ID (Optional)</Label>
                                        <Input
                                            id="studentId"
                                            type="text"
                                            placeholder="Enter your student ID"
                                            value={formData.studentId}
                                            onChange={(e) => handleInputChange('studentId', e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="yearOfStudy">Year of Study</Label>
                                        <Select value={formData.yearOfStudy} onValueChange={(value) => handleInputChange('yearOfStudy', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1st Year</SelectItem>
                                                <SelectItem value="2">2nd Year</SelectItem>
                                                <SelectItem value="3">3rd Year</SelectItem>
                                                <SelectItem value="4">4th Year</SelectItem>
                                                <SelectItem value="graduate">Graduate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="program">Program of Study</Label>
                                    <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="computer-science">Computer Science</SelectItem>
                                            <SelectItem value="business">Business Administration</SelectItem>
                                            <SelectItem value="engineering">Engineering</SelectItem>
                                            <SelectItem value="medicine">Medicine</SelectItem>
                                            <SelectItem value="arts">Liberal Arts</SelectItem>
                                            <SelectItem value="sciences">Natural Sciences</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {activeTab === 'teacher' && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold border-b pb-2">Faculty Information</h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="employeeId">Employee ID (Optional)</Label>
                                        <Input
                                            id="employeeId"
                                            type="text"
                                            placeholder="Enter your employee ID"
                                            value={formData.employeeId}
                                            onChange={(e) => handleInputChange('employeeId', e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="position">Position</Label>
                                        <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select position" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="professor">Professor</SelectItem>
                                                <SelectItem value="associate-professor">Associate Professor</SelectItem>
                                                <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
                                                <SelectItem value="lecturer">Lecturer</SelectItem>
                                                <SelectItem value="instructor">Instructor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="computer-science">Computer Science</SelectItem>
                                                <SelectItem value="business">Business</SelectItem>
                                                <SelectItem value="engineering">Engineering</SelectItem>
                                                <SelectItem value="medicine">Medicine</SelectItem>
                                                <SelectItem value="arts">Arts & Humanities</SelectItem>
                                                <SelectItem value="sciences">Natural Sciences</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="specialization">Specialization</Label>
                                        <Input
                                            id="specialization"
                                            type="text"
                                            placeholder="Enter your specialization"
                                            value={formData.specialization}
                                            onChange={(e) => handleInputChange('specialization', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold border-b pb-2">Security</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            className="pl-10 pr-10"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className="pl-10 pr-10"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full" 
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : `Create ${activeTab === 'student' ? 'Student' : 'Faculty'} Account`}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in here
                        </Link>
                    </div>

                    <div className="mt-4 text-center">
                        <Link href="/" className="text-sm text-muted-foreground hover:underline">
                            ← Back to Homepage
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
