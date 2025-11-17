// app/setup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DayId, Goal } from "@/lib/plan";

const ALL_DAYS: { id: DayId; label: string }[] = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

const GOALS: { id: Goal; label: string }[] = [
  { id: "strength", label: "Get stronger" },
  { id: "maintain", label: "Maintain & stay fresh" },
  { id: "freshness", label: "Freshness first" },
];

export default function SetupPage() {
  const router = useRouter();
  const [trainingDays, setTrainingDays] = useState<DayId[]>(["tue", "thu"]);
  const [matchDay, setMatchDay] = useState<DayId>("sat");
  const [goal, setGoal] = useState<Goal>("maintain");

  const toggleTrainingDay = (day: DayId) => {
    setTrainingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchDay || trainingDays.length === 0) return;

    const params = new URLSearchParams({
      trainingDays: trainingDays.join(","),
      matchDay,
      goal,
    });

    router.push(`/plan?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Set up your week
        </h1>
        <p className="mt-2 text-zinc-600">
          Choose your training nights, match day, and focus. We’ll build a
          weekly plan around it.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          {/* Training days */}
          <section>
            <h2 className="font-semibold mb-2">Team training days</h2>
            <p className="text-sm text-zinc-600 mb-3">
              Pick the days you usually train with your team.
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_DAYS.map((d) => {
                const active = trainingDays.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleTrainingDay(d.id)}
                    className={`px-3 py-2 rounded-xl text-sm border ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-zinc-800 border-zinc-300 hover:border-emerald-600"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Match day */}
          <section>
            <h2 className="font-semibold mb-2">Match day</h2>
            <p className="text-sm text-zinc-600 mb-3">
              When do you usually play your main game?
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_DAYS.map((d) => {
                const active = d.id === matchDay;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setMatchDay(d.id)}
                    className={`px-3 py-2 rounded-xl text-sm border ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-zinc-800 border-zinc-300 hover:border-emerald-600"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Goal */}
          <section>
            <h2 className="font-semibold mb-2">Main focus</h2>
            <p className="text-sm text-zinc-600 mb-3">
              This just nudges how we build your week. You can change it later.
            </p>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => {
                const active = g.id === goal;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id)}
                    className={`px-3 py-2 rounded-xl text-sm border ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-zinc-800 border-zinc-300 hover:border-emerald-600"
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </section>

          <button
            type="submit"
            className="rounded-xl bg-emerald-600 text-white px-5 py-3 font-medium hover:bg-emerald-700 transition"
          >
            Generate my week
          </button>
        </form>
      </div>
    </main>
  );
}