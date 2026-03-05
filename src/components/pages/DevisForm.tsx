"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Droplets,
  Zap,
  Building2,
  CalendarCheck,
  AlertTriangle,
  Car,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"

/* ============================================================
   Types et constantes
============================================================ */

interface ServiceOption {
  id: string
  label: string
  icon: React.ReactNode
}

const services: ServiceOption[] = [
  { id: "eau-pure", label: "Nettoyage eau pure", icon: <Droplets className="w-7 h-7" /> },
  { id: "haute-pression", label: "Nettoyage haute pression", icon: <Zap className="w-7 h-7" /> },
  { id: "industriel", label: "Nettoyage industriel / commercial", icon: <Building2 className="w-7 h-7" /> },
  { id: "entretien", label: "Entretien régulier", icon: <CalendarCheck className="w-7 h-7" /> },
  { id: "sinistre", label: "Intervention sinistre", icon: <AlertTriangle className="w-7 h-7" /> },
  { id: "vehicule", label: "Nettoyage véhicule", icon: <Car className="w-7 h-7" /> },
  { id: "autre", label: "Autre", icon: <HelpCircle className="w-7 h-7" /> },
]

/* ============================================================
   Champs conditionnels par service
============================================================ */

interface FieldConfig {
  name: string
  label: string
  type: "select" | "input" | "textarea" | "checkboxes"
  options?: string[]
  placeholder?: string
}

function getFieldsForService(serviceId: string): FieldConfig[] {
  switch (serviceId) {
    case "eau-pure":
      return [
        {
          name: "type_surface",
          label: "Type de surface",
          type: "select",
          options: ["Vitres / fenêtres", "Panneaux solaires", "Façade", "Véranda", "Autre"],
        },
        { name: "surface_approx", label: "Surface approximative (m2)", type: "input", placeholder: "Ex: 50" },
        {
          name: "hauteur_acces",
          label: "Hauteur d'accès",
          type: "select",
          options: ["Rez-de-chaussée", "1 étage", "2 étages", "3 étages ou plus"],
        },
        {
          name: "frequence",
          label: "Fréquence souhaitée",
          type: "select",
          options: ["Ponctuel", "Mensuel", "Trimestriel", "Semestriel", "Annuel"],
        },
      ]
    case "haute-pression":
      return [
        {
          name: "type_surface",
          label: "Type de surface",
          type: "select",
          options: ["Terrasse / dalle", "Façade", "Allée / parking", "Mur", "Toiture", "Autre"],
        },
        { name: "surface_approx", label: "Surface approximative (m2)", type: "input", placeholder: "Ex: 80" },
      ]
    case "industriel":
      return [
        {
          name: "type_local",
          label: "Type de local",
          type: "select",
          options: ["Atelier / usine", "Entrepôt", "Bureau", "Commerce", "Restaurant", "Autre"],
        },
        { name: "surface_approx", label: "Surface du local (m2)", type: "input", placeholder: "Ex: 200" },
        {
          name: "frequence",
          label: "Fréquence souhaitée",
          type: "select",
          options: ["Ponctuel", "Hebdomadaire", "Bi-mensuel", "Mensuel", "Trimestriel"],
        },
      ]
    case "entretien":
      return [
        {
          name: "type_local",
          label: "Type de local",
          type: "select",
          options: ["Maison individuelle", "Appartement", "Bureau", "Commerce", "Copropriété", "Autre"],
        },
        { name: "surface_approx", label: "Surface (m2)", type: "input", placeholder: "Ex: 120" },
        {
          name: "frequence",
          label: "Fréquence souhaitée",
          type: "select",
          options: ["Hebdomadaire", "Bi-mensuel", "Mensuel", "Trimestriel"],
        },
      ]
    case "sinistre":
      return [
        {
          name: "type_sinistre",
          label: "Type de sinistre",
          type: "select",
          options: ["Dégât des eaux", "Incendie"],
        },
        {
          name: "urgence",
          label: "Niveau d'urgence",
          type: "select",
          options: ["Très urgent (sous 24h)", "Urgent (sous 48h)", "Planifié (sous 1 semaine)"],
        },
        { name: "surface_approx", label: "Surface concernée (m2)", type: "input", placeholder: "Ex: 30" },
      ]
    case "vehicule":
      return [
        {
          name: "type_vehicule",
          label: "Type de véhicule",
          type: "select",
          options: ["Voiture", "Utilitaire / camionnette", "Camion / poids lourd", "Bus / car", "Engin de chantier", "Autre"],
        },
        {
          name: "prestations",
          label: "Prestations souhaitées",
          type: "checkboxes",
          options: ["Lavage extérieur", "Nettoyage intérieur", "Lavage complet", "Désinfection", "Traitement carrosserie"],
        },
      ]
    case "autre":
      return [
        {
          name: "description_libre",
          label: "Décrivez votre besoin",
          type: "textarea",
          placeholder: "Décrivez votre projet en détail...",
        },
      ]
    default:
      return []
  }
}

