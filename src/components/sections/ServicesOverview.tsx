"use client"

import Link from "next/link"
import { Droplets, Zap, Building2, CalendarCheck, AlertTriangle, Car, ArrowRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import SectionTitle from "@/components/ui/SectionTitle"

interface Service {
  icon: React.ReactNode
  name: string
  description: string
  size: "large" | "medium" | "small"
  slug: string
}

const services: Service[] = [
  {
    icon: <Droplets className="w-8 h-8" />,
    name: "Nettoyage eau pure",
    description:
      "Ma spécialité : un nettoyage écologique à l'eau pure déminéralisée. Vitres, façades, panneaux solaires... Un résultat cristallin sans produit chimique ni trace résiduelle.",
    size: "large",
    slug: "eau-pure",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    name: "Haute pression",
    description:
      "Terrasses, allées, murs, toitures : je redonne vie à vos surfaces avec un nettoyage haute pression professionnel et adapté.",
    size: "medium",
    slug: "haute-pression",
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    name: "Nettoyage industriel",
    description:
      "Bâtiments, entrepôts, ateliers : entretien complet adapté aux exigences des professionnels et collectivités.",
    size: "medium",
    slug: "nettoyage-industriel",
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    name: "Entretien régulier",
    description:
      "Contrats d'entretien sur-mesure pour maintenir vos locaux impeccables toute l'année.",
    size: "small",
    slug: "entretien-regulier",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    name: "Après sinistre",
    description:
      "Intervention rapide après incendie, inondation ou dégât des eaux. Remise en état complète.",
    size: "small",
    slug: "sinistres",
  },
  {
    icon: <Car className="w-6 h-6" />,
    name: "Véhicules",
    description:
      "Nettoyage intérieur et extérieur de véhicules, utilitaires et flottes d'entreprise.",
    size: "small",
    slug: "vehicules",
  },
]

export default function ServicesOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-light relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            title="Mes expertises"
            subtitle="Des solutions de nettoyage adaptées à chaque besoin, pour les particuliers comme les professionnels."
          />
        </motion.div>

        {/* Bento Grid — rangée haute (1 large + 2 medium) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-auto">
          {services.filter((s) => s.size !== "small").map((service, index) => {
            const isLarge = service.size === "large"

            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`
                  ${isLarge ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1 lg:row-span-2"}
                `}
              >
                <Link
                  href={`/services#${service.slug}`}
                  className={`
                    group relative rounded-2xl p-6 md:p-8 block h-full
                    transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
                    ${isLarge ? "bg-secondary text-white" : "bg-white"}
                    ${!isLarge ? "shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-primary/10" : "hover:shadow-2xl hover:shadow-primary/20"}
                    border border-transparent hover:border-primary/20
                    overflow-hidden
                  `}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      isLarge ? "bg-primary/20" : "bg-primary/10"
                    }`}
                  />
                  <div
                    className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                      isLarge
                        ? "gradient-primary text-white shadow-lg shadow-primary/30"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30"
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div className="relative z-10">
                    <h3
                      className={`font-heading font-bold mb-3 ${
                        isLarge ? "text-2xl md:text-3xl" : "text-xl"
                      } ${isLarge ? "text-white" : "text-secondary"}`}
                    >
                      {service.name}
                    </h3>
                    <p
                      className={`leading-relaxed ${
                        isLarge
                          ? "text-gray-300 text-base md:text-lg"
                          : "text-gray-600 text-sm"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                  <div
                    className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 ${
                      isLarge
                        ? "bg-white/10 text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Rangée basse — 3 petites cartes en 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {services.filter((s) => s.size === "small").map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Link
                href={`/services#${service.slug}`}
                className="group relative rounded-2xl p-6 md:p-8 block h-full bg-white shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 border border-transparent hover:border-primary/20 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10" />
                <div className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                  {service.icon}
                </div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-lg mb-3 text-secondary">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 bg-primary/10 text-primary">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bouton voir tous les services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 gradient-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            Voir tous mes services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
