"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Star, MessageSquare, Leaf } from "lucide-react"
import { motion, useInView } from "motion/react"

interface StatItem {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  decimals?: number
}

const stats: StatItem[] = [
  {
    icon: <Award className="w-6 h-6" />,
    value: 17,
    suffix: "+",
    label: "Années d'expérience",
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: 5,
    suffix: "/5",
    label: "Note Google",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    value: 26,
    suffix: "",
    label: "Avis clients",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    value: 0,
    suffix: "",
    label: "Produit chimique",
  },
]

function AnimatedCounter({
  value,
  suffix,
  start,
}: {
  value: number
  suffix: string
  start: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!start) return

    if (value === 0) {
      setDisplay(0)
      return
    }

    let startTime: number | null = null
    const duration = 2000

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [start, value])

  return (
    <span className="font-heading font-extrabold text-4xl md:text-5xl text-white">
      {display}
      {suffix}
    </span>
  )
}

export default function StatsBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-16 md:py-20 bg-secondary overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14,165,200,0.8) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Lueur décorative */}
      <div className="absolute top-0 left-1/4 w-64 h-32 bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-accent/10 blur-3xl rounded-full" />

      <div className="container-custom relative z-10">
        {/* Titre + intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-4">
            SP Nettoyages en <span className="text-gradient">quelques chiffres</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Depuis 2009, je mets mon expertise au service des particuliers et professionnels du Pays de Montbéliard. Voici ce qui résume mon engagement au quotidien.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
              className="glass rounded-2xl p-6 md:p-8 text-center group hover:bg-white/10 transition-all duration-300"
            >
              {/* Icône */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Valeur animée */}
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                start={isInView}
              />

              {/* Label */}
              <p className="text-gray-300 text-sm md:text-base mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
