'use client';

interface VerdictBadgeProps {
  currentSalary: number; // in Lakhs
  marketMin: number; // in Lakhs
  marketMax: number; // in Lakhs
}

export default function VerdictBadge({ currentSalary, marketMin, marketMax }: VerdictBadgeProps) {
  const median = (marketMin + marketMax) / 2;
  
  let verdict: 'underpaid' | 'fairly-paid' | 'well-paid' | 'exceptional' = 'fairly-paid';
  let badgeColor = '';
  let badgeText = '';
  let percentageDiff = 0;

  if (currentSalary < marketMin) {
    verdict = 'underpaid';
    badgeColor = 'bg-red-100 border-red-500 text-red-800';
    badgeText = 'Underpaid 🔴';
    percentageDiff = ((marketMin - currentSalary) / marketMin) * 100;
  } else if (currentSalary >= marketMin && currentSalary < median) {
    verdict = 'fairly-paid';
    badgeColor = 'bg-yellow-100 border-yellow-500 text-yellow-800';
    badgeText = 'Fairly Paid 🟡';
  } else if (currentSalary >= median && currentSalary <= marketMax) {
    verdict = 'well-paid';
    badgeColor = 'bg-green-100 border-green-500 text-green-800';
    badgeText = 'Well Paid 🟢';
  } else {
    verdict = 'exceptional';
    badgeColor = 'bg-blue-100 border-blue-500 text-blue-800';
    badgeText = 'Exceptional 🚀';
    percentageDiff = ((currentSalary - marketMax) / marketMax) * 100;
  }

  return (
    <div className={`border-l-4 p-4 rounded-lg ${badgeColor}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-bold">{badgeText}</h4>
        {verdict === 'underpaid' && (
          <span className="text-sm font-semibold">
            {percentageDiff.toFixed(0)}% below market
          </span>
        )}
        {verdict === 'exceptional' && (
          <span className="text-sm font-semibold">
            {percentageDiff.toFixed(0)}% above market
          </span>
        )}
      </div>
      <p className="text-sm opacity-90">
        Market range for your profile:{' '}
        <span className="font-semibold">
          ₹{marketMin.toFixed(1)}L - ₹{marketMax.toFixed(1)}L per annum
        </span>
      </p>
      {verdict === 'underpaid' && (
        <p className="mt-2 text-xs">
          You&apos;re earning less than the market minimum. Consider negotiating a raise or exploring other opportunities.
        </p>
      )}
    </div>
  );
}
