"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (error) setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Une erreur est survenue.");
      } else {
        setSubscribed(true);
        toast.success("Vous êtes abonné ! Vérifiez votre boîte mail.");
      }
    } catch {
      toast.error("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #f8fef0 0%, #fff 50%, #fff5f0 100%)" }}>
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10" style={{ borderColor: "#e8f5d0" }}>
        <Image
          src="/logo.avif"
          alt="SwipyEat"
          width={160}
          height={48}
          className="object-contain"
          priority
        />
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl mx-auto text-center space-y-8">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full"
            style={{ background: "#eaf7d0", color: "#5c9b01" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#5c9b01" }} />
            Inscriptions ouvertes
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Le futur des{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #5c9b01, #7ec811)" }}
              >
                menus restaurant
              </span>{" "}
              est{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #ff4d00, #ff7a33)" }}
              >
                là
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
              Recevez les actualités sur les menus digitaux et la technologie restaurant — directement dans votre boîte mail.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {["📱 Menus QR", "🍽️ Commandes Smart", "📊 Analytics", "🔔 Mises à jour"].map((f) => (
              <span
                key={f}
                className="bg-white border text-gray-700 text-sm px-4 py-1.5 rounded-full shadow-sm"
                style={{ borderColor: "#d4edaa" }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Form */}
          <div>
            {!subscribed ? (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full px-5 py-3.5 rounded-xl border text-gray-900 placeholder-gray-400 bg-white shadow-sm focus:outline-none transition-all"
                    style={
                      error
                        ? { borderColor: "#ff4d00", boxShadow: "0 0 0 3px rgba(255,77,0,0.15)" }
                        : { borderColor: "#d1e8a0" }
                    }
                    onFocus={(e) => {
                      if (!error) e.currentTarget.style.boxShadow = "0 0 0 3px rgba(92,155,1,0.2)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {error && (
                    <p className="absolute -bottom-6 left-1 text-xs" style={{ color: "#ff4d00" }}>{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-7 py-3.5 text-white font-semibold rounded-xl shadow-md active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #ff4d00, #e64400)" }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.background = "linear-gradient(135deg, #e64400, #cc3b00)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #ff4d00, #e64400)";
                  }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Envoi…
                    </span>
                  ) : (
                    "Envoyer"
                  )}
                </button>
              </form>
            ) : (
              <div
                className="max-w-md mx-auto rounded-2xl p-6 text-center space-y-2 shadow-sm border"
                style={{ background: "#f0fbe0", borderColor: "#c2e27a" }}
              >
                <div className="text-4xl">🎉</div>
                <p className="font-semibold text-lg" style={{ color: "#3a6601" }}>Vous êtes sur la liste !</p>
                <p className="text-sm" style={{ color: "#4d8001" }}>
                  Un email de bienvenue est en route vers <strong>{email}</strong>
                </p>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Aucun spam. Désabonnement possible à tout moment.
          </p>

          {/* Catalogue link */}
          <div className="pt-2">
            <a
              href="/catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl border-2 transition-all shadow-sm hover:shadow-md active:scale-95"
              style={{ color: "#5c9b01", borderColor: "#5c9b01", background: "white" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5c9b01";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#5c9b01";
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Voir notre catalogue
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      {/* <section className="border-y bg-white/60" style={{ borderColor: "#d4edaa" }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 divide-x text-center py-6" style={{ "--tw-divide-opacity": "1", borderColor: "#d4edaa" } as React.CSSProperties}>
          {[
            { value: "500+", label: "Restaurants" },
            { value: "50k+", label: "Scans / mois" },
            { value: "98%", label: "Satisfaction client" },
          ].map(({ value, label }) => (
            <div key={label} className="px-6" style={{ borderColor: "#d4edaa" }}>
              <p className="text-2xl font-bold" style={{ color: "#5c9b01" }}>{value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm border-t border-gray-100">
        © {new Date().getFullYear()} SwipyEat · Tous droits réservés ·{" "}
        <a href="/admin" className="underline transition-colors" style={{ color: "inherit" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#5c9b01"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
        >
          Admin
        </a>
      </footer>
    </main>
  );
}
