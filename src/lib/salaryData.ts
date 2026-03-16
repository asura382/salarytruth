export interface SalaryRange {
  min: number; // in Lakhs
  max: number; // in Lakhs
}

export interface ExperienceLevel {
  fresher: { startup: SalaryRange; midsize: SalaryRange; mnc: SalaryRange };
  mid: { startup: SalaryRange; midsize: SalaryRange; mnc: SalaryRange };
  senior: { startup: SalaryRange; midsize: SalaryRange; mnc: SalaryRange };
  lead: { startup: SalaryRange; midsize: SalaryRange; mnc: SalaryRange };
}

export type RoleSalaryData = Record<string, ExperienceLevel>;

export const salaryData: RoleSalaryData = {
  'software-engineer': {
    fresher: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
    lead: { startup: { min: 32, max: 50 }, midsize: { min: 38, max: 60 }, mnc: { min: 45, max: 75 } },
  },
  'frontend-developer': {
    fresher: { startup: { min: 3, max: 7 }, midsize: { min: 3.5, max: 9 }, mnc: { min: 4.5, max: 11 } },
    mid: { startup: { min: 7, max: 16 }, midsize: { min: 9, max: 20 }, mnc: { min: 11, max: 25 } },
    senior: { startup: { min: 16, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 42 } },
    lead: { startup: { min: 28, max: 45 }, midsize: { min: 35, max: 55 }, mnc: { min: 42, max: 70 } },
  },
  'backend-developer': {
    fresher: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
    lead: { startup: { min: 32, max: 50 }, midsize: { min: 38, max: 60 }, mnc: { min: 45, max: 75 } },
  },
  'full-stack-developer': {
    fresher: { startup: { min: 4, max: 9 }, midsize: { min: 4.5, max: 11 }, mnc: { min: 5.5, max: 13 } },
    mid: { startup: { min: 9, max: 20 }, midsize: { min: 11, max: 24 }, mnc: { min: 13, max: 30 } },
    senior: { startup: { min: 20, max: 35 }, midsize: { min: 24, max: 42 }, mnc: { min: 30, max: 50 } },
    lead: { startup: { min: 35, max: 55 }, midsize: { min: 42, max: 65 }, mnc: { min: 50, max: 80 } },
  },
  'data-analyst': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 17 }, mnc: { min: 9, max: 20 } },
    senior: { startup: { min: 14, max: 24 }, midsize: { min: 17, max: 30 }, mnc: { min: 20, max: 35 } },
    lead: { startup: { min: 24, max: 40 }, midsize: { min: 30, max: 50 }, mnc: { min: 35, max: 60 } },
  },
  'data-scientist': {
    fresher: { startup: { min: 4, max: 9 }, midsize: { min: 5, max: 11 }, mnc: { min: 6, max: 14 } },
    mid: { startup: { min: 9, max: 20 }, midsize: { min: 11, max: 25 }, mnc: { min: 14, max: 32 } },
    senior: { startup: { min: 20, max: 38 }, midsize: { min: 25, max: 45 }, mnc: { min: 32, max: 55 } },
    lead: { startup: { min: 38, max: 60 }, midsize: { min: 45, max: 70 }, mnc: { min: 55, max: 85 } },
  },
  'devops-engineer': {
    fresher: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 40 }, mnc: { min: 28, max: 48 } },
    lead: { startup: { min: 32, max: 50 }, midsize: { min: 40, max: 60 }, mnc: { min: 48, max: 75 } },
  },
  'product-manager': {
    fresher: { startup: { min: 5, max: 10 }, midsize: { min: 6, max: 12 }, mnc: { min: 8, max: 15 } },
    mid: { startup: { min: 10, max: 22 }, midsize: { min: 12, max: 28 }, mnc: { min: 15, max: 35 } },
    senior: { startup: { min: 22, max: 40 }, midsize: { min: 28, max: 50 }, mnc: { min: 35, max: 60 } },
    lead: { startup: { min: 40, max: 65 }, midsize: { min: 50, max: 80 }, mnc: { min: 60, max: 100 } },
  },
  'ui-ux-designer': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 18 }, mnc: { min: 9, max: 22 } },
    senior: { startup: { min: 14, max: 25 }, midsize: { min: 18, max: 32 }, mnc: { min: 22, max: 38 } },
    lead: { startup: { min: 25, max: 40 }, midsize: { min: 32, max: 50 }, mnc: { min: 38, max: 60 } },
  },
  'business-analyst': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 17 }, mnc: { min: 9, max: 20 } },
    senior: { startup: { min: 14, max: 24 }, midsize: { min: 17, max: 30 }, mnc: { min: 20, max: 35 } },
    lead: { startup: { min: 24, max: 40 }, midsize: { min: 30, max: 50 }, mnc: { min: 35, max: 60 } },
  },
  'qa-engineer': {
    fresher: { startup: { min: 2.5, max: 5 }, midsize: { min: 3, max: 6.5 }, mnc: { min: 3.5, max: 8 } },
    mid: { startup: { min: 5, max: 12 }, midsize: { min: 6.5, max: 15 }, mnc: { min: 8, max: 18 } },
    senior: { startup: { min: 12, max: 22 }, midsize: { min: 15, max: 28 }, mnc: { min: 18, max: 32 } },
    lead: { startup: { min: 22, max: 35 }, midsize: { min: 28, max: 42 }, mnc: { min: 32, max: 50 } },
  },
  'project-manager': {
    fresher: { startup: { min: 4, max: 8 }, midsize: { min: 5, max: 10 }, mnc: { min: 6, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 40 }, mnc: { min: 28, max: 50 } },
    lead: { startup: { min: 32, max: 55 }, midsize: { min: 40, max: 65 }, mnc: { min: 50, max: 80 } },
  },
  'marketing-manager': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 18 }, mnc: { min: 9, max: 22 } },
    senior: { startup: { min: 14, max: 25 }, midsize: { min: 18, max: 32 }, mnc: { min: 22, max: 40 } },
    lead: { startup: { min: 25, max: 45 }, midsize: { min: 32, max: 55 }, mnc: { min: 40, max: 70 } },
  },
  'hr-manager': {
    fresher: { startup: { min: 2.5, max: 5 }, midsize: { min: 3, max: 6 }, mnc: { min: 3.5, max: 7.5 } },
    mid: { startup: { min: 5, max: 12 }, midsize: { min: 6, max: 15 }, mnc: { min: 7.5, max: 18 } },
    senior: { startup: { min: 12, max: 22 }, midsize: { min: 15, max: 28 }, mnc: { min: 18, max: 35 } },
    lead: { startup: { min: 22, max: 38 }, midsize: { min: 28, max: 45 }, mnc: { min: 35, max: 55 } },
  },
  'sales-manager': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 18 }, mnc: { min: 9, max: 22 } },
    senior: { startup: { min: 14, max: 28 }, midsize: { min: 18, max: 35 }, mnc: { min: 22, max: 45 } },
    lead: { startup: { min: 28, max: 50 }, midsize: { min: 35, max: 60 }, mnc: { min: 45, max: 80 } },
  },
  'financial-analyst': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 17 }, mnc: { min: 9, max: 20 } },
    senior: { startup: { min: 14, max: 24 }, midsize: { min: 17, max: 30 }, mnc: { min: 20, max: 35 } },
    lead: { startup: { min: 24, max: 40 }, midsize: { min: 30, max: 50 }, mnc: { min: 35, max: 60 } },
  },
  'chartered-accountant': {
    fresher: { startup: { min: 4, max: 7 }, midsize: { min: 5, max: 9 }, mnc: { min: 6, max: 11 } },
    mid: { startup: { min: 7, max: 15 }, midsize: { min: 9, max: 20 }, mnc: { min: 11, max: 25 } },
    senior: { startup: { min: 15, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 45 } },
    lead: { startup: { min: 28, max: 50 }, midsize: { min: 35, max: 60 }, mnc: { min: 45, max: 80 } },
  },
  'civil-engineer': {
    fresher: { startup: { min: 2.5, max: 5 }, midsize: { min: 3, max: 6 }, mnc: { min: 3.5, max: 7 } },
    mid: { startup: { min: 5, max: 12 }, midsize: { min: 6, max: 15 }, mnc: { min: 7, max: 18 } },
    senior: { startup: { min: 12, max: 22 }, midsize: { min: 15, max: 28 }, mnc: { min: 18, max: 35 } },
    lead: { startup: { min: 22, max: 38 }, midsize: { min: 28, max: 45 }, mnc: { min: 35, max: 55 } },
  },
  'mechanical-engineer': {
    fresher: { startup: { min: 2.5, max: 5 }, midsize: { min: 3, max: 6 }, mnc: { min: 3.5, max: 7 } },
    mid: { startup: { min: 5, max: 12 }, midsize: { min: 6, max: 15 }, mnc: { min: 7, max: 18 } },
    senior: { startup: { min: 12, max: 22 }, midsize: { min: 15, max: 28 }, mnc: { min: 18, max: 35 } },
    lead: { startup: { min: 22, max: 38 }, midsize: { min: 28, max: 45 }, mnc: { min: 35, max: 55 } },
  },
  'graphic-designer': {
    fresher: { startup: { min: 2, max: 4 }, midsize: { min: 2.5, max: 5 }, mnc: { min: 3, max: 6 } },
    mid: { startup: { min: 4, max: 10 }, midsize: { min: 5, max: 12 }, mnc: { min: 6, max: 15 } },
    senior: { startup: { min: 10, max: 18 }, midsize: { min: 12, max: 22 }, mnc: { min: 15, max: 28 } },
    lead: { startup: { min: 18, max: 30 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
  },
  'content-writer': {
    fresher: { startup: { min: 2, max: 4 }, midsize: { min: 2.5, max: 5 }, mnc: { min: 3, max: 6 } },
    mid: { startup: { min: 4, max: 10 }, midsize: { min: 5, max: 12 }, mnc: { min: 6, max: 15 } },
    senior: { startup: { min: 10, max: 18 }, midsize: { min: 12, max: 22 }, mnc: { min: 15, max: 28 } },
    lead: { startup: { min: 18, max: 30 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
  },
  'digital-marketing-executive': {
    fresher: { startup: { min: 2, max: 4 }, midsize: { min: 2.5, max: 5 }, mnc: { min: 3, max: 6 } },
    mid: { startup: { min: 4, max: 10 }, midsize: { min: 5, max: 12 }, mnc: { min: 6, max: 15 } },
    senior: { startup: { min: 10, max: 18 }, midsize: { min: 12, max: 22 }, mnc: { min: 15, max: 28 } },
    lead: { startup: { min: 18, max: 30 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
  },
  'operations-manager': {
    fresher: { startup: { min: 3.5, max: 7 }, midsize: { min: 4, max: 8.5 }, mnc: { min: 5, max: 10 } },
    mid: { startup: { min: 7, max: 16 }, midsize: { min: 8.5, max: 20 }, mnc: { min: 10, max: 25 } },
    senior: { startup: { min: 16, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 42 } },
    lead: { startup: { min: 28, max: 45 }, midsize: { min: 35, max: 55 }, mnc: { min: 42, max: 70 } },
  },
  'customer-support-executive': {
    fresher: { startup: { min: 2, max: 3.5 }, midsize: { min: 2.5, max: 4 }, mnc: { min: 3, max: 5 } },
    mid: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    senior: { startup: { min: 8, max: 14 }, midsize: { min: 10, max: 18 }, mnc: { min: 12, max: 22 } },
    lead: { startup: { min: 14, max: 24 }, midsize: { min: 18, max: 30 }, mnc: { min: 22, max: 38 } },
  },
  'react-developer': {
    fresher: { startup: { min: 3, max: 7 }, midsize: { min: 3.5, max: 9 }, mnc: { min: 4.5, max: 11 } },
    mid: { startup: { min: 7, max: 16 }, midsize: { min: 9, max: 20 }, mnc: { min: 11, max: 25 } },
    senior: { startup: { min: 16, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 42 } },
    lead: { startup: { min: 28, max: 45 }, midsize: { min: 35, max: 55 }, mnc: { min: 42, max: 70 } },
  },
  'nodejs-developer': {
    fresher: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
    lead: { startup: { min: 32, max: 50 }, midsize: { min: 38, max: 60 }, mnc: { min: 45, max: 75 } },
  },
  'python-developer': {
    fresher: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
    lead: { startup: { min: 32, max: 50 }, midsize: { min: 38, max: 60 }, mnc: { min: 45, max: 75 } },
  },
  'java-developer': {
    fresher: { startup: { min: 3, max: 7 }, midsize: { min: 3.5, max: 9 }, mnc: { min: 4.5, max: 11 } },
    mid: { startup: { min: 7, max: 16 }, midsize: { min: 9, max: 20 }, mnc: { min: 11, max: 25 } },
    senior: { startup: { min: 16, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 42 } },
    lead: { startup: { min: 28, max: 45 }, midsize: { min: 35, max: 55 }, mnc: { min: 42, max: 70 } },
  },
  'android-developer': {
    fresher: { startup: { min: 3, max: 7 }, midsize: { min: 3.5, max: 9 }, mnc: { min: 4.5, max: 11 } },
    mid: { startup: { min: 7, max: 16 }, midsize: { min: 9, max: 20 }, mnc: { min: 11, max: 25 } },
    senior: { startup: { min: 16, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 42 } },
    lead: { startup: { min: 28, max: 45 }, midsize: { min: 35, max: 55 }, mnc: { min: 42, max: 70 } },
  },
  'ios-developer': {
    fresher: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
    lead: { startup: { min: 32, max: 50 }, midsize: { min: 38, max: 60 }, mnc: { min: 45, max: 75 } },
  },
  'machine-learning-engineer': {
    fresher: { startup: { min: 4.5, max: 10 }, midsize: { min: 5.5, max: 12 }, mnc: { min: 7, max: 15 } },
    mid: { startup: { min: 10, max: 22 }, midsize: { min: 12, max: 28 }, mnc: { min: 15, max: 35 } },
    senior: { startup: { min: 22, max: 40 }, midsize: { min: 28, max: 50 }, mnc: { min: 35, max: 60 } },
    lead: { startup: { min: 40, max: 65 }, midsize: { min: 50, max: 80 }, mnc: { min: 60, max: 100 } },
  },
  'cloud-architect': {
    fresher: { startup: { min: 5, max: 10 }, midsize: { min: 6, max: 12 }, mnc: { min: 8, max: 15 } },
    mid: { startup: { min: 10, max: 22 }, midsize: { min: 12, max: 28 }, mnc: { min: 15, max: 35 } },
    senior: { startup: { min: 22, max: 40 }, midsize: { min: 28, max: 50 }, mnc: { min: 35, max: 60 } },
    lead: { startup: { min: 40, max: 65 }, midsize: { min: 50, max: 80 }, mnc: { min: 60, max: 100 } },
  },
  'cybersecurity-analyst': {
    fresher: { startup: { min: 4, max: 8 }, midsize: { min: 5, max: 10 }, mnc: { min: 6, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 40 }, mnc: { min: 28, max: 48 } },
    lead: { startup: { min: 32, max: 50 }, midsize: { min: 40, max: 60 }, mnc: { min: 48, max: 75 } },
  },
  'network-engineer': {
    fresher: { startup: { min: 2.5, max: 5 }, midsize: { min: 3, max: 6.5 }, mnc: { min: 3.5, max: 8 } },
    mid: { startup: { min: 5, max: 12 }, midsize: { min: 6.5, max: 15 }, mnc: { min: 8, max: 18 } },
    senior: { startup: { min: 12, max: 22 }, midsize: { min: 15, max: 28 }, mnc: { min: 18, max: 32 } },
    lead: { startup: { min: 22, max: 35 }, midsize: { min: 28, max: 42 }, mnc: { min: 32, max: 50 } },
  },
  'database-administrator': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 17 }, mnc: { min: 9, max: 20 } },
    senior: { startup: { min: 14, max: 24 }, midsize: { min: 17, max: 30 }, mnc: { min: 20, max: 35 } },
    lead: { startup: { min: 24, max: 40 }, midsize: { min: 30, max: 50 }, mnc: { min: 35, max: 60 } },
  },
  'scrum-master': {
    fresher: { startup: { min: 4, max: 8 }, midsize: { min: 5, max: 10 }, mnc: { min: 6, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 40 }, mnc: { min: 28, max: 50 } },
    lead: { startup: { min: 32, max: 55 }, midsize: { min: 40, max: 65 }, mnc: { min: 50, max: 80 } },
  },
  'technical-lead': {
    fresher: { startup: { min: 5, max: 10 }, midsize: { min: 6, max: 12 }, mnc: { min: 8, max: 15 } },
    mid: { startup: { min: 10, max: 22 }, midsize: { min: 12, max: 28 }, mnc: { min: 15, max: 35 } },
    senior: { startup: { min: 22, max: 40 }, midsize: { min: 28, max: 50 }, mnc: { min: 35, max: 60 } },
    lead: { startup: { min: 40, max: 65 }, midsize: { min: 50, max: 80 }, mnc: { min: 60, max: 100 } },
  },
  'engineering-manager': {
    fresher: { startup: { min: 6, max: 12 }, midsize: { min: 8, max: 15 }, mnc: { min: 10, max: 18 } },
    mid: { startup: { min: 12, max: 28 }, midsize: { min: 15, max: 35 }, mnc: { min: 18, max: 45 } },
    senior: { startup: { min: 28, max: 50 }, midsize: { min: 35, max: 60 }, mnc: { min: 45, max: 75 } },
    lead: { startup: { min: 50, max: 80 }, midsize: { min: 60, max: 95 }, mnc: { min: 75, max: 120 } },
  },
  'cto': {
    fresher: { startup: { min: 10, max: 20 }, midsize: { min: 15, max: 30 }, mnc: { min: 20, max: 40 } },
    mid: { startup: { min: 20, max: 45 }, midsize: { min: 30, max: 60 }, mnc: { min: 40, max: 80 } },
    senior: { startup: { min: 45, max: 80 }, midsize: { min: 60, max: 100 }, mnc: { min: 80, max: 150 } },
    lead: { startup: { min: 80, max: 150 }, midsize: { min: 100, max: 200 }, mnc: { min: 150, max: 300 } },
  },
  'vp-engineering': {
    fresher: { startup: { min: 12, max: 25 }, midsize: { min: 18, max: 35 }, mnc: { min: 25, max: 50 } },
    mid: { startup: { min: 25, max: 55 }, midsize: { min: 35, max: 75 }, mnc: { min: 50, max: 100 } },
    senior: { startup: { min: 55, max: 100 }, midsize: { min: 75, max: 150 }, mnc: { min: 100, max: 200 } },
    lead: { startup: { min: 100, max: 200 }, midsize: { min: 150, max: 300 }, mnc: { min: 200, max: 400 } },
  },
  'management-consultant': {
    fresher: { startup: { min: 4, max: 8 }, midsize: { min: 5, max: 10 }, mnc: { min: 6, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 22 }, mnc: { min: 12, max: 28 } },
    senior: { startup: { min: 18, max: 32 }, midsize: { min: 22, max: 40 }, mnc: { min: 28, max: 50 } },
    lead: { startup: { min: 32, max: 55 }, midsize: { min: 40, max: 65 }, mnc: { min: 50, max: 80 } },
  },
  'investment-banker': {
    fresher: { startup: { min: 6, max: 12 }, midsize: { min: 8, max: 15 }, mnc: { min: 10, max: 20 } },
    mid: { startup: { min: 12, max: 30 }, midsize: { min: 15, max: 40 }, mnc: { min: 20, max: 50 } },
    senior: { startup: { min: 30, max: 60 }, midsize: { min: 40, max: 80 }, mnc: { min: 50, max: 100 } },
    lead: { startup: { min: 60, max: 120 }, midsize: { min: 80, max: 150 }, mnc: { min: 100, max: 200 } },
  },
  'supply-chain-manager': {
    fresher: { startup: { min: 3.5, max: 7 }, midsize: { min: 4, max: 8.5 }, mnc: { min: 5, max: 10 } },
    mid: { startup: { min: 7, max: 16 }, midsize: { min: 8.5, max: 20 }, mnc: { min: 10, max: 25 } },
    senior: { startup: { min: 16, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 42 } },
    lead: { startup: { min: 28, max: 45 }, midsize: { min: 35, max: 55 }, mnc: { min: 42, max: 70 } },
  },
  'logistics-manager': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 3.5, max: 7.5 }, mnc: { min: 4, max: 9 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 7.5, max: 18 }, mnc: { min: 9, max: 22 } },
    senior: { startup: { min: 14, max: 25 }, midsize: { min: 18, max: 32 }, mnc: { min: 22, max: 40 } },
    lead: { startup: { min: 25, max: 45 }, midsize: { min: 32, max: 55 }, mnc: { min: 40, max: 70 } },
  },
  'pharmacist': {
    fresher: { startup: { min: 2.5, max: 4 }, midsize: { min: 3, max: 5 }, mnc: { min: 3.5, max: 6 } },
    mid: { startup: { min: 4, max: 10 }, midsize: { min: 5, max: 12 }, mnc: { min: 6, max: 15 } },
    senior: { startup: { min: 10, max: 18 }, midsize: { min: 12, max: 22 }, mnc: { min: 15, max: 28 } },
    lead: { startup: { min: 18, max: 30 }, midsize: { min: 22, max: 38 }, mnc: { min: 28, max: 45 } },
  },
  'doctor-mbbs': {
    fresher: { startup: { min: 4, max: 8 }, midsize: { min: 5, max: 10 }, mnc: { min: 6, max: 12 } },
    mid: { startup: { min: 8, max: 18 }, midsize: { min: 10, max: 25 }, mnc: { min: 12, max: 30 } },
    senior: { startup: { min: 18, max: 35 }, midsize: { min: 25, max: 50 }, mnc: { min: 30, max: 60 } },
    lead: { startup: { min: 35, max: 60 }, midsize: { min: 50, max: 80 }, mnc: { min: 60, max: 100 } },
  },
  'dentist': {
    fresher: { startup: { min: 3, max: 6 }, midsize: { min: 4, max: 8 }, mnc: { min: 5, max: 10 } },
    mid: { startup: { min: 6, max: 14 }, midsize: { min: 8, max: 20 }, mnc: { min: 10, max: 25 } },
    senior: { startup: { min: 14, max: 28 }, midsize: { min: 20, max: 40 }, mnc: { min: 25, max: 50 } },
    lead: { startup: { min: 28, max: 50 }, midsize: { min: 40, max: 70 }, mnc: { min: 50, max: 90 } },
  },
  'nurse': {
    fresher: { startup: { min: 2, max: 3.5 }, midsize: { min: 2.5, max: 4 }, mnc: { min: 3, max: 5 } },
    mid: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    senior: { startup: { min: 8, max: 14 }, midsize: { min: 10, max: 18 }, mnc: { min: 12, max: 22 } },
    lead: { startup: { min: 14, max: 24 }, midsize: { min: 18, max: 30 }, mnc: { min: 22, max: 38 } },
  },
  'school-teacher': {
    fresher: { startup: { min: 2, max: 3.5 }, midsize: { min: 2.5, max: 4 }, mnc: { min: 3, max: 5 } },
    mid: { startup: { min: 3.5, max: 8 }, midsize: { min: 4, max: 10 }, mnc: { min: 5, max: 12 } },
    senior: { startup: { min: 8, max: 14 }, midsize: { min: 10, max: 18 }, mnc: { min: 12, max: 22 } },
    lead: { startup: { min: 14, max: 24 }, midsize: { min: 18, max: 30 }, mnc: { min: 22, max: 38 } },
  },
  'college-professor': {
    fresher: { startup: { min: 4, max: 7 }, midsize: { min: 5, max: 9 }, mnc: { min: 6, max: 11 } },
    mid: { startup: { min: 7, max: 15 }, midsize: { min: 9, max: 20 }, mnc: { min: 11, max: 25 } },
    senior: { startup: { min: 15, max: 28 }, midsize: { min: 20, max: 35 }, mnc: { min: 25, max: 45 } },
    lead: { startup: { min: 28, max: 50 }, midsize: { min: 35, max: 60 }, mnc: { min: 45, max: 80 } },
  },
  'lawyer': {
    fresher: { startup: { min: 2.5, max: 5 }, midsize: { min: 3, max: 6 }, mnc: { min: 4, max: 8 } },
    mid: { startup: { min: 5, max: 12 }, midsize: { min: 6, max: 15 }, mnc: { min: 8, max: 20 } },
    senior: { startup: { min: 12, max: 25 }, midsize: { min: 15, max: 35 }, mnc: { min: 20, max: 50 } },
    lead: { startup: { min: 25, max: 50 }, midsize: { min: 35, max: 70 }, mnc: { min: 50, max: 100 } },
  },
  'architect': {
    fresher: { startup: { min: 2.5, max: 5 }, midsize: { min: 3, max: 6 }, mnc: { min: 3.5, max: 7 } },
    mid: { startup: { min: 5, max: 12 }, midsize: { min: 6, max: 15 }, mnc: { min: 7, max: 18 } },
    senior: { startup: { min: 12, max: 22 }, midsize: { min: 15, max: 28 }, mnc: { min: 18, max: 35 } },
    lead: { startup: { min: 22, max: 38 }, midsize: { min: 28, max: 45 }, mnc: { min: 35, max: 55 } },
  },
};

