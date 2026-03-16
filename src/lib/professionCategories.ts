export type ProfessionCategory = 
  | "tech"
  | "medical" 
  | "education"
  | "legal"
  | "finance"
  | "engineering"
  | "creative"
  | "business"

export type CompanyOption = {
  value: string
  label: string
}

// Map each profession category to its company types
export const COMPANY_OPTIONS: Record<ProfessionCategory, CompanyOption[]> = {
  tech: [
    { value: "startup", label: "Startup" },
    { value: "midsize", label: "Mid-size Company" },
    { value: "MNC", label: "MNC / Large Corp" }
  ],
  medical: [
    { value: "government", label: "Government Hospital" },
    { value: "private", label: "Private Hospital" },
    { value: "clinic", label: "Clinic / Community Center" }
  ],
  education: [
    { value: "government", label: "Government School/College" },
    { value: "private", label: "Private Institution" },
    { value: "international", label: "International School" }
  ],
  legal: [
    { value: "government", label: "Government / Public Sector" },
    { value: "lawfirm", label: "Law Firm" },
    { value: "corporate", label: "Corporate Legal Team" }
  ],
  finance: [
    { value: "startup", label: "Fintech Startup" },
    { value: "bank", label: "Private Bank" },
    { value: "MNC", label: "MNC / Investment Bank" }
  ],
  engineering: [
    { value: "government", label: "Government / PSU" },
    { value: "midsize", label: "Mid-size Firm" },
    { value: "MNC", label: "MNC / Large Corp" }
  ],
  creative: [
    { value: "freelance", label: "Freelance / Agency" },
    { value: "midsize", label: "Mid-size Company" },
    { value: "MNC", label: "Large Corp / MNC" }
  ],
  business: [
    { value: "startup", label: "Startup" },
    { value: "midsize", label: "Mid-size Company" },
    { value: "MNC", label: "MNC / Large Corp" }
  ]
}

// Map each job role slug to its category
export const ROLE_CATEGORY: Record<string, ProfessionCategory> = {
  // Tech
  "software-engineer": "tech",
  "frontend-developer": "tech",
  "backend-developer": "tech",
  "full-stack-developer": "tech",
  "devops-engineer": "tech",
  "react-developer": "tech",
  "nodejs-developer": "tech",
  "python-developer": "tech",
  "java-developer": "tech",
  "android-developer": "tech",
  "ios-developer": "tech",
  "machine-learning-engineer": "tech",
  "cloud-architect": "tech",
  "cybersecurity-analyst": "tech",
  "network-engineer": "tech",
  "database-administrator": "tech",
  "qa-engineer": "tech",
  "technical-lead": "tech",
  "engineering-manager": "tech",
  "cto": "tech",
  "vp-engineering": "tech",

  // Medical
  "doctor-mbbs": "medical",
  "dentist": "medical",
  "nurse": "medical",
  "pharmacist": "medical",

  // Education
  "school-teacher": "education",
  "college-professor": "education",

  // Legal
  "lawyer": "legal",

  // Finance
  "financial-analyst": "finance",
  "chartered-accountant": "finance",
  "investment-banker": "finance",

  // Engineering (non-tech)
  "civil-engineer": "engineering",
  "mechanical-engineer": "engineering",

  // Creative
  "ui-ux-designer": "creative",
  "graphic-designer": "creative",
  "content-writer": "creative",
  "architect": "creative",

  // Business
  "data-analyst": "business",
  "data-scientist": "business",
  "product-manager": "business",
  "project-manager": "business",
  "business-analyst": "business",
  "scrum-master": "business",
  "marketing-manager": "business",
  "hr-manager": "business",
  "sales-manager": "business",
  "operations-manager": "business",
  "supply-chain-manager": "business",
  "logistics-manager": "business",
  "management-consultant": "business",
  "customer-support-executive": "business",
  "digital-marketing-executive": "business"
}

// Helper function to get company options for a role
export const getCompanyOptions = (roleSlug: string): CompanyOption[] => {
  const category = ROLE_CATEGORY[roleSlug] || "business"
  return COMPANY_OPTIONS[category]
}

// Get default company value for a role
export const getDefaultCompany = (roleSlug: string): string => {
  const options = getCompanyOptions(roleSlug)
  return options[1]?.value || options[0]?.value
}
