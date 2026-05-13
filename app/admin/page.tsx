"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Subscriber {
  email: string;
  subscribedAt: string;
}

export default function AdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchSubscribers() {
    setLoading(true);
    try {
      const res = await fetch("/api/subscribers");
      const data = await res.json();
      setSubscribers(data.subscribers ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  function exportCSV() {
    const rows = [
      ["Email", "Subscribed At"],
      ...subscribers.map((s) => [s.email, new Date(s.subscribedAt).toLocaleString()]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "swipyeat-subscribers.csv";
    a.click();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-gray-900">SwipyEat</span>
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 text-sm font-medium">Admin</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchSubscribers}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button
              onClick={exportCSV}
              disabled={subscribers.length === 0}
              className="flex items-center gap-1.5 text-sm text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-1.5 rounded-lg transition-all disabled:opacity-50"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Subscribers", value: subscribers.length, icon: "👥" },
            {
              label: "This Week",
              value: subscribers.filter((s) => {
                const d = new Date(s.subscribedAt);
                const now = new Date();
                const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
                return diff <= 7;
              }).length,
              icon: "📅",
            },
            {
              label: "Today",
              value: subscribers.filter((s) => {
                const d = new Date(s.subscribedAt);
                const now = new Date();
                return d.toDateString() === now.toDateString();
              }).length,
              icon: "⚡",
            },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <span className="text-3xl">{icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Subscriber list */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="font-semibold text-gray-900">Subscriber List</h2>
            <input
              type="search"
              placeholder="Search by email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-64"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40 text-gray-400">
              <svg className="animate-spin h-6 w-6 mr-3 text-green-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2">
              <span className="text-4xl">📭</span>
              <p className="text-sm">{search ? "No matches found." : "No subscribers yet."}</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Subscribed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s, i) => (
                  <tr key={s.email} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-3.5 text-gray-800 font-medium">{s.email}</td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {new Date(s.subscribedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {subscribers.length} subscribers
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
