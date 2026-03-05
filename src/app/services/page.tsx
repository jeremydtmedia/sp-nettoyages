import type { Metadata } from "next"
import ServicesPageContent from "@/components/pages/ServicesPageContent"

export const metadata: Metadata = {
  title: "Mes services de nettoyage",
  description:
    "Découvrez tous mes services : nettoyage eau pure, haute pression, nettoyage industriel, entretien régulier, intervention après sinistre. Devis gratuit.",
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