export function getSalaryRange(
  roleSlug: string,
  experienceLevel: 'fresher' | 'mid' | 'senior' | 'lead',
  companyType: 'startup' | 'midsize' | 'mnc' | 'government' | 'private' | 'clinic' | 'international' | 'lawfirm' | 'corporate' | 'bank' | 'freelance'
): SalaryRange | undefined {
  const roleData = salaryData[roleSlug]
  if (!roleData) return undefined
  
  // Map new company types to base types for backward compatibility
  const mappedCompanyType = mapCompanyType(companyType)
  
  return roleData[experienceLevel][mappedCompanyType]
}

// Map new company type values to base types with multipliers
function mapCompanyType(companyType: string): 'startup' | 'midsize' | 'mnc' {
  switch (companyType) {
    case 'government':
    case 'psu':
      return 'midsize' // Use midsize as base, will apply multiplier
    case 'private':
    case 'bank':
    case 'lawfirm':
      return 'midsize'
    case 'clinic':
    case 'freelance':
      return 'startup'
    case 'international':
    case 'corporate':
    case 'MNC':  // Handle uppercase MNC
      return 'mnc'
    default:
      // Convert to lowercase for safety
      const lowerType = companyType.toLowerCase() as 'startup' | 'midsize' | 'mnc'
      return lowerType
  }
}