/* ============================================================
   Composant principal
============================================================ */

export default function DevisForm() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [details, setDetails] = useState<Record<string, string>>({})
  const [coordonnees, setCoordonnees] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState("")

  /* ---------- Navigation ---------- */

  function goNext() {
    if (step === 1) {
      if (!selectedService) {
        setErrors({ service: "Veuillez sélectionner un service" })
        return
      }
      setErrors({})
      setStep(2)
    } else if (step === 2) {
      setErrors({})
      setStep(3)
    }
  }

  function goBack() {
    setErrors({})
    setStep((prev) => prev - 1)
  }

  /* ---------- Validation étape 3 ---------- */

  function validateCoordonnees(): boolean {
    const newErrors: Record<string, string> = {}
    if (coordonnees.name.trim().length < 2) newErrors.name = "Le nom doit contenir au moins 2 caractères"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(coordonnees.email)) newErrors.email = "Adresse email invalide"
    if (coordonnees.phone.trim().length < 10) newErrors.phone = "Numéro de téléphone invalide"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* ---------- Soumission ---------- */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateCoordonnees()) return

    setIsSubmitting(true)
    setServerError("")

    const payload = {
      service_type: selectedService,
      details: Object.keys(details).length > 0 ? details : undefined,
      name: coordonnees.name,
      email: coordonnees.email,
      phone: coordonnees.phone,
      address: coordonnees.address || undefined,
      city: coordonnees.city || undefined,
      message: coordonnees.message || undefined,
    }

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Erreur")
      setIsSuccess(true)
    } catch {
      setServerError("Une erreur est survenue. Veuillez réessayer ou m'appeler directement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ---------- Handlers ---------- */

  function handleDetailChange(name: string, value: string) {
    setDetails((prev) => ({ ...prev, [name]: value }))
  }

  function handleCheckboxChange(name: string, option: string, checked: boolean) {
    const current = details[name] ? details[name].split(", ") : []
    const updated = checked ? [...current, option] : current.filter((v) => v !== option)
    setDetails((prev) => ({ ...prev, [name]: updated.join(", ") }))
  }

  function handleCoordChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setCoordonnees((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  /* ---------- Succes ---------- */

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-2xl shadow-primary/10 border border-light-darker text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
        </motion.div>
        <h3 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-3">
          Demande envoyée avec succès !
        </h3>
        <p className="text-gray-600 mb-2">
          Merci pour votre demande de devis. Je vais l&apos;étudier et vous répondrai sous 24h.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Un email de confirmation a été envoyé à <span className="font-medium text-secondary">{coordonnees.email}</span>
        </p>
        <button
          onClick={() => {
            setIsSuccess(false)
            setStep(1)
            setSelectedService("")
            setDetails({})
            setCoordonnees({ name: "", email: "", phone: "", address: "", city: "", message: "" })
          }}
          className="gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
        >
          Faire une autre demande
        </button>
      </motion.div>
    )
  }

  /* ---------- Barre de progression ---------- */

  const progressBar = (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {["Type de service", "Détails du projet", "Vos coordonnées"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step > i + 1
                  ? "gradient-primary text-white"
                  : step === i + 1
                    ? "gradient-primary text-white shadow-lg shadow-primary/30"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-sm font-medium hidden sm:block ${
                step >= i + 1 ? "text-secondary" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-primary rounded-full"
          initial={false}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  )

  /* ---------- Rendu ---------- */

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3.5 rounded-xl border-2 bg-light/50 transition-all duration-300 outline-none font-body text-gray-800 placeholder:text-gray-400 focus:bg-white focus:shadow-lg focus:shadow-primary/5 ${
      hasError ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
    }`

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl shadow-primary/10 border border-light-darker">
        {progressBar}

        <form onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait">
            {/* =========== ETAPE 1 : Service =========== */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-heading font-bold text-xl md:text-2xl text-secondary mb-2">
                  Quel service vous intéresse ?
                </h3>
                <p className="text-gray-500 mb-8">
                  Sélectionnez le type de prestation souhaitée
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(service.id)
                        setDetails({})
                        setErrors({})
                      }}
                      className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                        selectedService === service.id
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-gray-200 hover:border-primary/40 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2.5 rounded-xl transition-all duration-300 ${
                            selectedService === service.id
                              ? "gradient-primary text-white"
                              : "bg-light text-primary group-hover:bg-primary/10"
                          }`}
                        >
                          {service.icon}
                        </div>
                        <span
                          className={`font-semibold transition-colors ${
                            selectedService === service.id ? "text-primary" : "text-secondary"
                          }`}
                        >
                          {service.label}
                        </span>
                      </div>
                      {selectedService === service.id && (
                        <motion.div
                          layoutId="service-check"
                          className="absolute top-3 right-3"
                          initial={false}
                        >
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                {errors.service && (
                  <p className="mt-4 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.service}
                  </p>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={goNext}
                    className="gradient-primary text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* =========== ETAPE 2 : Details =========== */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-heading font-bold text-xl md:text-2xl text-secondary mb-2">
                  Détails de votre projet
                </h3>
                <p className="text-gray-500 mb-8">
                  Ces informations m&apos;aideront à établir un devis précis
                </p>

                <div className="space-y-5">
                  {getFieldsForService(selectedService).map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {field.label}
                      </label>

                      {field.type === "select" && (
                        <>
                          <select
                            value={details[field.name] || ""}
                            onChange={(e) => handleDetailChange(field.name, e.target.value)}
                            className={`${inputClasses(false)} appearance-none cursor-pointer ${
                              !details[field.name] ? "text-gray-400" : ""
                            }`}
                          >
                            <option value="">Sélectionnez...</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {details[field.name] === "Autre" && (
                            <input
                              type="text"
                              value={details[`${field.name}_autre`] || ""}
                              onChange={(e) => handleDetailChange(`${field.name}_autre`, e.target.value)}
                              placeholder="Précisez..."
                              className={`${inputClasses(false)} mt-3`}
                            />
                          )}
                        </>
                      )}

                      {field.type === "input" && (
                        <input
                          type="text"
                          value={details[field.name] || ""}
                          onChange={(e) => handleDetailChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          className={inputClasses(false)}
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          value={details[field.name] || ""}
                          onChange={(e) => handleDetailChange(field.name, e.target.value)}
                          placeholder={field.placeholder}
                          rows={4}
                          className={`${inputClasses(false)} resize-none`}
                        />
                      )}

                      {field.type === "checkboxes" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          {field.options?.map((opt) => {
                            const isChecked = details[field.name]
                              ? details[field.name].split(", ").includes(opt)
                              : false
                            return (
                              <label
                                key={opt}
                                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                  isChecked
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-primary/40"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) =>
                                    handleCheckboxChange(field.name, opt, e.target.checked)
                                  }
                                  className="w-4 h-4 accent-primary"
                                />
                                <span className="text-sm text-gray-700">{opt}</span>
                              </label>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    className="border-2 border-gray-200 text-gray-600 px-6 py-3.5 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="gradient-primary text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* =========== ÉTAPE 3 : Coordonnées =========== */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-heading font-bold text-xl md:text-2xl text-secondary mb-2">
                  Vos coordonnées
                </h3>
                <p className="text-gray-500 mb-8">
                  Pour que je puisse vous recontacter rapidement
                </p>

                <div className="space-y-5">
                  {/* Nom */}
                  <div>
                    <label htmlFor="devis-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="devis-name"
                      name="name"
                      value={coordonnees.name}
                      onChange={handleCoordChange}
                      placeholder="Votre nom"
                      className={inputClasses(!!errors.name)}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email + Telephone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="devis-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="devis-email"
                        name="email"
                        value={coordonnees.email}
                        onChange={handleCoordChange}
                        placeholder="votre@email.fr"
                        className={inputClasses(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="devis-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="devis-phone"
                        name="phone"
                        value={coordonnees.phone}
                        onChange={handleCoordChange}
                        placeholder="06 XX XX XX XX"
                        className={inputClasses(!!errors.phone)}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Adresse + Ville */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="devis-address" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Adresse
                      </label>
                      <input
                        type="text"
                        id="devis-address"
                        name="address"
                        value={coordonnees.address}
                        onChange={handleCoordChange}
                        placeholder="Votre adresse"
                        className={inputClasses(false)}
                      />
                    </div>
                    <div>
                      <label htmlFor="devis-city" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ville
                      </label>
                      <input
                        type="text"
                        id="devis-city"
                        name="city"
                        value={coordonnees.city}
                        onChange={handleCoordChange}
                        placeholder="Votre ville"
                        className={inputClasses(false)}
                      />
                    </div>
                  </div>

                  {/* Message complémentaire */}
                  <div>
                    <label htmlFor="devis-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message complémentaire
                    </label>
                    <textarea
                      id="devis-message"
                      name="message"
                      value={coordonnees.message}
                      onChange={handleCoordChange}
                      rows={4}
                      placeholder="Informations supplémentaires, contraintes particulières..."
                      className={`${inputClasses(false)} resize-none`}
                    />
                  </div>

                  {serverError && (
                    <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {serverError}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={goBack}
                    className="border-2 border-gray-200 text-gray-600 px-6 py-3.5 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="gradient-primary text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer ma demande de devis
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}
