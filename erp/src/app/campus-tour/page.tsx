import CampusTourForm from '@/components/campus-tour-form'
import { Toaster } from '@/components/toaster'

export default function CampusTourPage() {
  return (
    <div className="min-h-screen bg-background">
      <CampusTourForm />
      <Toaster />
    </div>
  )
}
