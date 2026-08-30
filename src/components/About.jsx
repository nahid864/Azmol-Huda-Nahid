import { useEffect, useRef } from 'react'
import { CheckCircle2, Rocket } from 'lucide-react'
import useTilt from '../hooks/useTilt'
import { CONTACT_EMAIL, MAIL_COMPOSE_URL } from '../config'

/* Levels mirror the skills report: Advanced ≈ 90+, Intermediate ≈ 75–85. */
const skills = [
  { label: 'Laravel / PHP', pct: 92 },
  { label: 'HTML / CSS / Bootstrap', pct: 95 },
  { label: 'React.js / JavaScript', pct: 90 },
  { label: 'WordPress / WooCommerce', pct: 90 },
  { label: 'MySQL / MongoDB', pct: 85 },
  { label: 'Node.js / Python', pct: 78 },
]

/* Real skills that don't warrant their own bar but shouldn't be invisible. */
const alsoUsing = [
  'Flutter / Dart',
  'n8n Automation',
  'Python Scripting',
  'Git & GitHub',
  'REST API Integration',
  'Prompt Engineering',
  'On-page SEO',
  'Canva / Figma',
]

const softSkills = [
  'Problem Solving',
  'Clear Communication',
  'Fast Learner',
  'Time Management',
  'Client-Facing',
]

const highlights = [
  'B.Sc in CSE — Daffodil International University (2023)',
  'Full-stack builds in Laravel/PHP & React — e-commerce, POS and admin systems, end to end',
  'Radio Engineer at Taurus International (Sep 2024 – Feb 2025)',
  'Graphic Design Intern — Zenana & 1972 Conscious (Jun–Oct 2025)',
  'English (Full Professional) · Bangla (Native)',
]

export default function About() {
  const sectionRef = useRef(null)
  const barsRef = useRef([])
  const photoRef = useTilt({ max: 7, scale: 1.03 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
            barsRef.current.forEach((bar, i) => {
              if (bar) {
                setTimeout(() => {
                  bar.style.width = bar.dataset.pct + '%'
                }, 400 + i * 150)
              }
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — photo / badge */}
          <div className="reveal relative scene">
            <div
              ref={photoRef}
              className="tilt-3d glare relative rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/images/about.jpg`}
                alt="Azmol Huda Nahid"
                className="w-full aspect-[4/5] object-cover object-[50%_32%] rounded-2xl"
                style={{ filter: 'contrast(1.04) saturate(1.03)' }}
                loading="lazy"
              />
              {/* Light grade — anchor the bottom for the badge, keep the photo bright */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 70px 12px rgba(0,0,0,0.26)' }}
              />
            </div>

            {/* Experience badge */}
            <div className="absolute top-6 -right-4 lg:-right-8 bg-brand-orange text-white rounded-2xl px-5 py-4 shadow-2xl text-center float-chip">
              <p className="text-3xl font-extrabold leading-none">2023</p>
              <p className="text-xs font-medium mt-1 opacity-90">Building<br />since</p>
            </div>

            {/* Card at bottom */}
            <div className="absolute -bottom-4 left-4 right-4 bg-brand-card/90 backdrop-blur-sm border border-brand-border rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-brand-orange font-bold text-lg">🎯</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Available for Freelance</p>
                <p className="text-brand-gray text-xs">Let's build something amazing together</p>
              </div>
            </div>
          </div>

          {/* Right — bio + skills */}
          <div className="space-y-8 mt-8 lg:mt-0">
            <div className="reveal">
              <p className="section-subheading">Who I Am</p>
              <h2 className="section-heading">
                Passionate Developer<br />
                <span className="text-gradient">Building the Web</span>
              </h2>
            </div>

            <div className="reveal space-y-4 text-brand-gray text-sm sm:text-base leading-relaxed">
              <p>
                Hi, I'm <strong className="text-white">Azmol Huda Nahid</strong> — a full-stack web developer.
                My strongest work is in <strong className="text-brand-orange">Laravel/PHP</strong> and{' '}
                <strong className="text-brand-orange">React</strong>, backed by real shipped products:
                an e-commerce platform and a full POS system, both built end-to-end.
              </p>
              <p>
                Alongside the web work I build <strong className="text-brand-orange">AI automation</strong>{' '}
                — Python scripts and n8n flows that take repetitive tasks off a team's plate — and
                cross-platform mobile apps with <strong className="text-brand-orange">Flutter</strong>.
                Web and AI automation are my main focus.
              </p>
              <p>
                I'm energetic, detail-oriented, and I love turning complex problems into clean,
                elegant code. I've spent the last two years building real, production-style
                projects on my own — so I understand what it takes to actually finish and ship
                something, not just start it.
              </p>
            </div>

            {/* Highlights */}
            <ul className="reveal space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-brand-gray text-sm">
                  <CheckCircle2 size={16} className="text-brand-orange mt-0.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Skill bars */}
            <div id="skills" className="reveal space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Core Skills</h3>
              {skills.map((s, i) => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-brand-gray text-xs font-medium">{s.label}</span>
                    <span className="text-brand-orange text-xs font-bold">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
                    <div
                      ref={(el) => (barsRef.current[i] = el)}
                      className="progress-bar h-full bg-gradient-to-r from-brand-orange to-orange-400 rounded-full"
                      data-pct={s.pct}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary skills */}
            <div className="reveal space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                Also Working With
              </h3>
              <div className="flex flex-wrap gap-2">
                {alsoUsing.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium text-brand-gray bg-brand-card border border-brand-border rounded-lg px-3 py-1.5 hover:border-brand-orange/50 hover:text-brand-orange transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft skills */}
            <div className="reveal space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                How I Work
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium text-brand-orange bg-brand-orange/10 border border-brand-orange/25 rounded-lg px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently learning — honest framing, not an overclaim */}
            <div className="reveal bg-brand-card border border-brand-border rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                <Rocket size={18} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">
                  Currently Levelling Up
                  <span className="ml-2 text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-0.5 rounded">
                    IN PROGRESS
                  </span>
                </p>
                <p className="text-brand-gray text-xs leading-relaxed">
                  Deeper <strong className="text-brand-gray">AI automation</strong> pipelines and
                  multi-step agent workflows. I list this as an active learning goal — not a
                  finished skill.
                </p>
              </div>
            </div>

            {/* CTA row */}
            <div className="reveal flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-sm"
              >
                Hire Me Now
              </button>
              <a
                href={MAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
