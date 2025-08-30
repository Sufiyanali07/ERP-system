import LoginForm from '@/components/login-form'
import { Toaster } from '@/components/toaster'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <LoginForm />
      <Toaster />
    </div>
  )
}
