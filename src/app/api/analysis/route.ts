import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { issueComplexityToken } from "@/lib/token";
import { durations, services } from "@/lib/project";

const schema = z.object({
  description: z.string().trim().min(10).max(3000),
  service: z.enum(services.map(s => s.id) as [typeof services[number]["id"], ...typeof services[number]["id"][]]),
  durationSeconds: z.number().int()
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    if (!durations.some(d => d.value === body.durationSeconds)) {
      return NextResponse.json({ error: "Unsupported duration" }, { status: 400 });
    }
    // Safe initial fallback: no external AI call is made in this starter.
    // Replace with a server-side AI provider after credentials and rate limiting are configured.
    const complexity = body.description.length > 1200 ? "high" : body.description.length > 400 ? "medium" : "low";
    const token = issueComplexityToken({
      description: body.description,
      service: body.service,
      durationSeconds: body.durationSeconds,
      complexity
    });
    return NextResponse.json({ complexity, token, expiresInSeconds: 600, mode: "manual-fallback" });
  } catch {
    return NextResponse.json({ error: "Invalid analysis request" }, { status: 400 });
  }
}
