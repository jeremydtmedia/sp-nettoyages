"use client"

import Image from "next/image"
import { Droplets, Award, ArrowUpDown, X } from "lucide-react"
import { motion, useInView, AnimatePresence } from "motion/react"
import { useRef, useState } from "react"
import SectionTitle from "@/components/ui/SectionTitle"

interface Reason {
  icon: React.ReactNode
  title: string
  description: string
  image: string
  alt: string
}

const reasons: Reason[] = [
  {
    icon: <Droplets className="w-7 h-7" />,
    title: "La technique eau pure",
    description:
      "Ma méthode phare : l'eau déminéralisée à 0 ppm. Sans produit chimique, sans trace, sans risque pour vos surfaces. L'eau pure attire naturellement la saleté et laisse un résultat cristallin, respectueux de l'environnement et durable dans le temps.",
    image: "/images/470212816_122140312808378333_4984361606007110862_n.jpg",
    alt: "Technique de nettoyage eau pure SP Nettoyages",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "17 ans de savoir-faire",
    description:
      "Formé à l'excellence en Suisse, je mets à votre service plus de 17 années d'expérience. Stéphane Perrut, c'est un savoir-faire reconnu, une rigueur sans faille et des méthodes éprouvées pour des résultats toujours impeccables.",
    image: "/images/article.jpg",
    alt: "Article de presse SP Nettoyages - 17 ans d'expérience",
  },
  {
    icon: <ArrowUpDown className="w-7 h-7" />,
    title: "Du petit volet au grand bâtiment",
    description:
      "Que vous soyez un particulier avec quelques vitres à nettoyer ou une entreprise avec un bâtiment industriel complet, j'adapte mes équipements et méthodes. Aucun chantier n'est trop petit ou trop grand pour moi.",
    image: "/images/508190090_122168372834378333_392304315584887003_n.jpg",
    alt: "SP Nettoyages - Nettoyage de bâtiments en hauteur",
  },
]

export default function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-20 md:py-28 bg-dark relative overflow-hidden">
      {/* Décorations de fond */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            title="Pourquoi me faire confiance ?"
            subtitle="Mon engagement qualité, un savoir-faire reconnu et une approche écologique qui font la différence."
            light
          />
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {reasons.map((reason, index) => {
            const isReversed = index % 2 !== 0

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col gap-10 md:gap-16 items-center ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Image (40%) */}
                <div className="w-full lg:w-[42%] relative">
                  {/* Glow derrière l&apos;image */}
                  <div
                    className={`absolute -inset-6 rounded-3xl blur-2xl ${
                      index === 0
                        ? "bg-primary/10"
                        : index === 1
                        ? "bg-accent/10"
                        : "bg-primary/10"
                    }`}
                  />
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/5 ${
                      reason.image === "/images/article.jpg" ? "cursor-zoom-in" : ""
                    }`}
                    onClick={() => {
                      if (reason.image === "/images/article.jpg") setLightboxSrc(reason.image)
                    }}
                  >
                    <Image
                      src={reason.image}
                      alt={reason.alt}
                      width={600}
                      height={reason.image === "/images/article.jpg" ? 800 : 400}
                      className={`w-full h-auto ${
                        reason.image === "/images/article.jpg"
                          ? "object-contain"
                          : "object-cover aspect-[3/2]"
                      }`}
                    />
                    {/* Overlay léger */}
                    {reason.image !== "/images/article.jpg" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
                    )}
                    {reason.image === "/images/article.jpg" && (
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
                        Cliquez pour agrandir
                      </div>
                    )}
                  </div>
                </div>

                {/* Texte (60%) */}
                <div className="w-full lg:w-[58%] space-y-6">
                  {/* Icône */}
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    {reason.icon}
                  </div>

                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-white">
                    {reason.title}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                    {reason.description}
                  </p>

                  {/* Ligne décorative */}
                  <div className="h-1 w-16 rounded-full gradient-primary" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox article de presse */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxSrc(null)}
          >
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt="Article de presse SP Nettoyages"
                width={900}
                height={1200}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
