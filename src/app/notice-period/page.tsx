"use client"

import { useState } from "react"

export default function NoticePeriodCalculator() {
  const [joinDate, setJoinDate] = useState("")
  const [resignDate, setResignDate] = useState("")
  const [noticeDays, setNoticeDays] = useState(90)
  const [buyoutDays, setBuyoutDays] = useState(0)
  const [result, setResult] = useState<{
    totalDays: number
    years: number
    months: number
    days: number
    lastDay: Date
    earnedLeave: number
  } | null>(null)

  const calculate = () => {
    const join = new Date(joinDate)
    const resign = new Date(resignDate)
    
    const diffTime = Math.abs(resign.getTime() - join.getTime())
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    const years = Math.floor(totalDays / 365)
    const months = Math.floor((totalDays % 365) / 30)
    const days = totalDays % 30
    
    const lastDay = new Date(resign)
    lastDay.setDate(lastDay.getDate() + noticeDays - buyoutDays)
    
    const earnedLeave = Math.min(60, Math.floor(totalDays / 365) * 30)
    
    setResult({
      totalDays,
      years,
      months,
      days,
      lastDay,
      earnedLeave
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">Notice Period Calculator</h1>
        <p className="text-xl text-gray-600 mb-12 text-center">Calculate your last working day and leave encashment</p>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
              <input type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resignation Date</label>
              <input type="date" value={resignDate} onChange={e => setResignDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period (Days)</label>
              <select value={noticeDays} onChange={e => setNoticeDays(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg px-4 py-3">
                <option value="30">30 Days</option>
                <option value="60">60 Days</option>
                <option value="90">90 Days</option>
                <option value="120">120 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buyout Days</label>
              <input type="number" value={buyoutDays} onChange={e => setBuyoutDays(Number(e.target.value))} placeholder="e.g. 30" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
            </div>
          </div>
          <button onClick={calculate} disabled={!joinDate || !resignDate} className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg mt-6 disabled:opacity-50">Calculate →</button>
        </div>

        {result && (
          <>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-8 mb-8 text-white text-center">
              <h2 className="text-3xl font-extrabold mb-4">Last Working Day</h2>
              <p className="text-5xl font-extrabold">{result.lastDay.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Total Experience</p>
                <p className="text-3xl font-bold text-gray-900">{result.years}Y {result.months}M {result.days}D</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Earned Leave</p>
                <p className="text-3xl font-bold text-green-600">{result.earnedLeave} Days</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Notice Ends</p>
                <p className="text-3xl font-bold text-blue-700">{result.lastDay.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
