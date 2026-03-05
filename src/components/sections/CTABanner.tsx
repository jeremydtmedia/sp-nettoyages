"use client"

import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"

export default function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* Fond gradient */}
      <div className="absolute inset-0 gradient-primary" />

      {/* Décorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />

      {/* Vagues décoratives en haut */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 37 768 43 864 45C960 47 1056 45 1152 41.7C1248 38 1344 33 1392 30.8L1440 28V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
            fill="#F0F9FF"
          />
        </svg>
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-5 py-2 rounded-full border border-white/20"
          >
            Devis gratuit et sans engagement
          </motion.span>

          {/* Titre */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Un projet de nettoyage ?
          </h2>

          {/* Sous-titre */}
          <p className="text-white/85 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Contactez-moi pour un devis personnalisé. Je vous réponds sous 24 heures.
          </p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <Link
              href="/devis"
              className="group bg-white text-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-white/90 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Demander un devis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+33674338786"
              className="group border-2 border-white/40 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => {
                try {
                  fetch("https://crm-dt-media.vercel.app/api/track-event", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ event: "phone_click", projectId: "sp-nettoyages" }),
                  })
                } catch {
                  /* non bloquant */
                }
              }}
            >
              <Phone className="w-5 h-5" />
              06 74 33 87 86
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
