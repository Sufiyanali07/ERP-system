'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, DollarSign, Calculator, GraduationCap, Users, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface CalculationResult {
  totalCost: number
  expectedFamilyContribution: number
  financialNeed: number
  estimatedAid: number
  netCost: number
  scholarships: number
  grants: number
  workStudy: number
  loans: number
}

export default function FinancialAidCalculator() {
    const { toast } = useToast()
    const router = useRouter()
    const [formData, setFormData] = useState({
        familyIncome: '',
        familySize: '',
        studentsInCollege: '',
        parentAge: '',
        assets: '',
        studentIncome: '',
        studentAssets: '',
        gpa: '',
        residency: '',
        programType: '',
        housingType: ''
    })
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [isCalculating, setIsCalculating] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const calculateAid = () => {
        setIsCalculating(true)
        
        // Simulate calculation delay
        setTimeout(() => {
            const familyIncome = parseFloat(formData.familyIncome) || 0
            const familySize = parseInt(formData.familySize) || 1
            const studentsInCollege = parseInt(formData.studentsInCollege) || 1
            const gpa = parseFloat(formData.gpa) || 0
            const assets = parseFloat(formData.assets) || 0
            const studentIncome = parseFloat(formData.studentIncome) || 0
            
            // Base costs
            let tuitionFees = formData.programType === 'graduate' ? 28000 : 24000
            if (formData.residency === 'out-of-state') tuitionFees *= 1.5
            
            const roomBoard = formData.housingType === 'on-campus' ? 12000 : 
                             formData.housingType === 'off-campus' ? 10000 : 0
            const booksSupplies = 1500
            const personalExpenses = 2000
            
            const totalCost = tuitionFees + roomBoard + booksSupplies + personalExpenses
            
            // EFC calculation (simplified)
            let efc = Math.max(0, (familyIncome - 30000) * 0.22)
            efc = efc / studentsInCollege
            if (familySize > 4) efc *= 0.9
            if (assets > 50000) efc += (assets - 50000) * 0.05
            
            const financialNeed = Math.max(0, totalCost - efc)
            
            // Aid calculations
            let scholarships = 0
            if (gpa >= 3.8) scholarships = 8000
            else if (gpa >= 3.5) scholarships = 5000
            else if (gpa >= 3.0) scholarships = 2000
            
            let grants = 0
            if (familyIncome < 30000) grants = 6000
            else if (familyIncome < 60000) grants = 4000
            else if (familyIncome < 100000) grants = 2000
            
            const workStudy = Math.min(3000, financialNeed * 0.15)
            const maxLoanAmount = Math.min(12500, financialNeed - scholarships - grants - workStudy)
            const loans = Math.max(0, maxLoanAmount)
            
            const estimatedAid = scholarships + grants + workStudy + loans
            const netCost = Math.max(0, totalCost - estimatedAid)
            
            setResult({
                totalCost,
                expectedFamilyContribution: efc,
                financialNeed,
                estimatedAid,
                netCost,
                scholarships,
                grants,
                workStudy,
                loans
            })
            
            setIsCalculating(false)
            
            toast({
                title: "Financial Aid Calculated!",
                description: "Your estimated financial aid package has been calculated below.",
            })
        }, 2000)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="min-h-screen bg-background py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-4xl font-bold">Financial Aid Calculator</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 text-center">
                    Get an estimate of your financial aid eligibility and see how NextCollege can make your education affordable.
                </p>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Calculator Form */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-primary" />
                                    Financial Information
                                </CardTitle>
                                <CardDescription>
                                    Enter your family&apos;s financial information for an accurate estimate
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Family Financial Information */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Family Information</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="familyIncome">Annual Family Income</Label>
                                            <Input
                                                id="familyIncome"
                                                type="number"
                                                placeholder="e.g., 75000"
                                                value={formData.familyIncome}
                                                onChange={(e) => handleInputChange('familyIncome', e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="familySize">Family Size</Label>
                                            <Select onValueChange={(value) => handleInputChange('familySize', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select family size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 person</SelectItem>
                                                    <SelectItem value="2">2 people</SelectItem>
                                                    <SelectItem value="3">3 people</SelectItem>
                                                    <SelectItem value="4">4 people</SelectItem>
                                                    <SelectItem value="5">5 people</SelectItem>
                                                    <SelectItem value="6">6+ people</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="studentsInCollege">Students in College</Label>
                                            <Select onValueChange={(value) => handleInputChange('studentsInCollege', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Number in college" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 student</SelectItem>
                                                    <SelectItem value="2">2 students</SelectItem>
                                                    <SelectItem value="3">3 students</SelectItem>
                                                    <SelectItem value="4">4+ students</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="assets">Parent Assets</Label>
                                            <Input
                                                id="assets"
                                                type="number"
                                                placeholder="e.g., 50000"
                                                value={formData.assets}
                                                onChange={(e) => handleInputChange('assets', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Student Information */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Student Information</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="studentIncome">Student Annual Income</Label>
                                            <Input
                                                id="studentIncome"
                                                type="number"
                                                placeholder="e.g., 5000"
                                                value={formData.studentIncome}
                                                onChange={(e) => handleInputChange('studentIncome', e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="gpa">Current GPA</Label>
                                            <Input
                                                id="gpa"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="4.0"
                                                placeholder="e.g., 3.5"
                                                value={formData.gpa}
                                                onChange={(e) => handleInputChange('gpa', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Program Information */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Program Details</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="residency">Residency Status</Label>
                                            <Select onValueChange={(value) => handleInputChange('residency', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select residency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="in-state">In-State</SelectItem>
                                                    <SelectItem value="out-of-state">Out-of-State</SelectItem>
                                                    <SelectItem value="international">International</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="programType">Program Type</Label>
                                            <Select onValueChange={(value) => handleInputChange('programType', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select program" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                                    <SelectItem value="graduate">Graduate</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="housingType">Housing Preference</Label>
                                        <Select onValueChange={(value) => handleInputChange('housingType', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select housing" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="on-campus">On-Campus Housing</SelectItem>
                                                <SelectItem value="off-campus">Off-Campus Housing</SelectItem>
                                                <SelectItem value="commuter">Living at Home</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button 
                                    onClick={calculateAid}
                                    className="w-full" 
                                    size="lg"
                                    disabled={isCalculating || !formData.familyIncome}
                                >
                                    <Calculator className="w-4 h-4 mr-2" />
                                    {isCalculating ? 'Calculating...' : 'Calculate Financial Aid'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results and Information */}
                    <div className="space-y-8">
                        {result ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                        Your Financial Aid Estimate
                                    </CardTitle>
                                    <CardDescription>
                                        Based on the information provided, here&apos;s your estimated aid package
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                                            <div className="text-2xl font-bold text-primary">{formatCurrency(result.totalCost)}</div>
                                            <div className="text-sm text-muted-foreground">Total Cost</div>
                                        </div>
                                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                                            <div className="text-2xl font-bold text-primary">{formatCurrency(result.netCost)}</div>
                                            <div className="text-sm text-muted-foreground">Your Net Cost</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold">Financial Aid Breakdown</h4>
                                        
                                        {result.scholarships > 0 && (
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-sm">Merit Scholarships</span>
                                                <span className="text-sm font-medium text-green-600">{formatCurrency(result.scholarships)}</span>
                                            </div>
                                        )}
                                        
                                        {result.grants > 0 && (
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-sm">Need-Based Grants</span>
                                                <span className="text-sm font-medium text-green-600">{formatCurrency(result.grants)}</span>
                                            </div>
                                        )}
                                        
                                        {result.workStudy > 0 && (
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-sm">Work-Study Program</span>
                                                <span className="text-sm font-medium text-blue-600">{formatCurrency(result.workStudy)}</span>
                                            </div>
                                        )}
                                        
                                        {result.loans > 0 && (
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-sm">Student Loans</span>
                                                <span className="text-sm font-medium text-orange-600">{formatCurrency(result.loans)}</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-between items-center py-2 font-semibold">
                                            <span>Total Financial Aid</span>
                                            <span className="text-primary">{formatCurrency(result.estimatedAid)}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button asChild className="flex-1">
                                            <a href="/apply">Apply Now</a>
                                        </Button>
                                        <Button asChild variant="outline" className="flex-1">
                                            <a href="/contact-admissions">Get Help</a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Info className="w-5 h-5 text-primary" />
                                        Financial Aid Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Types of Aid Available</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• Merit-based scholarships up to $20,000</li>
                                            <li>• Need-based grants and aid</li>
                                            <li>• Federal work-study programs</li>
                                            <li>• Federal and private student loans</li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-semibold mb-2">Important Notes</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            <li>• This is an estimate only</li>
                                            <li>• Actual aid may vary based on FAFSA</li>
                                            <li>• Apply early for best aid opportunities</li>
                                            <li>• Additional scholarships may be available</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="/apply">
                                        <GraduationCap className="w-4 h-4 mr-2" />
                                        Submit Application
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="https://fafsa.gov" target="_blank" rel="noopener noreferrer">
                                        <DollarSign className="w-4 h-4 mr-2" />
                                        Complete FAFSA
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <a href="/contact-admissions">
                                        <Users className="w-4 h-4 mr-2" />
                                        Speak with Advisor
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
