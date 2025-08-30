'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, User, MessageSquare, GraduationCap, ArrowLeft, MapPin, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function ContactAdmissionsForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        program: '',
        currentEducation: '',
        message: ''
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
            title: "Message Sent Successfully!",
            description: "Our admissions team will contact you within 24 hours.",
        })
        setIsSubmitting(false)
        
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            inquiryType: '',
            program: '',
            currentEducation: '',
            message: ''
        })
    }

    return (
        <section className="py-12 md:py-20 lg:py-32">
            <div className="mx-auto max-w-6xl px-6">
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
                        <h1 className="text-4xl font-bold">Contact Admissions</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions about NextCollege? Our admissions team is here to help you navigate your educational journey.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Get in Touch
                                </CardTitle>
                                <CardDescription>
                                    Multiple ways to connect with our admissions team
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-5 w-5 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                        <p className="text-sm text-muted-foreground">Monday - Friday, 8:00 AM - 6:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="h-5 w-5 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-muted-foreground">admissions@nextcollege.edu</p>
                                        <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="h-5 w-5 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Visit Us</h3>
                                        <p className="text-muted-foreground">123 College Avenue<br />University City, State 12345</p>
                                        <p className="text-sm text-muted-foreground">Admissions Office - Building A, Room 101</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="h-5 w-5 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Office Hours</h3>
                                        <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                                        <p className="text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</p>
                                        <p className="text-muted-foreground">Sunday: Closed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>
                                    Common admissions tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button asChild className="w-full justify-start">
                                    <a href="/apply">
                                        <GraduationCap className="h-4 w-4 mr-2" />
                                        Apply Now
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="/campus-tour">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        Schedule Campus Tour
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="/programs">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        View Programs
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Send Us a Message
                            </CardTitle>
                            <CardDescription>
                                Fill out the form below and we will get back to you soon.
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
                                                Phone Number
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+1 (555) 123-4567"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Inquiry Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Inquiry Details</h3>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                                        <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select inquiry type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Information</SelectItem>
                                                <SelectItem value="application">Application Process</SelectItem>
                                                <SelectItem value="programs">Academic Programs</SelectItem>
                                                <SelectItem value="financial-aid">Financial Aid</SelectItem>
                                                <SelectItem value="transfer">Transfer Credits</SelectItem>
                                                <SelectItem value="international">International Students</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="program">Program of Interest</Label>
                                            <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select program (optional)" />
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
                                                    <SelectItem value="undecided">Undecided</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="currentEducation">Current Education Level</Label>
                                            <Select value={formData.currentEducation} onValueChange={(value) => handleInputChange('currentEducation', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level (optional)" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="high-school">High School Student</SelectItem>
                                                    <SelectItem value="high-school-graduate">High School Graduate</SelectItem>
                                                    <SelectItem value="some-college">Some College</SelectItem>
                                                    <SelectItem value="associate">Associate Degree</SelectItem>
                                                    <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
                                                    <SelectItem value="graduate">Graduate Student</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message *</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Please tell us about your questions or what information you're looking for..."
                                        className="min-h-[120px]"
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <Button 
                                        type="submit" 
                                        size="lg" 
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                                    </Button>
                                    <p className="text-sm text-muted-foreground mt-2 text-center">
                                        We will respond to your inquiry within 24 hours.
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
