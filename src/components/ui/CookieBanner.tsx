"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Cookie } from "lucide-react"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleChoice(choice: "accepted" | "refused") {
    localStorage.setItem("cookie-consent", choice)
    setIsVisible(false)
    window.dispatchEvent(new Event("cookie-consent-change"))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container-custom">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Cookie className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic.{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-primary hover:underline font-medium"
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => handleChoice("refused")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Refuser
                </button>
                <button
                  onClick={() => handleChoice("accepted")}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold gradient-primary text-white hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
