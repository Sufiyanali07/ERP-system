import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { MapPin, Home, Utensils, Dumbbell, Book, Music, Users, Calendar } from "lucide-react"

const facilities = [
  {
    title: "Student Housing",
    description: "Modern dormitories with all amenities",
    icon: Home,
    features: ["Wi-Fi enabled", "Study lounges", "24/7 security", "Laundry facilities"]
  },
  {
    title: "Dining Services",
    description: "Multiple dining options across campus",
    icon: Utensils,
    features: ["5 dining halls", "Food courts", "Healthy options", "Dietary accommodations"]
  },
  {
    title: "Fitness Center",
    description: "State-of-the-art gym and sports facilities",
    icon: Dumbbell,
    features: ["Modern equipment", "Group classes", "Swimming pool", "Sports courts"]
  },
  {
    title: "Library",
    description: "Extensive collection and study spaces",
    icon: Book,
    features: ["24/7 access", "Digital resources", "Group study rooms", "Research assistance"]
  },
  {
    title: "Student Center",
    description: "Hub for student activities and events",
    icon: Music,
    features: ["Event spaces", "Recreation areas", "Student services", "Meeting rooms"]
  },
  {
    title: "Campus Clubs",
    description: "Over 100 student organizations",
    icon: Users,
    features: ["Academic clubs", "Sports teams", "Cultural groups", "Leadership opportunities"]
  }
]

const events = [
  {
    title: "Welcome Week",
    date: "Aug 25-31",
    description: "Orientation activities for new students"
  },
  {
    title: "Homecoming",
    date: "Oct 15-22",
    description: "Alumni reunion and campus celebrations"
  },
  {
    title: "Spring Festival",
    date: "Apr 10-12",
    description: "Arts, music, and cultural showcase"
  },
  {
    title: "Graduation",
    date: "May 20",
    description: "Commencement ceremony for graduates"
  }
]

export default function CampusPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Campus Life
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience vibrant campus life at NextCollege with world-class facilities, diverse activities, and a supportive community.
            </p>
            <Button asChild size="lg">
              <Link href="#facilities">Explore Campus</Link>
            </Button>
          </div>
        </section>

        {/* Campus Facilities */}
        <section id="facilities" className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Campus Facilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <facility.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{facility.title}</CardTitle>
                    <CardDescription>{facility.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {facility.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Events */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-primary mr-2" />
                      <span className="text-sm font-medium text-primary">{event.date}</span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/campus/events">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Tour CTA */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Experience Our Campus
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See what makes NextCollege special with a personalized campus tour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/campus-tour">Schedule Campus Tour</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#virtual">Virtual Tour</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Student Life Stats */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Campus by the Numbers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
                <div className="text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Student Organizations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">25</div>
                <div className="text-muted-foreground">Sports Teams</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Student Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
