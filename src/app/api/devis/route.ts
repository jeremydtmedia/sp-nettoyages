import { NextResponse } from "next/server"
import { Resend } from "resend"
import { devisSchema } from "@/lib/validations"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

/* ============================================================
   Labels lisibles pour les services
============================================================ */
const serviceLabels: Record<string, string> = {
  "eau-pure": "Nettoyage eau pure",
  "haute-pression": "Nettoyage haute pression",
  industriel: "Nettoyage industriel / commercial",
  entretien: "Entretien régulier",
  sinistre: "Intervention sinistre",
  vehicule: "Nettoyage véhicule",
  autre: "Autre",
}

const detailLabels: Record<string, string> = {
  type_surface: "Type de surface",
  surface_approx: "Surface approximative",
  hauteur_acces: "Hauteur d'accès",
  frequence: "Fréquence souhaitée",
  type_local: "Type de local",
  type_sinistre: "Type de sinistre",
  urgence: "Niveau d'urgence",
  type_vehicule: "Type de véhicule",
  prestations: "Prestations souhaitées",
  description_libre: "Description",
  type_surface_autre: "Précision (surface)",
  type_local_autre: "Précision (local)",
  type_vehicule_autre: "Précision (véhicule)",
}

function formatDetails(details?: Record<string, string>): string {
  if (!details || Object.keys(details).length === 0) return ""
  return Object.entries(details)
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;width:180px;vertical-align:top;">${detailLabels[key] || key}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;">${value}</td>
        </tr>`
    )
    .join("")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = devisSchema.parse(body)

    const serviceLabel = serviceLabels[data.service_type] || data.service_type
    const detailsHtml = formatDetails(data.details)

    /* ============================================================
       Envoi emails via Resend
    ============================================================ */
    if (process.env.RESEND_API_KEY && resend) {
      // Email au business
      await resend.emails.send({
        from: "SP Nettoyages <noreply@dtmedia.fr>",
        to: "spnettoyages04@gmail.com",
        replyTo: data.email,
        subject: `Nouvelle demande de devis - ${serviceLabel}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f0f9ff;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0EA5C8,#06D6A0);padding:30px 40px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">SP Nettoyages</h1>
      <p style="color:rgba(255,255,255,0.9);margin:5px 0 0;font-size:14px;">Nouvelle demande de devis</p>
    </div>

    <!-- Contenu -->
    <div style="padding:30px 40px;">
      <!-- Badge service -->
      <div style="background:linear-gradient(135deg,#0EA5C8,#06D6A0);display:inline-block;padding:8px 20px;border-radius:20px;margin-bottom:20px;">
        <span style="color:#ffffff;font-size:14px;font-weight:600;">${serviceLabel}</span>
      </div>

      <h2 style="color:#0C2D48;font-size:20px;margin:0 0 20px;">Informations du demandeur</h2>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;width:180px;vertical-align:top;">Nom</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;font-weight:600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;vertical-align:top;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;"><a href="mailto:${data.email}" style="color:#0EA5C8;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;vertical-align:top;">Téléphone</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;"><a href="tel:${data.phone}" style="color:#0EA5C8;">${data.phone}</a></td>
        </tr>
        ${data.address ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;vertical-align:top;">Adresse</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;">${data.address}</td>
        </tr>` : ""}
        ${data.city ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;vertical-align:top;">Ville</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;">${data.city}</td>
        </tr>` : ""}
      </table>

      ${detailsHtml ? `
      <h2 style="color:#0C2D48;font-size:18px;margin:25px 0 15px;">Détails du projet</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${detailsHtml}
      </table>` : ""}

      ${data.message ? `
      <h2 style="color:#0C2D48;font-size:18px;margin:25px 0 15px;">Message complémentaire</h2>
      <div style="background:#f0f9ff;border-radius:12px;padding:15px;border-left:4px solid #0EA5C8;">
        <p style="color:#444;font-size:14px;line-height:1.6;margin:0;">${data.message.replace(/\n/g, "<br>")}</p>
      </div>` : ""}
    </div>

    <!-- Footer -->
    <div style="background:#0A1628;padding:20px 40px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0;">SP Nettoyages - 4 Impasse du Sentier, 25310 Abbevillers</p>
      <p style="color:#999;font-size:12px;margin:5px 0 0;">06 74 33 87 86 | spnettoyages04@gmail.com</p>
    </div>
  </div>
</body>
</html>`,
      })

      // Email de confirmation au client
      await resend.emails.send({
        from: "SP Nettoyages <noreply@dtmedia.fr>",
        to: data.email,
        subject: "Votre demande de devis a bien été reçue - SP Nettoyages",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f0f9ff;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0EA5C8,#06D6A0);padding:30px 40px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">SP Nettoyages</h1>
      <p style="color:rgba(255,255,255,0.9);margin:5px 0 0;font-size:14px;">Confirmation de votre demande</p>
    </div>

    <!-- Contenu -->
    <div style="padding:30px 40px;">
      <h2 style="color:#0C2D48;font-size:20px;margin:0 0 15px;">Bonjour ${data.name},</h2>
      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 15px;">
        J'ai bien reçu votre demande de devis pour : <strong style="color:#0EA5C8;">${serviceLabel}</strong>.
      </p>
      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 15px;">
        Je vais étudier votre demande et vous recontacterai <strong>sous 24 heures</strong> avec une proposition adaptée.
      </p>
      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 25px;">
        Si vous avez des questions complémentaires, n'hésitez pas à m'appeler au
        <a href="tel:+33674338786" style="color:#0EA5C8;font-weight:600;"> 06 74 33 87 86</a>.
      </p>

      <!-- Recap -->
      <div style="background:#f0f9ff;border-radius:12px;padding:20px;border-left:4px solid #0EA5C8;">
        <p style="color:#0C2D48;font-size:14px;font-weight:600;margin:0 0 10px;">Récapitulatif de votre demande</p>
        <p style="color:#666;font-size:13px;margin:0;">
          <strong>Service :</strong> ${serviceLabel}<br>
          ${data.address ? `<strong>Adresse :</strong> ${data.address}${data.city ? `, ${data.city}` : ""}<br>` : ""}
          ${data.message ? `<strong>Message :</strong> ${data.message.replace(/\n/g, "<br>")}` : ""}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#0A1628;padding:20px 40px;text-align:center;">
      <p style="color:#999;font-size:12px;margin:0;">SP Nettoyages - 4 Impasse du Sentier, 25310 Abbevillers</p>
      <p style="color:#999;font-size:12px;margin:5px 0 0;">06 74 33 87 86 | spnettoyages04@gmail.com</p>
    </div>
  </div>
</body>
</html>`,
      })
    }

    /* ============================================================
       CRM (non-bloquant)
    ============================================================ */
    try {
      await fetch("https://crm-dt-media.vercel.app/api/form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: "sp-nettoyages",
          formName: "Devis",
          formData: {
            service_type: data.service_type,
            service_label: serviceLabel,
            details: data.details,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            message: data.message,
          },
        }),
      })
    } catch (crmError) {
      console.error("CRM submission error:", crmError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Devis form error:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la demande" },
      { status: 400 }
    )
  }
}
