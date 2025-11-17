"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Calendar,
  Dumbbell,
  HeartPulse,
  Sparkles,
  Shield,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("https://formspree.io/f/xldadorq", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        console.error("Form submission error", await res.text());
      }
    } catch (err) {
      console.error("Network error", err);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
              TB
            </div>
            <span className="font-semibold tracking-tight">TrainBalance</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-emerald-700">
              How it works
            </a>
            <a href="#features" className="hover:text-emerald-700">
              Features
            </a>
            <a href="#faq" className="hover:text-emerald-700">
              FAQ
            </a>
            <a
              href="#cta"
              className="rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 transition inline-flex items-center gap-2"
            >
              Join the beta <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200 px-3 py-1 text-xs text-zinc-600 mb-4">
                <Sparkles size={14} className="text-emerald-600" /> New •
                Football-first beta
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Train smarter between the{" "}
                <span className="text-emerald-700">gym</span> and the{" "}
                <span className="text-emerald-700">pitch</span>.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-zinc-600 max-w-prose">
                Stop guessing your week. Get an adaptive plan that balances team
                training, strength work, and recovery — so you feel fresh on
                match day.
              </p>

              <form
                onSubmit={onSubmit}
                className="mt-8 flex w-full max-w-lg items-stretch gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access"
                  className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 text-white px-5 py-3 font-medium hover:bg-emerald-700 transition inline-flex items-center gap-2"
                >
                  {submitted ? "Joined" : "Join the beta"}{" "}
                  {submitted ? (
                    <CheckCircle size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </button>
              </form>

              <p className="text-sm text-zinc-500 mt-3">
                No spam. We’ll notify you when invites open.
              </p>

              <div className="mt-8 flex items-center gap-6 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-700" /> Cancel
                  anytime
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse size={16} className="text-emerald-700" />{" "}
                  Recovery-aware plans
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell size={16} className="text-emerald-700" /> Strength +
                  performance
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border bg-white/70 backdrop-blur border-zinc-200 p-4 shadow-sm">
                <div className="rounded-xl bg-zinc-900 text-zinc-100 p-6">
                  <div className="font-mono text-xs text-zinc-400">
                    This week
                  </div>
                  <ul className="mt-3 space-y-3">
                    {[
                      {
                        day: "Mon",
                        text: "Lower Body Strength (moderate) + Mobility 10m",
                      },
                      {
                        day: "Tue",
                        text: "Team Training (75–90m) — log fatigue after",
                      },
                      {
                        day: "Wed",
                        text: "Recovery: easy cycle 20m + stretch 15m",
                      },
                      {
                        day: "Thu",
                        text: "Team Training (75–90m) — light plyometrics",
                      },
                      {
                        day: "Fri",
                        text: "Upper Body Strength (light) + Activation 15m",
                      },
                      { day: "Sat", text: "Match Day — freshness priority" },
                      { day: "Sun", text: "Walk 30m or yoga 20m" },
                    ].map((s) => (
                      <li key={s.day} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white text-xs font-semibold">
                          {s.day}
                        </span>
                        <span className="text-sm md:text-base">{s.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 text-sm text-zinc-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-emerald-700" />{" "}
                    Auto-balanced around your training & match schedule
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartPulse size={16} className="text-emerald-700" />{" "}
                    Adjusts to soreness/sleep inputs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / badges */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-zinc-600">
            <div className="rounded-xl border border-zinc-200 bg-white p-4">
              Built by footballers
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4">
              Beta opening soon
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4">
              iOS & Web first
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4">
              Coach mode coming
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="py-20 bg-white border-t border-b border-zinc-200"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mt-2 text-zinc-600 max-w-prose">
            A simple weekly planner that adapts to your calendar and recovery —
            designed for football first, and expanding to other sports soon.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card
              icon={<Calendar />}
              title="Set your schedule"
              text="Add training nights and match day. Tell us your goals (strength, endurance, or freshness)."
            />
            <Card
              icon={<Dumbbell />}
              title="Get your plan"
              text="We build gym + conditioning sessions around your football load — no more heavy legs before games."
            />
            <Card
              icon={<HeartPulse />}
              title="Stay fresh"
              text="Log soreness and sleep; your week auto-adjusts to keep you ready for the pitch."
            />
          </div>

          <a
            href="/setup"
            className="mt-10 inline-block rounded-xl bg-emerald-600 text-white px-5 py-3 font-medium hover:bg-emerald-700 transition"
          >
            Try the planner
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Made for match-day performance
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Feature
              title="Leg day, solved"
              bullets={[
                "Never crush legs 24–48h before matches",
                "Smart swap suggestions if training moves",
                "Lower/upper balance for real weeks",
              ]}
            />
            <Feature
              title="Recovery-aware"
              bullets={[
                "Quick fatigue & sleep check-ins",
                "Auto-easier days when you’re cooked",
                "Mobility & activation prompts",
              ]}
            />
            <Feature
              title="Simple, not bloated"
              bullets={[
                "One-page weekly view",
                "Light logging — 10s per day",
                "Works with Apple/Google calendar (soon)",
              ]}
            />
            <Feature
              title="Coach-ready"
              bullets={[
                "Team templates for Tue/Thu/Sat",
                "Share plans with teammates",
                "Coach dashboard (waitlist)",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-16 bg-emerald-600 text-white" id="cta">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">
            Join the football-first beta
          </h3>
          <p className="mt-2 text-emerald-100">
            Founding members pricing expected at £7.99/mo. Limited early access.
          </p>
          <form
            onSubmit={onSubmit}
            className="mt-6 mx-auto max-w-md flex items-stretch gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 rounded-xl border border-emerald-200 bg-white/95 text-zinc-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-white text-emerald-700 px-5 py-3 font-medium hover:bg-emerald-50 transition inline-flex items-center gap-2"
            >
              {submitted ? "You're in" : "Get early access"}{" "}
              <ArrowRight size={18} />
            </button>
          </form>
          <p className="mt-2 text-emerald-100 text-sm">
            We’ll email invites in order of signup. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Faq
              q="Is this only for football?"
              a="The beta is football-first (match-day logic built-in). We’ll expand to other sports shortly — join the waitlist to get notified."
            />
            <Faq
              q="Do I need a wearable?"
              a="No. The MVP uses simple daily check-ins for fatigue and sleep. Wearable integrations (Apple Health, Strava, Whoop) are on the roadmap."
            />
            <Faq
              q="Will it replace my gym app?"
              a="Keep your favorite lifting app if you like. TrainBalance focuses on scheduling and load balance; it can suggest sets/reps for simplicity."
            />
            <Faq
              q="Pricing?"
              a="Founding members expected at £7.99/month. Free trial during beta."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <span>© {new Date().getFullYear()} TrainBalance</span>
        </div>
      </footer>
    </div>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="mt-3 text-zinc-600 text-sm">{text}</p>
    </div>
  );
}

function Feature({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-zinc-600">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" /> {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h4 className="font-medium">{q}</h4>
      <p className="mt-2 text-sm text-zinc-600">{a}</p>
    </div>
  );
}
