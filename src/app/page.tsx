'use client'; // ← 页面是客户端组件就保留
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, ExternalLink, ArrowRight, FileText } from "lucide-react";

// Minimal single-file portfolio page
// Drop this into: app/page.tsx (Next.js App Router)
// TailwindCSS required. Animations: Framer Motion.
// Edit the constants below to personalize.

const SITE = {
  name: 'Delin "Angelina" Liang',
  headline: "Software Engineer & Game Dev",
  tagline:
    "Graduated from University of Southern California with a B.S. in CS(Games) and M.S. in Computer Science. I create delightful web experiences and ship reliable features. I seek to build impactful software. My core skills includes C++, C#, Python, JavaScript/TypeScript, React,Unity, and more.",
  email: "angelinaliang1903@gmail.com",
  github: "https://github.com/Angelina1903",
  linkedin: "https://www.linkedin.com/in/delin-liang-85283b209/",
  resumeUrl: "https://drive.google.com/file/d/1S6cSAUIOTyPkkHs9ftfKedZCNUleQQii/view?usp=sharing", // link to your PDF resume
};

const PROJECTS = [
  {
    title: "Climate GO",
    blurb: "A cozy climate simulation mobile game built in Unity with environment-driven UI.",
    stack: ["Unity", "C#", "Cinemachine"],
    href: "#",
    img: "https://images.unsplash.com/photo-1520975922284-9f6c9f5a9f0d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "MeowMeowLand (CRUD)",
    blurb: "Cat-themed Flask + SQLite CRUD app; simple auth and admin dashboard.",
    stack: ["Python", "Flask", "SQLite"],
    href: "#",
    img: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Dishcord (iOS)",
    blurb: "React Native app for sharing recipes with friends; iPhone builds via EAS.",
    stack: ["React Native", "Node", "MongoDB"],
    href: "#",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
  },
];

const SKILLS = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "C++", "Java", "C#", "Lua"] },
  { group: "Web & App", items: ["React", "Next.js", "Tailwind", "Node.js", "React Native"] },
  { group: "Game", items: ["Unity", "Cinemachine", "Shader Graph"] },
  { group: "Data & Infra", items: ["SQLite", "MongoDB", "PostgreSQL", "REST", "Git/GitHub", "Vercel"] },
];


const EXPERIENCE = [
  {
    title: "Game Operation Specialist · HaoPlay USA",
    range: "2024 — Present",
    bullets: [
      "Launched SEA/global ops for mobile MMORPG; community 180k+.",
      "Drove localization & cross-team release pipelines.",
    ],
  },
  {
    title: "Gameplay Software Engineer Intern · WB Games (Monolith)",
    range: "2023",
    bullets: [
      "C++/Lua tooling (ImGui) & gameplay logic (enemy respawn).",
    ],
  },
  {
    title: "USC · M.S. Computer Science (PDP) / B.S. CS (Games)",
    range: "2020 — 2024",
    bullets: [
      "CS, graphics, AI, engine and console game courses.",
    ],
  },
];

const CONTAINER = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Words to cycle in the headline typewriter
const HEADLINE_WORDS = [
  "A USC CS Games Undergrad",
  "A USC CS Grad",
  "A Software Engineer",
  "A Game Developer",
  "An Artist",
];


