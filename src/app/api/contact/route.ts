import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/validations"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    /* ============================================================
       Envoi emails via Resend
    ============================================================ */
    if (process.env.RESEND_API_KEY && resend) {
      // Email au business
      await resend.emails.send({
        from: "SP Nettoyages <noreply@dtmedia.fr>",
        to: "spnettoyages04@gmail.com",
        replyTo: data.email,
        subject: `Nouveau message depuis le site - ${data.subject}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f0f9ff;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0EA5C8,#06D6A0);padding:30px 40px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">SP Nettoyages</h1>
      <p style="color:rgba(255,255,255,0.9);margin:5px 0 0;font-size:14px;">Nouveau message de contact</p>
    </div>

    <!-- Contenu -->
    <div style="padding:30px 40px;">
      <h2 style="color:#0C2D48;font-size:20px;margin:0 0 20px;">Nouveau message reçu</h2>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;width:120px;vertical-align:top;">Nom</td>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;font-weight:600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;vertical-align:top;">Email</td>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;"><a href="mailto:${data.email}" style="color:#0EA5C8;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;vertical-align:top;">Téléphone</td>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;"><a href="tel:${data.phone}" style="color:#0EA5C8;">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#666;font-size:14px;vertical-align:top;">Sujet</td>
          <td style="padding:12px 0;border-bottom:1px solid #e0f2fe;color:#0C2D48;font-size:14px;font-weight:600;">${data.subject}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#666;font-size:14px;vertical-align:top;">Message</td>
          <td style="padding:12px 0;color:#0C2D48;font-size:14px;line-height:1.6;">${data.message.replace(/\n/g, "<br>")}</td>
        </tr>
      </table>
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
        subject: "Votre message a bien été reçu - SP Nettoyages",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f0f9ff;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0EA5C8,#06D6A0);padding:30px 40px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">SP Nettoyages</h1>
      <p style="color:rgba(255,255,255,0.9);margin:5px 0 0;font-size:14px;">Confirmation de réception</p>
    </div>

    <!-- Contenu -->
    <div style="padding:30px 40px;">
      <h2 style="color:#0C2D48;font-size:20px;margin:0 0 15px;">Bonjour ${data.name},</h2>
      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 15px;">
        J'ai bien reçu votre message concernant : <strong>${data.subject}</strong>.
      </p>
      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 15px;">
        Je vais l'étudier et vous répondrai dans les meilleurs délais.
      </p>
      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 25px;">
        Si votre demande est urgente, n'hésitez pas à m'appeler directement au
        <a href="tel:+33674338786" style="color:#0EA5C8;font-weight:600;"> 06 74 33 87 86</a>.
      </p>

      <div style="background:#f0f9ff;border-radius:12px;padding:20px;border-left:4px solid #0EA5C8;">
        <p style="color:#666;font-size:13px;margin:0;"><strong style="color:#0C2D48;">Votre message :</strong></p>
        <p style="color:#444;font-size:13px;line-height:1.6;margin:10px 0 0;">${data.message.replace(/\n/g, "<br>")}</p>
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
          formName: "Contact",
          formData: data,
        }),
      })
    } catch (crmError) {
      console.error("CRM submission error:", crmError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 400 }
    )
  }
}
