import { cityData } from "./cityData"

export interface CityComparisonData {
  city1: string
  city2: string
  salaryDifference: number
  rentDifference: number
  costOfLivingDifference: number
  inHandDifference: number
}

export function compareCities(city1Name: string, city2Name: string): CityComparisonData | null {
  const city1 = cityData.find(c => c.name === city1Name)
  const city2 = cityData.find(c => c.name === city2Name)
  
  if (!city1 || !city2) return null
  
  // Calculate differences (city1 - city2)
  // Using cost of living as a proxy for rent (both use qualitative index)
  const colDiff = city1.costOfLivingIndex === city2.costOfLivingIndex ? 0 :
    city1.costOfLivingIndex === 'Very High' ? 30 :
    city1.costOfLivingIndex === 'High' && city2.costOfLivingIndex === 'Medium' ? 20 :
    city1.costOfLivingIndex === 'High' && city2.costOfLivingIndex === 'Low' ? 40 :
    city1.costOfLivingIndex === 'Medium' && city2.costOfLivingIndex === 'Low' ? 15 : -10
  const ptDiff = city1.professionalTaxMonthly - city2.professionalTaxMonthly
  
  return {
    city1: city1Name,
    city2: city2Name,
    salaryDifference: 0, // This will be calculated based on role
    rentDifference: Math.round(colDiff),
    costOfLivingDifference: Math.round(colDiff),
    inHandDifference: Math.round(ptDiff * 12) // Annual PT difference
  }
}

// Popular city comparisons people search for
export const popularComparisons = [
  { slug: "bangalore-vs-hyderabad", city1: "Bangalore", city2: "Hyderabad", title: "Bangalore vs Hyderabad" },
  { slug: "bangalore-vs-pune", city1: "Bangalore", city2: "Pune", title: "Bangalore vs Pune" },
  { slug: "hyderabad-vs-pune", city1: "Hyderabad", city2: "Pune", title: "Hyderabad vs Pune" },
  { slug: "bangalore-vs-gurgaon", city1: "Bangalore", city2: "Gurgaon", title: "Bangalore vs Gurgaon" },
  { slug: "mumbai-vs-bangalore", city1: "Mumbai", city2: "Bangalore", title: "Mumbai vs Bangalore" },
  { slug: "delhi-vs-bangalore", city1: "Delhi", city2: "Bangalore", title: "Delhi vs Bangalore" },
]
