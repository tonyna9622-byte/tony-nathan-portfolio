"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Clapperboard, Globe2, Layers3, Menu, Play, Sparkles, X } from "lucide-react";
import { durations, services, type Currency, type ServiceId } from "@/lib/project";

type Lang = "en" | "ar";
const copy = {
  en: {
    navWork: "Selected work", navAbout: "About", navContact: "Start a project",
    eyebrow: "INDEPENDENT VIDEO EDITOR & MOTION DESIGNER",
    titleA: "Ideas in motion.", titleB: "Stories that stay.",
    intro: "I create thoughtful edits and motion-driven visuals that make brands, products and stories feel unforgettable.",
    work: "Explore my work", start: "Start a project", selected: "Selected work",
    selectedSub: "A selection of visual experiments and creative projects.",
    about: "Crafting visuals with purpose.", aboutText: "I combine editing, motion and sound to turn raw ideas into clear, engaging visual experiences. Every detail has a reason — from the rhythm of a cut to the smallest movement.",
    services: "What I can create", servicesSub: "Choose the kind of work your project needs.",
    request: "Build your project estimate", requestSub: "Tell me what you have in mind. The estimate is a starting point and will be reviewed before confirmation.",
    chooseService: "Select a service", duration: "Approximate video duration", style: "Describe the visual style you want",
    styleHint: "Share references, mood, pacing, colors, animation ideas or anything that helps explain your vision.",
    name: "Your name", email: "Email address", currency: "Currency", estimate: "Estimated total", base: "Estimated service cost", add: "Complexity allowance",
    note: "The selected duration does not have to be exact to the second. Choose the closest approximate duration.",
    send: "Prepare request", preview: "Estimate preview", contact: "Have a project in mind?", contactText: "Let's turn your idea into something worth watching.",
    footer: "Independent creative practice. Built around ideas, detail and motion."
  },
  ar: {
    navWork: "الأعمال", navAbout: "من أنا", navContact: "ابدأ مشروعك",
    eyebrow: "مونتير فيديو ومصمم موشن جرافيك",
    titleA: "أفكار تتحرك.", titleB: "وقصص لا تُنسى.",
    intro: "أصنع مونتاجًا بصريًا وأعمال موشن تساعد العلامات التجارية والأفكار على الظهور بشكل مميز ولا يُنسى.",
    work: "استكشف أعمالي", start: "ابدأ مشروعًا", selected: "أعمال مختارة",
    selectedSub: "مجموعة من التجارب البصرية والمشروعات الإبداعية.",
    about: "أصنع صورًا لها هدف.", aboutText: "أجمع بين المونتاج والموشن والصوت لتحويل الأفكار الخام إلى تجارب بصرية واضحة وجذابة. كل تفصيلة لها سبب، من إيقاع القطع إلى أصغر حركة.",
    services: "ماذا يمكنني أن أصنع؟", servicesSub: "اختر نوع العمل الذي يحتاجه مشروعك.",
    request: "احسب تكلفة مشروعك", requestSub: "احكيلي عن فكرتك. السعر تقديري وسيتم مراجعته قبل التأكيد.",
    chooseService: "اختر الخدمة", duration: "المدة التقريبية للفيديو", style: "اوصف الستايل البصري اللي محتاجه",
    styleHint: "اكتب المراجع أو الإحساس أو سرعة الإيقاع أو الألوان أو أفكار الحركة وأي تفاصيل توضح رؤيتك.",
    name: "اسمك", email: "البريد الإلكتروني", currency: "العملة", estimate: "السعر التقديري", base: "تكلفة الخدمة التقديرية", add: "إضافة التعقيد",
    note: "مش لازم تحدد مدة الفيديو بالثانية بالظبط، اختار المدة التقريبية الأقرب للفيديو اللي محتاجه.",
    send: "جهّز الطلب", preview: "معاينة السعر", contact: "عندك مشروع في بالك؟", contactText: "خلينا نحول فكرتك لحاجة تستحق المشاهدة.",
    footer: "مساحة إبداعية مستقلة، أساسها الفكرة والتفاصيل والحركة."
  }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [service, setService] = useState<ServiceId>("basic");
  const [duration, setDuration] = useState(30);
  const [style, setStyle] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const isAr = lang === "ar";

  const estimate = useMemo(() => {
    const index = durations.findIndex(d => d.value === duration);
    const multiplier = 1 + Math.pow(Math.max(0, index), .78) * .48;
    const prices: Record<Currency, Record<ServiceId, number>> = {
      EGP: { basic: 150, standard: 200, advanced: 320, motion: 460, "pro-motion": 650 },
      USD: { basic: 10, standard: 16, advanced: 26, motion: 40, "pro-motion": 60 }
    };
    const base = Math.round(prices[currency][service] * multiplier);
    const addition = currency === "EGP" ? 100 : 15;
    const total = Math.min(currency === "EGP" ? 5000 : 300, base + addition);
    return { base, addition, total };
  }, [currency, duration, service]);

  const format = (value: number) => new Intl.NumberFormat(isAr ? "ar-EG" : "en-US", { maximumFractionDigits: 0 }).format(value);
  const symbol = currency === "EGP" ? (isAr ? "ج.م" : "EGP") : "$";
  const money = (v: number) => currency === "USD" ? `$${format(v)}` : `${format(v)} ${symbol}`;

  function prepareRequest() {
    const subject = encodeURIComponent(`Project inquiry — ${clientName}`);
    const body = encodeURIComponent(`Name: ${clientName}\nEmail: ${email}\nService: ${service}\nDuration: ${duration}s\nCurrency: ${currency}\nStyle: ${style}\nWebsite estimate: ${money(estimate.total)}\n\nThis is an estimate, not a confirmed quotation.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  return (
    <main dir={isAr ? "rtl" : "ltr"} className="min-h-screen overflow-hidden">
      <div className="site-atmosphere" aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#090c11]/75 backdrop-blur-xl">
        <div className="container-wide flex h-[76px] items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-[.16em]">TN<span className="text-accent">.</span></a>
          <nav className="hidden items-center gap-9 text-sm text-white/65 md:flex">
            <a className="hover:text-white" href="#work">{t.navWork}</a><a className="hover:text-white" href="#about">{t.navAbout}</a><a className="hover:text-white" href="#contact">{t.navContact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrency(currency === "USD" ? "EGP" : "USD")} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 hover:border-accent">{currency}</button>
            <button onClick={() => setLang(lang === "en" ? "ar" : "en")} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 hover:border-accent"><Globe2 size={14}/>{lang === "en" ? "العربية" : "English"}</button>
            <button className="ml-1 p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
          </div>
        </div>
        {menuOpen && <div className="container-wide grid gap-4 border-t border-white/10 py-5 text-sm md:hidden"><a href="#work" onClick={()=>setMenuOpen(false)}>{t.navWork}</a><a href="#about" onClick={()=>setMenuOpen(false)}>{t.navAbout}</a><a href="#contact" onClick={()=>setMenuOpen(false)}>{t.navContact}</a></div>}
      </header>

      <section className="relative flex min-h-[760px] items-center pt-24">
        <div className="blue-orbit -right-40 top-20 opacity-70" aria-hidden="true"/>
        <div className="blue-glow right-[12%] top-[24%]" aria-hidden="true"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(16,47,86,.42),transparent_48%),radial-gradient(ellipse_at_12%_80%,rgba(29,91,153,.09),transparent_36%)]"/>
        <div className="absolute inset-0 noise opacity-20"/>
        <div className="container-wide relative grid items-center gap-16 py-24 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mb-7 flex items-center gap-3 text-[11px] font-semibold tracking-[.25em] text-accent"><span className="h-px w-8 bg-accent"/>{t.eyebrow}</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-.055em] sm:text-7xl lg:text-[86px]">{t.titleA}<br/><span className="bg-gradient-to-r from-white via-white to-[#6EA6D8] bg-clip-text text-transparent">{t.titleB}</span></h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/55 sm:text-lg">{t.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-[#3B82C4] px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-[#4B94D7]">{t.work}<ArrowUpRight size={17}/></a>
              <a href="#request" className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-sm text-white/80 transition hover:border-white/40">{t.start}<ArrowRight size={16}/></a>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
            <div className="absolute inset-5 rounded-[2rem] border border-[#3B82C4]/30 bg-gradient-to-br from-[#17385D] via-[#111722] to-[#080B10] shadow-glow"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center"><div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/[.04]"><Clapperboard size={38} className="text-[#75AEE0]"/></div><p className="text-xs tracking-[.3em] text-white/35">YOUR CREATIVE SPACE</p><p className="mt-3 text-4xl font-semibold tracking-[.15em]">TONY<br/>NATHAN</p><p className="mt-3 text-[10px] tracking-[.24em] text-accent">VIDEO · MOTION · STORY</p></div>
            </div>
            <div className="absolute -bottom-3 -left-4 glass rounded-2xl px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent"><Play size={15}/></span><div><p className="text-xs font-medium">Creative direction</p><p className="mt-1 text-[10px] text-white/40">Editing with intention</p></div></div></div>
          </div>
        </div>
        <a href="#work" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"><ArrowDown size={18}/></a>
      </section>

      <section id="work" className="container-wide py-28">
        <div className="mb-12 flex items-end justify-between gap-6"><div><p className="mb-4 text-[11px] tracking-[.25em] text-accent">01 / PORTFOLIO</p><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t.selected}</h2><p className="mt-4 text-sm text-white/45">{t.selectedSub}</p></div><span className="hidden text-xs text-white/30 sm:block">SELECTED PROJECTS — 2026</span></div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Youssef Camera", category: "Motion Graphics", video: "/projects/youssef-camera.mp4", poster: "/projects/youssef-camera.jpg", orientation: "landscape", arTitle: "يوسف كاميرا", arCategory: "موشن جرافيك" },
            { title: "Editing", category: "Video Editing", video: "/projects/frame-motion.mp4", poster: "/projects/frame-motion.jpg", orientation: "landscape", arTitle: "مونتاج", arCategory: "مونتاج فيديو" },
            { title: "Instagram Motion", category: "Social Media Design", video: "/projects/instagram-motion.mp4", poster: "/projects/instagram-motion.jpg", orientation: "portrait", arTitle: "موشن إنستجرام", arCategory: "تصميم سوشيال ميديا" },
            { title: "Starbucks Product Ad", category: "Commercial & Advertising", video: "/projects/starbucks-ad.mp4", poster: "/projects/starbucks-ad.jpg", orientation: "portrait", arTitle: "إعلان منتج ستاربكس", arCategory: "إعلان تجاري" }
          ].map((project, i) => <article key={project.video} className="group overflow-hidden rounded-2xl border border-white/[.09] bg-[#0C1119]/90 transition duration-300 hover:-translate-y-1 hover:border-[#3B82C4]/50 hover:shadow-[0_18px_60px_rgba(20,75,130,.16)]">
            <div className="relative overflow-hidden bg-black">
              <video className={`${project.orientation === "portrait" ? "aspect-[9/16] max-h-[680px]" : "aspect-video"} w-full bg-black object-contain`} controls preload="metadata" playsInline poster={project.poster}>
                <source src={project.video} type="video/mp4" />
              </video>
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] tracking-[.16em] text-white/75">PROJECT 0{i+1}</span>
            </div>
            <div className="flex items-center justify-between gap-4 p-5">
              <div><p className="text-[10px] uppercase tracking-[.18em] text-[#75AEE0]">{isAr ? project.arCategory : project.category}</p><h3 className="mt-2 text-xl font-medium text-white">{isAr ? project.arTitle : project.title}</h3></div>
              <ArrowUpRight className="shrink-0 text-white/35 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#75AEE0]" />
            </div>
          </article>)}
        </div>
        <p className="mt-5 text-xs text-white/30">{isAr ? "أربعة مشاريع من أعمالي — اضغط تشغيل لمشاهدة كل فيديو." : "Four selected projects — use the video controls to watch each one."}</p>
      </section>

      <section id="about" className="border-y border-white/[.06] bg-[#0D121A] py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="mb-4 text-[11px] tracking-[.25em] text-accent">02 / ABOUT</p><p className="text-sm text-white/35">TONY NATHAN<br/>INDEPENDENT CREATIVE</p></div><div><h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{t.about}</h2><p className="mt-8 max-w-2xl text-lg leading-9 text-white/50">{t.aboutText}</p><div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-7"><div><p className="text-2xl font-semibold">01</p><p className="mt-2 text-[10px] tracking-wider text-white/35">EDITING</p></div><div><p className="text-2xl font-semibold">02</p><p className="mt-2 text-[10px] tracking-wider text-white/35">MOTION</p></div><div><p className="text-2xl font-semibold">03</p><p className="mt-2 text-[10px] tracking-wider text-white/35">STORY</p></div></div></div></div>
      </section>

      <section className="container-wide py-28"><div className="mb-12"><p className="mb-4 text-[11px] tracking-[.25em] text-accent">03 / SERVICES</p><h2 className="text-4xl font-semibold sm:text-5xl">{t.services}</h2><p className="mt-4 text-sm text-white/45">{t.servicesSub}</p></div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{services.map((s,i)=><div key={s.id} className="glass rounded-2xl p-6 transition hover:border-accent/40"><div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><span className="text-sm font-semibold">0{i+1}</span></div><h3 className="text-lg font-semibold">{isAr?s.ar:s.en}</h3><p className="mt-3 text-sm leading-6 text-white/45">{isAr?s.arDesc:s.enDesc}</p></div>)}</div></section>

      <section id="request" className="border-y border-white/[.06] bg-[#0D121A] py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_.8fr]">
          <div><p className="mb-4 text-[11px] tracking-[.25em] text-accent">04 / PROJECT BUILDER</p><h2 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">{t.request}</h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/45">{t.requestSub}</p>
            <div className="mt-10 space-y-7">
              <div><label className="mb-3 block text-sm text-white/75">{t.chooseService}</label><div className="grid gap-2 sm:grid-cols-2">{services.map(s=><button key={s.id} onClick={()=>setService(s.id)} className={`rounded-xl border p-4 text-start text-sm transition ${service===s.id?"border-accent bg-accent/10 text-white":"border-white/10 bg-white/[.02] text-white/55 hover:border-white/25"}`}>{isAr?s.ar:s.en}</button>)}</div></div>
              <div><label className="mb-3 block text-sm text-white/75">{t.duration}</label><select value={duration} onChange={e=>setDuration(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-[#111722] px-4 py-4 text-sm outline-none focus:border-accent">{durations.map(d=><option key={d.value} value={d.value}>{isAr?d.ar:d.label}</option>)}</select><p className="mt-3 text-xs leading-6 text-white/35">{t.note}</p></div>
              <div><label className="mb-3 block text-sm text-white/75">{t.style}</label><textarea value={style} onChange={e=>setStyle(e.target.value)} rows={5} placeholder={t.styleHint} className="w-full resize-y rounded-xl border border-white/10 bg-[#111722] px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-accent"/></div>
              <div className="grid gap-3 sm:grid-cols-2"><input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder={t.name} className="rounded-xl border border-white/10 bg-[#111722] px-4 py-4 text-sm outline-none focus:border-accent"/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder={t.email} className="rounded-xl border border-white/10 bg-[#111722] px-4 py-4 text-sm outline-none focus:border-accent"/></div>
            </div>
          </div>
          <aside className="h-fit rounded-3xl border border-accent/25 bg-gradient-to-b from-[#142944] to-[#101722] p-7 shadow-glow lg:sticky lg:top-28"><div className="flex items-center justify-between"><span className="text-[11px] tracking-[.2em] text-[#8CBCE8]">{t.preview}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs">{currency}</span></div><div className="mt-10"><p className="text-sm text-white/45">{t.estimate}</p><p className="mt-3 text-5xl font-semibold tracking-tight">{money(estimate.total)}</p><p className="mt-3 text-xs text-white/35">Preliminary estimate · subject to review</p></div><div className="my-8 space-y-4 border-y border-white/10 py-6 text-sm"><div className="flex justify-between text-white/55"><span>{t.base}</span><span>{money(estimate.base)}</span></div><div className="flex justify-between text-white/55"><span>{t.add}</span><span>{money(estimate.addition)}</span></div><div className="flex justify-between text-white"><span>{isAr?"الخدمة":"Selected service"}</span><span>{isAr?services.find(s=>s.id===service)?.ar:services.find(s=>s.id===service)?.en}</span></div></div><button onClick={prepareRequest} disabled={!clientName.trim()||!email.trim()||!style.trim()} className="flex w-full items-center justify-center gap-3 rounded-full bg-[#3B82C4] px-6 py-4 text-sm font-semibold transition hover:bg-[#4B94D7] disabled:cursor-not-allowed disabled:opacity-40">{t.send}<ArrowUpRight size={17}/></button><p className="mt-4 text-center text-[10px] leading-5 text-white/30">This starter preview is not yet a saved request or a final quotation.</p></aside>
        </div>
      </section>

      <section id="contact" className="container-wide py-28 text-center"><p className="mb-5 text-[11px] tracking-[.25em] text-accent">05 / LET'S CREATE</p><h2 className="text-4xl font-semibold sm:text-6xl">{t.contact}</h2><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/45">{t.contactText}</p><a href="#request" className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm transition hover:border-accent hover:bg-accent/10">{t.start}<ArrowUpRight size={17}/></a></section>
      <footer className="border-t border-white/[.07] py-8"><div className="container-wide flex flex-col justify-between gap-4 text-xs text-white/30 sm:flex-row"><span>© {new Date().getFullYear()} TONY NATHAN</span><span>{t.footer}</span><span>VIDEO EDITOR · MOTION DESIGNER</span></div></footer>
    </main>
  );
}
