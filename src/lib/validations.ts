import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  subject: z.string().min(2, "Veuillez indiquer un sujet"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const devisSchema = z.object({
  service_type: z.string().min(1, "Veuillez sélectionner un service"),
  details: z.record(z.string(), z.string()).optional(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().optional(),
  city: z.string().optional(),
  message: z.string().optional(),
})

export type DevisFormData = z.infer<typeof devisSchema>
