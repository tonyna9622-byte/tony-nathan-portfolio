import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateEstimate, durations, services } from "@/lib/project";
import { verifyComplexityToken } from "@/lib/token";

const schema = z.object({
  token: z.string().min(20).max(5000),
  description: z.string().trim().min(10).max(3000),
  service: z.enum(services.map(s => s.id) as [typeof services[number]["id"], ...typeof services[number]["id"][]]),
  durationSeconds: z.number().int(),
  currency: z.enum(["EGP", "USD"])
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    if (!durations.some(d => d.value === body.durationSeconds)) {
      return NextResponse.json({ error: "Unsupported duration" }, { status: 400 });
    }
    const claims = verifyComplexityToken(body.token);
    if (claims.description !== body.description || claims.service !== body.service || claims.durationSeconds !== body.durationSeconds) {
      return NextResponse.json({ error: "Analysis token does not match this project" }, { status: 403 });
    }
    const estimate = calculateEstimate({
      service: claims.service,
      durationSeconds: claims.durationSeconds,
      currency: body.currency,
      complexity: claims.complexity
    });
    return NextResponse.json({ estimate, complexity: claims.complexity });
  } catch {
    return NextResponse.json({ error: "Unable to calculate estimate" }, { status: 400 });
  }
}
