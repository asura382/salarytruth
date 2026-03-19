"use client"

type Props = {
  annualIncome: number
  taxRegime: "new" | "old"
  totalTax: number
}

export default function TaxBracketVisualizer({ 
  annualIncome, taxRegime, totalTax 
}: Props) {
  
  const newSlabs = [
    { min: 0, max: 300000, rate: 0, color: "#dcfce7", label: "0%" },
    { min: 300000, max: 700000, rate: 5, color: "#86efac", label: "5%" },
    { min: 700000, max: 1000000, rate: 10, color: "#fef08a", label: "10%" },
    { min: 1000000, max: 1200000, rate: 15, color: "#fed7aa", label: "15%" },
    { min: 1200000, max: 1500000, rate: 20, color: "#fca5a5", label: "20%" },
    { min: 1500000, max: Infinity, rate: 30, color: "#f87171", label: "30%" },
  ]

  const oldSlabs = [
    { min: 0, max: 250000, rate: 0, color: "#dcfce7", label: "0%" },
    { min: 250000, max: 500000, rate: 5, color: "#86efac", label: "5%" },
    { min: 500000, max: 1000000, rate: 20, color: "#fef08a", label: "20%" },
    { min: 1000000, max: Infinity, rate: 30, color: "#f87171", label: "30%" },
  ]

  const slabs = taxRegime === "new" ? newSlabs : oldSlabs

  const slabDetails = slabs.map(slab => {
    const incomeInSlab = Math.max(0, 
      Math.min(annualIncome, slab.max) - slab.min
    )
    const taxInSlab = incomeInSlab * slab.rate / 100
    return { ...slab, incomeInSlab, taxInSlab }
  }).filter(s => s.incomeInSlab > 0)

  const effectiveRate = annualIncome > 0 
    ? ((totalTax / annualIncome) * 100).toFixed(1) 
    : "0"

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        📊 Your Tax Bracket Breakdown
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        See exactly how your income is taxed across each slab
      </p>

      <div className="space-y-3">
        {slabDetails.map((slab, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>
                ₹{(slab.min/100000).toFixed(1)}L — {slab.max === Infinity 
                  ? "Above" 
                  : `₹${(slab.max/100000).toFixed(1)}L`}
                ({slab.label} tax)
              </span>
              <span className="font-medium text-gray-700">
                Tax: ₹{Math.round(slab.taxInSlab).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
              <div
                style={{
                  width: `${Math.min(100, (slab.incomeInSlab / annualIncome) * 100)}%`,
                  backgroundColor: slab.color,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                  transition: "width 0.5s ease"
                }}
              >
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                  ₹{(slab.incomeInSlab/100000).toFixed(1)}L @ {slab.rate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">Total Tax Paid:</span>
          <span className="ml-2 font-bold text-red-500">
            ₹{Math.round(totalTax).toLocaleString("en-IN")}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Effective Rate:</span>
          <span className="ml-2 font-bold text-gray-900">{effectiveRate}%</span>
        </div>
      </div>
    </div>
  )
}
