import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroHeader } from "@/components/header"
import Link from "next/link"
import { FileText, Calendar, DollarSign, CheckCircle, Clock, Users } from "lucide-react"

const admissionSteps = [
  {
    step: "1",
    title: "Submit Application",
    description: "Complete your online application with all required documents",
    icon: FileText,
    deadline: "Rolling Admissions"
  },
  {
    step: "2", 
    title: "Document Review",
    description: "Our admissions team reviews your transcripts and credentials",
    icon: CheckCircle,
    deadline: "2-3 weeks"
  },
  {
    step: "3",
    title: "Interview Process",
    description: "Schedule and complete your admissions interview",
    icon: Users,
    deadline: "1 week"
  },
  {
    step: "4",
    title: "Decision Notification",
    description: "Receive your admission decision and next steps",
    icon: Clock,
    deadline: "Within 30 days"
  }
]

const requirements = [
  "High School Diploma or GED",
  "Official Transcripts",
  "Letters of Recommendation (2)",
  "Personal Statement Essay",
  "SAT/ACT Scores (Optional)",
  "Application Fee ($50)"
]

export default function AdmissionsPage() {
  return (
    <>
      <HeroHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Admissions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              <p className="text-muted-foreground">We&apos;re here to help you through every step of the admission process.</p>
            </p>
            <Button asChild size="lg">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Admission Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {admissionSteps.map((step, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {step.deadline}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements & Financial Aid */}
        <section className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-primary" />
                  Admission Requirements
                </CardTitle>
                <CardDescription>
                  Everything you need to complete your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">
                  Download Checklist
                </Button>
              </CardContent>
            </Card>

            {/* Financial Aid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-primary" />
                  Financial Aid
                </CardTitle>
                <CardDescription>
                  Making education affordable for everyone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Scholarships Available</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Merit-based scholarships up to $20,000</li>
                      <li>• Need-based financial aid</li>
                      <li>• Work-study programs</li>
                      <li>• Federal student loans</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Average Annual Cost</h4>
                    <p className="text-2xl font-bold text-primary">$35,000</p>
                    <p className="text-sm text-muted-foreground">Including tuition, room & board</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-6">
                  <Link href="/financial-aid">Calculate Financial Aid</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section id="apply" className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Apply?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step towards your future at NextCollege.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="#apply-form">Start Application</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact-admissions">Contact Admissions</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
