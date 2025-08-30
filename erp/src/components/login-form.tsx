'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, GraduationCap, Users, Mail, Lock, ArrowLeft, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('student')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: 'student'
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            // Real API call to backend
            const response = await fetch('https://erp-system-rose.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                // Store authentication data
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('refreshToken', data.data.refreshToken)
                localStorage.setItem('user', JSON.stringify(data.data.user))
                localStorage.setItem('profile', JSON.stringify(data.data.profile))

                toast({
                    title: "Login Successful!",
                    description: `Welcome back, ${data.data.user.firstName}!`,
                })

                // Redirect based on user role
                const userRole = data.data.user.role
                if (userRole === 'admin') {
                    router.push('/admin-dashboard')
                } else if (userRole === 'student') {
                    router.push('/student-dashboard')
                } else if (userRole === 'faculty') {
                    router.push('/teacher-dashboard')
                }
            } else {
                // Login failed - show error message
                toast({
                    title: "Login Failed",
                    description: data.message || "Invalid email or password. Please check your credentials.",
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error('Login error:', error)
            toast({
                title: "Login Error",
                description: "Unable to connect to server. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4 self-start">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                    <CardDescription className="text-center">
                        Sign in to your NextCollege account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="student" className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                Student
                            </TabsTrigger>
                            <TabsTrigger value="teacher" className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Teacher
                            </TabsTrigger>
                            <TabsTrigger value="admin" className="flex items-center gap-2">
                                <Settings className="w-4 h-4" />
                                Admin
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="student" className="space-y-4 mt-6">
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <GraduationCap className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold">Student Portal</h3>
                                <p className="text-sm text-muted-foreground">Access your courses, grades, and campus resources</p>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="teacher" className="space-y-4 mt-6">
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold">Faculty Portal</h3>
                                <p className="text-sm text-muted-foreground">Manage courses, students, and academic resources</p>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="admin" className="space-y-4 mt-6">
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Settings className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-semibold">Admin Portal</h3>
                                <p className="text-sm text-muted-foreground">System administration and management</p>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
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

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link href="/forgot-password" className="text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full" 
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : `Sign In as ${activeTab === 'student' ? 'Student' : activeTab === 'teacher' ? 'Teacher' : 'Admin'}`}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Don&apos;t have an account? </span>
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                            Sign up here
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
