'use client';

import { TaxCalculationResult } from '@/lib/taxCalculator';
import VerdictBadge from './VerdictBadge';

interface ResultCardProps {
  result: TaxCalculationResult;
  marketRange: { min: number; max: number };
  currentCTC?: number;
}

export default function ResultCard({ result, marketRange, currentCTC }: ResultCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatInHandMonthly = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section - The Big Number */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h3 className="text-lg font-medium opacity-90 mb-2">Your Monthly In-Hand Salary</h3>
        <p className="text-4xl md:text-5xl font-bold mb-2">
          {formatInHandMonthly(result.inHandMonthly)}
        </p>
        <p className="text-lg opacity-90">
          Annual In-Hand: {formatCurrency(result.inHandAnnual)}
        </p>
      </div>

      {/* Verdict Badge (if current CTC provided) */}
      {currentCTC && (
        <VerdictBadge
          currentSalary={currentCTC}
          marketMin={marketRange.min}
          marketMax={marketRange.max}
        />
      )}

      {/* Full Breakdown Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <h4 className="text-lg font-semibold text-gray-900 px-6 py-4 bg-gray-50 border-b border-gray-200">
          Salary Breakdown
        </h4>
        <div className="p-6 space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Gross CTC (Annual)</span>
            <span className="font-semibold text-gray-900">{formatCurrency(result.grossCTC)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Basic Salary (40%)</span>
            <span className="font-semibold text-gray-900">{formatCurrency(result.basicSalary)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">HRA (20% of Basic)</span>
            <span className="font-semibold text-gray-900">{formatCurrency(result.hra)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Special Allowance</span>
            <span className="font-semibold text-gray-900">{formatCurrency(result.specialAllowance)}</span>
          </div>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <div className="flex justify-between items-center py-2 text-red-600">
            <span className="text-gray-600">Employee PF (12%)</span>
            <span className="font-semibold">-{formatCurrency(result.employeePF)}</span>
          </div>
          <div className="flex justify-between items-center py-2 text-red-600">
            <span className="text-gray-600">Professional Tax (Monthly)</span>
            <span className="font-semibold">-{formatCurrency(result.professionalTax * 12)}</span>
          </div>
          <div className="flex justify-between items-center py-2 text-red-600">
            <span className="text-gray-600">Income Tax (Annual)</span>
            <span className="font-semibold">-{formatCurrency(result.incomeTaxAnnual)}</span>
          </div>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <div className="flex justify-between items-center py-3 bg-green-50 px-4 rounded-lg">
            <span className="font-semibold text-gray-900">Total In-Hand Annual</span>
            <span className="font-bold text-green-600 text-lg">{formatCurrency(result.inHandAnnual)}</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg">
            <span className="font-semibold text-gray-900">Monthly Take Home</span>
            <span className="font-bold text-blue-600 text-lg">{formatInHandMonthly(result.inHandMonthly)}</span>
          </div>
        </div>
      </div>

      {/* Tax Regime Comparison */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <h4 className="text-lg font-semibold text-gray-900 px-6 py-4 bg-gray-50 border-b border-gray-200">
          Tax Regime Comparison
        </h4>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border-2 ${result.betterRegime === 'new' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">New Regime</span>
                {result.betterRegime === 'new' && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Better ✓</span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.newRegimeTax)}</p>
              <p className="text-xs text-gray-500 mt-1">Annual Tax</p>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${result.betterRegime === 'old' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Old Regime</span>
                {result.betterRegime === 'old' && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Better ✓</span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.oldRegimeTax)}</p>
              <p className="text-xs text-gray-500 mt-1">Annual Tax</p>
            </div>
          </div>
          
          {result.newRegimeTax !== result.oldRegimeTax && (
            <p className="mt-4 text-center text-sm text-gray-600">
              You save{' '}
              <span className="font-semibold text-green-600">
                {formatCurrency(Math.abs(result.newRegimeTax - result.oldRegimeTax))}
              </span>{' '}
              with the {result.betterRegime === 'new' ? 'New' : 'Old'} Regime
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
