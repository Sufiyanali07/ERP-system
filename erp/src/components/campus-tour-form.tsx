'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, User, Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function CampusTourForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        tourType: '',
        groupSize: '',
        interests: '',
        specialRequests: ''
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
            title: "Campus Tour Scheduled Successfully!",
            description: "We will send you a confirmation email with tour details shortly.",
        })
        setIsSubmitting(false)
        
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            preferredDate: '',
            preferredTime: '',
            tourType: '',
            groupSize: '',
            interests: '',
            specialRequests: ''
        })
    }

    return (
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
                        <h1 className="text-4xl font-bold">Schedule Campus Tour</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience NextCollege firsthand. Schedule a personalized campus tour to explore our facilities, meet faculty, and discover what makes our community special.
                    </p>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Campus Tour Request
                        </CardTitle>
                        <CardDescription>
                            Fill out the form below to schedule your personalized campus tour.
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
                            </div>

                            {/* Tour Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Tour Preferences
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="preferredDate">Preferred Date *</Label>
                                        <Input
                                            id="preferredDate"
                                            type="date"
                                            value={formData.preferredDate}
                                            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="preferredTime" className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            Preferred Time *
                                        </Label>
                                        <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select preferred time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="9:00-AM">9:00 AM</SelectItem>
                                                <SelectItem value="10:00-AM">10:00 AM</SelectItem>
                                                <SelectItem value="11:00-AM">11:00 AM</SelectItem>
                                                <SelectItem value="1:00-PM">1:00 PM</SelectItem>
                                                <SelectItem value="2:00-PM">2:00 PM</SelectItem>
                                                <SelectItem value="3:00-PM">3:00 PM</SelectItem>
                                                <SelectItem value="4:00-PM">4:00 PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tourType">Tour Type *</Label>
                                        <Select value={formData.tourType} onValueChange={(value) => handleInputChange('tourType', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select tour type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">General Campus Tour</SelectItem>
                                                <SelectItem value="academic">Academic Facilities Focus</SelectItem>
                                                <SelectItem value="residential">Residential Life Tour</SelectItem>
                                                <SelectItem value="athletics">Athletics & Recreation</SelectItem>
                                                <SelectItem value="virtual">Virtual Tour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="groupSize">Group Size *</Label>
                                        <Select value={formData.groupSize} onValueChange={(value) => handleInputChange('groupSize', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select group size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Just me</SelectItem>
                                                <SelectItem value="2">2 people</SelectItem>
                                                <SelectItem value="3-5">3-5 people</SelectItem>
                                                <SelectItem value="6-10">6-10 people</SelectItem>
                                                <SelectItem value="10+">More than 10 people</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Additional Information</h3>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="interests">
                                        Areas of Interest (Optional)
                                    </Label>
                                    <Textarea
                                        id="interests"
                                        placeholder="Tell us about specific programs, facilities, or aspects of campus life you'd like to learn more about..."
                                        className="min-h-[80px]"
                                        value={formData.interests}
                                        onChange={(e) => handleInputChange('interests', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specialRequests">
                                        Special Requests or Accessibility Needs (Optional)
                                    </Label>
                                    <Textarea
                                        id="specialRequests"
                                        placeholder="Let us know if you have any special requests or accessibility needs for your tour..."
                                        className="min-h-[80px]"
                                        value={formData.specialRequests}
                                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                                    />
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
                                    {isSubmitting ? 'Scheduling Tour...' : 'Schedule Campus Tour'}
                                </Button>
                                <p className="text-sm text-muted-foreground mt-2 text-center">
                                    We will contact you within 24 hours to confirm your tour details.
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
