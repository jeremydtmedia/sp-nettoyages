import type { Metadata } from "next"
import ContactForm from "@/components/pages/ContactForm"
import ContactInfo from "@/components/pages/ContactInfo"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez SP Nettoyages au 06 74 33 87 86 ou par email. Intervention dans le Pays de Montbéliard et alentours. Devis gratuit.",
}

export default function ContactPage() {
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
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-[15%] w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Contactez-<span className="text-gradient">moi</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Une question, un besoin ? Je vous réponds rapidement.
          </p>
          <div className="mt-6 h-1 w-20 rounded-full gradient-primary mx-auto" />
        </div>
      </section>

      {/* Section formulaire + infos */}
      <section className="py-16 md:py-24 bg-light/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Formulaire (60%) */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Informations (40%) */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
