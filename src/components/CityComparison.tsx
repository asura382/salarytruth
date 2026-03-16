'use client';

import { cityData } from '@/lib/cityData';
import { getSalaryRange } from '@/lib/salaryData';
import { calculateSalary } from '@/lib/taxCalculator';

interface CityComparisonProps {
  roleSlug: string;
  experienceLevel: 'fresher' | 'mid' | 'senior' | 'lead';
  companyType: 'startup' | 'midsize' | 'mnc';
  selectedCity: string;
}

export default function CityComparison({ 
  roleSlug, 
  experienceLevel, 
  companyType,
  selectedCity 
}: CityComparisonProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCityData = (city: typeof cityData[0]) => {
    const range = getSalaryRange(roleSlug, experienceLevel, companyType);
    if (!range) return null;

    // Apply city multiplier
    const minCTC = range.min * city.multiplier;
    const maxCTC = range.max * city.multiplier;
    const avgCTC = (minCTC + maxCTC) / 2;

    // Calculate in-hand for average CTC
    const calculation = calculateSalary(
      avgCTC * 100000,
      city.professionalTaxMonthly,
      true
    );

    return {
      name: city.name,
      minCTC,
      maxCTC,
      inHandMonthly: calculation.inHandMonthly,
      costOfLiving: city.costOfLivingIndex,
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Same Role, Different Cities — How Do You Compare?
      </h3>
      <p className="text-gray-600 mb-6">
        Salary expectations vary by location. Here&apos;s how your selected city compares to others.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">City</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Expected CTC</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">In-Hand/Month</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cost of Living</th>
            </tr>
          </thead>
          <tbody>
            {cityData.map((city) => {
              const data = getCityData(city);
              if (!data) return null;

              const isSelected = city.name === selectedCity;

              return (
                <tr
                  key={city.name}
                  className={`border-b border-gray-100 transition-colors ${
                    isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {city.name}
                      </span>
                      {isSelected && (
                        <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      ₹{data.minCTC.toFixed(1)}L - ₹{data.maxCTC.toFixed(1)}L
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {formatCurrency(data.inHandMonthly)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        data.costOfLiving === 'Very High'
                          ? 'bg-red-100 text-red-800'
                          : data.costOfLiving === 'High'
                          ? 'bg-orange-100 text-orange-800'
                          : data.costOfLiving === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {data.costOfLiving}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Note: Salaries are adjusted based on city-specific market rates and cost of living.
        Actual salaries may vary based on company, skills, and negotiation.
      </p>
    </div>
  );
}
