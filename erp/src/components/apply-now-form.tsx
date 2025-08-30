'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, User, GraduationCap, FileText, Calendar, ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function ApplyNowForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        program: '',
        previousEducation: '',
        personalStatement: '',
        emergencyContact: '',
        emergencyPhone: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        toast({
            title: "Application Submitted Successfully!",
            description: "We will contact you soon with next steps.",
        })
        setIsSubmitting(false)
        
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            program: '',
            previousEducation: '',
            personalStatement: '',
            emergencyContact: '',
            emergencyPhone: ''
        })
    }

    return (
        <>
            <section className="py-12 md:py-20 lg:py-32">
                <div className="mx-auto max-w-4xl px-6">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="mr-4"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        <h1 className="text-4xl font-bold">Apply to NextCollege</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Take the first step towards your future. Fill out the application form below to join our community of learners.
                    </p>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Student Application Form
                        </CardTitle>
                        <CardDescription>
                            Please fill out all required fields to complete your application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Personal Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Enter your last name"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your.email@example.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            Phone Number *
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth" className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Date of Birth *
                                    </Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4" />
                                    Academic Information
                                </h3>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="program">Desired Program *</Label>
                                    <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your desired program" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="computer-science">Computer Science</SelectItem>
                                            <SelectItem value="business-administration">Business Administration</SelectItem>
                                            <SelectItem value="engineering">Engineering</SelectItem>
                                            <SelectItem value="psychology">Psychology</SelectItem>
                                            <SelectItem value="biology">Biology</SelectItem>
                                            <SelectItem value="mathematics">Mathematics</SelectItem>
                                            <SelectItem value="english-literature">English Literature</SelectItem>
                                            <SelectItem value="art-design">Art & Design</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="previousEducation">Previous Education *</Label>
                                    <Select value={formData.previousEducation} onValueChange={(value) => handleInputChange('previousEducation', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your highest level of education" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high-school">High School Diploma</SelectItem>
                                            <SelectItem value="associate">Associate Degree</SelectItem>
                                            <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
                                            <SelectItem value="master">Master&apos;s Degree</SelectItem>
                                            <SelectItem value="doctorate">Doctorate</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Personal Statement */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Personal Statement
                                </h3>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="personalStatement">
                                        Tell us about yourself and why you want to join NextCollege *
                                    </Label>
                                    <Textarea
                                        id="personalStatement"
                                        placeholder="Share your goals, interests, and what motivates you to pursue higher education..."
                                        className="min-h-[120px]"
                                        value={formData.personalStatement}
                                        onChange={(e) => handleInputChange('personalStatement', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Emergency Contact</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                                        <Input
                                            id="emergencyContact"
                                            type="text"
                                            placeholder="Full name of emergency contact"
                                            value={formData.emergencyContact}
                                            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                                        <Input
                                            id="emergencyPhone"
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            value={formData.emergencyPhone}
                                            onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button 
                                    type="submit" 
                                    size="lg" 
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                                </Button>
                                <p className="text-sm text-muted-foreground mt-2 text-center">
                                    We&apos;ll review your application and get back to you within 5-7 business days.
                                </p>
                                <p className="text-sm text-muted-foreground mt-2 text-center">
                                    You&apos;ll receive an email confirmation shortly.
                                </p>
                                <p className="text-sm text-muted-foreground mt-2 text-center">
                                    By submitting this form, you agree to our terms and conditions.
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
        </>
    )
}
