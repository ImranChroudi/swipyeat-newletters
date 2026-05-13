import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://swipyeat.com";

export async function sendWelcomeEmail(to: string): Promise<void> {
  const year = new Date().getFullYear();

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bienvenue chez SwipyEat</title>
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f4fae8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4fae8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:580px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 6px 32px rgba(0,0,0,0.08);">

        <!-- Header with logo -->
        <tr>
          <td style="background:linear-gradient(135deg,#5c9b01,#4a7f01);padding:28px 40px;text-align:center;">
            <img
              src="${SITE_URL}/logo-swipyeat.png"
              alt="SwipyEat"
              width="160"
              style="max-height:56px;object-fit:contain;display:block;margin:0 auto;"
            />
          </td>
        </tr>

        <!-- Orange accent bar -->
        <tr>
          <td style="background:#ff4d00;height:4px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">

            <h1 style="margin:0 0 8px;font-size:28px;color:#111827;font-weight:800;">
              Bienvenue à bord ! 🎉
            </h1>
            <p style="margin:0 0 24px;color:#6b7280;font-size:16px;line-height:1.7;">
              Vous faites maintenant partie de la communauté SwipyEat. Nous construisons le futur des menus restaurant — et vous serez les premiers à en entendre parler.
            </p>

            <!-- What is SwipyEat block -->
            <div style="background:#f4fae8;border-left:4px solid #5c9b01;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 8px;font-weight:700;color:#5c9b01;font-size:15px;">Qu'est-ce que SwipyEat ?</p>
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.75;">
                SwipyEat remplace les menus papier par des QR codes intelligents. Les clients scannent le code à table, parcourent un menu digital élégant et commandent facilement — sans télécharger d'application.
              </p>
            </div>

            <!-- What to expect -->
            <p style="margin:0 0 14px;font-weight:700;color:#111827;font-size:15px;">Ce que vous recevrez :</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:28px;">
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:28px;font-size:18px;">📱</td>
                <td style="padding:8px 0;color:#4b5563;font-size:14px;line-height:1.6;">
                  <strong style="color:#111827;">Menus QR &amp; Commandes Smart</strong><br/>
                  Accédez en avant-première aux nouvelles fonctionnalités.
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:28px;font-size:18px;">📊</td>
                <td style="padding:8px 0;color:#4b5563;font-size:14px;line-height:1.6;">
                  <strong style="color:#111827;">Analytics &amp; Insights</strong><br/>
                  Actualités du secteur et tendances de la restauration digitale.
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:28px;font-size:18px;">🔔</td>
                <td style="padding:8px 0;color:#4b5563;font-size:14px;line-height:1.6;">
                  <strong style="color:#111827;">Mises à jour en temps réel</strong><br/>
                  Conseils pour moderniser votre restaurant, livrés directement.
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:28px;font-size:18px;">🎁</td>
                <td style="padding:8px 0;color:#4b5563;font-size:14px;line-height:1.6;">
                  <strong style="color:#111827;">Offres exclusives</strong><br/>
                  Avantages réservés aux premiers abonnés.
                </td>
              </tr>
            </table>

            <!-- CTA buttons -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="${SITE_URL}" style="display:inline-block;background:#ff4d00;color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:12px;text-decoration:none;">
                    Visiter SwipyEat →
                  </a>
                </td>
                <td>
                  <a href="${SITE_URL}/catalogue.pdf" style="display:inline-block;background:#ffffff;color:#5c9b01;font-weight:700;font-size:15px;padding:13px 28px;border-radius:12px;text-decoration:none;border:2px solid #5c9b01;">
                    Voir le catalogue
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 6px;color:#9ca3af;font-size:12px;line-height:1.6;">
              Vous recevez cet email car vous vous êtes inscrit sur swipyeat.com.<br/>
              © ${year} SwipyEat. Tous droits réservés.
            </p>
            <p style="margin:0;font-size:12px;">
              <a href="${SITE_URL}" style="color:#5c9b01;text-decoration:none;">Se désabonner</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"SwipyEat" <${process.env.SMTP_USER}>`,
    to,
    subject: "Bienvenue dans la newsletter SwipyEat 🍽️",
    html,
  });
}
