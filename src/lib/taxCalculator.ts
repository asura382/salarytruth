export interface TaxCalculationResult {
  grossCTC: number;
  basicSalary: number; // 40% of CTC
  hra: number; // 20% of basic
  specialAllowance: number; // Remaining after basic and HRA
  grossMonthly: number;
  employeePF: number; // 12% of basic
  employerPF: number; // 12% of basic (not deducted from salary)
  professionalTax: number; // Monthly PT
  taxableIncome: number;
  incomeTaxAnnual: number;
  incomeTaxMonthly: number;
  totalDeductions: number;
  inHandMonthly: number;
  inHandAnnual: number;
  effectiveTaxRate: number;
  newRegimeTax: number;
  oldRegimeTax: number;
  betterRegime: 'new' | 'old';
}

interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
}

// New Tax Regime 2025-26 Slabs
const NEW_TAX_SLABS: TaxSlab[] = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300001, max: 700000, rate: 0.05 },
  { min: 700001, max: 1000000, rate: 0.10 },
  { min: 1000001, max: 1200000, rate: 0.15 },
  { min: 1200001, max: 1500000, rate: 0.20 },
  { min: 1500001, max: null, rate: 0.30 },
];

// Old Tax Regime Slabs
const OLD_TAX_SLABS: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 0.05 },
  { min: 500001, max: 1000000, rate: 0.20 },
  { min: 1000001, max: null, rate: 0.30 },
];

const STANDARD_DEDUCTION_NEW = 75000;
const STANDARD_DEDUCTION_OLD = 50000;

function calculateTax(slabs: TaxSlab[], taxableIncome: number): number {
  let tax = 0;
  
  for (const slab of slabs) {
    if (taxableIncome <= slab.min - 1) {
      break;
    }
    
    const taxableInSlab = Math.min(
      taxableIncome,
      slab.max !== null ? slab.max : taxableIncome
    ) - (slab.min - 1);
    
    if (taxableInSlab > 0) {
      tax += taxableInSlab * slab.rate;
    }
  }
  
  return tax;
}

function applyRebate87A(tax: number, taxableIncome: number, regime: 'new' | 'old'): number {
  if (regime === 'new') {
    // Full rebate up to ₹12,00,000 taxable income
    if (taxableIncome <= 1200000) {
      return 0;
    }
  } else {
    // Old regime rebate up to ₹5,00,000
    if (taxableIncome <= 500000) {
      return 0;
    }
  }
  
  return tax;
}

function addCess(tax: number): number {
  return tax * 1.04; // 4% Health & Education Cess
}

export function calculateSalary(
  annualCTC: number,
  cityProfessionalTaxMonthly: number,
  useNewRegime: boolean = true
): TaxCalculationResult {
  // Calculate components
  const basicSalary = annualCTC * 0.40; // 40% of CTC
  const hra = basicSalary * 0.20; // 20% of basic
  const specialAllowance = annualCTC - basicSalary - hra; // Remaining
  
  const grossMonthly = annualCTC / 12;
  
  // PF Calculation
  const employeePF = basicSalary * 0.12; // 12% of basic
  const employerPF = basicSalary * 0.12; // Employer contribution (info only)
  
  // Professional Tax (annual)
  const professionalTaxAnnual = cityProfessionalTaxMonthly * 12;
  
  // Taxable Income = Gross CTC - Standard Deduction - Employee PF - Professional Tax
  const standardDeduction = useNewRegime ? STANDARD_DEDUCTION_NEW : STANDARD_DEDUCTION_OLD;
  const taxableIncome = annualCTC - standardDeduction - employeePF - professionalTaxAnnual;
  
  // Calculate tax for both regimes
  const newRegimeTaxBeforeCess = applyRebate87A(
    calculateTax(NEW_TAX_SLABS, taxableIncome),
    taxableIncome,
    'new'
  );
  const newRegimeTax = addCess(newRegimeTaxBeforeCess);
  
  const oldRegimeTaxBeforeCess = applyRebate87A(
    calculateTax(OLD_TAX_SLABS, taxableIncome),
    taxableIncome,
    'old'
  );
  const oldRegimeTax = addCess(oldRegimeTaxBeforeCess);
  
  // Use the selected regime's tax
  const incomeTaxAnnual = useNewRegime ? newRegimeTax : oldRegimeTax;
  const incomeTaxMonthly = incomeTaxAnnual / 12;
  
  // Total deductions
  const totalDeductions = employeePF + professionalTaxAnnual + incomeTaxAnnual;
  
  // In-hand salary
  const inHandAnnual = annualCTC - totalDeductions;
  const inHandMonthly = inHandAnnual / 12;
  
  // Effective tax rate
  const effectiveTaxRate = (totalDeductions / annualCTC) * 100;
  
  // Determine better regime
  const betterRegime = newRegimeTax <= oldRegimeTax ? 'new' : 'old';
  
  return {
    grossCTC: annualCTC,
    basicSalary,
    hra,
    specialAllowance,
    grossMonthly,
    employeePF,
    employerPF,
    professionalTax: cityProfessionalTaxMonthly,
    taxableIncome,
    incomeTaxAnnual,
    incomeTaxMonthly,
    totalDeductions,
    inHandMonthly,
    inHandAnnual,
    effectiveTaxRate,
    newRegimeTax,
    oldRegimeTax,
    betterRegime,
  };
}

export function compareTaxRegimes(annualCTC: number, professionalTaxAnnual: number): {
  newRegime: TaxCalculationResult;
  oldRegime: TaxCalculationResult;
  savings: number;
  recommendedRegime: 'new' | 'old';
} {
  const newRegime = calculateSalary(annualCTC, professionalTaxAnnual / 12, true);
  const oldRegime = calculateSalary(annualCTC, professionalTaxAnnual / 12, false);
  
  const savings = Math.abs(newRegime.inHandAnnual - oldRegime.inHandAnnual);
  const recommendedRegime = newRegime.inHandAnnual >= oldRegime.inHandAnnual ? 'new' : 'old';
  
  return {
    newRegime,
    oldRegime,
    savings,
    recommendedRegime,
  };
}
