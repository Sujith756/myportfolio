import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Code2,
  Cpu,
  Database,
  Download,
  Github,
  GraduationCap,
  Laptop,
  Layers,
  Linkedin,
  Mail,
  Send,
  Server,
  Sparkles,
  Terminal,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  certifications,
  education,
  interests,
  projects,
  roles,
  skillGroups,
} from "@/lib/portfolio-data";

const contactEmail = "sujithsinganaboina@gmail.com";
const githubUrl = "https://github.com/Sujith756";
const linkedInUrl = "https://www.linkedin.com/in/sujith-singanaboina-74089b310/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sujith Singanaboina | Full Stack Developer Portfolio" },
      {
        name: "description",
        content:
          "Explore the projects, technical skills, education, and interests of Sujith Singanaboina, a Computer Science Engineering student and aspiring Full Stack Developer.",
      },
      { property: "og:title", content: "Sujith Singanaboina | Full Stack Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Projects, technical skills, education, and interests of Sujith Singanaboina, an aspiring Full Stack Developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const skillIcons: Record<string, LucideIcon> = {
  "Programming Languages": Braces,
  Frontend: Laptop,
  Backend: Server,
  Databases: Database,
  "Computer Science Fundamentals": Cpu,
  Tools: Wrench,
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-3 flex items-center gap-3 font-mono text-xs text-electric">
          <span className="section-index">{index}</span>
          <span>{label}</span>
        </p>
        <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>
      <span className="section-divider hidden h-px w-32 sm:block" aria-hidden="true" />
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-card/70 px-3 text-sm text-muted-foreground transition-colors hover:border-electric/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" className="size-3.5" />
    </a>
  );
}

