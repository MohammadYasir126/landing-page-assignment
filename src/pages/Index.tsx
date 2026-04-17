import { Fragment, useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────
   Reusable visual atoms
   ──────────────────────────────────────────────────────────── */

const WaveDownToWhite = () => (
  <div aria-hidden className="relative w-full leading-[0] -mb-px">
    <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block w-full h-[70px] md:h-[110px]">
      <path d="M0,50 C240,110 480,0 720,50 C960,100 1200,10 1440,55 L1440,110 L0,110 Z" fill="hsl(var(--surface))" />
    </svg>
  </div>
);

const WaveUpToPurple = () => (
  <div aria-hidden className="relative w-full leading-[0] -mt-px">
    <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block w-full h-[70px] md:h-[110px]">
      <path d="M0,55 C240,5 480,100 720,55 C960,10 1200,100 1440,55 L1440,0 L0,0 Z" fill="hsl(var(--background))" />
    </svg>
  </div>
);

const Eyebrow = ({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) => (
  <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] ${center ? "mx-auto" : ""} ${
    light
      ? "border-primary/40 bg-primary/15 text-primary-glow"
      : "border-primary/30 bg-primary/10 text-primary"
  }`}>
    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {children}
  </div>
);

/* Floating sparkles / decorative scene around hero phone card */
const HeroDecor = () => (
  <>
    <span className="deco-dot animate-float h-20 w-20 -top-6 -left-6" />
    <span className="deco-dot soft h-32 w-32 -bottom-10 -right-10" />
    <span className="deco-dot ring h-16 w-16 top-10 -right-8 animate-float-x" />
    <span className="deco-dot ring-soft h-28 w-28 bottom-10 -left-12" />
    <svg className="deco-star animate-spin-slow -top-8 right-10 h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 8.4L22.8 12l-8.4 2.4L12 24l-2.4-8.4L0 12l8.4-2.4L12 0z" /></svg>
    <svg className="deco-star animate-spin-slow bottom-6 right-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: "-6s" }}><path d="M12 0l2.4 8.4L22.8 12l-8.4 2.4L12 24l-2.4-8.4L0 12l8.4-2.4L12 0z" /></svg>
  </>
);

/* ────────────────────────────────────────────────────────────
   Index page — content preserved 100%, layout rebuilt SMM-Owl style
   ──────────────────────────────────────────────────────────── */

const Index = () => {
  const [secondsLeft, setSecondsLeft] = useState(23 * 3600 + 47 * 60 + 12);
  const [storyUrl, setStoryUrl] = useState("");
  const [activeMs, setActiveMs] = useState(3); // featured = 1K
  const [openFaq, setOpenFaq] = useState(0);
  const [boostState, setBoostState] = useState<"idle" | "loading" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputAlert, setInputAlert] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");

  const handleBoost = () => {
    if (!storyUrl.trim()) {
      setInputAlert(true);
      inputRef.current?.focus();
      return;
    }
    setInputAlert(false);
    setBoostState("loading");
    setTimeout(() => setBoostState("done"), 1500);
  };

  const milestones = [
    { num: "100", lbl: "Starter" },
    { num: "250", lbl: "Visibility" },
    { num: "500", lbl: "Signal" },
    { num: "1K", lbl: "Milestone", featured: true },
  ];

  const faqs = [
    { q: "How do I get free Instagram story views?", a: "Paste your Instagram story link into the tool at the top of this page, choose your milestone (100, 250, 500, or 1,000 views), and click the boost button. Views begin arriving within 60–90 seconds. No login, password, or credit card required." },
    { q: "Are these views from real Instagram accounts?", a: "Yes — 100%. Every view comes from a genuine Instagram account: real profiles with followers, posts, and activity history. We do not use bots, automated scripts, or fake accounts. Instagram's internal metrics treat our delivered views identically to organic story views." },
    { q: "Will my account get banned or restricted?", a: "No. Instagram's enforcement targets inauthentic behaviour — specifically bots, automated following, and credential harvesting. Real views from real accounts do not violate Instagram's Terms of Service. We also never require your credentials, so there's no unauthorized access event. Zero accounts have ever been flagged from using our service." },
    { q: "How quickly do views arrive?", a: "Views begin arriving within 60–90 seconds of submission. Delivery speed varies by milestone: 100 views in 1–2 minutes, 250 in 3–5 minutes, 500 in 8–12 minutes, and 1,000 in 18–25 minutes. We deliver gradually to simulate natural viewing patterns — no sudden unnatural spikes." },
    { q: "Do I need to give you my Instagram password?", a: "Never. We only use your story's public URL. We never ask for your password, username + password combination, 2FA code, or any account credentials whatsoever. If any service asks for your password to deliver story views, it's a scam — leave immediately." },
    { q: "Why does 1,000 story views specifically matter?", a: 'When your story crosses 1,000 views, Instagram internally shifts it from "individual story" to "popular story" in its classification. Followers who haven\'t watched it yet are more likely to see it prioritised in their story bar — triggering a second wave of organic views that you didn\'t pay for. This compounding effect is why 1k story views is the most-searched milestone.' },
    { q: "Can I use this for business accounts?", a: "Yes, and it's especially effective for business accounts. More story views means more profile visits, more DM inquiries, more link taps on your story link stickers, and a higher view rate that Instagram rewards with more organic reach. Story views on business accounts are a genuine lead generation mechanism, not just a vanity metric." },
    { q: "How do I increase story views to 1,000 consistently?", a: "Combine our free tool with the 3-phase strategy described above: (1) Optimise your story before posting — first frame, timing, multi-frame format. (2) Use our free tool within the first 30 minutes of posting. (3) Amplify in hours 1–6 with poll stickers and active DM engagement. Done consistently, this creates a compounding loop where each story naturally gets more views than the last." },
    { q: "What's the best time to post Instagram stories in India?", a: "For Indian audiences, peak story-viewing windows are 8–10 PM IST (post-dinner scroll) and 12–2 PM IST (lunch break). Post at the start of these windows, then immediately use our free views boost for maximum organic reach during peak activity hours." },
    { q: "Does this work for all story types (polls, videos, links)?", a: "Yes — our service works for all story formats. The impact varies by type: video stories benefit most from completion rate boosts (500–1,000 views recommended), poll/question stories benefit from the increased voter pool (250–500 views), and link sticker stories benefit from more direct link taps (500–1,000 views). Photo stories work well at any milestone from 100 to 500." },
  ];

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      {/* URGENCY BAR */}
      <div className="shimmer-bar relative z-[100] flex items-center justify-center gap-3 px-5 py-2.5 text-center text-[12px] font-semibold tracking-wide text-white md:text-[13px]">
        <span className="inline-block h-[7px] w-[7px] rounded-full bg-white animate-pulse-soft" />
        ⏰ Stories expire in 24 hours — Get your free views before it's too late
        <span className="hidden h-[7px] w-[7px] rounded-full bg-white animate-pulse-soft md:inline-block" />
      </div>

      {/* NAV */}
      <nav className="relative z-50 px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-background-2/60 px-5 py-3 backdrop-blur-xl md:px-7">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-orange)] font-display text-base font-black text-white shadow-[var(--shadow-orange)]">
              S
            </div>
            <div className="font-display text-xl font-extrabold tracking-tight text-white">
              Story<span className="text-primary-glow">Boost</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm font-medium text-white/75 transition hover:text-primary-glow">How It Works</a>
            <a href="#milestones" className="text-sm font-medium text-white/75 transition hover:text-primary-glow">Milestones</a>
            <a href="#safety" className="text-sm font-medium text-white/75 transition hover:text-primary-glow">Is It Safe?</a>
            <a href="#faq" className="text-sm font-medium text-white/75 transition hover:text-primary-glow">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <a href="#get-views" className="hidden rounded-full px-5 py-2.5 text-sm font-semibold btn-ghost-light md:inline-flex">Sign In</a>
            <a href="#get-views" className="btn-orange inline-flex rounded-full px-4 py-2.5 text-xs font-bold tracking-wide md:px-6 md:text-sm">
              Get Free Views →
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <span className="deco-dot soft animate-float h-72 w-72 -left-20 top-20" />
        <span className="deco-dot soft h-96 w-96 -right-32 top-40" style={{ opacity: 0.18 }} />
        <span className="deco-dot ring-soft h-40 w-40 left-[8%] bottom-[10%] animate-float" style={{ animationDelay: "1.5s" }} />
        <svg className="deco-star animate-spin-slow left-[12%] top-[18%] h-10 w-10 opacity-80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 8.4L22.8 12l-8.4 2.4L12 24l-2.4-8.4L0 12l8.4-2.4L12 0z" /></svg>
        <svg className="deco-star animate-spin-slow right-[18%] top-[60%] h-7 w-7" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: "-8s" }}><path d="M12 0l2.4 8.4L22.8 12l-8.4 2.4L12 24l-2.4-8.4L0 12l8.4-2.4L12 0z" /></svg>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-32 pt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-10 md:pt-20">
          {/* LEFT: copy */}
          <div className="relative z-10">
            <Eyebrow>⚡ Real Views · No Login · Free</Eyebrow>
            <h1 className="mt-5 font-display text-[2.3rem] font-black leading-[1.05] text-white md:text-[3.4rem] lg:text-[4rem]">
              Free Instagram Story Views —{" "}
              <span className="relative inline-block">
                <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">
                  Real, Instant &amp; Before Your Story Expires
                </span>
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q 75 2, 150 6 T 298 5" stroke="hsl(24 100% 55%)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-[1.85] text-white/75 md:text-lg">
              Your story has a 24-hour window. Get 100 to 1,000 genuine views in minutes — no password, no risk, no credit card. Just paste your story link and watch your reach grow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#get-views" className="btn-orange inline-flex items-center gap-2 rounded-full px-7 py-4 font-display text-sm font-bold md:text-[15px]">
                🚀 Get Free Story Views →
              </a>
              <a href="#how-it-works" className="btn-ghost-light inline-flex items-center gap-2 rounded-full px-7 py-4 font-display text-sm font-bold">
                ▶ See How It Works
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              {[
                { i: "🔒", t: "No Login Required" },
                { i: "⚡", t: "Views in Minutes" },
                { i: "✅", t: "100% Real Accounts" },
                { i: "🆓", t: "Completely Free" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
                  <span>{c.i}</span> {c.t}
                </div>
              ))}
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
              <div className="flex -space-x-2">
                {["bg-[hsl(24_100%_60%)]", "bg-[hsl(45_100%_60%)]", "bg-[hsl(280_70%_60%)]", "bg-[hsl(195_80%_60%)]"].map((b, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full border-2 border-background-2 ${b}`} />
                ))}
              </div>
              <div className="text-xs text-white/70">
                <div className="flex items-center gap-1 text-primary-glow">★★★★★</div>
                <div>Trusted by creators worldwide</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Tool card */}
          <div className="relative">
            <HeroDecor />
            <div
              id="get-views"
              className="animate-float relative rounded-[28px] border border-white/15 bg-white p-6 text-surface-foreground shadow-[var(--shadow-float)] md:p-7"
            >
              {/* notch */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-orange)] px-4 py-1 font-display text-[10px] font-black uppercase tracking-[0.15em] text-white shadow-[var(--shadow-orange)]">
                Free Tool
              </div>

              <div className="mb-4 flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
                ⏱ Your story's time left
              </div>
              <div className="mb-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 rounded-2xl border border-border bg-surface-muted p-3">
                {[
                  { n: h, l: "Hours" },
                  { n: m, l: "Mins" },
                  { n: s, l: "Secs" },
                ].map((b, i) => (
                  <Fragment key={b.l}>
                    <div className="rounded-xl bg-white py-2.5 text-center shadow-[var(--shadow-soft)]">
                      <span className="block font-display text-2xl font-black leading-none text-surface-foreground">{b.n}</span>
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-muted-foreground">{b.l}</span>
                    </div>
                    {i < 2 && <span className="px-1 text-2xl font-black text-primary">:</span>}
                  </Fragment>
                ))}
              </div>

              <input
                ref={inputRef}
                type="text"
                value={storyUrl}
                onChange={(e) => { setStoryUrl(e.target.value); if (inputAlert) setInputAlert(false); }}
                placeholder={inputAlert ? "⚠️ Please paste your story link first…" : "Paste your Instagram story link here…"}
                className={`mb-3 w-full rounded-xl border bg-surface-muted px-4 py-3.5 text-sm outline-none transition ${
                  inputAlert ? "border-primary" : "border-border focus:border-primary"
                }`}
                id="story-url"
              />
              <div className="mb-3 text-xs text-muted-foreground">Choose your view milestone:</div>
              <div className="mb-4 grid grid-cols-4 gap-2">
                {milestones.map((mst, i) => (
                  <button
                    key={mst.num}
                    onClick={() => setActiveMs(i)}
                    className={`relative rounded-xl border-2 px-1 py-2.5 text-center transition ${
                      activeMs === i ? "border-primary bg-primary/10" : "border-border bg-surface-muted hover:border-primary/60"
                    }`}
                  >
                    {mst.featured && (
                      <span className="absolute -right-1 -top-2 rounded bg-primary px-1.5 py-0.5 font-display text-[9px] font-bold uppercase tracking-wide text-white">
                        🎯 Best
                      </span>
                    )}
                    <span className="block font-display text-base font-black text-primary">{mst.num}</span>
                    <span className="text-[10px] text-muted-foreground">{mst.lbl}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleBoost}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 font-display text-[15px] font-bold tracking-wide text-white shadow-[var(--shadow-orange)] transition hover:-translate-y-0.5 ${
                  boostState === "done" ? "bg-success" : "bg-[image:var(--gradient-orange)]"
                }`}
              >
                {boostState === "idle" && "🚀 Get Free Story Views Now"}
                {boostState === "loading" && "✅ Submitting your story…"}
                {boostState === "done" && "🚀 Views Incoming — Check Instagram in 60s"}
              </button>
              <div className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                🔒 No password or login · No credit card · Delivers in minutes
              </div>
            </div>
          </div>
        </div>

        <WaveDownToWhite />
      </section>

      {/* ═══════════════ STATS STRIP (white) ═══════════════ */}
      <section className="relative bg-surface text-surface-foreground">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-6 md:px-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { n: "2.8K", l: 'Monthly searches for "1k story views free"' },
              { n: "60s", l: "Average time to start view delivery" },
              { n: "100%", l: "Real Instagram accounts — no bots" },
              { n: "0", l: "Accounts flagged — ever" },
            ].map((st) => (
              <div key={st.l} className="relative overflow-hidden rounded-2xl border border-border bg-white p-5 text-center shadow-[var(--shadow-soft)]">
                <span className="absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-orange)]" />
                <div className="font-display text-3xl font-black bg-[image:var(--gradient-orange)] bg-clip-text text-transparent md:text-4xl">
                  {st.n}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{st.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY */}
        <div id="why" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="text-center">
            <Eyebrow center>The Science Behind Story Views</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.15] md:text-5xl">
              Why Instagram Story Views <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Matter More Than You Think</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Most creators obsess over follower count — but Instagram's algorithm tells a different story. High story view rates consistently outperform high follower counts in terms of reach, DMs, and growth.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5">
            <p className="text-sm leading-relaxed text-surface-foreground/85">
              📊 <strong className="text-primary">The compounding flywheel:</strong> When your story view rate improves, Instagram moves your story higher in your followers' horizontal story bar. Higher position → more views → higher position. A free story views boost starts this flywheel — and keeps it spinning.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: "📈", h: "View Rate: The #1 Ranking Signal", p: "Instagram ranks stories by what percentage of your followers open them. A 40% view rate signals high relevance — the algorithm rewards it with more distribution." },
              { i: "💬", h: "Reply & Reaction Rate", p: "DM replies to your story are the strongest engagement signal Instagram measures. More views means more people to reply — triggering the reply loop that boosts your reach." },
              { i: "👁️", h: "Completion Rate", p: "How many viewers watch all your story frames matters. More real viewers = more completions = stronger algorithm signal across your entire account." },
              { i: "🔗", h: "Link Tap Rate", p: "For link sticker stories, more viewers means more link taps — directly driving website traffic. Story views are a genuine traffic acquisition channel." },
            ].map((c) => (
              <div key={c.h} className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-card)]">
                <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[image:var(--gradient-orange)] opacity-0 transition group-hover:opacity-10" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-orange)] text-xl text-white shadow-[var(--shadow-orange)]">
                  {c.i}
                </div>
                <h3 className="font-display text-base font-bold">{c.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how-it-works" className="bg-surface-muted">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
            <div className="text-center">
              <Eyebrow center>Step-by-Step Process</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.15] md:text-5xl">
                How to Get <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Free Instagram Story Views</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                No forms. No surveys. No account access. Just three steps — done in under 30 seconds.
              </p>
            </div>

            <div className="relative mt-12 grid gap-6 md:grid-cols-3">
              {/* connecting line */}
              <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-[repeating-linear-gradient(90deg,hsl(var(--primary))_0_8px,transparent_8px_16px)] md:block" />
              {[
                { h: "Copy your active story link", p: <>Open Instagram, go to your story, tap ⋯ at the bottom right → "Copy Link." The link format is: <code className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">instagram.com/stories/yourusername/123456789/</code> — make sure your story is currently live (posted within 24 hours).</> },
                { h: "Paste the link and choose your milestone", p: "Paste your story link into the tool above. Select your view milestone: 100 for a quick test, 250 for a visibility lift, 500 for a solid algorithm signal, or 1,000 for maximum impact. Our system confirms your story is live before beginning delivery." },
                { h: "Watch views arrive — within minutes", p: "Views begin arriving within 60–90 seconds. We deliver gradually over your selected window to simulate natural viewing patterns — no sudden spikes that could look unnatural. Check your story's view count by tapping your story in Instagram; the number updates in real time." },
              ].map((step, i) => (
                <div key={i} className="relative rounded-3xl border border-border bg-white p-7 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[image:var(--gradient-orange)] font-display text-lg font-black text-white shadow-[var(--shadow-orange)]">
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold">{step.h}</h3>
                  <p className="mt-2 text-sm leading-[1.85] text-muted-foreground">{step.p}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5">
              <p className="text-sm leading-relaxed">
                ✅ <strong className="text-primary">Zero account access required.</strong> We only use your story's public URL. We never ask for your password, username + password combination, or 2FA code. Your account security is completely intact.
              </p>
            </div>
          </div>
        </div>

        <WaveUpToPurple />
      </section>

      {/* ═══════════════ MILESTONES (purple) — pricing-style cards ═══════════════ */}
      <section id="milestones" className="relative overflow-hidden">
        <span className="deco-dot soft h-72 w-72 -left-20 top-10" />
        <span className="deco-dot ring-soft h-40 w-40 right-[10%] bottom-20 animate-float" />
        <svg className="deco-star animate-spin-slow right-[8%] top-16 h-9 w-9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 8.4L22.8 12l-8.4 2.4L12 24l-2.4-8.4L0 12l8.4-2.4L12 0z" /></svg>

        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="text-center">
            <Eyebrow light center>Get 1,000 Free Story Views</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.15] text-white md:text-5xl">
              The Most-Searched <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Story Views Milestone</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              1,000 story views is the threshold where your view count becomes visible social proof, encourages DMs, and signals to the algorithm that your content is resonating at scale.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "100", t: "Starter Boost", s: "Delivery: 1–2 min · Best for: testing new story formats, first-time users", b: "Free" },
              { v: "250", t: "Visibility Lift", s: "Delivery: 3–5 min · Best for: regular daily stories, product announcements", b: "Free" },
              { v: "500", t: "Algorithm Signal", s: "Delivery: 8–12 min · Best for: campaign launches, link-in-bio stories", b: "Free" },
              { v: "1K", t: "1k Milestone 🎯", s: "Delivery: 18–25 min · Best for: product launches, brand collabs, big announcements", b: "Most Impactful", featured: true },
            ].map((mt) => (
              <div
                key={mt.t}
                className={`group relative overflow-hidden rounded-3xl border p-7 transition hover:-translate-y-2 ${
                  mt.featured
                    ? "border-primary/60 bg-gradient-to-b from-primary/15 to-primary/5 shadow-[var(--shadow-orange)]"
                    : "border-white/10 bg-white/[0.04] hover:border-primary/40 hover:bg-white/[0.07]"
                }`}
              >
                {mt.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-[image:var(--gradient-orange)] px-2.5 py-1 font-display text-[9px] font-black uppercase tracking-wider text-white">
                    🔥 Popular
                  </span>
                )}
                <div className="font-display text-5xl font-black leading-none bg-[image:var(--gradient-orange)] bg-clip-text text-transparent md:text-6xl">
                  {mt.v}
                </div>
                <div className="mt-5 font-display text-base font-bold text-white">{mt.t}</div>
                <p className="mt-2 text-xs leading-relaxed text-white/65">{mt.s}</p>
                <div className="mt-5 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-primary-glow">
                  {mt.b}
                </div>
                <a href="#get-views" className={`mt-5 flex w-full items-center justify-center rounded-xl px-4 py-3 font-display text-xs font-bold transition ${
                  mt.featured ? "btn-orange" : "btn-ghost-light"
                }`}>
                  Claim Now →
                </a>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-primary/30 bg-primary/10 px-6 py-5">
            <p className="text-sm leading-relaxed text-white/80">
              💡 <strong className="text-primary-glow">Why 1,000 specifically?</strong> When your story crosses 1,000 views, Instagram shifts it from "individual story" to "popular story" in its internal categorisation. Followers who haven't watched it yet are more likely to see it prioritised in their story bar — triggering a second wave of organic views that you didn't pay for.
            </p>
          </div>

          {/* BUSINESS / CONVERSION */}
          <div id="business" className="mt-24">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <Eyebrow light>For Business Accounts</Eyebrow>
                <h2 className="mt-5 font-display text-3xl font-black leading-[1.15] text-white md:text-4xl">
                  How Story Views <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Convert to DMs and Sales</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/70">
                  For business accounts and brand creators, free story views aren't a vanity metric — they're a lead generation mechanism. Here's the conversion chain:
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { p: <><strong className="text-white">More views → more profile visits.</strong> Viewers who find your story interesting tap your username. More views = more profile visits = more follows and link taps.</> },
                  { p: <><strong className="text-white">More views → more DM replies.</strong> A story with 50 views gets 1–2 DM responses. A story with 500 views gets 10–20. DMs are the highest-intent engagement signal on Instagram.</> },
                  { p: <><strong className="text-white">More views → more link taps.</strong> If your story contains a link sticker, more viewers means more link clicks — directly driving traffic to your website or product page.</> },
                  { p: <><strong className="text-white">Higher view rate → algorithm boost → more organic reach.</strong> The more people watch your stories, the higher the algorithm ranks them — so each subsequent story naturally gets more views over time.</> },
                ].map((c, i) => (
                  <div key={i} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-primary/40 hover:bg-white/[0.07]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-orange)] font-display text-sm font-black text-white shadow-[var(--shadow-orange)]">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-[1.85] text-white/80">{c.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STORY FORMATS */}
          <div id="formats" className="mt-24">
            <div className="text-center">
              <Eyebrow light center>All Story Formats</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.15] text-white md:text-5xl">
                Free Story Views for <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Every Format</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
                Our service works across all story types. But the strategy for maximising impact differs by format — here's how to pair views with your story type.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                { i: "📹", h: "Video Stories (15-sec clips)", p: "Video stories have the highest completion rate when the first frame is compelling. Free views boost the algorithm's completion rate signal — every real viewer who watches to the end strengthens your content ranking.", best: "Best: 500–1,000 views", chip: "Tutorials · Product demos" },
                { i: "🖼️", h: "Photo / Static Stories", p: "Views boost visibility, but adding a poll or question sticker significantly increases the reply rate — amplifying the algorithmic impact of every view you receive.", best: "Best: 100–500 views", chip: "Quotes · Announcements" },
                { i: "📊", h: "Poll & Question Stories", p: "Poll stories generate the highest organic engagement of any format. More story views means more poll votes — exactly the engagement type Instagram uses to judge story quality.", best: "Best: 250–500 views", chip: "Audience research · Decisions" },
                { i: "🔗", h: "Link Sticker Stories", p: "A story with 1,000 views converting at 5% sends 50 visitors to your link. Story views on link-sticker stories are a genuine traffic acquisition strategy — not just an Instagram-internal metric.", best: "Best: 500–1,000 views", chip: "Blog posts · Product pages" },
              ].map((c) => (
                <div key={c.h} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.07]">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-orange)] text-xl shadow-[var(--shadow-orange)]">
                    {c.i}
                  </div>
                  <h3 className="font-display text-base font-bold text-white">{c.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{c.p}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-md bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary-glow">{c.best}</span>
                    <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70">{c.chip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MID CTA */}
          <div className="relative mt-20 overflow-hidden rounded-[32px] border border-primary/30 bg-gradient-to-br from-[hsl(254,55%,12%)] via-[hsl(280,50%,18%)] to-[hsl(254,55%,12%)] p-10 text-center md:p-16">
            <span className="deco-dot soft h-56 w-56 -right-12 -top-12" />
            <span className="deco-dot soft h-40 w-40 -left-8 -bottom-8" />
            <svg className="deco-star animate-spin-slow left-[8%] top-8 h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 8.4L22.8 12l-8.4 2.4L12 24l-2.4-8.4L0 12l8.4-2.4L12 0z" /></svg>
            <h2 className="relative font-display text-3xl font-black text-white md:text-4xl">
              ⏰ Your Story's Window Is Closing
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/75">
              Stories expire in 24 hours. Don't let yours disappear without the views it deserves.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <a href="#get-views" className="btn-orange inline-flex rounded-full px-7 py-3.5 font-display text-sm font-bold">
                🚀 Boost My Story Views →
              </a>
              <a href="#how-it-works" className="btn-ghost-light inline-flex rounded-full px-7 py-3.5 font-display text-sm font-bold">
                How It Works
              </a>
            </div>
          </div>
        </div>

        <WaveDownToWhite />
      </section>

      {/* ═══════════════ SAFETY + STRATEGY (white) ═══════════════ */}
      <section className="relative bg-surface text-surface-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
          {/* SAFETY */}
          <div id="safety">
            <div className="text-center">
              <Eyebrow center>Safety &amp; Transparency</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.15] md:text-5xl">
                Are Free Instagram Story Views <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Real and Safe?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Two questions every creator asks before using any free story views service. Both deserve honest answers — not marketing fluff.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-[var(--shadow-soft)]">
                <span className="absolute inset-x-0 top-0 h-1 bg-success" />
                <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                  <span className="text-success">✅</span> Yes — Views Are From Real People
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-muted-foreground">
                  Our service delivers views from genuine Instagram accounts: real profiles with followers, posts, and engagement history. Not bots, automated scripts, or IP proxy farms. When we deliver 1,000 story views, those are 1,000 real Instagram accounts that opened and watched your story. Instagram's internal metrics treat these identically to organic viewers — because functionally, they are.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-[var(--shadow-soft)]">
                <span className="absolute inset-x-0 top-0 h-1 bg-[image:var(--gradient-orange)]" />
                <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                  <span>🛡️</span> No — Your Account Won't Be Flagged
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-muted-foreground">
                  Instagram's Terms of Service enforcement targets inauthentic behaviour — specifically bot accounts, automated liking/following, and credential-harvesting. Real views from real accounts fall outside any of these categories. We never require your account credentials, so there's no unauthorized access event for Instagram to detect. Your account's security is completely unchanged.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-warn/30 bg-warn/10 px-6 py-5">
              <p className="text-sm leading-[1.85] text-[hsl(28_70%_35%)]">
                ⚠️ <strong>Red flags in other services to avoid:</strong> (1) Any service asking for your password — this is credential harvesting. (2) Services delivering 1,000 views in 30 seconds — this triggers Instagram's spam detection as it's physically impossible with real users. (3) Services requiring an app download to receive views — typically adware or data harvesting. Our service asks for none of these things.
              </p>
            </div>
          </div>

          {/* GROWTH STRATEGY */}
          <div id="strategy" className="mt-24">
            <div className="text-center">
              <Eyebrow center>Consistent Growth Strategy</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.15] md:text-5xl">
                How to Increase Story Views <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">1,000 Free — Every Time</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Combine our free tool with organic tactics for compounding growth — not just a one-time boost.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { tag: "Phase 1", h: "Before You Post (Optimisation)", items: [
                  "Make the first 2 seconds visually compelling — bright colors, human faces, motion",
                  "Post during India peak hours: 8–10 PM IST or 12–2 PM IST",
                  "Use 3–5 story frames, not just one — multi-frame stories win",
                ] },
                { tag: "Phase 2", h: "First 30 Minutes (The Boost)", items: [
                  "Post your story and immediately use our free service for 250–1,000 views",
                  "This raises your story's position in followers' story bars",
                  "Reply to DMs and reactions within the first 30 minutes",
                ] },
                { tag: "Phase 3", h: "Hours 1–6 (Amplification)", items: [
                  "Add a poll or question sticker to your most-viewed stories",
                  "Reshare your story to your feed if relevant for cross-format reach",
                  "Engage with every comment and DM to signal quality to the algorithm",
                ] },
              ].map((phase) => (
                <div key={phase.tag} className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-white to-surface-muted p-7 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                  <div className="mb-3 inline-flex rounded-full bg-[image:var(--gradient-orange)] px-3 py-1 font-display text-[10px] font-black uppercase tracking-[0.18em] text-white">
                    {phase.tag}
                  </div>
                  <h3 className="font-display text-lg font-bold">{phase.h}</h3>
                  <ul className="mt-4 space-y-3">
                    {phase.items.map((it, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">✓</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* HINDI */}
          <div id="hindi" className="mt-24">
            <div className="relative overflow-hidden rounded-[32px] border border-primary/25 bg-gradient-to-br from-primary/5 via-white to-secondary/10 p-8 md:p-12">
              <span className="deco-dot soft h-40 w-40 -right-10 -top-10" />
              <Eyebrow>भारतीय क्रिएटर्स के लिए</Eyebrow>
              <h2 className="mt-5 font-display text-2xl font-black leading-tight md:text-4xl">
                Instagram Story Views Free Pao — <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Hindi Guide</span>
              </h2>
              <h3 className="mt-6 font-display text-base font-bold">
                🇮🇳 Story Views Kaise Badhaye — Free Mein
              </h3>
              <p className="mt-3 max-w-4xl text-sm leading-[1.85] text-muted-foreground">
                Agar aap Indian creator hain aur chahte hain ki aapki Instagram story zyada log dekhen — toh aap bilkul sahi jagah aaye hain. Hamare free tool se aap apni story ka link paste karke 100 se lekar 1,000 tak real views paa sakte hain — bilkul free, koi password nahi, koi app download nahi. India mein 8–10 PM IST peak story viewing time hai — is samay apni story post karo aur turant free views boost karo for maximum organic reach. Aur agar aap chahte hain consistently 1k story views pana, toh humara 3-phase strategy zaroor follow karein.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="mt-24">
            <div className="text-center">
              <Eyebrow center>Frequently Asked Questions</Eyebrow>
              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-black leading-[1.15] md:text-5xl">
                Everything You <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Need to Know</span>
              </h2>
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className={`overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-soft)] transition ${open ? "border-primary/50" : "border-border"}`}>
                    <button
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-[15px] font-bold text-surface-foreground">{f.q}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-bold transition-transform ${open ? "rotate-45 bg-[image:var(--gradient-orange)] text-white" : "bg-primary/10 text-primary"}`}>
                        +
                      </span>
                    </button>
                    {open && (
                      <div className="border-t border-border px-6 pb-6 pt-4 text-sm leading-[1.85] text-muted-foreground">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <WaveUpToPurple />
      </section>

      {/* ═══════════════ FINAL CTA (purple) ═══════════════ */}
      <section className="relative overflow-hidden">
        <span className="deco-dot soft h-72 w-72 -left-20 top-10" />
        <span className="deco-dot ring-soft h-40 w-40 right-[10%] bottom-10 animate-float" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-10">
          <div className="relative overflow-hidden rounded-[36px] border border-primary/30 bg-gradient-to-br from-[hsl(254,55%,12%)] via-[hsl(280,50%,18%)] to-[hsl(254,55%,12%)] p-10 text-center md:p-16">
            <span className="deco-dot soft h-56 w-56 -right-14 -top-14" />
            <span className="deco-dot soft h-44 w-44 -left-12 -bottom-12" />
            <svg className="deco-star animate-spin-slow right-[10%] top-10 h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 8.4L22.8 12l-8.4 2.4L12 24l-2.4-8.4L0 12l8.4-2.4L12 0z" /></svg>
            <Eyebrow light center>Last Call</Eyebrow>
            <h2 className="relative mt-5 font-display text-3xl font-black text-white md:text-5xl">
              ⏰ Don't Let Your Story <span className="bg-[image:var(--gradient-orange)] bg-clip-text text-transparent">Expire Without Views</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-white/75">
              Your story has a 24-hour window. Every minute without views is organic reach your content won't get back.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a href="#get-views" className="btn-orange inline-flex rounded-full px-8 py-4 font-display text-sm font-bold md:text-base">
                🚀 Get Free Story Views Now →
              </a>
              <a href="#faq" className="btn-ghost-light inline-flex rounded-full px-8 py-4 font-display text-sm font-bold md:text-base">
                Read the FAQ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative border-t border-white/10 bg-[hsl(256_70%_10%)]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-orange)] font-display text-base font-black text-white">S</div>
                <div className="font-display text-xl font-extrabold tracking-tight text-white">
                  Story<span className="text-primary-glow">Boost</span>
                </div>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Free Instagram story views from real accounts. No login required. Built for creators and brands who care about reach.
              </p>
              <div className="mt-5 flex gap-2">
                {["IG", "X", "TT", "YT"].map((s) => (
                  <a key={s} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-white/70 transition hover:border-primary/40 hover:text-primary-glow">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Free tools */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Free Tools</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {["Free Instagram Views", "Free Reels Views", "Free Photo Views", "Story Views vs Reels", "How to Get 1k Views"].map((l) => (
                  <li key={l}><a href="#" className="text-white/65 transition hover:text-primary-glow">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Resources</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#how-it-works" className="text-white/65 transition hover:text-primary-glow">How It Works</a></li>
                <li><a href="#milestones" className="text-white/65 transition hover:text-primary-glow">Milestones</a></li>
                <li><a href="#safety" className="text-white/65 transition hover:text-primary-glow">Is It Safe?</a></li>
                <li><a href="#strategy" className="text-white/65 transition hover:text-primary-glow">Growth Strategy</a></li>
                <li><a href="#faq" className="text-white/65 transition hover:text-primary-glow">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Legal</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><a href="#" className="text-white/65 transition hover:text-primary-glow">Privacy Policy</a></li>
                <li><a href="#" className="text-white/65 transition hover:text-primary-glow">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:text-left">
            <p className="text-xs leading-relaxed text-white/55">
              © 2026 StoryBoost · Free Instagram Story Views · No login required · Results may vary · Not affiliated with Instagram or Meta
            </p>
            <div className="flex items-center gap-2 text-xs text-white/55">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
