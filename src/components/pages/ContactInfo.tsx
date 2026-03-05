"use client"

import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react"

export default function ContactInfo() {
  function trackEvent(event: string) {
    try {
      fetch("https://crm-dt-media.vercel.app/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, projectId: "sp-nettoyages" }),
      })
    } catch {
      /* non-bloquant */
    }
  }

  return (
    <div className="space-y-8">
      {/* Titre */}
      <div>
        <h3 className="font-heading font-bold text-2xl text-secondary mb-2">
          Mes coordonnées
        </h3>
        <p className="text-gray-500">
          N&apos;hésitez pas à me contacter par le moyen qui vous convient le mieux.
        </p>
      </div>

      {/* Cartes contact */}
      <div className="space-y-4">
        {/* Telephone */}
        <a
          href="tel:+33674338786"
          className="group flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          onClick={() => trackEvent("phone_click")}
        >
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Téléphone</p>
            <p className="font-semibold text-secondary text-lg">06 74 33 87 86</p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:spnettoyages04@gmail.com"
          className="group flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          onClick={() => trackEvent("email_click")}
        >
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-secondary">spnettoyages04@gmail.com</p>
          </div>
        </a>

        {/* Adresse */}
        <a
          href="https://maps.google.com/?q=4+Impasse+du+Sentier+25310+Abbevillers"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          onClick={() => trackEvent("address_click")}
        >
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Adresse</p>
            <p className="font-semibold text-secondary">4 Impasse du Sentier, 25310 Abbevillers</p>
          </div>
        </a>

        {/* Horaires */}
        <div className="flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-100">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Horaires</p>
            <p className="font-semibold text-secondary">Lun - Ven : 8h00 - 19h00</p>
          </div>
        </div>
      </div>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/p/SP-Nettoyages-61561349994384/"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 bg-[#1877F2] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1666D8] hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Facebook className="w-5 h-5" />
        Suivez-moi sur Facebook
      </a>

      {/* Carte Google Maps */}
      <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-100">
        <iframe
          src="https://www.google.com/maps?q=SP+Nettoyages,+4+Impasse+du+Sentier,+25310+Abbevillers&hl=fr&output=embed"
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SP Nettoyages - 4 Impasse du Sentier, 25310 Abbevillers"
        />
      </div>
    </div>
  )
}
