"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Sparkles,
  ArrowRight,
  Phone,
  X,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Zap,
  Building2,
  Brush,
  Images,
  GripHorizontal,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/SectionTitle"

/* ========================================================
   DONNEES
   ======================================================== */

const AVANT_APRES_PATH = "/images/Avant%20apr%C3%A8s"

interface BeforeAfterPair {
  id: number
  before: string
  after: string
  label: string
}

const beforeAfterPairs: BeforeAfterPair[] = [
  { id: 1, before: `${AVANT_APRES_PATH}/avant1.jpg`, after: `${AVANT_APRES_PATH}/apres1.jpg`, label: "Container industriel — Nettoyage haute pression" },
  { id: 2, before: `${AVANT_APRES_PATH}/avant2.jpg`, after: `${AVANT_APRES_PATH}/apres2.jpg`, label: "Dégât des eaux — Salle de bain remise à neuf" },
  { id: 3, before: `${AVANT_APRES_PATH}/avant3.jpg`, after: `${AVANT_APRES_PATH}/apres3.jpg`, label: "Nettoyage moteur — Peugeot HDi" },
{ id: 5, before: `${AVANT_APRES_PATH}/avant5.jpg`, after: `${AVANT_APRES_PATH}/apres5.jpg`, label: "Après incendie — Cage d'escalier restaurée" },
  { id: 6, before: `${AVANT_APRES_PATH}/avant6.jpg`, after: `${AVANT_APRES_PATH}/apres6.jpg`, label: "Sol carrelé — Local commercial" },
  { id: 7, before: `${AVANT_APRES_PATH}/Avant7.jpg`, after: `${AVANT_APRES_PATH}/Apres7.jpg`, label: "Façade et garage — Porte et vitres nettoyées" },
  { id: 8, before: `${AVANT_APRES_PATH}/avant8.jpg`, after: `${AVANT_APRES_PATH}/apres8.jpg`, label: "Terrasse haute pression — Dalles comme neuves" },
  { id: 9, before: `${AVANT_APRES_PATH}/avant9.jpg`, after: `${AVANT_APRES_PATH}/apres9.jpg`, label: "Bâtiment commercial — Baie vitrée étincelante" },
  { id: 10, before: `${AVANT_APRES_PATH}/avant10.jpg`, after: `${AVANT_APRES_PATH}/apres10.jpg`, label: "Allée de maison — Dalles décrassées" },
]

type CategoryKey = "tous" | "eau-pure" | "haute-pression" | "commercial" | "entretien" | "divers"

interface GalleryPhoto {
  src: string
  alt: string
  category: CategoryKey
}

const categories: { key: CategoryKey; label: string; icon: React.ElementType }[] = [
  { key: "tous", label: "Tous", icon: Images },
  { key: "eau-pure", label: "Eau pure", icon: Droplets },
  { key: "haute-pression", label: "Haute pression", icon: Zap },
  { key: "commercial", label: "Commercial", icon: Building2 },
{ key: "entretien", label: "Entretien", icon: Brush },
  { key: "divers", label: "Divers", icon: GripHorizontal },
]

const galleryPhotos: GalleryPhoto[] = [
  // Eau pure
  { src: "/images/469779187_122140310996378333_7997351324540400468_n.jpg", alt: "Nettoyage eau pure vitres", category: "eau-pure" },
  { src: "/images/469948054_122140311320378333_3033698888368202841_n.jpg", alt: "Système eau déionisée", category: "eau-pure" },
  { src: "/images/484824492_122155157888378333_6993682071017479108_n.jpg", alt: "Eau pure sur façades", category: "eau-pure" },
  { src: "/images/470212816_122140312808378333_4984361606007110862_n.jpg", alt: "Équipement eau pure", category: "eau-pure" },
  { src: "/images/469958055_122140310864378333_3216267873272417983_n.jpg", alt: "Nettoyage eau pure professionnel", category: "eau-pure" },

  // Haute pression
  { src: "/images/490524270_122159697230378333_714301039659428038_n.jpg", alt: "Haute pression terrasse", category: "haute-pression" },
  { src: "/images/495516109_122162909186378333_2915743304743134077_n.jpg", alt: "Nettoyage haute pression", category: "haute-pression" },
  { src: "/images/495003883_122162909234378333_4004268381828352019_n.jpg", alt: "Haute pression dalles", category: "haute-pression" },
  { src: "/images/495347224_122162909282378333_2715689076579775183_n.jpg", alt: "Haute pression allées", category: "haute-pression" },

  // Commercial
  { src: "/images/506471065_122168372792378333_7759019175461326340_n.jpg", alt: "Nettoyage industriel", category: "commercial" },
  { src: "/images/508190090_122168372834378333_392304315584887003_n.jpg", alt: "Nettoyage commercial", category: "commercial" },
  { src: "/images/509361970_122168855186378333_7142931519531724893_n.jpg", alt: "Bâtiment industriel", category: "commercial" },
  { src: "/images/511151978_122169603044378333_4432346826190922051_n.jpg", alt: "Nettoyage vitrines", category: "commercial" },
  { src: "/images/509439316_122169603170378333_6126448554058090659_n.jpg", alt: "Façades commerciales", category: "commercial" },
  { src: "/images/511096022_122169603206378333_332743899525833671_n.jpg", alt: "Sols industriels", category: "commercial" },

  // Entretien
  { src: "/images/469919936_122140268966378333_3058923011182183964_n.jpg", alt: "Entretien bureaux", category: "entretien" },
  { src: "/images/492412468_122160937586378333_5680780028667458881_n.jpg", alt: "Entretien régulier", category: "entretien" },

  // Divers
  { src: "/images/469999907_122140312508378333_401572376043851329_n.jpg", alt: "Intervention nettoyage extérieur", category: "divers" },
  { src: "/images/470660295_122141431772378333_1602275784906120301_n.jpg", alt: "Nettoyage sur site", category: "divers" },
  { src: "/images/484750092_122154989912378333_4046043238820750477_n.jpg", alt: "Réalisation SP Nettoyages", category: "divers" },
  { src: "/images/484538502_122154989966378333_8828541627066056885_n.jpg", alt: "Nettoyage professionnel", category: "divers" },
  { src: "/images/484800090_122154989978378333_2921489845181152450_n.jpg", alt: "Intervention nettoyage", category: "divers" },
  { src: "/images/499631357_122165039840378333_3904685396451484041_n.jpg", alt: "Service nettoyage", category: "divers" },
  { src: "/images/500201861_122165039882378333_1800182119387898700_n.jpg", alt: "Réalisation nettoyage", category: "divers" },
  { src: "/images/516594623_122171575460378333_8091838325690761261_n.jpg", alt: "Nettoyage complété", category: "divers" },
  { src: "/images/517912170_122171575658378333_6022829159966632600_n.jpg", alt: "Résultat professionnel", category: "divers" },
  { src: "/images/519076180_122172729170378333_7571211056944549544_n.jpg", alt: "Intervention terrain", category: "divers" },
  { src: "/images/520386489_122172729218378333_2175054407338488970_n.jpg", alt: "SP Nettoyages en action", category: "divers" },
]

