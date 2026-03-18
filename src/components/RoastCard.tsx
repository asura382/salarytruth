"use client"

import { useRef, useState } from "react"
import { toPng } from "html-to-image"

type RoastCardProps = {
  jobTitle: string
  city: string
  experience: string
  grossCTC: number
  inHandMonthly: number
  inHandAnnual: number
  incomeTaxAnnual: number
  employeePF: number
  verdict: string
  marketMin: number
  marketMax: number
  companyType: string
}

// Fun comparison calculator
const getFunComparisons = (taxAmount: number, pfAmount: number) => {
  const iphones = Math.round(taxAmount / 90000)
  const netflix = Math.round(taxAmount / 649)
  const goaFlights = Math.round(taxAmount / 4000)
  const ps5s = Math.round(pfAmount / 54990)
  const biryani = Math.round(taxAmount / 200)
  return { iphones, netflix, goaFlights, ps5s, biryani }
}

// Roast comments based on verdict
const getRoastComment = (verdict: string) => {
  if (verdict === "underpaid") return [
    "Your employer is getting a STEAL 💀",
    "Time to update that LinkedIn 👀",
    "You deserve better. Facts. 🔥"
  ]
  if (verdict === "exceptional") return [
    "Okay okay we see you 👑",
    "Living the dream while we suffer 😭",
    "Send your resume please 🙏"
  ]
  if (verdict === "well") return [
    "Not bad at all, respect 🤝",
    "You're winning quietly 💪",
    "Treat yourself, you earned it ✨"
  ]
  return [
    "Could be worse, could be better 🤷",
    "Appraisal szn is coming 👀",
    "Negotiate harder next time 💼"
  ]
}

