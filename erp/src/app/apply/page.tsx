import ApplyNowForm from '@/components/apply-now-form'
import { Toaster } from '@/components/toaster'

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <ApplyNowForm />
      <Toaster />
    </div>
  )
}
