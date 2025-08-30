import ContactAdmissionsForm from '@/components/contact-admissions-form'
import { Toaster } from '@/components/toaster'

export default function ContactAdmissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContactAdmissionsForm />
      <Toaster />
    </div>
  )
}