function PortfolioPage() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const subject = String(values.get("subject") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();
    const body = encodeURIComponent(`${message}\n\nName: ${name}\nEmail: ${email}`);
    const encodedSubject = encodeURIComponent(subject || `Message from ${name}`);

    window.location.href = `mailto:${contactEmail}?subject=${encodedSubject}&body=${body}`;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="portfolio-page min-h-screen overflow-hidden bg-background text-foreground">
        <div className="portfolio-grid pointer-events-none fixed inset-x-0 top-0 z-0 h-[52rem]" />

        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
            <a href="#top" className="group flex shrink-0 items-center gap-3" aria-label="Sujith Singanaboina, home">
              <span className="brand-mark font-display text-sm font-bold">S.</span>
              <span className="hidden font-display text-sm font-semibold text-foreground sm:block">
                Sujith Singanaboina
              </span>
            </a>

            <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
              {[
                ["About", "about"],
                ["Skills", "skills"],
                ["Projects", "projects"],
                ["Journey", "journey"],
                ["Contact", "contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>

            <Button asChild size="sm" className="shrink-0">
              <a href="#contact">
                Let’s talk <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <nav aria-label="Mobile navigation" className="border-t border-border/50 px-5 py-2.5 lg:hidden">
            <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto whitespace-nowrap">
              {[
                ["About", "about"],
                ["Skills", "skills"],
                ["Projects", "projects"],
                ["Journey", "journey"],
                ["Contact", "contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <main className="relative z-10">
          <section className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-6xl items-center gap-14 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-20">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-7 inline-flex items-center gap-2 rounded-md border border-electric/25 bg-electric/5 px-3 py-2 font-mono text-[11px] text-electric"
              >
                <span className="status-dot" aria-hidden="true" />
                COMPUTER SCIENCE ENGINEERING
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="max-w-3xl font-display text-[2.55rem] font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.5rem]"
              >
                Hi, I’m Sujith —
                <span className="mt-2 block text-gradient">Full Stack Developer</span>
                <span className="mt-2 block">&amp; Software Engineering Enthusiast.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
              >
                I build scalable web applications, solve challenging problems, and explore intelligent
                technologies to create impactful solutions.
              </motion.p>

              <div className="mt-7 flex min-h-8 items-center gap-3 font-mono text-xs text-muted-foreground sm:text-sm">
                <span className="text-electric" aria-hidden="true">&gt;</span>
                <span>FOCUSED ON</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0 text-foreground"
                    aria-live="polite"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#projects">
                    View Projects <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled
                  title="Resume file not provided yet"
                  aria-label="Download resume, resume file not provided yet"
                >
                  <Download aria-hidden="true" /> Download Resume
                </Button>
                <Button asChild variant="ghost">
                  <a href="#contact">
                    Contact Me <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <SocialLink href={githubUrl} label="GitHub">
                  <Github aria-hidden="true" className="size-4" />
                </SocialLink>
                <SocialLink href={linkedInUrl} label="LinkedIn">
                  <Linkedin aria-hidden="true" className="size-4" />
                </SocialLink>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="relative mx-auto w-full max-w-[35rem]"
            >
              <div className="code-window relative overflow-hidden rounded-md border border-border/80">
                <div className="flex items-center justify-between border-b border-border/80 px-4 py-3">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="window-dot" />
                    <span className="window-dot" />
                    <span className="window-dot" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <Code2 aria-hidden="true" className="size-3.5 text-electric" />
                    about.ts
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">01 / 04</span>
                </div>

                <div className="grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] items-stretch gap-3 p-3 sm:gap-4 sm:p-4">
                  <div
                    role="img"
                    aria-label="Portrait placeholder for Sujith Singanaboina"
                    className="flex min-w-0 w-full aspect-[4/5] self-center flex-col items-center justify-center rounded-sm border border-electric/30 bg-card/80 px-2 text-center"
                  >
                    <UserRound aria-hidden="true" className="size-7 text-electric/80 sm:size-9" strokeWidth={1.4} />
                    <span className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">SY</span>
                    <span className="mt-1 font-mono text-[9px] text-muted-foreground">PORTRAIT</span>
                  </div>

                  <div className="grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2 self-center font-mono text-[10px] leading-7 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-3 sm:text-xs sm:leading-8">
                    <div className="select-none text-right text-muted-foreground/60" aria-hidden="true">
                      01<br />02<br />03<br />04<br />05<br />06<br />07
                    </div>
                    <div className="min-w-0 overflow-hidden">
                      <p><span className="code-keyword">const</span> <span className="code-variable">sujith</span> = {'{'}</p>
                      <p className="pl-2 sm:pl-4"><span className="code-key">focus</span>: <span className="code-string">“Full Stack Developer”</span>,</p>
                      <p className="pl-2 sm:pl-4"><span className="code-key">degree</span>: <span className="code-string">“Computer Science”</span>,</p>
                      <p className="pl-2 sm:pl-4"><span className="code-key">interests</span>: [</p>
                      <p className="pl-4 sm:pl-8"><span className="code-string">“AI / ML”</span>, <span className="code-string">“Problem Solving”</span></p>
                      <p className="pl-2 sm:pl-4">],</p>
                      <p>{'}'}<span className="text-electric">;</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/80 bg-background/40 px-4 py-3 font-mono text-[11px] text-muted-foreground sm:px-6">
                  <span className="flex items-center gap-2"><Terminal aria-hidden="true" className="size-3.5 text-violet" /> ideas → impactful solutions</span>
                  <span className="code-cursor text-electric">_</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>BASED IN THE WORLD OF SOFTWARE</span>
                <span className="flex items-center gap-2"><span className="status-dot" aria-hidden="true" /> LEARNING, ALWAYS</span>
              </div>
            </motion.div>
          </section>

          <section id="about" className="scroll-mt-28 border-y border-border/60 bg-card/35">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
              <Reveal>
                <SectionHeading index="01" label="ABOUT ME" title="Curiosity, built into every line." />
              </Reveal>
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                <Reveal>
                  <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                    I’m a Computer Science Engineering student passionate about software development,
                    problem-solving, and building practical technology solutions. I enjoy developing
                    full-stack applications, working with modern web technologies, and exploring
                    Artificial Intelligence and Machine Learning. My goal is to become a skilled software
                    engineer and contribute to innovative products.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="border-l border-electric/40 pl-5">
                    <p className="mb-4 flex items-center gap-2 font-mono text-xs text-electric">
                      <Sparkles aria-hidden="true" className="size-4" /> INTERESTS
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <li key={interest} className="skill-chip rounded-md px-3 py-2 text-xs text-muted-foreground">
                          {interest}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="skills" className="scroll-mt-28">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
              <Reveal>
                <SectionHeading index="02" label="TECHNICAL SKILLS" title="Tools I work with." />
              </Reveal>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {skillGroups.map((group, index) => {
                  const SkillIcon = skillIcons[group.category] ?? Code2;
                  return (
                    <Reveal key={group.category} delay={(index % 3) * 0.06}>
                      <article className="portfolio-surface h-full rounded-md border border-border/80 p-5">
                        <div className="mb-5 flex items-center gap-3">
                          <span className="icon-frame"><SkillIcon aria-hidden="true" className="size-4 text-electric" /></span>
                          <h3 className="font-display text-base font-semibold text-foreground">{group.category}</h3>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <li key={skill} className="skill-chip rounded-md px-2.5 py-1.5 text-xs text-muted-foreground">
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="projects" className="scroll-mt-28 border-y border-border/60 bg-card/35">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
              <Reveal>
                <SectionHeading index="03" label="SELECTED WORK" title="Projects with a purpose." />
              </Reveal>
              <div className="grid gap-4 lg:grid-cols-2">
                {projects.map((project, index) => (
                  <Reveal key={project.title} delay={(index % 2) * 0.07}>
                    <article className="project-card group h-full rounded-md border border-border/80 bg-background/70 p-5 transition-colors hover:border-electric/40 sm:p-6">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="project-number font-mono text-xs text-electric">0{index + 1}</span>
                          <span className="h-px w-8 bg-border" aria-hidden="true" />
                          <span className="font-mono text-[10px] text-muted-foreground">PROJECT</span>
                        </div>
                        <Layers aria-hidden="true" className="size-4 text-muted-foreground transition-colors group-hover:text-violet" />
                      </div>
                      <h3 className="max-w-xl font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                      {project.features ? (
                        <div className="mt-5 border-t border-border/70 pt-4">
                          <p className="mb-3 font-mono text-[10px] text-muted-foreground">FEATURES</p>
                          <ul className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
                            {project.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <ul className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                        {project.technologies.map((technology) => (
                          <li key={technology} className="rounded-md bg-secondary px-2.5 py-1.5 font-mono text-[10px] text-secondary-foreground">
                            {technology}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="journey" className="scroll-mt-28">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
              <Reveal>
                <SectionHeading index="04" label="EDUCATION & CERTIFICATIONS" title="Learning, in progress." />
              </Reveal>
              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                <Reveal>
                  <div>
                    <h3 className="mb-6 flex items-center gap-3 font-display text-lg font-semibold">
                      <GraduationCap aria-hidden="true" className="size-5 text-electric" /> Education
                    </h3>
                    <ol className="education-timeline">
                      {education.map((item) => (
                        <li key={item.qualification} className="education-item">
                          <span className="timeline-marker" aria-hidden="true" />
                          <div className="pb-7">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                              <h4 className="font-display font-semibold text-foreground">{item.qualification} · {item.subject}</h4>
                              <span className="font-mono text-xs text-electric">{item.detail}</span>
                            </div>
                            <p className="mt-1.5 text-sm text-muted-foreground">{item.institution}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div>
                    <h3 className="mb-6 flex items-center gap-3 font-display text-lg font-semibold">
                      <BookOpen aria-hidden="true" className="size-5 text-violet" /> Certifications
                    </h3>
                    <ul className="divide-y divide-border/70">
                      {certifications.map((certification) => (
                        <li key={certification.title} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                          <div>
                            <h4 className="font-medium leading-6 text-foreground">{certification.title}</h4>
                            {certification.issuer ? <p className="mt-1 text-xs text-muted-foreground">{certification.issuer}</p> : null}
                          </div>
                          {certification.date ? <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{certification.date}</span> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="border-y border-border/60 bg-card/35">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
              <Reveal>
                <SectionHeading index="05" label="GITHUB" title="Find me on GitHub." />
              </Reveal>
              <Reveal>
                <div className="github-panel flex flex-col gap-6 rounded-md border border-border/80 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="icon-frame icon-frame-large"><Github aria-hidden="true" className="size-6 text-electric" /></span>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">GITHUB PROFILE</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold">Sujith756</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                        Explore the repositories and project work on my GitHub profile.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <a href={githubUrl} target="_blank" rel="noreferrer">
                        GitHub Profile <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={`${githubUrl}?tab=repositories`} target="_blank" rel="noreferrer">
                        Repositories <ArrowUpRight aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="contact" className="scroll-mt-28">
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
              <Reveal>
                <SectionHeading index="06" label="CONTACT" title="Let’s build something meaningful." />
              </Reveal>
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <Reveal>
                  <div>
                    <p className="max-w-md text-base leading-7 text-muted-foreground">
                      Have a project, an opportunity, or an interesting problem to solve? Send me a message.
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-6 inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-electric"
                    >
                      <span className="icon-frame"><Mail aria-hidden="true" className="size-4 text-electric" /></span>
                      {contactEmail}
                    </a>
                    <div className="mt-8 flex flex-wrap gap-2.5">
                      <SocialLink href={githubUrl} label="GitHub"><Github aria-hidden="true" className="size-4" /></SocialLink>
                      <SocialLink href={linkedInUrl} label="LinkedIn"><Linkedin aria-hidden="true" className="size-4" /></SocialLink>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <form onSubmit={handleContactSubmit} className="grid gap-4" aria-label="Send Sujith a message">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Name</label>
                        <Input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email</label>
                        <Input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">Subject</label>
                      <Input id="contact-subject" name="subject" required placeholder="What would you like to discuss?" />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
                      <Textarea id="contact-message" name="message" required rows={5} placeholder="Write your message here..." />
                    </div>
                    <div className="pt-1">
                      <Button type="submit">
                        Send Message <Send aria-hidden="true" />
                      </Button>
                    </div>
                  </form>
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-border/70 bg-background/90">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="font-mono text-xs text-muted-foreground">Designed &amp; Developed by Sujith Singanaboina</p>
            <div className="flex items-center gap-3">
              <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Sujith on GitHub" className="footer-icon-link"><Github aria-hidden="true" className="size-4" /></a>
              <a href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="Sujith on LinkedIn" className="footer-icon-link"><Linkedin aria-hidden="true" className="size-4" /></a>
              <Button asChild variant="ghost" size="icon" aria-label="Back to top">
                <a href="#top" title="Back to top"><ArrowUpRight aria-hidden="true" className="-rotate-45" /></a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}