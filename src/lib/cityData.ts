export interface CityData {
  name: string;
  multiplier: number;
  professionalTaxMonthly: number;
  costOfLivingIndex: 'Low' | 'Medium' | 'High' | 'Very High';
  topCompanies: string[];
}

export const cityData: CityData[] = [
  {
    name: 'Bangalore',
    multiplier: 1.0,
    professionalTaxMonthly: 200,
    costOfLivingIndex: 'High',
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'Wipro'],
  },
  {
    name: 'Mumbai',
    multiplier: 1.1,
    professionalTaxMonthly: 200,
    costOfLivingIndex: 'Very High',
    topCompanies: ['TCS', 'Reliance Jio', 'Amazon', 'Goldman Sachs', 'Accenture'],
  },
  {
    name: 'Delhi NCR',
    multiplier: 0.95,
    professionalTaxMonthly: 0,
    costOfLivingIndex: 'High',
    topCompanies: ['Google', 'Microsoft', 'Adobe', 'Paytm', 'MakeMyTrip'],
  },
  {
    name: 'Hyderabad',
    multiplier: 0.95,
    professionalTaxMonthly: 150,
    costOfLivingIndex: 'Medium',
    topCompanies: ['Microsoft', 'Google', 'Amazon', 'Facebook', 'Salesforce'],
  },
  {
    name: 'Pune',
    multiplier: 0.9,
    professionalTaxMonthly: 200,
    costOfLivingIndex: 'Medium',
    topCompanies: ['Infosys', 'Wipro', 'TCS', 'Bajaj Finserv', 'Persistent'],
  },
  {
    name: 'Chennai',
    multiplier: 0.85,
    professionalTaxMonthly: 150,
    costOfLivingIndex: 'Medium',
    topCompanies: ['Zoho', 'Freshworks', 'Amazon', 'HCL', 'Cognizant'],
  },
  {
    name: 'Kolkata',
    multiplier: 0.75,
    professionalTaxMonthly: 150,
    costOfLivingIndex: 'Low',
    topCompanies: ['TCS', 'Wipro', 'Tech Mahindra', 'Cognizant', 'IBM'],
  },
  {
    name: 'Ahmedabad',
    multiplier: 0.8,
    professionalTaxMonthly: 200,
    costOfLivingIndex: 'Low',
    topCompanies: ['Tata Motors', 'Adani Group', 'Zydus Cadila', 'Nirma', 'Torrent'],
  },
  {
    name: 'Jaipur',
    multiplier: 0.75,
    professionalTaxMonthly: 0,
    costOfLivingIndex: 'Low',
    topCompanies: ['TCS', 'Wipro', 'Infopark', 'SEZ units'],
  },
  {
    name: 'Indore',
    multiplier: 0.7,
    professionalTaxMonthly: 150,
    costOfLivingIndex: 'Low',
    topCompanies: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Tech Mahindra'],
  },
];

export function getCityByName(name: string): CityData | undefined {
  return cityData.find(city => city.name === name);
}

export function getAllCityNames(): string[] {
  return cityData.map(city => city.name);
}
