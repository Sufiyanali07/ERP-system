import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, Star, Ticket, Music, Trophy } from "lucide-react"

const events = [
  {
    title: "Welcome Week",
    date: "August 25-31, 2024",
    time: "Various times",
    location: "Campus-wide",
    description: "A week-long orientation program designed to help new students transition to college life.",
    icon: Users,
    highlights: [
      "Campus tours and facility introductions",
      "Academic advising sessions",
      "Social mixers and icebreaker activities",
      "Club and organization fair",
      "Welcome barbecue and entertainment",
      "Residence hall community building"
    ],
    audience: "New Students & Families",
    registration: "Required for all new students"
  },
  {
    title: "Homecoming Weekend",
    date: "October 15-22, 2024",
    time: "All weekend",
    location: "Main Campus",
    description: "Annual celebration bringing together current students, alumni, and families.",
    icon: Trophy,
    highlights: [
      "Alumni reunion events",
      "Homecoming parade through campus",
      "Football game and tailgate party",
      "Class reunion dinners",
      "Campus tours for returning alumni",
      "Awards ceremony and recognition"
    ],
    audience: "Students, Alumni & Families",
    registration: "Open to all, some events ticketed"
  },
  {
    title: "Spring Arts Festival",
    date: "April 10-12, 2024",
    time: "10 AM - 8 PM daily",
    location: "Student Center & Quad",
    description: "Three-day celebration of arts, music, and cultural diversity on campus.",
    icon: Music,
    highlights: [
      "Student art exhibitions and galleries",
      "Live music performances and concerts",
      "Cultural food vendors and tastings",
      "Dance performances and workshops",
      "Poetry readings and literary events",
      "Hands-on art workshops and demos"
    ],
    audience: "Campus Community & Public",
    registration: "Free admission, workshops may require signup"
  },
  {
    title: "Commencement Ceremony",
    date: "May 20, 2024",
    time: "10 AM & 2 PM",
    location: "Memorial Stadium",
    description: "Graduation ceremony celebrating the achievements of our graduating class.",
    icon: Star,
    highlights: [
      "Keynote speaker presentation",
      "Degree conferral ceremonies",
      "Academic honors recognition",
      "Student speaker addresses",
      "Faculty processional",
      "Reception for graduates and families"
    ],
    audience: "Graduates & Families",
    registration: "Invitation required for graduates"
  }
]

const upcomingEvents = [
  {
    title: "Career Fair",
    date: "March 15, 2024",
    time: "10 AM - 4 PM",
    location: "Student Center Ballroom"
  },
  {
    title: "Research Symposium",
    date: "March 22, 2024", 
    time: "9 AM - 5 PM",
    location: "Academic Building"
  },
  {
    title: "International Night",
    date: "April 5, 2024",
    time: "6 PM - 9 PM", 
    location: "Campus Quad"
  },
  {
    title: "Finals Week Study Sessions",
    date: "May 6-10, 2024",
    time: "24/7",
    location: "Library"
  }
]

export default function CampusEventsPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Campus Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join us for exciting events throughout the academic year that build community and create lasting memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/campus-tour">Visit Campus</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-admissions">Get Information</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Event Statistics */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Annual Events</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Student Organizations</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <div className="text-muted-foreground">Student Participation</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <div className="text-muted-foreground">Months of Activities</div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Events */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Major Annual Events</h2>
            <div className="space-y-8">
              {events.map((event, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <CardHeader className="lg:col-span-2 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <event.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{event.title}</CardTitle>
                          <CardDescription className="text-base mt-1">{event.description}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Event Highlights</h4>
                          <ul className="space-y-2">
                            {event.highlights.map((highlight, highlightIndex) => (
                              <li key={highlightIndex} className="flex items-start text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium text-sm">Date</div>
                              <div className="text-sm text-muted-foreground">{event.date}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium text-sm">Time</div>
                              <div className="text-sm text-muted-foreground">{event.time}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium text-sm">Location</div>
                              <div className="text-sm text-muted-foreground">{event.location}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 bg-muted/30 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Target Audience</h4>
                          <p className="text-sm text-muted-foreground">{event.audience}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Registration</h4>
                          <p className="text-sm text-muted-foreground">{event.registration}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pt-6">
                        <Button asChild className="w-full">
                          <Link href="/contact-admissions">Get Details</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/campus-tour">Visit Campus</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-primary mr-2" />
                      <span className="text-sm font-medium text-primary">{event.date}</span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/register">
                        <Ticket className="w-4 h-4 mr-2" />
                        Register
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Be Part of Our Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join us for memorable events that connect you with fellow students, faculty, and the broader campus community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/campus-tour">Schedule Campus Tour</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
