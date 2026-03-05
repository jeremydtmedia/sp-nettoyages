"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Droplets,
  Zap,
  Building2,
  CalendarCheck,
  AlertTriangle,
  Car,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Phone,
} from "lucide-react"
import { motion } from "motion/react"
import SectionTitle from "@/components/ui/SectionTitle"

interface ServiceData {
  id: string
  icon: React.ElementType
  title: string
  description: string
  subServices: string[]
  highlight: string
  highlightIcon: React.ElementType
  images: { src: string; alt: string }[]
  imagePosition: "left" | "right"
  bgClass: string
}

const services: ServiceData[] = [
  {
    id: "eau-pure",
    icon: Droplets,
    title: "Nettoyage à l'eau pure",
    description:
      "Mon système de nettoyage à l'eau déionisée utilise une eau filtrée par résine, totalement dépourvue de minéraux. Résultat : un séchage naturel sans aucune trace, même en plein soleil. Une méthode 100% écologique, sans aucun produit chimique, avec une perche télescopique pouvant atteindre jusqu'à 10 mètres de hauteur.",
    subServices: [
      "Vitres intérieures et extérieures",
      "Encadrements et rebords",
      "Stores et volets roulants",
      "Façades et bardages",
      "Panneaux photovoltaïques",
      "Vérandas et marquises",
      "Velux et fenêtres de toit",
    ],
    highlight: "Écologique - 0 produit chimique",
    highlightIcon: Sparkles,
    images: [
      {
        src: "/images/470212816_122140312808378333_4984361606007110862_n.jpg",
        alt: "Nettoyage eau pure - SP Nettoyages",
      },
      {
        src: "/images/469948054_122140311320378333_3033698888368202841_n.jpg",
        alt: "Système eau déionisée - SP Nettoyages",
      },
    ],
    imagePosition: "left",
    bgClass: "bg-light",
  },
  {
    id: "haute-pression",
    icon: Zap,
    title: "Nettoyage haute pression",
    description:
      "Redonnez tout leur éclat à vos surfaces extérieures grâce à mon nettoyage haute pression professionnel. J'adapte la pression en fonction du matériau traité pour un résultat optimal sans risque de détérioration. Mousse, taches tenaces, dépôts verts : tout disparaît.",
    subServices: [
      "Terrasses et dalles",
      "Allées et trottoirs",
      "Façades et murs extérieurs",
      "Portes de garage",
      "Mobilier de jardin",
      "Clôtures et portails",
    ],
    highlight: "Résultat immédiat et spectaculaire",
    highlightIcon: Sparkles,
    images: [
      {
        src: "/images/490524270_122159697230378333_714301039659428038_n.jpg",
        alt: "Nettoyage haute pression terrasse - SP Nettoyages",
      },
      {
        src: "/images/495516109_122162909186378333_2915743304743134077_n.jpg",
        alt: "Haute pression professionnel - SP Nettoyages",
      },
    ],
    imagePosition: "right",
    bgClass: "bg-white",
  },
  {
    id: "nettoyage-industriel",
    icon: Building2,
    title: "Nettoyage industriel et commercial",
    description:
      "Du petit commerce au grand bâtiment industriel, j'interviens pour le nettoyage de vos vitrines, façades, sols à la monobrosse et remises en état après chantier. Une image impeccable pour accueillir vos clients et collaborateurs.",
    subServices: [
      "Vitrines de commerces",
      "Façades de bâtiments",
      "Sols industriels (monobrosse)",
      "Nettoyage fin de chantier",
      "Bureaux et espaces de travail",
      "Mobilier urbain",
    ],
    highlight: "Du commerce local au bâtiment industriel",
    highlightIcon: Building2,
    images: [
      {
        src: "/images/508190090_122168372834378333_392304315584887003_n.jpg",
        alt: "Nettoyage industriel - SP Nettoyages",
      },
      {
        src: "/images/509361970_122168855186378333_7142931519531724893_n.jpg",
        alt: "Nettoyage commercial bâtiment - SP Nettoyages",
      },
    ],
    imagePosition: "left",
    bgClass: "bg-light",
  },
  {
    id: "entretien-regulier",
    icon: CalendarCheck,
    title: "Entretien régulier",
    description:
      "Optez pour un contrat d'entretien adapté à vos besoins. Je définis avec vous un planning d'interventions régulières pour maintenir la propreté de vos locaux en permanence. Un interlocuteur unique, des horaires flexibles et une qualité constante.",
    subServices: [
      "Bureaux et open spaces",
      "Sanitaires et douches",
      "Cantines et espaces repas",
      "Parties communes d'immeubles",
      "Logements et résidences",
      "Plafonds et luminaires",
    ],
    highlight: "Contrats sur mesure",
    highlightIcon: CalendarCheck,
    images: [
      {
        src: "/images/469919936_122140268966378333_3058923011182183964_n.jpg",
        alt: "Entretien régulier bureaux - SP Nettoyages",
      },
      {
        src: "/images/492412468_122160937586378333_5680780028667458881_n.jpg",
        alt: "Entretien professionnel - SP Nettoyages",
      },
    ],
    imagePosition: "right",
    bgClass: "bg-white",
  },
  {
    id: "sinistres",
    icon: AlertTriangle,
    title: "Interventions après sinistre",
    description:
      "Dégât des eaux, incendie, inondation : j'interviens rapidement pour remettre vos locaux en état. Décontamination, nettoyage de suie, séchage, désinfection. Je suis mobilisable en urgence pour limiter les dégâts et accélérer votre retour à la normale.",
    subServices: [
      "Dégât des eaux",
      "Décontamination après incendie",
      "Nettoyage de suie et résidus",
      "Remise en état complète",
      "Intervention urgente 7j/7",
    ],
    highlight: "Intervention rapide",
    highlightIcon: AlertTriangle,
    images: [
      {
        src: "/images/Avant%20apr%C3%A8s/avant5.jpg",
        alt: "Avant intervention sinistre - SP Nettoyages",
      },
      {
        src: "/images/Avant%20apr%C3%A8s/apres5.jpg",
        alt: "Après intervention sinistre - SP Nettoyages",
      },
    ],
    imagePosition: "left",
    bgClass: "bg-light",
  },
  {
    id: "vehicules",
    icon: Car,
    title: "Nettoyage de véhicules",
    description:
      "Remise à neuf complète de vos véhicules, à l'intérieur comme à l'extérieur. Je traite également les moteurs, caravanes, camping-cars et auvents. Un nettoyage en profondeur pour retrouver l'état du neuf.",
    subServices: [
      "Intérieur complet (sièges, moquettes, tableaux de bord)",
      "Extérieur (carrosserie, jantes, vitres)",
      "Nettoyage moteur",
      "Caravanes et camping-cars",
      "Auvents et bâches",
    ],
    highlight: "Comme neuf",
    highlightIcon: Sparkles,
    images: [
      {
        src: "/images/Avant%20apr%C3%A8s/avant3.jpg",
        alt: "Avant nettoyage véhicule - SP Nettoyages",
      },
      {
        src: "/images/Avant%20apr%C3%A8s/apres3.jpg",
        alt: "Après nettoyage véhicule - SP Nettoyages",
      },
    ],
    imagePosition: "right",
    bgClass: "bg-white",
  },
]

