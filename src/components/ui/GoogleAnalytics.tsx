"use client"

import Script from "next/script"
import { useState, useEffect } from "react"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      setConsentGiven(localStorage.getItem("cookie-consent") === "accepted")
    }
    checkConsent()
    window.addEventListener("cookie-consent-change", checkConsent)
    return () => window.removeEventListener("cookie-consent-change", checkConsent)
  }, [])

  if (!GA_ID || !consentGiven) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
