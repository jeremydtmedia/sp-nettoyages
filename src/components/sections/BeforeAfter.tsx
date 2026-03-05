"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import SectionTitle from "@/components/ui/SectionTitle"

interface BeforeAfterPair {
  before: string
  after: string
  label: string
}

const pairs: BeforeAfterPair[] = [
  {
    before: "/images/Avant%20apr%C3%A8s/avant2.jpg",
    after: "/images/Avant%20apr%C3%A8s/apres2.jpg",
    label: "Dégât des eaux — Salle de bain remise à neuf",
  },
  {
    before: "/images/Avant%20apr%C3%A8s/avant9.jpg",
    after: "/images/Avant%20apr%C3%A8s/apres9.jpg",
    label: "Bâtiment commercial — Baie vitrée étincelante",
  },
  {
    before: "/images/Avant%20apr%C3%A8s/avant8.jpg",
    after: "/images/Avant%20apr%C3%A8s/apres8.jpg",
    label: "Terrasse haute pression — Dalles comme neuves",
  },
]

function Slider({ pair, index }: { pair: BeforeAfterPair; index: number }) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      updatePosition(e.clientX)
    },
    [updatePosition]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true)
      updatePosition(e.touches[0].clientX)
    },
    [updatePosition]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      updatePosition(e.clientX)
    }
    const handleTouchMove = (e: TouchEvent) => {
      updatePosition(e.touches[0].clientX)
    }
    const handleEnd = () => setIsDragging(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleEnd)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleEnd)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [isDragging, updatePosition])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="space-y-4"
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize shadow-xl shadow-gray-200/80 border border-gray-100 group select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Image Après (fond complet) */}
        <Image
          src={pair.after}
          alt={`${pair.label} - Après`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Image Avant (clipée) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={`${pair.label} - Avant`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Ligne de séparation */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Poignée du curseur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center z-20 hover:scale-110 transition-transform">
            <div className="flex items-center gap-1">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="rotate-180">
                <path d="M7 1L1 7L7 13" stroke="#0EA5C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L7 7L1 13" stroke="#0EA5C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Labels Avant / Après */}
        <div className="absolute top-4 left-4 bg-dark/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
          AVANT
        </div>
        <div className="absolute top-4 right-4 bg-accent/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
          APRÈS
        </div>
      </div>

      {/* Label de la paire */}
      <p className="text-center text-secondary font-heading font-semibold">{pair.label}</p>
    </motion.div>
  )
}

export default function BeforeAfter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-48 h-48 bg-accent/3 rounded-full blur-3xl translate-x-1/2" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            title="Le résultat parle de lui-même"
            subtitle="Faites glisser le curseur pour découvrir la différence. Nettoyage professionnel, résultat garanti."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pairs.map((pair, index) => (
            <Slider key={pair.label} pair={pair} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