function ServiceImagePair({ images, label }: { images: { src: string; alt: string }[]; label?: string }) {
  return (
    <div className="relative">
      {/* Glow derrière les images */}
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />

      <div className="relative grid grid-cols-2 gap-3">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`relative overflow-hidden rounded-2xl shadow-xl shadow-dark/10 border border-white/50 ${
              i === 0 ? "aspect-[4/5]" : "aspect-[4/5] mt-6"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 45vw, 280px"
            />
          </motion.div>
        ))}
      </div>

      {/* Badge avant/après si pertinent */}
      {label && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full gradient-primary text-white text-xs font-bold shadow-lg shadow-primary/30">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

function ServiceSection({ service, index }: { service: ServiceData; index: number }) {
  const Icon = service.icon
  const HighlightIcon = service.highlightIcon
  const isImageLeft = service.imagePosition === "left"
  const isAvantApres = service.id === "sinistres" || service.id === "vehicules"

  return (
    <section id={service.id} className={`${service.bgClass} py-20 md:py-28 relative overflow-hidden`}>
      {/* Decoration de fond */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/[0.03] blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/[0.03] blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-custom relative z-10">
        <div
          className={`flex flex-col ${
            isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center gap-12 lg:gap-20`}
        >
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
            className="w-full lg:w-[45%]"
          >
            <ServiceImagePair
              images={service.images}
              label={isAvantApres ? "Avant / Après" : undefined}
            />
          </motion.div>

          {/* Contenu texte */}
          <div className="w-full lg:w-[55%] space-y-6">
            {/* Badge icone + numero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Service {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-secondary leading-tight"
            >
              {service.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed"
            >
              {service.description}
            </motion.p>

            {/* Highlight badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent-dark font-semibold text-sm border border-accent/20">
                <HighlightIcon className="w-4 h-4" />
                {service.highlight}
              </span>
            </motion.div>

            {/* Sous-services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            >
              {service.subServices.map((sub, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:text-accent transition-colors" />
                  <span className="text-gray-700 text-sm">{sub}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="pt-4"
            >
              <Link
                href="/devis"
                className="group inline-flex items-center gap-2 gradient-primary text-white px-7 py-3.5 rounded-full font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPageContent() {
  return (
    <>
      {/* Hero de page */}
      <section className="relative bg-dark pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Fond décoré */}
        <div className="absolute inset-0 gradient-dark opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14,165,200,0.5) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/3 left-[5%] w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary-light" />
              <span className="text-white/90 text-sm font-medium">
                Des solutions pour chaque besoin
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight"
          >
            Mes <span className="text-gradient">services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Du nettoyage de vitres à l&apos;eau pure à l&apos;intervention après sinistre,
            découvrez l&apos;ensemble de mes prestations professionnelles.
          </motion.p>

          {/* Ancres rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-primary-light group-hover:text-primary transition-colors" />
                  {s.title}
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* Séparateur vague */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="#F0F9FF"
            />
          </svg>
        </div>
      </section>

      {/* Sections de service */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* CTA Banner final */}
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
              title="Besoin d'un service sur mesure ?"
              subtitle="Chaque situation est unique. Contactez-moi pour un devis personnalisé et gratuit, adapté à vos besoins spécifiques."
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
    </>
  )
}
