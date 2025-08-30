import SignupForm from '@/components/signup-form'
import { Toaster } from '@/components/toaster'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <SignupForm />
      <Toaster />
    </div>
  )
}
