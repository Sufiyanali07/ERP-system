import FinancialAidCalculator from '@/components/financial-aid-calculator'
import { Toaster } from '@/components/toaster'

export default function FinancialAidPage() {
  return (
    <div className="min-h-screen bg-background">
      <FinancialAidCalculator />
      <Toaster />
    </div>
  )
}
