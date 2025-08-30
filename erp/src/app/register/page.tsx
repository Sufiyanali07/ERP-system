import EventRegistrationForm from '@/components/event-registration-form'
import { Toaster } from '@/components/toaster'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <EventRegistrationForm />
      <Toaster />
    </div>
  )
}
