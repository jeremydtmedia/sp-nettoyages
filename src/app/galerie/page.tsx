import type { Metadata } from "next"
import GaleriePageContent from "@/components/pages/GaleriePageContent"

export const metadata: Metadata = {
  title: "Mes réalisations",
  description:
    "Découvrez mes réalisations en photos : nettoyage de vitres, terrasses, façades, locaux industriels. Avant/après spectaculaires.",
}

export default function GaleriePage() {
  return <GaleriePageContent />
}
