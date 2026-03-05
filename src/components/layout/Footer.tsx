import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react"

const services = [
  { href: "/services#eau-pure", label: "Nettoyage eau pure" },
  { href: "/services#haute-pression", label: "Haute pression" },
  { href: "/services#nettoyage-industriel", label: "Nettoyage industriel" },
  { href: "/services#entretien-regulier", label: "Entretien régulier" },
  { href: "/services#sinistres", label: "Après sinistre" },
  { href: "/services#vehicules", label: "Nettoyage véhicules" },
]

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/galerie", label: "Galerie" },
  { href: "/devis", label: "Devis gratuit" },
  { href: "/contact", label: "Contact" },
]

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/Logo.jpg"
                alt="SP Nettoyages"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <div>
                <p className="font-heading font-bold text-lg">SP Nettoyages</p>
                <p className="text-primary-light text-xs">L&apos;excellence du nettoyage</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Stéphane Perrut, expert en nettoyage professionnel à l&apos;eau pure et haute pression dans le Pays de
              Montbéliard. 17 ans d&apos;expérience au service de votre satisfaction.
            </p>
            <a
              href="https://www.facebook.com/p/SP-Nettoyages-61561349994384/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm"
            >
              <Facebook className="w-5 h-5" />
              Suivez-moi sur Facebook
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary-light mb-4">
              Mes services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary-light mb-4">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-primary-light mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+33674338786"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  06 74 33 87 86
                </a>
              </li>
              <li>
                <a
                  href="mailto:spnettoyages04@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  spnettoyages04@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                4 Impasse du Sentier, 25310 Abbevillers
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                Lun - Ven : 8h00 - 19h00
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SP Nettoyages - Tous droits réservés
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Site conçu par{" "}
            <a
              href="https://dtmedia.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors"
            >
              DT Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