export default function RoastCard(props: RoastCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const comparisons = getFunComparisons(
    props.incomeTaxAnnual, 
    props.employeePF * 12
  )
  const roastLines = getRoastComment(props.verdict)

  const jobTitleFormatted = props.jobTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  
  const experienceLabel = {
    fresher: "0-2 Years",
    mid: "2-5 Years", 
    senior: "5-10 Years",
    lead: "10+ Years"
  }[props.experience] || props.experience

  const verdictConfig = {
    underpaid: { emoji: "🔴", label: "UNDERPAID", color: "#ef4444" },
    fairly: { emoji: "🟡", label: "FAIRLY PAID", color: "#f59e0b" },
    well: { emoji: "🟢", label: "WELL PAID", color: "#10b981" },
    exceptional: { emoji: "🚀", label: "EXCEPTIONAL", color: "#6366f1" }
  }[props.verdict] || { emoji: "🟡", label: "FAIRLY PAID", color: "#f59e0b" }

  const handleDownload = async () => {
    if (!cardRef.current) return
    setIsGenerating(true)
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#0f172a"
      })
      const link = document.createElement("a")
      link.download = "my-salary-truth.png"
      link.href = dataUrl
      link.click()
      setIsGenerated(true)
    } catch (error) {
      console.error("Error generating card:", error)
    }
    setIsGenerating(false)
  }

  const shareWhatsApp = async () => {
    await handleDownload()
    const text = encodeURIComponent(
      `💰 My Salary Truth\n\n` +
      `${jobTitleFormatted} | ${props.city}\n` +
      `Monthly In-Hand: ₹${props.inHandMonthly.toLocaleString()}\n` +
      `Verdict: ${verdictConfig.label} ${verdictConfig.emoji}\n\n` +
      `Check your salary at salarytruth.vercel.app`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const shareTwitter = async () => {
    await handleDownload()
    const percentile = Math.round(
      15 + ((props.inHandMonthly - props.marketMin) / (props.marketMax - props.marketMin)) * 77
    )
    const text = encodeURIComponent(
      `I earn more than ${percentile}% of ${jobTitleFormatted} professionals in ${props.city}! 💰\n\n` +
      `Check your salary at salarytruth.vercel.app #SalaryTruth #IndianSalary`
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  const shareLinkedIn = async () => {
    await handleDownload()
    const url = encodeURIComponent('https://salarytruth.vercel.app')
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <div className="mb-6">
      {/* THE CARD - This gets captured as image */}
      <div
        ref={cardRef}
        style={{
          width: "480px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "16px",
          padding: "32px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "white",
          margin: "0 auto",
          border: "1px solid #334155"
        }}
      >
        {/* Header */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px"
        }}>
          <div>
            <div style={{ 
              fontSize: "11px", 
              color: "#94a3b8",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "4px"
            }}>
              SALARY TRUTH CARD 🔥
            </div>
            <div style={{ 
              fontSize: "20px", 
              fontWeight: "700",
              color: "white"
            }}>
              {props.jobTitle.split("-").map(
                w => w.charAt(0).toUpperCase() + w.slice(1)
              ).join(" ")}
            </div>
            <div style={{ 
              fontSize: "13px", 
              color: "#94a3b8",
              marginTop: "2px"
            }}>
              {props.city} • {experienceLabel} • {props.companyType}
            </div>
          </div>
          <div style={{
            background: verdictConfig.color + "20",
            border: `1px solid ${verdictConfig.color}`,
            borderRadius: "8px",
            padding: "6px 12px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "16px" }}>{verdictConfig.emoji}</div>
            <div style={{ 
              fontSize: "9px",
              color: verdictConfig.color,
              fontWeight: "700",
              letterSpacing: "1px"
            }}>
              {verdictConfig.label}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ 
          height: "1px", 
          background: "#334155",
          marginBottom: "24px"
        }} />

        {/* Big Number */}
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <div style={{ 
            fontSize: "12px", 
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "4px"
          }}>
            Your wallet actually receives
          </div>
          <div style={{ 
            fontSize: "48px", 
            fontWeight: "800",
            color: "#10b981",
            lineHeight: "1"
          }}>
            ₹{props.inHandMonthly.toLocaleString("en-IN")}
          </div>
          <div style={{ fontSize: "13px", color: "#64748b" }}>
            per month in-hand
          </div>
        </div>

        {/* CTC vs Reality */}
        <div style={{
          background: "#1e293b",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "20px",
          border: "1px solid #334155"
        }}>
          <div style={{ 
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}>
            <div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>CTC (what HR says)</div>
              <div style={{ 
                fontSize: "20px",
                fontWeight: "700",
                color: "#f1f5f9"
              }}>
                ₹{(props.grossCTC / 100000).toFixed(1)}L
              </div>
            </div>
            <div style={{ 
              color: "#475569",
              fontSize: "24px",
              alignSelf: "center"
            }}>→</div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>In-Hand (reality)</div>
              <div style={{ 
                fontSize: "20px",
                fontWeight: "700",
                color: "#10b981"
              }}>
                ₹{(props.inHandAnnual / 100000).toFixed(1)}L
              </div>
            </div>
          </div>
          <div style={{
            background: "#0f172a",
            borderRadius: "6px",
            padding: "8px 12px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>
              Difference
            </span>
            <span style={{ 
              fontSize: "12px",
              color: "#ef4444",
              fontWeight: "600"
            }}>
              -₹{((props.grossCTC - props.inHandAnnual) / 100000).toFixed(1)}L vanished 💸
            </span>
          </div>
        </div>

        {/* Fun Comparisons */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ 
            fontSize: "11px",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "10px"
          }}>
            Your tax pays for...
          </div>
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px"
          }}>
            {[
              { emoji: "📱", text: `${comparisons.iphones} iPhones` },
              { emoji: "✈️", text: `${comparisons.goaFlights} Goa flights` },
              { emoji: "🎬", text: `${comparisons.netflix} months Netflix` },
              { emoji: "🍛", text: `${comparisons.biryani} biryanis` }
            ].map((item, i) => (
              <div key={i} style={{
                background: "#1e293b",
                borderRadius: "8px",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #334155"
              }}>
                <span style={{ fontSize: "18px" }}>{item.emoji}</span>
                <span style={{ 
                  fontSize: "12px",
                  color: "#e2e8f0",
                  fontWeight: "500"
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Roast Lines */}
        <div style={{
          background: "linear-gradient(135deg, #1e1b4b, #312e81)",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "20px",
          border: "1px solid #4338ca"
        }}>
          {roastLines.map((line, i) => (
            <div key={i} style={{
              fontSize: "14px",
              color: "#e0e7ff",
              marginBottom: i === roastLines.length - 1 ? 0 : "8px",
              fontWeight: "500"
            }}>
              {line}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          fontSize: "11px",
          color: "#64748b",
          paddingTop: "16px",
          borderTop: "1px solid #334155"
        }}>
          Calculate your exact in-hand salary at
          <div style={{ 
            marginTop: "4px",
            color: "#94a3b8",
            fontWeight: "600"
          }}>
            salarytruth.vercel.app
          </div>
        </div>
      </div>

      {/* Action Buttons - NOT captured in image */}
      {!isGenerated ? (
        <div className="flex gap-3 justify-center mt-4 flex-wrap">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="px-5 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            📸 Download PNG
          </button>
          <button
            onClick={shareWhatsApp}
            disabled={isGenerating}
            className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            📱 WhatsApp
          </button>
          <button
            onClick={shareTwitter}
            disabled={isGenerating}
            className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            🐦 Twitter
          </button>
          <button
            onClick={shareLinkedIn}
            disabled={isGenerating}
            className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            💼 LinkedIn
          </button>
        </div>
      ) : (
        <div className="text-center mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <span className="text-green-400 font-semibold">✅ Card downloaded! Share it with your network 🔥</span>
        </div>
      )}
    </div>
  )
}
