import type { Metadata } from "next"
import { Sora, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CookieBanner from "@/components/ui/CookieBanner"
import GoogleAnalytics from "@/components/ui/GoogleAnalytics"
import "./globals.css"

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "SP Nettoyages | Nettoyage professionnel eau pure | Abbevillers & Montbéliard",
    template: "%s | SP Nettoyages",
  },
  description:
    "SP Nettoyages - Expert en nettoyage à l'eau pure et haute pression pour particuliers et professionnels. 17 ans d'expérience, 5/5 étoiles Google. Devis gratuit au 06 74 33 87 86.",
  keywords: [
    "nettoyage Abbevillers",
    "nettoyage Montbéliard",
    "nettoyage eau pure Doubs",
    "nettoyage vitres professionnel",
    "nettoyage haute pression terrasse",
    "nettoyage industriel Montbéliard",
    "nettoyage après sinistre",
    "laveur de vitres Montbéliard",
    "entreprise de nettoyage 25",
  ],
  authors: [{ name: "Jérémy TASCA - DT Media" }],
  creator: "Jérémy TASCA - DT Media",
  metadataBase: new URL("https://sp-nettoyages.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://sp-nettoyages.fr",
    siteName: "SP Nettoyages",
    title: "SP Nettoyages | Nettoyage professionnel eau pure | Abbevillers & Montbéliard",
    description:
      "Expert en nettoyage à l'eau pure, haute pression et entretien professionnel. 17 ans d'expérience, 5/5 étoiles Google. Devis gratuit.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "SP Nettoyages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP Nettoyages | Nettoyage professionnel eau pure",
    description:
      "Expert en nettoyage à l'eau pure et haute pression. 17 ans d'expérience, 5/5 étoiles Google.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  name: "SP Nettoyages",
  description:
    "Expert en nettoyage professionnel à l'eau pure, haute pression, nettoyage industriel et intervention après sinistre dans le Pays de Montbéliard.",
  telephone: "+33674338786",
  email: "spnettoyages04@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Impasse du Sentier",
    addressLocality: "Abbevillers",
    postalCode: "25310",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.4633,
    longitude: 6.9517,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
  ],
  url: "https://sp-nettoyages.fr",
  image: "https://sp-nettoyages.fr/images/og-image.jpg",
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "26",
    bestRating: "5",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 47.5103, longitude: 6.7981 },
    geoRadius: "30000",
  },
  sameAs: ["https://www.facebook.com/p/SP-Nettoyages-61561349994384/"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${dmSans.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  )
}
