// app/api/generate-plan/route.ts
import { NextResponse } from "next/server";
import {
  generatePlan,
  type GeneratePlanInput,
  type DayId,
  type Goal,
} from "@/lib/plan";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      trainingDays: DayId[];
      matchDay: DayId;
      goal: Goal;
    };

    // TODO: basic validation if you want
    const plan = generatePlan(body as GeneratePlanInput);

    return NextResponse.json({ ok: true, plan });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}