/* ========================================================
   COMPOSANT SLIDER AVANT / APRES
   ======================================================== */

function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(pct)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current) updatePosition(e.clientX)
    },
    [updatePosition]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX)
    },
    [updatePosition]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-xl shadow-dark/10 border border-white/50"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Image APRES (fond complet) */}
        <Image
          src={pair.after}
          alt={`Après - ${pair.label}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
        />

        {/* Image AVANT (clipee) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <Image
            src={pair.before}
            alt={`Avant - ${pair.label}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
          />
        </div>

        {/* Ligne de séparation */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          {/* Poignée */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-secondary -mr-1" />
            <ChevronRight className="w-4 h-4 text-secondary -ml-1" />
          </div>
        </div>

        {/* Labels Avant / Après */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full bg-dark/70 backdrop-blur-sm text-white text-xs font-bold">
            Avant
          </span>
        </div>
        <div className="absolute top-3 right-3 z-20">
          <span className="px-3 py-1 rounded-full bg-accent/80 backdrop-blur-sm text-white text-xs font-bold">
            Après
          </span>
        </div>
      </div>

      {/* Légende */}
      <p className="mt-3 text-center text-sm font-medium text-gray-600">{pair.label}</p>
    </motion.div>
  )
}

/* ========================================================
   COMPOSANT LIGHTBOX
   ======================================================== */

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: GalleryPhoto
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Fermer"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <motion.div
        key={photo.src}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[85vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </motion.div>

      {/* Légende */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm">
        <p className="text-white text-sm font-medium">{photo.alt}</p>
      </div>
    </motion.div>
  )
}

/* ========================================================
   COMPOSANT PRINCIPAL GALERIE
   ======================================================== */

export default function GaleriePageContent() {
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("tous")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredPhotos =
    activeFilter === "tous"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeFilter)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
    )
  }, [filteredPhotos.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    )
  }, [filteredPhotos.length])

  return (
    <>
      {/* Hero de page */}
      <section className="relative bg-dark pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-dark opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14,165,200,0.5) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/3 right-[5%] w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-[10%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary-light" />
              <span className="text-white/90 text-sm font-medium">
                17 ans de réalisations
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight"
          >
            Mes <span className="text-gradient">réalisations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Parcourez mes photos avant/après et mes interventions sur le terrain.
            La preuve par l&apos;image de mon savoir-faire.
          </motion.p>
        </div>

        {/* Séparateur vague */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F0F9FF" />
          </svg>
        </div>
      </section>

      {/* Section Avant / Après */}
      <section className="bg-light py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/[0.03] blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionTitle
            title="Avant / Après"
            subtitle="Faites glisser le curseur pour découvrir la transformation. Des résultats qui parlent d'eux-mêmes."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {beforeAfterPairs.map((pair) => (
              <BeforeAfterSlider key={pair.id} pair={pair} />
            ))}
          </div>
        </div>
      </section>

      {/* Section En intervention - Photos avec filtres */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-primary/[0.02] blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-accent/[0.02] blur-3xl" />

        <div className="container-custom relative z-10">
          <SectionTitle
            title="En intervention"
            subtitle="Découvrez-moi en action sur le terrain, photos triées par type de prestation."
            centered
          />

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeFilter === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveFilter(cat.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "gradient-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "bg-light text-gray-600 hover:bg-light-darker hover:text-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  {activeFilter === cat.key && cat.key !== "tous" && (
                    <span className="ml-1 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                      {galleryPhotos.filter((p) => p.category === cat.key).length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Grille de photos */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-dark/5 border border-white/50"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                  />

                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Texte au hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium line-clamp-2">{photo.alt}</p>
                  </div>

                  {/* Icone zoom */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Message si aucune photo */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Aucune photo dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-dark py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-dark" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-accent/8 blur-3xl -translate-y-1/2" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title="Convaincu par mes résultats ?"
              subtitle="Chaque photo représente un client satisfait. À votre tour de bénéficier de mon expertise."
              light
              centered
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
          >
            <Link
              href="/devis"
              className="group gradient-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+33674338786"
              className="flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              06 74 33 87 86
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <Lightbox
            photo={filteredPhotos[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}
