import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { GraduationCap, BookOpen, Clock, Users, Award, CheckCircle } from "lucide-react"

const undergraduatePrograms = [
  {
    title: "Computer Science",
    duration: "4 years",
    credits: "120 credits",
    description: "Comprehensive program covering software development, algorithms, data structures, and emerging technologies.",
    courses: [
      "Programming Fundamentals",
      "Data Structures & Algorithms", 
      "Database Systems",
      "Software Engineering",
      "Machine Learning",
      "Cybersecurity"
    ],
    careers: ["Software Developer", "Data Scientist", "Systems Analyst", "IT Consultant"]
  },
  {
    title: "Business Administration",
    duration: "4 years", 
    credits: "120 credits",
    description: "Build leadership skills and business acumen across finance, marketing, operations, and strategy.",
    courses: [
      "Principles of Management",
      "Financial Accounting",
      "Marketing Strategy",
      "Operations Management",
      "Business Ethics",
      "Entrepreneurship"
    ],
    careers: ["Business Analyst", "Project Manager", "Marketing Manager", "Consultant"]
  },
  {
    title: "Engineering",
    duration: "4 years",
    credits: "128 credits", 
    description: "ABET-accredited programs in mechanical, electrical, civil, and chemical engineering.",
    courses: [
      "Engineering Mathematics",
      "Physics & Chemistry",
      "Engineering Design",
      "Materials Science",
      "Thermodynamics",
      "Senior Capstone Project"
    ],
    careers: ["Design Engineer", "Project Engineer", "Research Engineer", "Engineering Manager"]
  },
  {
    title: "Liberal Arts",
    duration: "4 years",
    credits: "120 credits",
    description: "Interdisciplinary program fostering critical thinking, communication, and cultural understanding.",
    courses: [
      "World Literature",
      "Philosophy & Ethics",
      "History & Culture",
      "Creative Writing",
      "Foreign Languages",
      "Research Methods"
    ],
    careers: ["Writer", "Teacher", "Journalist", "Cultural Analyst"]
  },
  {
    title: "Psychology",
    duration: "4 years",
    credits: "120 credits",
    description: "Study human behavior, cognition, and mental processes with hands-on research experience.",
    courses: [
      "General Psychology",
      "Research Methods",
      "Cognitive Psychology",
      "Developmental Psychology",
      "Abnormal Psychology",
      "Psychology Practicum"
    ],
    careers: ["Counselor", "Research Assistant", "HR Specialist", "Social Worker"]
  },
  {
    title: "Biology",
    duration: "4 years",
    credits: "120 credits",
    description: "Comprehensive study of life sciences with laboratory research and field work opportunities.",
    courses: [
      "General Biology",
      "Organic Chemistry",
      "Genetics",
      "Ecology",
      "Molecular Biology",
      "Research Project"
    ],
    careers: ["Research Scientist", "Lab Technician", "Environmental Consultant", "Healthcare Professional"]
  }
]

export default function UndergraduateProgramsPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Undergraduate Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Bachelor&apos;s degree programs designed to provide comprehensive education and prepare you for successful careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-admissions">Get Information</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">4-Year Programs</h3>
                <p className="text-muted-foreground">Comprehensive curriculum designed for deep learning</p>
              </div>
              <div className="p-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Small Class Sizes</h3>
                <p className="text-muted-foreground">Average 18:1 student-to-faculty ratio</p>
              </div>
              <div className="p-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accredited Programs</h3>
                <p className="text-muted-foreground">Nationally recognized and industry-approved</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Available Programs</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {undergraduatePrograms.map((program, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-primary" />
                      {program.title}
                    </CardTitle>
                    <CardDescription className="text-base">{program.description}</CardDescription>
                    <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                      <span>• {program.duration}</span>
                      <span>• {program.credits}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Core Courses</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {program.courses.map((course, courseIndex) => (
                          <div key={courseIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Career Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.careers.map((career, careerIndex) => (
                          <span key={careerIndex} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button asChild className="flex-1">
                        <Link href="/apply">Apply Now</Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <Link href="/contact-admissions">Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of successful graduates who started their careers with a NextCollege undergraduate degree.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/apply">Apply Today</Link>
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
