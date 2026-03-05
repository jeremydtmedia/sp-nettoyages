"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const heroSlides = [
  {
    avant: "/images/Avant%20apr%C3%A8s/avant5.jpg",
    apres: "/images/Avant%20apr%C3%A8s/apres5.jpg",
    label: "Après incendie",
    desc: "Cage d\u2019escalier ravagée \u2192 sol brillant en 1 semaine",
  },
  {
    avant: "/images/Avant%20apr%C3%A8s/avant2.jpg",
    apres: "/images/Avant%20apr%C3%A8s/apres2.jpg",
    label: "Dégât des eaux",
    desc: "Salle de bain sinistrée \u2192 carrelage impeccable",
  },
  {
    avant: "/images/Avant%20apr%C3%A8s/avant8.jpg",
    apres: "/images/Avant%20apr%C3%A8s/apres8.jpg",
    label: "Terrasse haute pression",
    desc: "Dalles noircies \u2192 terrasse comme neuve",
  },
  {
    avant: "/images/Avant%20apr%C3%A8s/Avant7.jpg",
    apres: "/images/Avant%20apr%C3%A8s/Apres7.jpg",
    label: "Façade & garage",
    desc: "Porte de garage encrassée \u2192 façade impeccable",
  },
  {
    avant: "/images/Avant%20apr%C3%A8s/avant9.jpg",
    apres: "/images/Avant%20apr%C3%A8s/apres9.jpg",
    label: "Bâtiment commercial",
    desc: "Vitres ternes \u2192 baie vitrée étincelante",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setSliderPos(50)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
    setSliderPos(50)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setSliderPos(50)
  }, [])

  // Autoplay — pause quand on drag le slider
  useEffect(() => {
    if (isDragging) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      return
    }
    autoPlayRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isDragging, nextSlide])

  // Slider drag
  const handleDrag = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !isDragging) return
      const rect = sliderRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      setSliderPos(Math.max(2, Math.min(98, (x / rect.width) * 100)))
    },
    [isDragging]
  )

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent) => handleDrag(e.clientX)
    const onTouch = (e: TouchEvent) => handleDrag(e.touches[0].clientX)
    const onUp = () => setIsDragging(false)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchmove", onTouch)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchend", onUp)
    }
  }, [isDragging, handleDrag])

  const slide = heroSlides[current]

  return (
    <section className="relative min-h-screen bg-dark overflow-hidden">
      {/* Grille décorative subtile */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(14,165,200,0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Halos décoratifs */}
      <div className="absolute top-1/4 left-[5%] w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-1/3 left-[20%] w-48 h-48 rounded-full bg-accent/5 blur-3xl" />

      <div className="container-custom relative z-10 flex flex-col lg:flex-row items-center min-h-screen pt-28 pb-12 lg:pt-32 lg:pb-16 gap-8 lg:gap-12">

        {/* ====== GAUCHE — Texte (50%) ====== */}
        <div className="w-full lg:w-[48%] space-y-7 flex flex-col justify-center">
          {/* Badge avis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-white/80 text-sm font-medium">
                5/5 — 26 avis Google
              </span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white leading-[1.08] tracking-tight"
          >
            Un nettoyage{" "}
            <span className="text-gradient">impeccable</span>,
            <br />sans compromis
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg"
          >
            Nettoyage professionnel à l&apos;eau pure et haute pression dans le Pays de Montbéliard.
            17 ans d&apos;expérience, <span className="whitespace-nowrap">0 produit chimique</span>, 100% de clients satisfaits.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Link
              href="/devis"
              className="group gradient-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 hover:border-white/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
            >
              Mes services
            </Link>
          </motion.div>

          {/* Confiance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center gap-6 text-sm text-gray-400"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Je vous réponds sous 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Sans engagement
            </span>
          </motion.div>
        </div>

        {/* ====== DROITE — Carrousel avant/après (52%) ====== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full lg:w-[52%] flex flex-col gap-4"
        >
          {/* Conteneur slider */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 aspect-[4/3]">
            {/* Images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                ref={sliderRef}
                className="absolute inset-0"
              >
                {/* APRÈS (couche de fond) */}
                <Image
                  src={slide.apres}
                  alt={`Après — ${slide.label}`}
                  fill
                  priority={current === 0}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />

                {/* AVANT (clipée) */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <Image
                    src={slide.avant}
                    alt={`Avant — ${slide.label}`}
                    fill
                    priority={current === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                </div>

                {/* Ligne du slider */}
                <div
                  className="absolute top-0 bottom-0 z-10"
                  style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
                >
                  <div className="w-0.5 h-full bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
                </div>

                {/* Handle du slider */}
                <div
                  className="absolute z-20 cursor-col-resize select-none"
                  style={{
                    left: `${sliderPos}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseDown={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div className="w-11 h-11 rounded-full bg-white shadow-2xl shadow-black/50 flex items-center justify-center ring-4 ring-white/30 hover:scale-110 transition-transform">
                    <ChevronLeft className="w-4 h-4 text-secondary -mr-0.5" />
                    <ChevronRight className="w-4 h-4 text-secondary -ml-0.5" />
                  </div>
                </div>

                {/* Labels AVANT / APRÈS dans les coins */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-dark/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-white/10">
                    Avant
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-accent/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                    Après
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Flèches de navigation (bords gauche/droit) */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-dark/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-dark/70 transition-all"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-dark/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-dark/70 transition-all"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Barre d'infos sous le slider */}
          <div className="flex items-center justify-between">
            {/* Label de la slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-primary font-heading font-bold text-sm">
                  {slide.label}
                </span>
                <span className="text-gray-500 text-sm">
                  {slide.desc}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Dots de pagination */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-7 h-2 bg-primary"
                      : "w-2 h-2 bg-white/25 hover:bg-white/40"
                  }`}
                  aria-label={`Transformation ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Hint glisser */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-gray-500 text-xs text-center lg:text-left"
          >
            Glissez le curseur sur l&apos;image pour comparer avant / après
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
