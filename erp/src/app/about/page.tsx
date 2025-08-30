import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { Award, Users, Globe, Target, Heart, Star, Building, BookOpen } from "lucide-react"

const values = [
  {
    title: "Excellence",
    description: "Committed to the highest standards in education and research",
    icon: Award
  },
  {
    title: "Innovation",
    description: "Fostering creativity and forward-thinking solutions",
    icon: Star
  },
  {
    title: "Community",
    description: "Building strong relationships and collaborative partnerships",
    icon: Users
  },
  {
    title: "Integrity",
    description: "Upholding ethical principles in all our endeavors",
    icon: Heart
  }
]

const stats = [
  { number: "1925", label: "Founded" },
  { number: "15,000+", label: "Students" },
  { number: "800+", label: "Faculty" },
  { number: "50+", label: "Countries Represented" }
]

const leadership = [
  {
    name: "Dr. Sarah Johnson",
    title: "President",
    description: "Leading NextCollege with 20+ years of educational leadership experience"
  },
  {
    name: "Prof. Michael Chen",
    title: "Vice President of Academics",
    description: "Overseeing academic excellence and curriculum development"
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Dean of Student Affairs",
    description: "Ensuring exceptional student experience and support services"
  }
]

export default function AboutPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About NextCollege
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              For nearly a century, NextCollege has been at the forefront of higher education, shaping minds and building futures.
            </p>
            <Button asChild size="lg">
              <Link href="#mission">Our Story</Link>
            </Button>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <Target className="w-8 h-8 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide transformative educational experiences that empower students to become innovative leaders, critical thinkers, and engaged global citizens who make meaningful contributions to society.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be recognized as a premier institution of higher learning that bridges academic excellence with real-world impact, fostering innovation and preparing graduates for the challenges of tomorrow.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">NextCollege by the Numbers</h2>
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

        {/* Leadership */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{leader.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">{leader.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{leader.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Building className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our History</h2>
              <p className="text-lg text-muted-foreground">
                Nearly a century of educational excellence and innovation
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="border-l-2 border-primary pl-6">
                <div className="text-sm font-medium text-primary mb-1">1925</div>
                <h3 className="text-xl font-semibold mb-2">Foundation</h3>
                <p className="text-muted-foreground">NextCollege was founded with a vision to provide quality higher education accessible to all.</p>
              </div>
              
              <div className="border-l-2 border-primary pl-6">
                <div className="text-sm font-medium text-primary mb-1">1960s</div>
                <h3 className="text-xl font-semibold mb-2">Expansion Era</h3>
                <p className="text-muted-foreground">Major campus expansion and introduction of graduate programs.</p>
              </div>
              
              <div className="border-l-2 border-primary pl-6">
                <div className="text-sm font-medium text-primary mb-1">1990s</div>
                <h3 className="text-xl font-semibold mb-2">Digital Revolution</h3>
                <p className="text-muted-foreground">Pioneered online learning and digital campus initiatives.</p>
              </div>
              
              <div className="border-l-2 border-primary pl-6">
                <div className="text-sm font-medium text-primary mb-1">2020s</div>
                <h3 className="text-xl font-semibold mb-2">Innovation Hub</h3>
                <p className="text-muted-foreground">Established as a leading center for research and innovation in education.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join Our Legacy
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Become part of the NextCollege community and help shape the future of education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/admissions">Apply Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/campus">Visit Campus</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
