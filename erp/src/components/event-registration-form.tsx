'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Calendar, Users, Mail, Phone } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const events = [
  { id: 'career-fair', name: 'Career Fair - March 15, 2024', category: 'Academic' },
  { id: 'research-symposium', name: 'Research Symposium - March 22, 2024', category: 'Academic' },
  { id: 'international-night', name: 'International Night - April 5, 2024', category: 'Cultural' },
  { id: 'finals-study', name: 'Finals Week Study Sessions - May 6-10, 2024', category: 'Academic' },
  { id: 'welcome-week', name: 'Welcome Week - August 25-31, 2024', category: 'Orientation' },
  { id: 'homecoming', name: 'Homecoming Weekend - October 15-22, 2024', category: 'Alumni' },
  { id: 'spring-arts', name: 'Spring Arts Festival - April 10-12, 2024', category: 'Cultural' },
  { id: 'commencement', name: 'Commencement Ceremony - May 20, 2024', category: 'Academic' }
]

export default function EventRegistrationForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        studentId: '',
        affiliation: '',
        eventId: '',
        attendeeCount: '1',
        dietaryRestrictions: '',
        specialNeeds: '',
        comments: ''
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        toast({
            title: "Registration Successful!",
            description: "You have been registered for the event. Check your email for confirmation details.",
        })
        setIsSubmitting(false)
        
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            studentId: '',
            affiliation: '',
            eventId: '',
            attendeeCount: '1',
            dietaryRestrictions: '',
            specialNeeds: '',
            comments: ''
        })
    }

    return (
        <div className="min-h-screen bg-background py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-4xl font-bold">Event Registration</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 text-center">
                    Register for upcoming campus events and activities. Join us for memorable experiences and community building.
                </p>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Registration Information */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Event Registration
                                </CardTitle>
                                <CardDescription>
                                    Choose from our upcoming events and register to participate
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <div>
                                        <div className="font-medium">Email Confirmation</div>
                                        <div className="text-sm text-muted-foreground">You&apos;ll receive confirmation details via email</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-primary" />
                                    <div>
                                        <div className="font-medium">Group Registration</div>
                                        <div className="text-sm text-muted-foreground">Register multiple attendees for group events</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-primary" />
                                    <div>
                                        <div className="font-medium">Event Support</div>
                                        <div className="text-sm text-muted-foreground">Contact us for any registration questions</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="/campus/events">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        View All Events
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="/campus">
                                        <Users className="w-4 h-4 mr-2" />
                                        Campus Life
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="/contact-admissions">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Contact Support
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Registration Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-primary" />
                                Registration Form
                            </CardTitle>
                            <CardDescription>
                                Please fill out all required information to complete your registration
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Personal Information</h3>
                                    
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
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Affiliation Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Affiliation</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="affiliation">Affiliation *</Label>
                                            <Select onValueChange={(value) => handleInputChange('affiliation', value)} required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your affiliation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="current-student">Current Student</SelectItem>
                                                    <SelectItem value="prospective-student">Prospective Student</SelectItem>
                                                    <SelectItem value="alumni">Alumni</SelectItem>
                                                    <SelectItem value="faculty">Faculty</SelectItem>
                                                    <SelectItem value="staff">Staff</SelectItem>
                                                    <SelectItem value="community">Community Member</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="studentId">Student ID (if applicable)</Label>
                                            <Input
                                                id="studentId"
                                                type="text"
                                                placeholder="Enter your student ID"
                                                value={formData.studentId}
                                                onChange={(e) => handleInputChange('studentId', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Event Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Event Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="eventId">Select Event *</Label>
                                            <Select onValueChange={(value) => handleInputChange('eventId', value)} required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose an event" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {events.map((event) => (
                                                        <SelectItem key={event.id} value={event.id}>
                                                            {event.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="attendeeCount">Number of Attendees</Label>
                                            <Select onValueChange={(value) => handleInputChange('attendeeCount', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select number of attendees" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 Person</SelectItem>
                                                    <SelectItem value="2">2 People</SelectItem>
                                                    <SelectItem value="3">3 People</SelectItem>
                                                    <SelectItem value="4">4 People</SelectItem>
                                                    <SelectItem value="5+">5+ People</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Additional Information</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                                            <Input
                                                id="dietaryRestrictions"
                                                type="text"
                                                placeholder="Any dietary restrictions or allergies"
                                                value={formData.dietaryRestrictions}
                                                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="specialNeeds">Special Accommodations</Label>
                                            <Input
                                                id="specialNeeds"
                                                type="text"
                                                placeholder="Any special accommodations needed"
                                                value={formData.specialNeeds}
                                                onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="comments">Additional Comments</Label>
                                            <Textarea
                                                id="comments"
                                                placeholder="Any additional information or questions..."
                                                className="min-h-[80px]"
                                                value={formData.comments}
                                                onChange={(e) => handleInputChange('comments', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button 
                                        type="submit" 
                                        className="w-full" 
                                        size="lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Registering...' : 'Register for Event'}
                                    </Button>
                                    <p className="text-sm text-muted-foreground mt-2 text-center">
                                        You will receive a confirmation email within 24 hours.
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
