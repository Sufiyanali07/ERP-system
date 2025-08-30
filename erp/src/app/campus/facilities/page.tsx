import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { Home, Utensils, Dumbbell, Book, Music, Users, MapPin, Clock, Star, CheckCircle } from "lucide-react"

const facilities = [
  {
    title: "Student Housing",
    description: "Modern dormitories and apartments designed for comfortable campus living",
    icon: Home,
    features: [
      "High-speed Wi-Fi throughout all buildings",
      "Comfortable study lounges on every floor",
      "24/7 security with keycard access",
      "On-site laundry facilities",
      "Common kitchens and social areas",
      "Maintenance support available"
    ],
    details: {
      capacity: "3,500 students",
      buildings: "12 residence halls",
      amenities: "Fully furnished rooms, meal plans available"
    }
  },
  {
    title: "Dining Services",
    description: "Diverse dining options to satisfy every taste and dietary need",
    icon: Utensils,
    features: [
      "5 full-service dining halls",
      "Multiple food courts and cafes",
      "Healthy and organic options",
      "Dietary accommodations available",
      "Late-night dining options",
      "Catering services for events"
    ],
    details: {
      capacity: "Serves 15,000+ daily",
      locations: "20+ dining locations",
      amenities: "Meal plans, grab-and-go options"
    }
  },
  {
    title: "Fitness Center",
    description: "State-of-the-art fitness facilities for all skill levels",
    icon: Dumbbell,
    features: [
      "Modern cardio and weight equipment",
      "Group fitness classes daily",
      "Olympic-size swimming pool",
      "Basketball and racquetball courts",
      "Rock climbing wall",
      "Personal training available"
    ],
    details: {
      capacity: "50,000 sq ft facility",
      hours: "5 AM - 11 PM daily",
      amenities: "Locker rooms, equipment rental"
    }
  },
  {
    title: "Library",
    description: "Comprehensive academic resources and collaborative study spaces",
    icon: Book,
    features: [
      "24/7 access during academic year",
      "1M+ books and digital resources",
      "Individual and group study rooms",
      "Research assistance from librarians",
      "Computer labs and printing services",
      "Quiet and collaborative zones"
    ],
    details: {
      capacity: "2,000 study seats",
      collections: "1M+ books, 50K+ journals",
      amenities: "Cafe, presentation rooms"
    }
  },
  {
    title: "Student Center",
    description: "Central hub for student activities, services, and community building",
    icon: Music,
    features: [
      "Large event and conference spaces",
      "Recreation and game areas",
      "Student government offices",
      "Meeting rooms for organizations",
      "Food court and dining options",
      "Campus bookstore"
    ],
    details: {
      capacity: "200,000 sq ft building",
      events: "500+ events annually",
      amenities: "Theater, ballroom, lounges"
    }
  },
  {
    title: "Campus Organizations",
    description: "Over 100 student clubs and organizations for every interest",
    icon: Users,
    features: [
      "Academic and professional clubs",
      "Intramural and club sports teams",
      "Cultural and international groups",
      "Leadership development programs",
      "Community service opportunities",
      "Greek life organizations"
    ],
    details: {
      capacity: "100+ active organizations",
      participation: "80% student involvement",
      amenities: "Meeting spaces, event funding"
    }
  }
]

export default function CampusFacilitiesPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Campus Facilities
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our world-class facilities designed to support your academic success and campus life experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/campus-tour">Schedule Tour</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-admissions">Get Information</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Facilities Overview */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Award-Winning Campus</h3>
                <p className="text-muted-foreground">Recognized for outstanding facilities and sustainability</p>
              </div>
              <div className="p-6">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
                <p className="text-muted-foreground">Many facilities available around the clock</p>
              </div>
              <div className="p-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">15,000+ Students</h3>
                <p className="text-muted-foreground">Vibrant community with diverse opportunities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Facilities */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Our Facilities</h2>
            <div className="space-y-12">
              {facilities.map((facility, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <CardHeader className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <facility.icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{facility.title}</CardTitle>
                          <CardDescription className="text-base mt-1">{facility.description}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <div className="space-y-2">
                            {facility.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 bg-muted/30">
                      <h4 className="font-semibold mb-4">Facility Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium">Capacity</span>
                          <span className="text-sm text-muted-foreground">{facility.details.capacity}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium">
                            {facility.title === "Fitness Center" ? "Hours" : 
                             facility.title === "Library" ? "Collections" : 
                             facility.title === "Student Center" ? "Events" :
                             facility.title === "Campus Organizations" ? "Participation" : "Locations"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {facility.title === "Fitness Center" ? facility.details.hours : 
                             facility.title === "Library" ? facility.details.collections : 
                             facility.title === "Student Center" ? facility.details.events :
                             facility.title === "Campus Organizations" ? facility.details.participation : facility.details.locations}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm font-medium">Amenities</span>
                          <span className="text-sm text-muted-foreground">{facility.details.amenities}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-6">
                        <Button asChild className="flex-1">
                          <Link href="/campus-tour">Visit Facility</Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                          <Link href="/contact-admissions">Ask Questions</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Experience Our Campus
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See our facilities in person and discover why NextCollege is the perfect place for your educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/campus-tour">Schedule Campus Tour</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
