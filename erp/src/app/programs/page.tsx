import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { GraduationCap, BookOpen, Globe, Users } from "lucide-react"
import Features from "@/components/features-12"

const programs = [
  {
    title: "Undergraduate Programs",
    description: "Bachelor's degrees in various fields of study",
    icon: GraduationCap,
    courses: [
      "Computer Science",
      "Business Administration", 
      "Engineering",
      "Liberal Arts",
      "Psychology",
      "Biology"
    ]
  },
  {
    title: "Graduate Programs", 
    description: "Master's and PhD programs for advanced study",
    icon: BookOpen,
    courses: [
      "MBA",
      "Master of Science",
      "Master of Arts",
      "PhD Programs",
      "Professional Certificates"
    ]
  },
  {
    title: "Online Programs",
    description: "Flexible learning options for working professionals",
    icon: Globe,
    courses: [
      "Online MBA",
      "Digital Marketing",
      "Data Science",
      "Cybersecurity",
      "Project Management"
    ]
  }
]

export default function ProgramsPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Academic Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our comprehensive range of undergraduate, graduate, and online programs designed to prepare you for success in your chosen field.
            </p>
            <Button asChild size="lg">
              <Link href="#programs">Explore Programs</Link>
            </Button>
          </div>
        </section>

        {/* Programs Grid */}
        <section id="programs" className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <program.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {program.courses.map((course, courseIndex) => (
                        <li key={courseIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {course}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-6" variant="outline">
                      <Link href={`/programs/${program.title.toLowerCase().replace(' programs', '').replace(' ', '-')}`}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* CTA Section */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who have chosen NextCollege for their education.
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
