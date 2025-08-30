import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { Globe, Clock, Users, Award, CheckCircle, Monitor, Wifi } from "lucide-react"

const onlinePrograms = [
  {
    title: "Online MBA",
    duration: "18-24 months",
    credits: "60 credits",
    description: "Executive MBA program designed for working professionals with flexible scheduling.",
    courses: [
      "Digital Leadership",
      "Global Business Strategy",
      "Financial Management",
      "Marketing Analytics",
      "Operations Management",
      "Virtual Team Management"
    ],
    careers: ["Executive Manager", "Digital Strategist", "Business Consultant", "Operations Director"]
  },
  {
    title: "Digital Marketing",
    duration: "12 months", 
    credits: "36 credits",
    description: "Master modern marketing techniques including SEO, social media, and analytics.",
    courses: [
      "SEO & SEM Strategies",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Marketing Analytics",
      "Digital Campaign Management"
    ],
    careers: ["Digital Marketing Manager", "SEO Specialist", "Content Strategist", "Marketing Analyst"]
  },
  {
    title: "Data Science",
    duration: "15 months",
    credits: "45 credits", 
    description: "Comprehensive program covering machine learning, statistics, and big data analytics.",
    courses: [
      "Python Programming",
      "Statistical Analysis",
      "Machine Learning",
      "Data Visualization",
      "Big Data Technologies",
      "Capstone Project"
    ],
    careers: ["Data Scientist", "Machine Learning Engineer", "Business Intelligence Analyst", "Research Scientist"]
  },
  {
    title: "Cybersecurity",
    duration: "18 months",
    credits: "48 credits",
    description: "Advanced cybersecurity program covering threat analysis and security architecture.",
    courses: [
      "Network Security",
      "Ethical Hacking",
      "Digital Forensics",
      "Risk Management",
      "Security Architecture",
      "Incident Response"
    ],
    careers: ["Cybersecurity Analyst", "Security Architect", "Penetration Tester", "CISO"]
  },
  {
    title: "Project Management",
    duration: "12 months",
    credits: "36 credits",
    description: "PMP-aligned curriculum covering agile methodologies and project leadership.",
    courses: [
      "Project Planning",
      "Agile & Scrum",
      "Risk Management",
      "Quality Management",
      "Leadership Skills",
      "Portfolio Management"
    ],
    careers: ["Project Manager", "Program Manager", "Scrum Master", "Operations Manager"]
  }
]

const features = [
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Study at your own pace with 24/7 access to course materials"
  },
  {
    icon: Monitor,
    title: "Interactive Learning",
    description: "Live virtual classes, recorded lectures, and hands-on projects"
  },
  {
    icon: Users,
    title: "Global Network",
    description: "Connect with students and professionals from around the world"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Certificates and degrees recognized by top employers"
  }
]

export default function OnlineProgramsPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Online Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Flexible online learning designed for working professionals. Study from anywhere, anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/apply">Enroll Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-admissions">Get Information</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Online Learning?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Available Programs</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {onlinePrograms.map((program, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Wifi className="w-6 h-6 text-primary" />
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
                      <h4 className="font-semibold mb-3">Course Modules</h4>
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
                        <Link href="/apply">Enroll Now</Link>
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

        {/* Learning Platform */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <Monitor className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Advanced Learning Platform</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our state-of-the-art online learning platform provides an engaging and interactive educational experience.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>HD video lectures with closed captions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Interactive assignments and quizzes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Virtual labs and simulations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Discussion forums and peer collaboration</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Mobile app for learning on-the-go</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>24/7 technical support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Progress tracking and analytics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-3" />
                  <span>Virtual office hours with instructors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Start Learning Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have advanced their careers through our online programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/apply">Enroll Now</Link>
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
