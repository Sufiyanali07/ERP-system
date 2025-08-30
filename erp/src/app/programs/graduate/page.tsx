import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { BookOpen, Clock, Users, Award, CheckCircle, Trophy } from "lucide-react"

const graduatePrograms = [
  {
    title: "Master of Business Administration (MBA)",
    duration: "2 years",
    credits: "60 credits",
    description: "Executive-level business education with specializations in finance, marketing, and strategy.",
    courses: [
      "Strategic Management",
      "Financial Analysis",
      "Leadership & Ethics",
      "Global Business",
      "Data Analytics",
      "Capstone Project"
    ],
    careers: ["Executive Manager", "Business Consultant", "Investment Analyst", "Entrepreneur"]
  },
  {
    title: "Master of Science (MS)",
    duration: "2 years", 
    credits: "36 credits",
    description: "Advanced research-focused programs in STEM fields with thesis requirement.",
    courses: [
      "Advanced Research Methods",
      "Statistical Analysis",
      "Specialized Coursework",
      "Literature Review",
      "Thesis Research",
      "Thesis Defense"
    ],
    careers: ["Research Scientist", "Data Analyst", "Technical Specialist", "R&D Manager"]
  },
  {
    title: "Master of Arts (MA)",
    duration: "2 years",
    credits: "36 credits", 
    description: "Humanities and social sciences programs emphasizing critical analysis and communication.",
    courses: [
      "Advanced Theory",
      "Research Methodology",
      "Seminar Courses",
      "Independent Study",
      "Comprehensive Exam",
      "Final Project"
    ],
    careers: ["Academic Researcher", "Policy Analyst", "Cultural Director", "Communications Manager"]
  },
  {
    title: "Doctor of Philosophy (PhD)",
    duration: "4-6 years",
    credits: "72+ credits",
    description: "Highest academic degree with original research contribution to knowledge.",
    courses: [
      "Advanced Coursework",
      "Qualifying Exams",
      "Research Seminars",
      "Teaching Experience",
      "Dissertation Research",
      "Dissertation Defense"
    ],
    careers: ["University Professor", "Senior Researcher", "Industry Expert", "Consultant"]
  },
  {
    title: "Professional Certificates",
    duration: "6-12 months",
    credits: "12-18 credits",
    description: "Focused programs for working professionals seeking specialized skills.",
    courses: [
      "Industry-Specific Training",
      "Practical Applications",
      "Case Studies",
      "Professional Skills",
      "Certification Exam",
      "Portfolio Development"
    ],
    careers: ["Certified Professional", "Specialist", "Team Lead", "Subject Matter Expert"]
  }
]

export default function GraduateProgramsPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Graduate Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Advanced degree programs for professionals ready to take their careers to the next level.
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
                <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground">Evening and weekend classes for working professionals</p>
              </div>
              <div className="p-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
                <p className="text-muted-foreground">Learn from industry leaders and renowned researchers</p>
              </div>
              <div className="p-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Research Opportunities</h3>
                <p className="text-muted-foreground">Access to cutting-edge research facilities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Available Programs</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {graduatePrograms.map((program, index) => (
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
                      <h4 className="font-semibold mb-3">Program Components</h4>
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
                      <h4 className="font-semibold mb-3">Career Advancement</h4>
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

        {/* Admission Requirements */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Admission Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Master&apos;s Programs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Bachelor&apos;s degree from accredited institution
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Minimum 3.0 GPA
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    GRE/GMAT scores (program dependent)
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Letters of recommendation
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Statement of purpose
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Doctoral Programs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Master&apos;s degree preferred
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Minimum 3.5 GPA
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    GRE scores required
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Research experience
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Faculty advisor match
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Advance Your Career Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of graduate scholars and take your expertise to the next level.
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
