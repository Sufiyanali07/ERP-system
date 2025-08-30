import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { Globe, Users, Award, BookOpen, MapPin, ExternalLink, GraduationCap, Building } from "lucide-react"

const partnerUniversities = [
  {
    name: "Stanford University",
    location: "California, USA",
    logo: "🎓",
    description: "Leading research university known for innovation and entrepreneurship",
    programs: ["Computer Science", "Business", "Engineering", "Medicine"],
    partnership: "Student Exchange, Joint Research, Dual Degrees",
    established: "2018",
    students: "500+ exchanges annually"
  },
  {
    name: "University of Oxford",
    location: "Oxford, UK", 
    logo: "🏛️",
    description: "World's oldest English-speaking university with exceptional academic tradition",
    programs: ["Liberal Arts", "Philosophy", "History", "Literature"],
    partnership: "Study Abroad, Research Collaboration, Faculty Exchange",
    established: "2019",
    students: "200+ exchanges annually"
  },
  {
    name: "University of Tokyo",
    location: "Tokyo, Japan",
    logo: "🌸",
    description: "Premier research university in Asia with cutting-edge technology programs",
    programs: ["Engineering", "Technology", "Sciences", "International Studies"],
    partnership: "Research Projects, Student Exchange, Joint Degrees",
    established: "2020",
    students: "300+ exchanges annually"
  },
  {
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    logo: "⚡",
    description: "Leading science and technology university with world-class research facilities",
    programs: ["Engineering", "Computer Science", "Mathematics", "Physics"],
    partnership: "Research Collaboration, PhD Programs, Faculty Exchange",
    established: "2017",
    students: "150+ exchanges annually"
  },
  {
    name: "University of Melbourne",
    location: "Melbourne, Australia",
    logo: "🦘",
    description: "Top-ranked Australian university with strong international programs",
    programs: ["Business", "Medicine", "Arts", "Sciences"],
    partnership: "Semester Exchange, Internships, Joint Research",
    established: "2021",
    students: "400+ exchanges annually"
  },
  {
    name: "Sorbonne University",
    location: "Paris, France",
    logo: "🗼",
    description: "Historic French university renowned for humanities and sciences",
    programs: ["Literature", "Languages", "Philosophy", "Sciences"],
    partnership: "Study Abroad, Cultural Exchange, Research Projects",
    established: "2019",
    students: "250+ exchanges annually"
  }
]

const partnershipBenefits = [
  {
    icon: Globe,
    title: "Global Exposure",
    description: "Study at world-renowned universities and experience different cultures"
  },
  {
    icon: Users,
    title: "International Network",
    description: "Build connections with students and faculty from around the world"
  },
  {
    icon: Award,
    title: "Dual Degrees",
    description: "Earn degrees from multiple institutions to enhance your credentials"
  },
  {
    icon: BookOpen,
    title: "Research Opportunities",
    description: "Access cutting-edge research facilities and collaborative projects"
  }
]

const stats = [
  { number: "25+", label: "Partner Universities" },
  { number: "2,000+", label: "Student Exchanges" },
  { number: "15", label: "Countries" },
  { number: "95%", label: "Satisfaction Rate" }
]

export default function PartnersPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our Partner Universities
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Expand your horizons through our global network of prestigious partner institutions offering world-class education opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/apply">Apply for Exchange</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-admissions">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Partnership Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Global Impact</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Universities Grid */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Partner Universities</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {partnerUniversities.map((university, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{university.logo}</div>
                      <div>
                        <CardTitle className="text-xl">{university.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {university.location}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{university.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Available Programs</h4>
                      <div className="flex flex-wrap gap-2">
                        {university.programs.map((program, programIndex) => (
                          <span key={programIndex} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Partnership Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Partnership Type:</span>
                          <span>{university.partnership}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Established:</span>
                          <span>{university.established}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual Exchanges:</span>
                          <span>{university.students}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button asChild className="flex-1">
                        <Link href="/apply">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          Apply
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <Link href="/contact-admissions">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How to Apply for Exchange Programs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <CardTitle>Choose Your Destination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Browse our partner universities and select programs that align with your academic goals and interests.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <CardTitle>Submit Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Complete the exchange application with required documents, transcripts, and language proficiency scores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <CardTitle>Begin Your Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Once accepted, receive pre-departure orientation and support to ensure a successful exchange experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <Building className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Go Global?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who have expanded their horizons through our international partnership programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/apply">Start Your Application</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-admissions">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
