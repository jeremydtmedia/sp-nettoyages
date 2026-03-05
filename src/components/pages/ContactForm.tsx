"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

const subjects = [
  "Demande d'information",
  "Réclamation",
  "Partenariat",
  "Autre",
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (formData.name.trim().length < 2) newErrors.name = "Le nom doit contenir au moins 2 caractères"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Adresse email invalide"
    if (formData.phone.trim().length < 10) newErrors.phone = "Numéro de téléphone invalide"
    if (formData.subject.trim().length < 2) newErrors.subject = "Veuillez sélectionner un sujet"
    if (formData.message.trim().length < 10) newErrors.message = "Le message doit contenir au moins 10 caractères"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setServerError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Erreur lors de l'envoi")

      setIsSuccess(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch {
      setServerError("Une erreur est survenue. Veuillez réessayer ou m'appeler directement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl shadow-primary/10 border border-light-darker text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
        </motion.div>
        <h3 className="font-heading font-bold text-2xl text-secondary mb-3">
          Message envoyé avec succès !
        </h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre message. Je vous répondrai dans les meilleurs délais.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="gradient-primary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl shadow-primary/10 border border-light-darker"
      noValidate
    >
      <h3 className="font-heading font-bold text-2xl text-secondary mb-8">
        Envoyez-moi un message
      </h3>

      <div className="space-y-5">
        {/* Nom */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-light/50 transition-all duration-300 outline-none font-body text-gray-800 placeholder:text-gray-400 focus:bg-white focus:shadow-lg focus:shadow-primary/5 ${
              errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
            }`}
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
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.fr"
              className={`w-full px-4 py-3.5 rounded-xl border-2 bg-light/50 transition-all duration-300 outline-none font-body text-gray-800 placeholder:text-gray-400 focus:bg-white focus:shadow-lg focus:shadow-primary/5 ${
                errors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="06 XX XX XX XX"
              className={`w-full px-4 py-3.5 rounded-xl border-2 bg-light/50 transition-all duration-300 outline-none font-body text-gray-800 placeholder:text-gray-400 focus:bg-white focus:shadow-lg focus:shadow-primary/5 ${
                errors.phone ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Sujet */}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
            Sujet <span className="text-red-500">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-light/50 transition-all duration-300 outline-none font-body text-gray-800 focus:bg-white focus:shadow-lg focus:shadow-primary/5 appearance-none cursor-pointer ${
              errors.subject ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
            } ${!formData.subject ? "text-gray-400" : ""}`}
          >
            <option value="" disabled>
              Sélectionnez un sujet
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Décrivez votre demande..."
            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-light/50 transition-all duration-300 outline-none font-body text-gray-800 placeholder:text-gray-400 resize-none focus:bg-white focus:shadow-lg focus:shadow-primary/5 ${
              errors.message ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer le message
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  )
}
