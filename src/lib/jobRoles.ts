export interface JobRole {
  name: string;
  slug: string;
}

export const jobRoles: JobRole[] = [
  { name: 'Software Engineer', slug: 'software-engineer' },
  { name: 'Frontend Developer', slug: 'frontend-developer' },
  { name: 'Backend Developer', slug: 'backend-developer' },
  { name: 'Full Stack Developer', slug: 'full-stack-developer' },
  { name: 'Data Analyst', slug: 'data-analyst' },
  { name: 'Data Scientist', slug: 'data-scientist' },
  { name: 'DevOps Engineer', slug: 'devops-engineer' },
  { name: 'Product Manager', slug: 'product-manager' },
  { name: 'UI/UX Designer', slug: 'ui-ux-designer' },
  { name: 'Business Analyst', slug: 'business-analyst' },
  { name: 'QA Engineer', slug: 'qa-engineer' },
  { name: 'Project Manager', slug: 'project-manager' },
  { name: 'Marketing Manager', slug: 'marketing-manager' },
  { name: 'HR Manager', slug: 'hr-manager' },
  { name: 'Sales Manager', slug: 'sales-manager' },
  { name: 'Financial Analyst', slug: 'financial-analyst' },
  { name: 'Chartered Accountant', slug: 'chartered-accountant' },
  { name: 'Civil Engineer', slug: 'civil-engineer' },
  { name: 'Mechanical Engineer', slug: 'mechanical-engineer' },
  { name: 'Graphic Designer', slug: 'graphic-designer' },
  { name: 'Content Writer', slug: 'content-writer' },
  { name: 'Digital Marketing Executive', slug: 'digital-marketing-executive' },
  { name: 'Operations Manager', slug: 'operations-manager' },
  { name: 'Customer Support Executive', slug: 'customer-support-executive' },
  { name: 'React Developer', slug: 'react-developer' },
  { name: 'Node.js Developer', slug: 'nodejs-developer' },
  { name: 'Python Developer', slug: 'python-developer' },
  { name: 'Java Developer', slug: 'java-developer' },
  { name: 'Android Developer', slug: 'android-developer' },
  { name: 'iOS Developer', slug: 'ios-developer' },
  { name: 'Machine Learning Engineer', slug: 'machine-learning-engineer' },
  { name: 'Cloud Architect', slug: 'cloud-architect' },
  { name: 'Cybersecurity Analyst', slug: 'cybersecurity-analyst' },
  { name: 'Network Engineer', slug: 'network-engineer' },
  { name: 'Database Administrator', slug: 'database-administrator' },
  { name: 'Scrum Master', slug: 'scrum-master' },
  { name: 'Technical Lead', slug: 'technical-lead' },
  { name: 'Engineering Manager', slug: 'engineering-manager' },
  { name: 'CTO', slug: 'cto' },
  { name: 'VP Engineering', slug: 'vp-engineering' },
  { name: 'Management Consultant', slug: 'management-consultant' },
  { name: 'Investment Banker', slug: 'investment-banker' },
  { name: 'Supply Chain Manager', slug: 'supply-chain-manager' },
  { name: 'Logistics Manager', slug: 'logistics-manager' },
  { name: 'Pharmacist', slug: 'pharmacist' },
  { name: 'Doctor (MBBS)', slug: 'doctor-mbbs' },
  { name: 'Dentist', slug: 'dentist' },
  { name: 'Nurse', slug: 'nurse' },
  { name: 'School Teacher', slug: 'school-teacher' },
  { name: 'College Professor', slug: 'college-professor' },
  { name: 'Lawyer', slug: 'lawyer' },
  { name: 'Architect', slug: 'architect' },
];

export function getRoleBySlug(slug: string): JobRole | undefined {
  return jobRoles.find(role => role.slug === slug);
}

export function getAllRoleSlugs(): string[] {
  return jobRoles.map(role => role.slug);
}
