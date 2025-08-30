'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Event {
  id: number
  title: string
  type: 'exam' | 'class' | 'assignment' | 'holiday' | 'event'
  date: string
  time?: string
  location?: string
  description?: string
}

export default function AcademicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: 'Data Structures Final Exam',
      type: 'exam',
      date: '2024-09-10',
      time: '10:00 AM - 1:00 PM',
      location: 'Hall A-101',
      description: 'Final examination for Data Structures course'
    },
    {
      id: 2,
      title: 'Database Systems Final Exam',
      type: 'exam',
      date: '2024-09-12',
      time: '2:00 PM - 5:00 PM',
      location: 'Hall B-205',
      description: 'Final examination for Database Systems course'
    },
    {
      id: 3,
      title: 'Computer Networks Lab',
      type: 'class',
      date: '2024-09-05',
      time: '9:00 AM - 12:00 PM',
      location: 'Lab 3',
      description: 'Practical session on network configuration'
    },
    {
      id: 4,
      title: 'Software Engineering Assignment',
      type: 'assignment',
      date: '2024-09-08',
      time: '11:59 PM',
      description: 'Submit UML diagrams and project documentation'
    },
    {
      id: 5,
      title: 'Independence Day',
      type: 'holiday',
      date: '2024-08-15',
      description: 'National holiday - College closed'
    },
    {
      id: 6,
      title: 'Tech Fest 2024',
      type: 'event',
      date: '2024-09-20',
      time: '9:00 AM - 6:00 PM',
      location: 'Main Auditorium',
      description: 'Annual technical festival with competitions and workshops'
    }
  ])

  const today = new Date()
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <BookOpen className="w-4 h-4" />
      case 'class':
        return <Users className="w-4 h-4" />
      case 'assignment':
        return <Clock className="w-4 h-4" />
      case 'holiday':
        return <Calendar className="w-4 h-4" />
      case 'event':
        return <Calendar className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'class':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'assignment':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'holiday':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'event':
        return 'text-purple-600 bg-purple-50 border-purple-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'exam':
        return 'destructive'
      case 'assignment':
        return 'secondary'
      case 'holiday':
        return 'default'
      default:
        return 'outline'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays > 0) return `in ${diffDays} days`
    return 'Past'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <CardTitle>Academic Calendar</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            View Full Calendar
          </Button>
        </div>
        <CardDescription>Upcoming events, exams, and important dates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No upcoming events</p>
            </div>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`p-4 border rounded-lg ${getEventColor(event.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={getBadgeVariant(event.type)} className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <span className="font-medium text-muted-foreground">
                      {getDaysUntil(event.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {upcomingEvents.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" className="w-full">
              View All Events
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
