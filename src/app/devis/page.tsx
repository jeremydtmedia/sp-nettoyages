import type { Metadata } from "next"
import DevisForm from "@/components/pages/DevisForm"

export const metadata: Metadata = {
  title: "Demande de devis gratuit",
  description:
    "Demandez votre devis gratuit en ligne pour tous vos besoins de nettoyage. Réponse rapide garantie.",
}

export default function DevisPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-dark">
        <div className="absolute inset-0 gradient-dark opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(14,165,200,0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/3 left-[5%] w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Demande de devis <span className="text-gradient">gratuit</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Décrivez votre besoin, je vous réponds sous 24h.
          </p>
          <div className="mt-6 h-1 w-20 rounded-full gradient-primary mx-auto" />

          {/* Indicateurs de confiance */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              100% gratuit
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Réponse sous 24h
            </span>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 md:py-24 bg-light/50">
        <div className="container-custom">
          <DevisForm />
        </div>
      </section>
    </>
  )
}
