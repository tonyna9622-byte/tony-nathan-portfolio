export const services = [
  { id: "basic", en: "Basic Video Editing", ar: "مونتاج فيديو أساسي", enDesc: "Clean cuts, footage joining and basic transitions.", arDesc: "قص وتجميع اللقطات والانتقالات الأساسية." },
  { id: "standard", en: "Standard Video Editing", ar: "مونتاج فيديو متقدم", enDesc: "Professional editing, color correction, text and pacing.", arDesc: "مونتاج احترافي وتصحيح ألوان ونصوص وإيقاع بصري." },
  { id: "advanced", en: "Advanced Video Editing", ar: "مونتاج فيديو احترافي", enDesc: "Advanced transitions, cinematic effects and color grading.", arDesc: "انتقالات متقدمة ومؤثرات سينمائية ومعالجة ألوان." },
  { id: "motion", en: "Motion Graphics", ar: "موشن جرافيك", enDesc: "Animated typography, graphic elements and transitions.", arDesc: "نصوص متحركة وعناصر جرافيك وانتقالات مخصصة." },
  { id: "pro-motion", en: "Professional Motion Design", ar: "تصميم موشن احترافي", enDesc: "Complex animation, compositing, VFX and sound design.", arDesc: "أنيميشن معقد وتركيب بصري ومؤثرات وتصميم صوت." }
] as const;

export const durations = [
  { value: 15, label: "15 sec", ar: "15 ثانية" },
  { value: 30, label: "30 sec", ar: "30 ثانية" },
  { value: 60, label: "1 min", ar: "دقيقة واحدة" },
  { value: 120, label: "2 min", ar: "دقيقتان" },
  { value: 180, label: "3 min", ar: "3 دقائق" },
  { value: 240, label: "4 min", ar: "4 دقائق" },
  { value: 300, label: "5 min", ar: "5 دقائق" },
  { value: 360, label: "6 min", ar: "6 دقائق" },
  { value: 420, label: "7 min", ar: "7 دقائق" },
  { value: 480, label: "8 min", ar: "8 دقائق" },
  { value: 540, label: "9 min", ar: "9 دقائق" },
  { value: 600, label: "10 min", ar: "10 دقائق" }
] as const;

export type ServiceId = typeof services[number]["id"];
export type Currency = "EGP" | "USD";
export type Complexity = "low" | "medium" | "high" | "very_high" | "extreme";

export const complexityAdditions: Record<Currency, Record<Complexity, number>> = {
  EGP: { low: 50, medium: 100, high: 150, very_high: 200, extreme: 250 },
  USD: { low: 10, medium: 15, high: 20, very_high: 20, extreme: 20 }
};

const basePrices: Record<Currency, Record<ServiceId, number>> = {
  EGP: { basic: 150, standard: 200, advanced: 320, motion: 460, "pro-motion": 650 },
  USD: { basic: 10, standard: 16, advanced: 26, motion: 40, "pro-motion": 60 }
};

export function calculateEstimate(input: { service: ServiceId; durationSeconds: number; currency: Currency; complexity: Complexity }) {
  const durationIndex = durations.findIndex(d => d.value === input.durationSeconds);
  if (durationIndex < 0) throw new Error("Unsupported duration");
  const multiplier = 1 + Math.pow(durationIndex, 0.78) * 0.48;
  const base = basePrices[input.currency][input.service];
  const addition = complexityAdditions[input.currency][input.complexity];
  const cap = input.currency === "EGP" ? 5000 : 300;
  const total = Math.min(cap, Math.round(base * multiplier + addition));
  return { base: Math.round(base * multiplier), complexityAddition: addition, total, cap, currency: input.currency };
}
