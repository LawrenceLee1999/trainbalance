// lib/plan.ts

export type DayId =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export const DAY_LABELS: Record<DayId, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export type Goal = "strength" | "maintain" | "freshness";

export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
};

export type SessionType = "TRAINING" | "MATCH" | "GYM" | "RECOVERY";

export type Session = {
  type: SessionType;
  title: string;
  exercises?: Exercise[]; // only for GYM/RECOVERY
};

export type DayPlan = {
  day: DayId;
  sessions: Session[];
};

export type WeekPlan = DayPlan[];

export type GeneratePlanInput = {
  trainingDays: DayId[];
  matchDay: DayId;
  goal: Goal;
};

// ---- Hard-coded templates (keep very small to start) ----

const lowerInSeason: Exercise[] = [
  { name: "Back Squat", sets: 3, reps: "3–5", notes: "Heavy, 1–2 RIR" },
  { name: "Reverse Lunge", sets: 2, reps: "6–8 / leg" },
  { name: "Romanian Deadlift", sets: 2, reps: "6–8" },
  { name: "Plank", sets: 2, reps: "30–45s" },
];

const upperInSeason: Exercise[] = [
  { name: "Bench Press", sets: 3, reps: "5–8" },
  { name: "DB Row", sets: 3, reps: "6–10" },
  { name: "Shoulder Press", sets: 2, reps: "8–10" },
  { name: "Triceps Extensions", sets: 2, reps: "10–12" },
];

const recoverySession: Exercise[] = [
  { name: "Easy bike / jog", sets: 1, reps: "10–20 min" },
  { name: "Stretching", sets: 1, reps: "10–15 min" },
];

// helper to get index distance between days
const DAYS: DayId[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function daysBetween(a: DayId, b: DayId): number {
  return Math.abs(DAYS.indexOf(a) - DAYS.indexOf(b));
}

// ---- Main planner (very simple for now) ----

export function generatePlan(input: GeneratePlanInput): WeekPlan {
  const { trainingDays, matchDay } = input;

  const week: WeekPlan = DAYS.map((d) => ({
    day: d,
    sessions: [],
  }));

  // Add training sessions
  trainingDays.forEach((d) => {
    const day = week.find((p) => p.day === d)!;
    day.sessions.push({
      type: "TRAINING",
      title: "Team Training",
    });
  });

  // Add match
  const match = week.find((p) => p.day === matchDay)!;
  match.sessions.push({
    type: "MATCH",
    title: "Match Day",
  });

  // Choose gym days: simple rule –
  // 1x Lower, 1x Upper, not on match day, avoid 0–1 days away from match
  const gymCandidates = week.filter(
    (p) =>
      p.day !== matchDay &&
      !trainingDays.includes(p.day) &&
      daysBetween(p.day, matchDay) > 1
  );

  // fallback if not enough free days → allow training days
  const extraCandidates = week.filter(
    (p) =>
      p.day !== matchDay &&
      !gymCandidates.includes(p) &&
      daysBetween(p.day, matchDay) > 1
  );

  const gymSlots = [...gymCandidates, ...extraCandidates].slice(0, 2);

  if (gymSlots[0]) {
    gymSlots[0].sessions.push({
      type: "GYM",
      title: "Lower Body – In-season",
      exercises: lowerInSeason,
    });
  }

  if (gymSlots[1]) {
    gymSlots[1].sessions.push({
      type: "GYM",
      title: "Upper Body – In-season",
      exercises: upperInSeason,
    });
  }

  // Optional: add recovery the day after match
  const matchIndex = DAYS.indexOf(matchDay);
  const recoveryDay = DAYS[(matchIndex + 1) % 7];
  const recSlot = week.find((p) => p.day === recoveryDay)!;
  if (!recSlot.sessions.some((s) => s.type === "GYM")) {
    recSlot.sessions.push({
      type: "RECOVERY",
      title: "Recovery Session",
      exercises: recoverySession,
    });
  }

  return week;
}