import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site SP Nettoyages.",
}

export default function MentionsLegales() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-dark">
        <div className="absolute inset-0 gradient-dark opacity-90" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(14,165,200,0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/3 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-[15%] w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Mentions <span className="text-gradient">légales</span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-xl mx-auto">
            Informations légales conformément à la loi pour la confiance dans l&apos;économie numérique.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12 text-gray-700 leading-relaxed">
            {/* Éditeur */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                1. Éditeur du site
              </h2>
              <div className="bg-light rounded-2xl p-6 md:p-8 space-y-2">
                <p>
                  <strong className="text-dark">Raison sociale :</strong> SP Nettoyages - PERRUT
                  Stéphane
                </p>
                <p>
                  <strong className="text-dark">Forme juridique :</strong> Entrepreneur individuel
                </p>
                <p>
                  <strong className="text-dark">Adresse :</strong> 4 Impasse du Sentier, 25310
                  Abbevillers, France
                </p>
                <p>
                  <strong className="text-dark">SIRET :</strong> 984 048 389 00014
                </p>
                <p>
                  <strong className="text-dark">Numéro de TVA intracommunautaire :</strong>{" "}
                  FR37984048389
                </p>
                <p>
                  <strong className="text-dark">Téléphone :</strong>{" "}
                  <a
                    href="tel:+33674338786"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    06 74 33 87 86
                  </a>
                </p>
                <p>
                  <strong className="text-dark">Email :</strong>{" "}
                  <a
                    href="mailto:spnettoyages04@gmail.com"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    spnettoyages04@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Directeur de publication */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                2. Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication du site est{" "}
                <strong className="text-dark">Stéphane PERRUT</strong>, en sa qualité de gérant de
                SP Nettoyages.
              </p>
            </div>

            {/* Hébergeur */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                3. Hébergement
              </h2>
              <div className="bg-light rounded-2xl p-6 md:p-8 space-y-2">
                <p>
                  <strong className="text-dark">Hébergeur :</strong> Vercel Inc.
                </p>
                <p>
                  <strong className="text-dark">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA
                  91789, États-Unis
                </p>
                <p>
                  <strong className="text-dark">Site web :</strong>{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    https://vercel.com
                  </a>
                </p>
              </div>
            </div>

            {/* Conception */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                4. Conception et réalisation
              </h2>
              <p>
                Ce site a été conçu et réalisé par{" "}
                <a
                  href="https://dtmedia.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  DT Media
                </a>
                , agence de création de sites web professionnels.
              </p>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                5. Propriété intellectuelle
              </h2>
              <p className="mb-4">
                L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes, logo,
                icônes, sons, logiciels, etc.) est protégé par les lois françaises et internationales
                relatives à la propriété intellectuelle.
              </p>
              <p className="mb-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou
                partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                interdite sauf autorisation écrite préalable de SP Nettoyages.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l&apos;un de ses éléments sera
                considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux
                dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
              </p>
            </div>

            {/* Données personnelles */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                6. Données personnelles
              </h2>
              <p className="mb-4">
                Les informations recueillies via les formulaires du site font l&apos;objet d&apos;un
                traitement informatique destiné à répondre à vos demandes. Conformément au Règlement
                Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés,
                vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et
                d&apos;opposition sur vos données.
              </p>
              <p>
                Pour en savoir plus sur la gestion de vos données et exercer vos droits, consultez
                la{" "}
                <Link
                  href="/politique-confidentialite"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                7. Cookies
              </h2>
              <p className="mb-4">
                Le site SP Nettoyages utilise des cookies pour améliorer l&apos;expérience
                utilisateur et mesurer l&apos;audience du site. Lors de votre première visite, un
                bandeau vous informe de la présence de ces cookies et vous invite à accepter ou
                refuser leur utilisation.
              </p>
              <p className="mb-4">Les cookies utilisés sur ce site sont :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-dark">Cookies de consentement :</strong> permettent de
                  mémoriser votre choix concernant les cookies (stockage local).
                </li>
                <li>
                  <strong className="text-dark">Cookies analytiques (Google Analytics) :</strong>{" "}
                  activés uniquement après votre consentement explicite, ils permettent de mesurer
                  l&apos;audience du site de manière anonyme.
                </li>
              </ul>
              <p className="mt-4">
                Pour plus d&apos;informations sur la gestion des cookies, consultez la{" "}
                <Link
                  href="/politique-confidentialite"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </div>

            {/* Credits photos */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                8. Crédits photographiques
              </h2>
              <p>
                Les photographies présentées sur ce site sont la propriété de SP Nettoyages. Toute
                reproduction est interdite sans autorisation préalable.
              </p>
            </div>

            {/* Limitation de responsabilite */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                9. Limitation de responsabilité
              </h2>
              <p className="mb-4">
                SP Nettoyages s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise à
                jour des informations diffusées sur ce site. Toutefois, SP Nettoyages ne peut
                garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations
                mises à disposition sur le site.
              </p>
              <p>
                SP Nettoyages décline toute responsabilité pour toute imprécision, inexactitude ou
                omission portant sur des informations disponibles sur le site, ainsi que pour tout
                dommage résultant d&apos;une intrusion frauduleuse d&apos;un tiers.
              </p>
            </div>

            {/* Droit applicable */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                10. Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, et
                après tentative de résolution amiable, les tribunaux français seront seuls
                compétents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
