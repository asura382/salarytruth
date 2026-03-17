export interface SalaryBreakdown {
  amount: number
  monthlyInHand: number
  annualInHand: number
  monthlyTax: number
  annualTax: number
  pfMonthly: number
  pfAnnual: number
  professionalTaxMonthly: number
  professionalTaxAnnual: number
  breakdown: {
    basic: number
    hra: number
    specialAllowance: number
  }
}

// Pre-calculated salaries for common CTC amounts (assuming standard 40% basic, 20% HRA, 40% special allowance)
// Professional tax: ₹200/month (Bangalore standard)
const createSalaryBreakdown = (ctcLakhs: number): SalaryBreakdown => {
  const ctc = ctcLakhs * 100000
  
  // Standard breakup: 40% Basic, 20% HRA, 40% Special Allowance
  const basic = ctc * 0.40
  const hra = ctc * 0.20
  const specialAllowance = ctc * 0.40
  
  // Monthly values
  const monthlyGross = ctc / 12
  
  // PF: 12% of basic annually, divided by 12 for monthly
  const pfAnnual = basic * 0.12
  const pfMonthly = pfAnnual / 12
  
  // Professional Tax: ₹200/month (Bangalore)
  const ptMonthly = 200
  const ptAnnual = 2400
  
  // Calculate taxable income (using new regime 2025 with standard deduction ₹50k)
  const standardDeduction = 50000
  const taxableIncome = ctc - pfAnnual - standardDeduction
  
  // Tax calculation (New Regime 2025)
  let tax = 0
  if (taxableIncome > 300000) {
    if (taxableIncome <= 600000) {
      tax = (taxableIncome - 300000) * 0.05
    } else if (taxableIncome <= 900000) {
      tax = 15000 + (taxableIncome - 600000) * 0.10
    } else if (taxableIncome <= 1200000) {
      tax = 45000 + (taxableIncome - 900000) * 0.15
    } else if (taxableIncome <= 1500000) {
      tax = 90000 + (taxableIncome - 1200000) * 0.20
    } else {
      tax = 150000 + (taxableIncome - 1500000) * 0.30
    }
  }
  
  // Add 4% cess
  tax = tax * 1.04
  
  const taxMonthly = tax / 12
  
  // In-hand salary
  const inHandMonthly = monthlyGross - pfMonthly - ptMonthly - taxMonthly
  const inHandAnnual = inHandMonthly * 12
  
  return {
    amount: ctcLakhs,
    monthlyInHand: Math.round(inHandMonthly),
    annualInHand: Math.round(inHandAnnual),
    monthlyTax: Math.round(taxMonthly),
    annualTax: Math.round(tax),
    pfMonthly: Math.round(pfMonthly),
    pfAnnual: Math.round(pfAnnual),
    professionalTaxMonthly: ptMonthly,
    professionalTaxAnnual: ptAnnual,
    breakdown: {
      basic: Math.round(basic),
      hra: Math.round(hra),
      specialAllowance: Math.round(specialAllowance)
    }
  }
}

// Common salary amounts people search for
export const commonSalaries: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25, 30, 40, 50]

export function getSalaryBreakdown(amount: number): SalaryBreakdown | null {
  if (!commonSalaries.includes(amount)) {
    return null
  }
  return createSalaryBreakdown(amount)
}

export function getAllSalarySlugs(): string[] {
  return commonSalaries.map(amount => `${amount}-lpa-in-hand`)
}
