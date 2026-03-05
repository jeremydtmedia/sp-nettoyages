import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles de SP Nettoyages.",
}

export default function PolitiqueConfidentialite() {
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
            Politique de{" "}
            <span className="text-gradient">confidentialité</span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-xl mx-auto">
            Protection de vos données personnelles conformément au RGPD.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12 text-gray-700 leading-relaxed">
            {/* Préambule */}
            <div className="bg-light rounded-2xl p-6 md:p-8">
              <p>
                La présente politique de confidentialité a pour objectif de vous informer sur la
                manière dont SP Nettoyages collecte, utilise et protège vos données personnelles dans
                le cadre de l&apos;utilisation du site{" "}
                <strong className="text-dark">sp-nettoyages.fr</strong>.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Dernière mise à jour : mars 2026
              </p>
            </div>

            {/* Identité du responsable */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                1. Identité du responsable du traitement
              </h2>
              <div className="bg-light rounded-2xl p-6 md:p-8 space-y-2">
                <p>
                  <strong className="text-dark">Responsable :</strong> Stéphane PERRUT - SP
                  Nettoyages
                </p>
                <p>
                  <strong className="text-dark">Adresse :</strong> 4 Impasse du Sentier, 25310
                  Abbevillers, France
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
                  <strong className="text-dark">SIRET :</strong> 984 048 389 00014
                </p>
              </div>
            </div>

            {/* Données collectées */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                2. Données personnelles collectées
              </h2>
              <p className="mb-4">
                Dans le cadre de l&apos;utilisation du site sp-nettoyages.fr, les données personnelles
                suivantes sont collectées via les formulaires de contact et de demande de devis :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-dark">Nom et prénom</strong>
                </li>
                <li>
                  <strong className="text-dark">Adresse email</strong>
                </li>
                <li>
                  <strong className="text-dark">Numéro de téléphone</strong>
                </li>
                <li>
                  <strong className="text-dark">Message / description du projet</strong>
                </li>
                <li>
                  <strong className="text-dark">Adresse postale</strong> (si fournie dans le
                  formulaire de devis)
                </li>
                <li>
                  <strong className="text-dark">Type de service souhaité</strong> (formulaire de
                  devis)
                </li>
              </ul>
              <p className="mt-4">
                Ces données sont collectées uniquement lorsque vous remplissez volontairement un
                formulaire sur le site.
              </p>
            </div>

            {/* Finalités */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                3. Finalités du traitement
              </h2>
              <p className="mb-4">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Répondre à vos demandes de contact et d&apos;information</li>
                <li>Établir et vous transmettre un devis personnalisé</li>
                <li>Vous envoyer un email de confirmation suite à votre demande</li>
                <li>
                  Assurer le suivi commercial de votre demande (gestion interne)
                </li>
                <li>
                  Améliorer les services et l&apos;expérience utilisateur du site (données
                  anonymisées)
                </li>
              </ul>
            </div>

            {/* Base légale */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                4. Base légale du traitement
              </h2>
              <p className="mb-4">
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-dark">Votre consentement :</strong> en remplissant un
                  formulaire sur le site, vous consentez au traitement de vos données pour les
                  finalités décrites ci-dessus.
                </li>
                <li>
                  <strong className="text-dark">L&apos;intérêt légitime :</strong> le traitement est
                  nécessaire aux fins des intérêts légitimes poursuivis par SP Nettoyages (gestion
                  des demandes clients, amélioration des services).
                </li>
                <li>
                  <strong className="text-dark">
                    L&apos;exécution de mesures précontractuelles :
                  </strong>{" "}
                  l&apos;établissement d&apos;un devis à votre demande.
                </li>
              </ul>
            </div>

            {/* Destinataires */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                5. Destinataires des données
              </h2>
              <p className="mb-4">
                Vos données personnelles sont destinées exclusivement à :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-dark">Stéphane PERRUT</strong> (gérant de SP Nettoyages)
                  pour le traitement de vos demandes
                </li>
                <li>
                  <strong className="text-dark">Resend</strong> (service d&apos;envoi d&apos;emails)
                  pour l&apos;acheminement des emails de confirmation
                </li>
                <li>
                  <strong className="text-dark">Vercel</strong> (hébergeur) pour
                  l&apos;hébergement technique du site
                </li>
              </ul>
              <p className="mt-4">
                Vos données ne sont jamais vendues, échangées ou louées à des tiers à des fins
                commerciales. Elles ne sont pas transférées en dehors de l&apos;Union Européenne,
                sauf aux prestataires techniques mentionnés ci-dessus qui offrent des garanties
                adéquates de protection des données.
              </p>
            </div>

            {/* Durée de conservation */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                6. Durée de conservation
              </h2>
              <p className="mb-4">
                Vos données personnelles sont conservées pour les durées suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-dark">Formulaire de contact :</strong> 3 ans à compter de
                  votre dernier contact
                </li>
                <li>
                  <strong className="text-dark">Formulaire de devis :</strong> 3 ans à compter de la
                  demande, ou pour la durée de la relation commerciale le cas échéant
                </li>
                <li>
                  <strong className="text-dark">Cookies analytiques :</strong> 13 mois maximum
                  conformement aux recommandations de la CNIL
                </li>
              </ul>
              <p className="mt-4">
                Au-delà de ces durées, vos données sont supprimées ou anonymisées de manière
                irréversible.
              </p>
            </div>

            {/* Droits */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                7. Vos droits
              </h2>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                Informatique et Libertés, vous disposez des droits suivants concernant vos données
                personnelles :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Droit d'accès",
                    desc: "Obtenir la confirmation que vos données sont traitées et en recevoir une copie.",
                  },
                  {
                    title: "Droit de rectification",
                    desc: "Faire corriger des données inexactes ou incomplètes vous concernant.",
                  },
                  {
                    title: "Droit à l'effacement",
                    desc: "Demander la suppression de vos données dans les conditions prévues par le RGPD.",
                  },
                  {
                    title: "Droit à la limitation",
                    desc: "Demander la limitation du traitement de vos données dans certains cas.",
                  },
                  {
                    title: "Droit à la portabilité",
                    desc: "Recevoir vos données dans un format structuré et couramment utilisé.",
                  },
                  {
                    title: "Droit d'opposition",
                    desc: "Vous opposer au traitement de vos données pour des motifs légitimes.",
                  },
                ].map((droit) => (
                  <div
                    key={droit.title}
                    className="bg-light rounded-xl p-5 border border-light-darker"
                  >
                    <h3 className="font-heading font-bold text-dark text-sm mb-1">
                      {droit.title}
                    </h3>
                    <p className="text-sm text-gray-600">{droit.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6">
                Pour exercer ces droits, vous pouvez me contacter à l&apos;adresse suivante :{" "}
                <a
                  href="mailto:spnettoyages04@gmail.com"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  spnettoyages04@gmail.com
                </a>
                . Je m&apos;engage à répondre à votre demande dans un délai de 30 jours.
              </p>
              <p className="mt-3">
                En cas de difficulté dans la gestion de vos données, vous pouvez introduire une
                réclamation auprès de la{" "}
                <a
                  href="https://www.cnil.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
                </a>
                .
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                8. Cookies
              </h2>
              <p className="mb-4">
                Le site sp-nettoyages.fr utilise des cookies. Un cookie est un petit fichier texte
                déposé sur votre navigateur lors de la visite d&apos;un site web.
              </p>

              <h3 className="font-heading font-bold text-lg text-dark mb-3">
                8.1 Cookies utilisés
              </h3>
              <div className="space-y-4 mb-6">
                <div className="bg-light rounded-xl p-5 border border-light-darker">
                  <h4 className="font-heading font-bold text-dark text-sm mb-1">
                    Cookie de consentement (stockage local)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Enregistre votre choix concernant l&apos;acceptation ou le refus des cookies.
                    Indispensable au fonctionnement du bandeau de consentement. Durée : persistant.
                  </p>
                </div>
                <div className="bg-light rounded-xl p-5 border border-light-darker">
                  <h4 className="font-heading font-bold text-dark text-sm mb-1">
                    Google Analytics (cookies analytiques)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Activé <strong>uniquement après votre consentement explicite</strong>. Ces
                    cookies permettent de mesurer l&apos;audience du site (pages visitées, durée des
                    visites, provenance). Les données collectées sont anonymes. Durée : 13 mois
                    maximum.
                  </p>
                </div>
                <div className="bg-light rounded-xl p-5 border border-light-darker">
                  <h4 className="font-heading font-bold text-dark text-sm mb-1">
                    Vercel Analytics
                  </h4>
                  <p className="text-sm text-gray-600">
                    Outil d&apos;analyse des performances du site. Ne collecte aucune donnée
                    personnelle identifiable. Les données sont agrégées et anonymisées.
                  </p>
                </div>
              </div>

              <h3 className="font-heading font-bold text-lg text-dark mb-3">
                8.2 Gestion de vos préférences
              </h3>
              <p className="mb-4">
                Lors de votre première visite, un bandeau de consentement vous permet
                d&apos;accepter ou de refuser les cookies analytiques. Vous pouvez à tout moment
                modifier votre choix en supprimant les données de votre navigateur (stockage local).
              </p>
              <p>
                Vous pouvez également configurer votre navigateur pour bloquer les cookies. Notez que
                cela peut affecter le fonctionnement de certaines fonctionnalités du site.
              </p>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                9. Sécurité des données
              </h2>
              <p>
                SP Nettoyages met en œuvre les mesures techniques et organisationnelles appropriées
                pour protéger vos données personnelles contre la destruction accidentelle ou illicite,
                la perte accidentelle, l&apos;altération, la diffusion ou l&apos;accès non autorisé.
                Le site est hébergé sur des serveurs sécurisés avec chiffrement HTTPS.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                10. Modifications de la politique
              </h2>
              <p>
                SP Nettoyages se réserve le droit de modifier la présente politique de
                confidentialité à tout moment. En cas de modification substantielle, une notification
                sera affichée sur le site. Je vous invite à consulter régulièrement cette page
                pour prendre connaissance des éventuelles modifications.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-6">
                11. Contact
              </h2>
              <div className="bg-light rounded-2xl p-6 md:p-8">
                <p className="mb-4">
                  Pour toute question relative à cette politique de confidentialité ou pour exercer
                  vos droits, vous pouvez me contacter :
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong className="text-dark">Par email :</strong>{" "}
                    <a
                      href="mailto:spnettoyages04@gmail.com"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      spnettoyages04@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong className="text-dark">Par téléphone :</strong>{" "}
                    <a
                      href="tel:+33674338786"
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      06 74 33 87 86
                    </a>
                  </li>
                  <li>
                    <strong className="text-dark">Par courrier :</strong> SP Nettoyages - 4 Impasse
                    du Sentier, 25310 Abbevillers, France
                  </li>
                </ul>
              </div>
            </div>

            {/* Retour accueil */}
            <div className="pt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 gradient-primary text-white px-8 py-3.5 rounded-full font-bold hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
