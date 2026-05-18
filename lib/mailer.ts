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

    <!-- HEADER -->
    <tr>
      <td style="background:linear-gradient(135deg,#5c9b01 0%,#4a7f01 100%);padding:30px 40px;text-align:center;">
        <img src="${SITE_URL}/logo.avif" alt="SwipyEat" width="150" style="display:block;margin:0 auto;max-height:52px;object-fit:contain;" />
      </td>
    </tr>
    <tr><td style="background:#ff4d00;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr>

    <!-- WELCOME -->
    <tr>
      <td style="padding:40px 40px 28px;">
        <h1 style="margin:0 0 12px;font-size:30px;font-weight:800;color:#111827;line-height:1.2;text-align:left;">Bienvenue à bord&nbsp;! 🎉</h1>
        <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.8;text-align:left;">
          Vous faites maintenant partie de la communauté <strong style="color:#5c9b01;">SwipyEat</strong>. Nous construisons le futur des menus restaurant — et vous serez les premiers à en entendre parler.
        </p>
        <div style="background:#f4fae8;border-left:4px solid #5c9b01;border-radius:10px;padding:18px 22px;">
          <p style="margin:0 0 6px;font-weight:800;color:#5c9b01;font-size:15px;">Qu'est-ce que SwipyEat ?</p>
          <p style="margin:0;color:#374151;font-size:15px;line-height:1.75;">
            SwipyEat remplace les menus papier par des QR codes intelligents. Les clients scannent le code à table, parcourent un menu digital élégant et commandent — sans télécharger d'application.
          </p>
        </div>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;" /></td></tr>

    <!-- FEATURE 1 -->
    <tr>
      <td style="padding:36px 0 20px;">
        <div style="padding:0 40px;text-align:left;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff4d00;">Pour vos clients</p>
          <h2 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#111827;">📱 Menu digital</h2>
        </div>
        <img src="${SITE_URL}/interfaceclient.avif" alt="Interface client" width="600" style="width:100%;max-width:600px;height:auto;display:block;margin:0 0 20px;" />
        <p style="margin:0;padding:0 40px;color:#374151;font-size:15px;line-height:1.75;text-align:left;">
          Vos clients scannent le QR code et accèdent instantanément à votre menu avec photos et prix — en quelques secondes, sans friction.
        </p>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;" /></td></tr>

    <!-- FEATURE 2 -->
    <tr>
      <td style="padding:36px 0 20px;">
        <div style="padding:0 40px;text-align:left;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#5c9b01;">Gestion du menu</p>
          <h2 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#111827;">🍽️ Gérez vos plats</h2>
        </div>
        <img src="${SITE_URL}/menuItems.avif" alt="Gestion menu" width="600" style="width:100%;max-width:600px;height:auto;display:block;margin:0 0 20px;" />
        <p style="margin:0;padding:0 40px;color:#374151;font-size:15px;line-height:1.75;text-align:left;">
          Ajoutez, modifiez ou désactivez vos articles en temps réel. Les changements sont visibles immédiatement — plus besoin de réimprimer.
        </p>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;" /></td></tr>

    <!-- FEATURE 3 -->
    <tr>
      <td style="padding:36px 0 20px;">
        <div style="padding:0 40px;text-align:left;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff4d00;">Commandes</p>
          <h2 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#111827;">📊 Tableau de bord live</h2>
        </div>
        <img src="${SITE_URL}/ordersDashboard.avif" alt="Dashboard commandes" width="600" style="width:100%;max-width:600px;height:auto;display:block;margin:0 0 20px;" />
        <p style="margin:0;padding:0 40px;color:#374151;font-size:15px;line-height:1.75;text-align:left;">
          Suivez chaque commande par table, de la réception au paiement. Statuts en direct, chrono par commande — zéro oubli.
        </p>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;" /></td></tr>

    <!-- FEATURE 4 -->
    <tr>
      <td style="padding:36px 0 20px;">
        <div style="padding:0 40px;text-align:left;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#5c9b01;">Serveurs</p>
          <h2 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#111827;">🧑‍🍳 App serveurs</h2>
        </div>
        <img src="${SITE_URL}/waitersScreens.avif" alt="App serveurs" width="600" style="width:100%;max-width:600px;height:auto;display:block;margin:0 0 20px;" />
        <p style="margin:0;padding:0 40px;color:#374151;font-size:15px;line-height:1.75;text-align:left;">
          Gestion des tables, alertes cuisine, prise de commande rapide — tout depuis leur téléphone. Vos équipes gagnent en efficacité.
        </p>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;" /></td></tr>

    <!-- FEATURE 5 -->
    <tr>
      <td style="padding:36px 0 36px;">
        <div style="padding:0 40px;text-align:left;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ff4d00;">Écran cuisine</p>
          <h2 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#111827;">👨‍🍳 Kitchen Display</h2>
        </div>
        <img src="${SITE_URL}/kds.avif" alt="KDS" width="600" style="width:100%;max-width:600px;height:auto;display:block;margin:0 0 20px;" />
        <p style="margin:0;padding:0 40px;color:#374151;font-size:15px;line-height:1.75;text-align:left;">
          Les commandes arrivent directement sur l'écran cuisine. Vos chefs voient les priorités et marquent chaque plat prêt en un tap — sans ticket papier.
        </p>
      </td>
    </tr>

    <!-- PRICING SECTION HEADER -->
    <tr>
      <td style="background:#f4fae8;padding:36px 40px 8px;text-align:left;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#5c9b01;">Nos formules</p>
        <h2 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#111827;">Choisissez votre plan</h2>
        <p style="margin:0;color:#374151;font-size:15px;line-height:1.7;">
          Une formule adaptée à chaque restaurant — du petit café à la chaîne nationale.
        </p>
      </td>
    </tr>

    <!-- MONTHLY PRICING -->
    <tr>
      <td style="background:#f4fae8;padding:24px 24px 8px;">
        <p style="margin:0 0 16px;font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#111827;text-align:left;">Tarifs mensuels</p>

        <!-- STARTER MONTHLY -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;margin-bottom:14px;">
          <tr>
            <td style="padding:22px 24px;text-align:left;">
              <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#111827;">Starter</p>
              <p style="margin:0 0 4px;">
                <span style="font-size:30px;font-weight:800;color:#5c9b01;">499</span>
                <span style="font-size:14px;font-weight:700;color:#5c9b01;">Dh</span>
                <span style="font-size:14px;color:#6b7280;"> / mois</span>
              </p>
              <p style="margin:0 0 12px;color:#6b7280;font-size:13px;line-height:1.6;">Idéal pour les petits restaurants et cafés.</p>
              <p style="margin:0;color:#374151;font-size:13px;line-height:1.8;">
                ✓ Jusqu'à 5 appareils &nbsp; ✓ Menu basique &nbsp; ✓ POS &nbsp; ✓ Support email &nbsp; ✓ 1 emplacement
              </p>
            </td>
          </tr>
        </table>

        <!-- PREMIUM MONTHLY (Highlighted) -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ff4d00;border-radius:14px;margin-bottom:14px;box-shadow:0 6px 20px rgba(255,77,0,0.25);">
          <tr>
            <td style="padding:22px 24px;text-align:left;">
              <p style="margin:0 0 10px;">
                <span style="display:inline-block;background:#ffffff;color:#ff4d00;font-size:10px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:20px;">LE PLUS POPULAIRE</span>
              </p>
              <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#ffffff;">Premium</p>
              <p style="margin:0 0 4px;">
                <span style="font-size:30px;font-weight:800;color:#ffffff;">899</span>
                <span style="font-size:14px;font-weight:700;color:#ffffff;">Dh</span>
                <span style="font-size:14px;color:#ffe4d6;"> / mois</span>
              </p>
              <p style="margin:0 0 12px;color:#ffe4d6;font-size:13px;line-height:1.6;">Pour les restaurants en croissance avec plusieurs équipiers.</p>
              <p style="margin:0;color:#ffffff;font-size:13px;line-height:1.8;">
                ✓ Jusqu'à 15 appareils &nbsp; ✓ Menu avancé &nbsp; ✓ POS + KDS &nbsp; ✓ Support prioritaire &nbsp; ✓ Analytics avancés &nbsp; ✓ 3 emplacements &nbsp; ✓ Fidélité client &nbsp; ✓ Inventaire &nbsp; ✓ Gestion staff
              </p>
            </td>
          </tr>
        </table>

        <!-- UNLIMITED MONTHLY -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;margin-bottom:8px;">
          <tr>
            <td style="padding:22px 24px;text-align:left;">
              <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#111827;">Unlimited</p>
              <p style="margin:0 0 4px;">
                <span style="font-size:30px;font-weight:800;color:#5c9b01;">1399</span>
                <span style="font-size:14px;font-weight:700;color:#5c9b01;">Dh</span>
                <span style="font-size:14px;color:#6b7280;"> / mois</span>
              </p>
              <p style="margin:0 0 12px;color:#6b7280;font-size:13px;line-height:1.6;">Pour les chaînes de restaurants et besoins étendus.</p>
              <p style="margin:0;color:#374151;font-size:13px;line-height:1.8;">
                ✓ Appareils illimités &nbsp; ✓ Menu enterprise &nbsp; ✓ Suite complète &nbsp; ✓ Support 24/7 &nbsp; ✓ Emplacements illimités &nbsp; ✓ Fidélité avancée &nbsp; ✓ Inventaire complet &nbsp; ✓ Intégrations &nbsp; ✓ White-label &nbsp; ✓ Account manager
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- YEARLY PRICING -->
    <tr>
      <td style="background:#f4fae8;padding:16px 24px 32px;">
        <p style="margin:0 0 16px;font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#111827;text-align:left;">
          Tarifs annuels &nbsp;
          <span style="display:inline-block;background:#ff4d00;color:#ffffff;font-size:10px;padding:3px 9px;border-radius:20px;letter-spacing:1px;">JUSQU'À -25%</span>
        </p>

        <!-- STARTER YEARLY -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;margin-bottom:14px;">
          <tr>
            <td style="padding:22px 24px;text-align:left;">
              <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#111827;">Starter</p>
              <p style="margin:0 0 4px;">
                <span style="font-size:30px;font-weight:800;color:#5c9b01;">417</span>
                <span style="font-size:14px;font-weight:700;color:#5c9b01;">Dh</span>
                <span style="font-size:14px;color:#6b7280;"> / mois</span>
              </p>
              <p style="margin:0 0 12px;color:#6b7280;font-size:12px;line-height:1.6;">
                Facturé <strong>4999 Dh / an</strong> · Économisez <strong style="color:#ff4d00;">989 Dh / an</strong>
              </p>
              <p style="margin:0;color:#374151;font-size:13px;line-height:1.8;">
                ✓ Jusqu'à 5 appareils &nbsp; ✓ Menu basique &nbsp; ✓ POS &nbsp; ✓ Support email &nbsp; ✓ 1 emplacement
              </p>
            </td>
          </tr>
        </table>

        <!-- PREMIUM YEARLY (Highlighted) -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ff4d00;border-radius:14px;margin-bottom:14px;box-shadow:0 6px 20px rgba(255,77,0,0.25);">
          <tr>
            <td style="padding:22px 24px;text-align:left;">
              <p style="margin:0 0 10px;">
                <span style="display:inline-block;background:#ffffff;color:#ff4d00;font-size:10px;font-weight:800;letter-spacing:1.5px;padding:4px 10px;border-radius:20px;">LE PLUS POPULAIRE</span>
              </p>
              <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#ffffff;">Premium</p>
              <p style="margin:0 0 4px;">
                <span style="font-size:30px;font-weight:800;color:#ffffff;">750</span>
                <span style="font-size:14px;font-weight:700;color:#ffffff;">Dh</span>
                <span style="font-size:14px;color:#ffe4d6;"> / mois</span>
              </p>
              <p style="margin:0 0 12px;color:#ffe4d6;font-size:12px;line-height:1.6;">
                Facturé <strong style="color:#ffffff;">8999 Dh / an</strong> · Économisez <strong style="color:#ffffff;">1789 Dh / an</strong>
              </p>
              <p style="margin:0;color:#ffffff;font-size:13px;line-height:1.8;">
                ✓ Jusqu'à 15 appareils &nbsp; ✓ Menu avancé &nbsp; ✓ POS + KDS &nbsp; ✓ Support prioritaire &nbsp; ✓ Analytics avancés &nbsp; ✓ 3 emplacements &nbsp; ✓ Fidélité client &nbsp; ✓ Inventaire &nbsp; ✓ Gestion staff
              </p>
            </td>
          </tr>
        </table>

        <!-- UNLIMITED YEARLY -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;">
          <tr>
            <td style="padding:22px 24px;text-align:left;">
              <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#111827;">Unlimited</p>
              <p style="margin:0 0 4px;">
                <span style="font-size:30px;font-weight:800;color:#5c9b01;">1166</span>
                <span style="font-size:14px;font-weight:700;color:#5c9b01;">Dh</span>
                <span style="font-size:14px;color:#6b7280;"> / mois</span>
              </p>
              <p style="margin:0 0 12px;color:#6b7280;font-size:12px;line-height:1.6;">
                Facturé <strong>13990 Dh / an</strong> · Économisez <strong style="color:#ff4d00;">2798 Dh / an</strong>
              </p>
              <p style="margin:0;color:#374151;font-size:13px;line-height:1.8;">
                ✓ Appareils illimités &nbsp; ✓ Menu enterprise &nbsp; ✓ Suite complète &nbsp; ✓ Support 24/7 &nbsp; ✓ Emplacements illimités &nbsp; ✓ Fidélité avancée &nbsp; ✓ Inventaire complet &nbsp; ✓ Intégrations &nbsp; ✓ White-label &nbsp; ✓ Account manager
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td style="padding:32px 40px 40px;text-align:center;background:#f9fafb;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 20px;font-size:20px;font-weight:800;color:#111827;">Prêt à digitaliser votre restaurant ?</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
          <tr>
            <td style="padding-right:12px;">
              <a href="${SITE_URL}" style="display:inline-block;background:#ff4d00;color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:12px;text-decoration:none;">
                Visiter SwipyEat →
              </a>
            </td>
            <td>
              <a href="${SITE_URL}/catalogue.pdf" style="display:inline-block;background:#fff;color:#5c9b01;font-weight:700;font-size:15px;padding:13px 28px;border-radius:12px;text-decoration:none;border:2px solid #5c9b01;">
                Voir le catalogue
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
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