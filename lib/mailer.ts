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
  <table width="100%" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 6px 32px rgba(0,0,0,0.09);">

    <!-- ── HEADER ── -->
    <tr>
      <td style="background:linear-gradient(135deg,#5c9b01 0%,#4a7f01 100%);padding:30px 40px;text-align:center;">
        <img src="${SITE_URL}/logo-swipyeat.png" alt="SwipyEat" width="160" style="display:block;margin:0 auto;max-height:56px;object-fit:contain;" />
      </td>
    </tr>

    <!-- orange accent bar -->
    <tr><td style="background:#ff4d00;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- ── WELCOME ── -->
    <tr>
      <td style="padding:40px 40px 32px;">
        <h1 style="margin:0 0 10px;font-size:28px;font-weight:800;color:#111827;">Bienvenue à bord&nbsp;! 🎉</h1>
        <p style="margin:0 0 24px;color:#6b7280;font-size:16px;line-height:1.75;">
          Vous faites maintenant partie de la communauté <strong style="color:#5c9b01;">SwipyEat</strong>. Nous construisons le futur des menus restaurant — et vous serez les premiers à en entendre parler.
        </p>
        <div style="background:#f4fae8;border-left:4px solid #5c9b01;border-radius:10px;padding:18px 22px;margin-bottom:8px;">
          <p style="margin:0 0 6px;font-weight:700;color:#5c9b01;font-size:15px;">Qu'est-ce que SwipyEat ?</p>
          <p style="margin:0;color:#374151;font-size:14px;line-height:1.75;">
            SwipyEat remplace les menus papier par des QR codes intelligents. Les clients scannent le code à table, parcourent un menu digital élégant et commandent facilement — sans télécharger d'application.
          </p>
        </div>
      </td>
    </tr>

    <!-- ── SECTION DIVIDER ── -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" /></td></tr>

    <!-- ── FEATURE 1 : Menu client ── -->
    <tr>
      <td style="padding:32px 40px 24px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff4d00;">Pour vos clients</p>
        <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#111827;">📱 Menu digital &amp; Commande en ligne</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;line-height:1.7;">
          Vos clients scannent le QR code à table et accèdent instantanément à votre menu avec photos, descriptions et prix — en quelques secondes, sans friction.
        </p>
        <img src="${SITE_URL}/interfaceclient.png" alt="Interface client SwipyEat" width="220" style="display:block;margin:0 auto;border-radius:20px;box-shadow:0 8px 28px rgba(0,0,0,0.12);" />
      </td>
    </tr>

    <!-- ── SECTION DIVIDER ── -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" /></td></tr>

    <!-- ── FEATURE 2 : Menu admin ── -->
    <tr>
      <td style="padding:32px 40px 24px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#5c9b01;">Gestion du menu</p>
        <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#111827;">🍽️ Gérez vos plats facilement</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;line-height:1.7;">
          Ajoutez, modifiez ou désactivez vos articles en temps réel depuis votre tableau de bord. Les changements sont visibles immédiatement par vos clients — plus besoin de réimprimer.
        </p>
        <img src="${SITE_URL}/menuItems.png" alt="Gestion menu SwipyEat" width="520" style="display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,0.12);max-width:100%;" />
      </td>
    </tr>

    <!-- ── SECTION DIVIDER ── -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" /></td></tr>

    <!-- ── FEATURE 3 : Orders dashboard ── -->
    <tr>
      <td style="padding:32px 40px 24px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff4d00;">Suivi des commandes</p>
        <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#111827;">📊 Tableau de bord en temps réel</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;line-height:1.7;">
          Suivez chaque commande par table, de la réception jusqu'au paiement. Statuts en direct, chrono par commande, workflow complet — zéro oubli.
        </p>
        <img src="${SITE_URL}/ordersDashboard.png" alt="Dashboard commandes SwipyEat" width="520" style="display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,0.12);max-width:100%;" />
      </td>
    </tr>

    <!-- ── SECTION DIVIDER ── -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" /></td></tr>

    <!-- ── FEATURE 4 : Waiter app ── -->
    <tr>
      <td style="padding:32px 40px 24px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#5c9b01;">Application serveurs</p>
        <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#111827;">🧑‍🍳 Vos serveurs, toujours connectés</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;line-height:1.7;">
          Gestion des tables, alertes cuisine, prise de commande rapide — tout depuis leur téléphone. Vos équipes gagnent en efficacité et vos clients en satisfaction.
        </p>
        <img src="${SITE_URL}/waitersScreens.png" alt="Application serveurs SwipyEat" width="420" style="display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,0.12);max-width:100%;" />
      </td>
    </tr>

    <!-- ── SECTION DIVIDER ── -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" /></td></tr>

    <!-- ── FEATURE 5 : KDS ── -->
    <tr>
      <td style="padding:32px 40px 24px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff4d00;">Écran cuisine</p>
        <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#111827;">👨‍🍳 KDS — Kitchen Display System</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px;line-height:1.7;">
          Les commandes arrivent directement sur l'écran cuisine. Vos chefs voient les priorités, les notes spéciales et marquent chaque plat prêt en un tap — sans ticket papier.
        </p>
        <img src="${SITE_URL}/kds.png" alt="KDS SwipyEat" width="420" style="display:block;margin:0 auto;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,0.12);max-width:100%;" />
      </td>
    </tr>

    <!-- ── CTA ── -->
    <tr>
      <td style="padding:32px 40px 40px;text-align:center;background:#f9fafb;">
        <p style="margin:0 0 20px;font-size:18px;font-weight:800;color:#111827;">Prêt à digitaliser votre restaurant ?</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
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

    <!-- ── FOOTER ── -->
    <tr>
      <td style="background:#f3f4f6;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
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