function TypewriterWords({
  words = HEADLINE_WORDS,
  typingSpeed = 45, // ms per char when typing
  deletingSpeed = 28, // ms per char when deleting
  pauseTime = 900, // ms pause at full word
}: {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}) {
  const [index, setIndex] = React.useState(0);
  const [sub, setSub] = React.useState("");
  const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">("typing");


  React.useEffect(() => {
    const current = words[index % words.length];
    let t: ReturnType<typeof setTimeout> | null = null;


    if (phase === "typing") {
      if (sub.length < current.length) {
        t = setTimeout(() => setSub(current.slice(0, sub.length + 1)), typingSpeed);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "deleting") {
      if (sub.length > 0) {
        t = setTimeout(() => setSub(current.slice(0, sub.length - 1)), deletingSpeed);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), pauseTime);
    }
    return () => { if (t) clearTimeout(t); }
  }, [sub, phase, index, words, typingSpeed, deletingSpeed, pauseTime]);


  // caret blink using CSS
  return (
    <span className="font-semibold">
      <span aria-live="polite" aria-atomic className="align-baseline">{sub}</span>
      <span className="inline-block w-[0.55ch] -mb-[2px] animate-pulse">|</span>
    </span>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-700/50">
        <div className={`${CONTAINER} flex items-center justify-between py-3`}>
          <a href="#" className="font-semibold tracking-tight">{SITE.name}</a>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a className="hover:opacity-80" href="#projects">Projects</a>
            <a className="hover:opacity-80" href="#skills">Skills</a>
            <a className="hover:opacity-80" href="#experience">Experience</a>
            <a className="hover:opacity-80" href="#about">About</a>
            <a className="hover:opacity-80" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={SITE.github} aria-label="GitHub" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              <Github className="h-5 w-5" />
            </a>
            <a href={SITE.linkedin} aria-label="LinkedIn" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={SITE.resumeUrl} className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
              <FileText className="h-4 w-4" /> Resume
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className={`${CONTAINER} grid items-center gap-10 md:grid-cols-2`}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Hello, I’m</p>
            <h1 className="mt-2 text-4xl/tight sm:text-5xl/tight font-bold tracking-tight">
              {SITE.name}
            </h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
              <TypewriterWords />
            </p>
            <p className="mt-2 text-slate-600/90 dark:text-slate-300/90">
              Graduated from <span className="font-semibold">University of Southern California</span> with a <span className="font-semibold">B.S.</span> in <span className="font-semibold">CS(Games)</span> and <span className="font-semibold">M.S.</span> in <span className="font-semibold">Computer Science</span>. I create delightful web experiences and ship reliable features. I seek to build impactful software. My core skills include <span className="font-bold">C++</span>, <span className="font-bold">C#</span>, <span className="font-bold">Python</span>, <span className="font-bold">JavaScript/TypeScript</span>, <span className="font-bold">React</span>, <span className="font-bold">Unity</span>, and more.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
              >
                Contact <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-xl"
          >
            {/* Replace with your portrait or 3D canvas */}
            <Image
              alt="Hero"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
 />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-20/28 py-12 sm:py-20 bg-slate-50/60 dark:bg-slate-900/40">
        <div className={`${CONTAINER}`}>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-semibold tracking-tight"
          >
            Projects
          </motion.h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.href}
                className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-lg">{p.title}</h3>
                    <ExternalLink className="h-4 w-4 opacity-60" />
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="text-xs rounded-full border border-slate-300/70 dark:border-slate-600/70 px-2 py-0.5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-20/28 py-16 sm:py-24">
        <div className={`${CONTAINER}`}>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Skills</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {SKILLS.map((g, i) => (
              <motion.div
                key={g.group}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 bg-white/70 dark:bg-slate-900/50"
                variants={itemFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05 }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{g.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="text-xs rounded-full border border-slate-300/70 dark:border-slate-600/70 px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Experience (Education + Work) */}
      <section id="experience" className="scroll-mt-20/28 py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/40">
        <div className={CONTAINER}>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Experience</h2>
          <ol className="mt-8 relative border-s-l border-slate-200 dark:border-slate-700">
             {EXPERIENCE.map((e, i) => (
              <motion.li
                key={e.title}
                className="ms-5 pb-8"
                variants={itemFade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="absolute -start-1.5 mt-1 h-3 w-3 rounded-full bg-slate-400 dark:bg-slate-500" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">{e.title}</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{e.range}</span>
                </div>
                <ul className="mt-2 list-disc ps-5 text-slate-700 dark:text-slate-300 text-sm">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20/28 py-16 sm:py-24">
        <div className={`${CONTAINER} grid gap-8 md:grid-cols-3`}>
          <div className="md:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">About</h2>
          </div>
          <div className="md:col-span-2 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              I’m a developer who enjoys shipping clean UI, meaningful animations, and pragmatic systems.
              I work across the stack but love front-end architecture, design systems, and performance.
            </p>
            <p className="mt-4">
              Outside of code, I run communities and localization for games, and tinker with Unity and creative tools.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20/28 py-16 sm:py-24 bg-slate-50/60 dark:bg-slate-900/40">
        <div className={CONTAINER}>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Get in touch</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Email me any time or say hi on socials.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90">
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
            <a href={SITE.github} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={SITE.linkedin} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-sm text-slate-600 dark:text-slate-400">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2025 {SITE.name}. All rights reserved.</p>
            <p className="opacity-80">
              About this website: built with React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS, Framer Motion, React Email & Resend, Vercel hosting.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
