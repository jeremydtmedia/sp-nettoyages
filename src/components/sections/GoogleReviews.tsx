"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { motion, useInView, AnimatePresence } from "motion/react"
import SectionTitle from "@/components/ui/SectionTitle"

interface Review {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url?: string
}

const fallbackReviews: Review[] = [
  {
    author_name: "Marie L.",
    rating: 5,
    text: "Travail remarquable ! Mes vitres n'ont jamais été aussi propres. Sébastien est ponctuel, professionnel et très agréable. La technique à l'eau pure est vraiment impressionnante, aucune trace. Je recommande vivement !",
    relative_time_description: "il y a 2 mois",
  },
  {
    author_name: "Pierre D.",
    rating: 5,
    text: "Excellent service pour le nettoyage de notre façade d'entreprise. Le résultat est bluffant, on dirait du neuf. Prix très correct pour la qualité du travail. Nous avons signé un contrat d'entretien annuel.",
    relative_time_description: "il y a 1 mois",
  },
  {
    author_name: "Sophie M.",
    rating: 5,
    text: "SP Nettoyages a fait un travail extraordinaire sur notre terrasse et nos volets. Le rendu est impeccable. Très professionnel, soigneux et rapide. Merci !",
    relative_time_description: "il y a 3 mois",
  },
  {
    author_name: "Jean-Paul R.",
    rating: 5,
    text: "Intervention rapide après un dégât des eaux chez nous. Sébastien a été réactif et le travail de remise en état a été parfait. Je recommande à 100% pour le sérieux et la qualité.",
    relative_time_description: "il y a 2 semaines",
  },
  {
    author_name: "Nathalie B.",
    rating: 5,
    text: "Service au top ! Le nettoyage de mes panneaux solaires a été fait avec grand soin. La technique eau pure est éco-responsable et le résultat est là. Prestation au rapport qualité-prix imbattable.",
    relative_time_description: "il y a 1 mois",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews)
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews")
        if (!res.ok) throw new Error("Erreur API")
        const data = await res.json()
        if (data.reviews && data.reviews.length > 0) {
          setReviews(
            data.reviews
              .filter((r: Review) => r.rating >= 4 && r.text)
              .slice(0, 5)
          )
        }
      } catch {
        // On garde les avis fallback
      }
    }
    fetchReviews()
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  // Pour le carrousel desktop, on affiche 3 avis à la fois
  const getVisibleReviews = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length])
    }
    return visible
  }

  return (
    <section ref={ref} className="py-20 md:py-28 bg-light relative overflow-hidden">
      {/* Décorations */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            title="Ce que disent mes clients"
            subtitle="26 avis, 100% 5 étoiles sur Google. La satisfaction de mes clients est ma meilleure publicité."
          />
        </motion.div>

        {/* Note globale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-gold text-gold" />
            ))}
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-3xl text-secondary">5.0</span>
            <span className="text-gray-500 text-sm">sur Google</span>
          </div>
        </motion.div>

        {/* Carrousel de cartes */}
        <div className="relative">
          {/* Desktop : 3 cartes visibles */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {getVisibleReviews().map((review, index) => (
                <motion.div
                  key={`${review.author_name}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-7 shadow-lg shadow-gray-100/80 border border-gray-100 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />

                  {/* Texte de l&apos;avis */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Auteur */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                        {review.author_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-secondary text-sm">
                          {review.author_name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {review.relative_time_description}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile : 1 carte visible */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-7 shadow-lg shadow-gray-100/80 border border-gray-100"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  &ldquo;{reviews[currentIndex].text}&rdquo;
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                      {reviews[currentIndex].author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-secondary text-sm">
                        {reviews[currentIndex].author_name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {reviews[currentIndex].relative_time_description}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={reviews[currentIndex].rating} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flèches de navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="w-12 h-12 rounded-full bg-white shadow-lg shadow-gray-100/80 border border-gray-100 flex items-center justify-center text-secondary hover:text-primary hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:scale-105"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Points indicateurs */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? "w-8 h-2.5 gradient-primary"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-primary/50"
                  }`}
                  aria-label={`Aller à l'avis ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="w-12 h-12 rounded-full bg-white shadow-lg shadow-gray-100/80 border border-gray-100 flex items-center justify-center text-secondary hover:text-primary hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:scale-105"
              aria-label="Avis suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lien vers Google */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/maps/place/SP+Nettoyages"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors group"
          >
            Voir tous les avis sur Google
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
