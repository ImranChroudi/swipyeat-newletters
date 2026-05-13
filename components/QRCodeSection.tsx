"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const QR_URL = "https://swipyeat.com/newsletter";

export default function QRCodeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, QR_URL, {
        width: 200,
        margin: 2,
        color: { dark: "#166534", light: "#f0fdf4" },
      });
    }
  }, []);

  async function downloadQR() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "swipyeat-newsletter-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(QR_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-700 to-emerald-800">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white/10 text-green-200 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Pitch Deck · Investor Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Scan to Subscribe Instantly
          </h2>
          <p className="text-green-200 max-w-md mx-auto">
            Show this QR code at your next pitch — let anyone subscribe in one scan, no typing required.
          </p>
        </div>

        {/* QR Card */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* QR Code */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4">
            <canvas ref={canvasRef} className="rounded-xl" />
            <p className="text-green-700 text-xs font-medium tracking-wide">{QR_URL}</p>
            <div className="flex gap-3 w-full">
              <button
                onClick={downloadQR}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                onClick={copyLink}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bullet points */}
          <div className="max-w-sm text-white space-y-5">
            {[
              {
                icon: "📲",
                title: "Zero friction onboarding",
                desc: "Customers scan once — no app download, no account creation.",
              },
              {
                icon: "🍴",
                title: "Replace paper menus",
                desc: "Dynamic QR menus that update in real-time without reprinting.",
              },
              {
                icon: "📈",
                title: "Grow your subscriber list",
                desc: "Collect emails passively at the table during the dining experience.",
              },
              {
                icon: "🔒",
                title: "Privacy-first",
                desc: "We never sell or share subscriber data. Period.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <span className="text-2xl mt-0.5">{icon}</span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-green-200 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
