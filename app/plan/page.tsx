// app/plan/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { DayId, WeekPlan } from "@/lib/plan";
import { DAY_LABELS } from "@/lib/plan";

type Feedback = "easy" | "ok" | "hard" | null;

export default function PlanPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState<WeekPlan | null>(null);
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});

  useEffect(() => {
    const trainingDaysParam = searchParams.get("trainingDays");
    const matchDay = searchParams.get("matchDay") as DayId | null;
    const goal = searchParams.get("goal") ?? "maintain";

    if (!trainingDaysParam || !matchDay) {
      // if someone comes here directly, send them to setup
      router.replace("/setup");
      return;
    }

    const trainingDays = trainingDaysParam.split(",") as DayId[];

    (async () => {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ trainingDays, matchDay, goal }),
      });

      const data = await res.json();
      if (data.ok) {
        setPlan(data.plan);
      } else {
        console.error(data.error);
      }
    })();
  }, [searchParams, router]);

  const handleFeedback = (day: string, value: Feedback) => {
    setFeedback((prev) => ({
      ...prev,
      [day]: value,
    }));
    // later: save to localStorage or API
  };

  if (!plan) {
    return (
      <main className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-600">Building your week…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your weekly plan
            </h1>
            <p className="mt-2 text-zinc-600 text-sm">
              Based on your training and match schedule. Adjust as you go.
            </p>
          </div>
          <button
            onClick={() => router.push("/setup")}
            className="text-sm text-emerald-700 hover:underline"
          >
            Change schedule
          </button>
        </header>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-7 gap-4">
          {plan.map((dayPlan) => (
            <div
              key={dayPlan.day}
              className="rounded-2xl border border-zinc-200 bg-white p-3 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">
                  {DAY_LABELS[dayPlan.day]}
                </h2>
              </div>

              {dayPlan.sessions.length === 0 && (
                <p className="text-xs text-zinc-500">Rest / free day</p>
              )}

              {dayPlan.sessions.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-2"
                >
                  <p className="text-xs font-semibold mb-1">{s.title}</p>
                  {s.type === "GYM" && s.exercises && (
                    <ul className="space-y-1">
                      {s.exercises.map((ex, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-zinc-700 flex flex-col"
                        >
                          <span>
                            {ex.name} — {ex.sets} × {ex.reps}
                          </span>
                          {ex.notes && (
                            <span className="text-[10px] text-zinc-500">
                              {ex.notes}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.type === "RECOVERY" && s.exercises && (
                    <ul className="space-y-1">
                      {s.exercises.map((ex, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-zinc-700 flex flex-col"
                        >
                          <span>
                            {ex.name} — {ex.reps}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.type === "TRAINING" && (
                    <p className="text-[11px] text-zinc-600">
                      Team training session
                    </p>
                  )}
                  {s.type === "MATCH" && (
                    <p className="text-[11px] text-zinc-600">
                      Match day — freshness priority
                    </p>
                  )}
                </div>
              ))}

              {/* Simple feedback control for gym days */}
              {dayPlan.sessions.some((s) => s.type === "GYM") && (
                <div className="mt-auto pt-2">
                  <p className="text-[10px] text-zinc-500 mb-1">
                    How did this feel?
                  </p>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleFeedback(dayPlan.day, "easy")}
                      className={`flex-1 rounded-lg border px-2 py-1 text-[10px] ${
                        feedback[dayPlan.day] === "easy"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      Too easy
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(dayPlan.day, "ok")}
                      className={`flex-1 rounded-lg border px-2 py-1 text-[10px] ${
                        feedback[dayPlan.day] === "ok"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      Just right
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFeedback(dayPlan.day, "hard")}
                      className={`flex-1 rounded-lg border px-2 py-1 text-[10px] ${
                        feedback[dayPlan.day] === "hard"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-zinc-200 text-zinc-600"
                      }`}
                    >
                      Too hard
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
