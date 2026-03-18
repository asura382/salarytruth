"use client"
import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: string }>
}

export default function InstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as unknown as BeforeInstallPromptEvent)
      if (!localStorage.getItem("pwa-dismissed")) {
        setShow(true)
      }
    }
    window.addEventListener("beforeinstallprompt", handler as EventListener)
    return () => window.removeEventListener(
      "beforeinstallprompt", handler as EventListener
    )
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    await prompt.userChoice
    setShow(false)
    setPrompt(null)
  }

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem("pwa-dismissed", "true")
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-blue-600 text-white rounded-xl p-4 shadow-2xl z-50 flex items-center gap-3">
      <div className="text-2xl">📱</div>
      <div className="flex-1">
        <div className="font-semibold text-sm">Add to Home Screen</div>
        <div className="text-blue-100 text-xs">Quick salary checks anytime, offline too</div>
      </div>
      <div className="flex flex-col gap-1">
        <button
          onClick={handleInstall}
          className="bg-white text-blue-600 px-3 py-1 rounded-lg text-xs font-bold"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="text-blue-200 text-xs text-center"
        >
          Not now
        </button>
      </div>
    </div>
  )
}
