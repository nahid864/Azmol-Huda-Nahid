import { useEffect, useRef, useState } from 'react'
import { X, ExternalLink, Github, CheckCircle2, Lock, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import TiltCard from './TiltCard'
import { CASE_STUDIES } from '../data/caseStudies'

const IMG_BASE = import.meta.env.BASE_URL + 'assets/images/'

const shots = (dir, list) =>
  list.map(([slug, caption]) => ({
    src: `${IMG_BASE}projects/${dir}/${slug}.webp`,
    thumb: `${IMG_BASE}projects/${dir}/${slug}.thumb.webp`,
    caption,
  }))

const BEANOVA_GALLERY = shots('beanova', [
  ['hero', 'Hero: a single AI-generated video (Kling v3.0) scrubs forward and rewinds with the scroll.'],
  ['story-1', 'Captions sit on a four-layer legibility system, so they stay readable over moving footage.'],
  ['story-2', 'Later sections keep the same scrubbed footage, with a call to action over it.'],
  ['story-3', 'The closing section. On phones and with reduced motion, a still image replaces the video.'],
])

// Production systems open a full case-study page; their content lives in
// src/data/caseStudies.js.
const caseCard = (id, slug) => {
  const cs = CASE_STUDIES[slug]
  return {
    id,
    title: cs.title,
    category: cs.category,
    caseStudy: slug,
    image: cs.hero.thumb || cs.hero.src,
    tech: cs.stack,
    live: cs.live || '#',
    status: cs.status,
  }
}

const projects = [
  caseCard(5, 'everyday-crackers'),
  caseCard(9, 'nuigent'),
  caseCard(10, 'savoria'),
  caseCard(11, 'medicore'),
  caseCard(6, 'bloomsberry'),
  {
    id: 8,
    title: 'Beanova',
    category: 'Front-end',
    gallery: BEANOVA_GALLERY,
    emoji: '☕',
    accent: '#C8964F',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'ffmpeg'],
    problem:
      'I wanted to see how far a single hand-coded page could go with AI-generated media doing all the visual work — a cinematic, scroll-driven story for a coffee shop that still holds up with no JavaScript and no video support.',
    solution:
      'Built a one-page site in plain HTML, CSS and vanilla JS — one folder, no framework, no build step. A single AI-generated hero video (Kling v3.0) scrubs forward and rewinds with the scroll via a blob fetch and an eased rAF loop; section stills came from Soul 2, all processed with ffmpeg. A four-layer legibility system keeps captions readable over the footage, and five accessibility gates swap in a designed still image on phones and for reduced-motion visitors.',
    result:
      'A complete, cinematic coffee-shop site that stays fully functional even if the video never loads. Verified with a headless-Chrome self-test covering scrub tracking, caption timing, the press-and-hold interaction, the no-video fallback, reduced motion both directions, phone widths and a zero-console-error pass. ~28.5 AI-media credits total; deploys as static files to any host.',
    role: 'Solo Front-end Developer',
    features: [
      'Scroll-scrubbed AI hero video (forward + rewind)',
      'Press-and-hold "pour your own cup" reveal',
      'Four-layer caption legibility system',
      'Reduced-motion & mobile still-image fallbacks',
    ],
    github: 'https://github.com/nahid864/Beanova',
    live: 'https://nahid864.github.io/Beanova/',
  },
  {
    id: 2,
    title: 'TinyOne',
    category: 'Front-end',
    image: IMG_BASE + 'tinyone.png',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    problem: 'Needed a clean, minimal app-showcase landing page with fast load time and mobile-first layout.',
    solution: 'Crafted a hand-coded HTML/CSS/JS site with Bootstrap grid, custom animations and zero dependencies beyond Bootstrap.',
    result: 'Lighthouse performance score 95+, loads in under 1.5 s on mobile.',
    role: 'Solo Front-end Developer',
    features: [
      'Mobile-first responsive layout',
      'Custom CSS animations',
      'Bootstrap grid system',
      'Lighthouse 95+ performance',
    ],
    github: 'https://github.com/nahid864',
    live: 'https://nahid864.github.io/tinyone',
    era: 'earlier',
  },
  {
    id: 3,
    title: 'e-school',
    category: 'Front-end',
    image: IMG_BASE + 'e-school.png',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    problem: 'Educational platform needed a clear, accessible UI to browse courses and enrol online.',
    solution: 'Designed a multi-section landing page with course cards, instructor profiles, stats counters and a registration form.',
    result: 'A clean, accessible layout with course cards, instructor sections and animated stats (1500+ topics, 1800+ students shown), plus a working online registration form.',
    role: 'Solo Front-end Developer',
    features: [
      'Course browsing cards',
      'Instructor profile sections',
      'Animated stats counters',
      'Online registration form',
    ],
    github: 'https://github.com/nahid864',
    live: 'https://nahid864.github.io/E-school',
    era: 'earlier',
  },
  {
    id: 4,
    title: 'Minimo',
    category: 'Front-end',
    image: IMG_BASE + 'minimo.png',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    problem: 'A lifestyle blog needed a minimal, elegant design that puts photography and content front and centre.',
    solution: 'Created a clean masonry-style blog layout with full-width hero images, grid posts and a minimal newsletter section.',
    result: 'Sleek, brand-consistent presentation with excellent readability that resonated perfectly with the target audience.',
    role: 'Solo Front-end Developer',
    features: [
      'Masonry-style blog grid',
      'Full-width hero imagery',
      'Newsletter signup section',
      'Typography-led readability',
    ],
    github: 'https://github.com/nahid864',
    live: 'https://nahid864.github.io/Minimo',
    era: 'earlier',
  },
]

const filters = ['All', 'Full-stack', 'Laravel', 'Front-end', 'AI']

/**
 * Designed fallback for projects with no screenshot on file. Deliberately
 * reads as a branded graphic rather than imitating a real screenshot — the
 * tech stack is the honest thing to show when the visual isn't available.
 */
function ProjectPoster({ title, emoji, tech = [], accent }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${accent}22, transparent 60%),
                     linear-gradient(145deg, #1b1b1b, #121212)`,
      }}
    >
      {/* Faint grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
        style={{ background: `${accent}1f`, border: `1px solid ${accent}44` }}
      >
        {emoji}
      </div>
      <p className="relative text-white font-semibold text-sm">{title}</p>
      <div className="relative flex flex-wrap justify-center gap-1.5 px-6">
        {tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[9px] font-medium text-brand-gray bg-white/5 border border-white/10 rounded px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * The address shown in the mockup's URL bar. It used to print a made-up
 * `azmolnahid.dev/...` for every project — a domain that does not resolve,
 * which reads as a dead portfolio. Now it shows the real address when a
 * project actually has one, and a plain project label when it does not.
 */
function addressLabel(live, title) {
  if (live && live !== '#') {
    try {
      const u = new URL(live)
      return (u.host + u.pathname).replace(/\/$/, '')
    } catch {
      return live
    }
  }
  return title.toLowerCase().replace(/\s+/g, '-')
}

function BrowserMockup({ image, title, emoji = '💻', tech, accent = '#FF5A1F', live }) {
  // Falling back in state (rather than poking at sibling nodes) keeps React as
  // the single source of truth for what's on screen.
  const [imgFailed, setImgFailed] = useState(false)
  const showPoster = !image || imgFailed

  return (
    <div className="rounded-xl overflow-hidden border border-brand-border bg-brand-card shadow-lg">
      {/* Browser chrome */}
      <div className="bg-[#1e1e1e] px-3 py-2 flex items-center gap-2 border-b border-brand-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 mx-3 bg-[#2a2a2a] rounded-md px-3 py-1 text-[10px] text-brand-gray truncate">
          {addressLabel(live, title)}
        </div>
      </div>
      {/* Screenshot area */}
      <div className="relative w-full" style={{ paddingBottom: '62.5%' }}>
        {image && !imgFailed && (
          <img
            src={image}
            alt={`${title} project screenshot`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
        {/* Poster — shown when a project has no screenshot, or the file 404s */}
        {showPoster && (
          <ProjectPoster title={title} emoji={emoji} tech={tech} accent={accent} />
        )}
      </div>
    </div>
  )
}

/**
 * The ribbon in the corner of a card. Three honest states:
 *   building — actively being worked on right now
 *   built    — finished and working, but not deployed for the public
 *   (none)   — nothing to say
 */
function StatusRibbon({ status, live }) {
  if (status !== 'building' && status !== 'built' && status !== 'live') return null

  const isLive = live && live !== '#'
  const label =
    status === 'live'
      ? 'Live'
      : status === 'building'
      ? isLive
        ? 'Live · in progress'
        : 'In development'
      : isLive
        ? 'Live'
        : 'Built · not yet deployed'

  const tone =
    status === 'building'
      ? 'border-brand-orange/40 text-brand-orange'
      : 'border-emerald-400/40 text-emerald-300'

  return (
    <span
      className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-brand-bg/90 border ${tone} text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 backdrop-blur-sm`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'building' ? 'bg-brand-orange animate-pulse' : 'bg-emerald-400'
        }`}
      />
      {label}
    </span>
  )
}

function Gallery({ items, title, live }) {
  const [i, setI] = useState(0)
  const stripRef = useRef(null)
  const go = (n) => setI((n + items.length) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  useEffect(() => {
    stripRef.current?.children[i]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [i])

  const shot = items[i]

  return (
    <div>
      <div className="relative group/gal">
        <BrowserMockup image={shot.src} title={title} live={live} />
        {['left', 'right'].map((side) => (
          <button
            key={side}
            onClick={() => go(side === 'left' ? i - 1 : i + 1)}
            aria-label={side === 'left' ? 'Previous screenshot' : 'Next screenshot'}
            className={`absolute top-1/2 ${side === 'left' ? 'left-2' : 'right-2'} w-9 h-9 rounded-full bg-black/60 hover:bg-brand-orange text-white flex items-center justify-center transition opacity-80 sm:opacity-0 sm:group-hover/gal:opacity-100 focus:opacity-100`}
          >
            {side === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-3 mt-3 min-h-[2.5rem]">
        <span className="shrink-0 text-[10px] font-semibold text-brand-orange bg-brand-orange/10 border border-brand-orange/30 rounded-full px-2 py-0.5 mt-0.5 tabular-nums">
          {i + 1} / {items.length}
        </span>
        <p className="text-brand-gray text-xs leading-relaxed" aria-live="polite">
          {shot.caption}
        </p>
      </div>

      <div ref={stripRef} className="flex gap-2 overflow-x-auto mt-3 pb-1 snap-x">
        {items.map((s, n) => (
          <button
            key={s.src}
            onClick={() => setI(n)}
            aria-label={`Show screenshot ${n + 1}`}
            aria-current={n === i}
            className={`shrink-0 snap-start w-24 rounded-md overflow-hidden border-2 transition ${
              n === i ? 'border-brand-orange' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={s.src} alt="" loading="lazy" className="w-full aspect-[16/10] object-cover object-top" />
          </button>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ p, onOpen }) {
  const open = () => (p.caseStudy ? (window.location.hash = `#/work/${p.caseStudy}`) : onOpen(p))
  return (
    <div
      className="reveal group cursor-pointer scene rounded-xl"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View case study for ${p.title}`}
    >
      <TiltCard max={6} scale={1.015} className="relative overflow-hidden rounded-xl">
        <BrowserMockup
          image={p.image || p.gallery?.[0]?.thumb || p.gallery?.[0]?.src}
          title={p.title}
          emoji={p.emoji}
          tech={p.tech}
          accent={p.accent}
          live={p.live}
        />
        <StatusRibbon status={p.status} live={p.live} />
        {(p.caseStudy || p.gallery?.length > 1) && (
          <span className="absolute top-3 right-3 z-10 bg-brand-bg/90 border border-white/10 text-white/80 text-[10px] font-semibold rounded-full px-2.5 py-1 backdrop-blur-sm">
            {p.caseStudy ? 'Case study' : `${p.gallery.length} screens`}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-orange/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 rounded-xl">
          <div className="bg-white/20 rounded-full p-3">
            <ExternalLink className="text-white" size={22} />
          </div>
          <p className="text-white font-semibold text-sm">{p.caseStudy ? 'Read the case study' : 'View details'}</p>
        </div>
      </TiltCard>
      <div className="mt-3 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold group-hover:text-brand-orange transition-colors">
            {p.title}
          </h3>
          <span className="text-xs bg-brand-orange/15 text-brand-orange border border-brand-orange/30 rounded-full px-3 py-0.5">
            {p.category}
          </span>
        </div>
        <p className="text-brand-gray text-xs mt-1 line-clamp-1">{p.tech.slice(0, 4).join(' · ')}</p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)
  const closeBtnRef = useRef(null)
  const firstFilterRun = useRef(true)

  /* 2023 practice sites still belong to the record, but they no longer lead it.
     They live in a collapsed "Earlier work" section rather than competing with
     the production systems for attention. */
  const inFilter = (p) => active === 'All' || p.category === active
  const filtered = projects.filter((p) => p.era !== 'earlier' && inFilter(p))
  const earlier = projects.filter((p) => p.era === 'earlier' && inFilter(p))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* The observer above fires once and disconnects. Cards that a filter change
     remounts would otherwise stay stuck at opacity:0, so re-run the reveal on
     the grid whenever the active filter changes (skipping the initial mount,
     which the observer already handles on scroll-in). */
  useEffect(() => {
    if (firstFilterRun.current) {
      firstFilterRun.current = false
      return
    }
    const cards = sectionRef.current?.querySelectorAll('.portfolio-grid .reveal')
    cards?.forEach((el, i) => {
      el.classList.remove('visible')
      setTimeout(() => el.classList.add('visible'), i * 60)
    })
  }, [active])

  /* Modal behaviour: lock scroll, close on Escape, and hand focus to the
     dialog then give it back to whatever opened it. */
  useEffect(() => {
    if (!modal) return

    const opener = document.activeElement
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setModal(null)
    }
    document.addEventListener('keydown', onKeyDown)

    closeBtnRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [modal])

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 md:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="section-subheading">My Work</p>
          <h2 className="section-heading">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            A selection of projects I've built — click any card for full details.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 reveal">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === f
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                  : 'bg-brand-card border border-brand-border text-brand-gray hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio-grid grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={setModal} />
          ))}
        </div>

        {/* Earlier work — 2023 practice builds, kept on the record but folded
            away so they don't compete with the production systems above. */}
        {earlier.length > 0 && (
          <details className="mt-12 group/earlier reveal">
            <summary className="cursor-pointer list-none flex items-center justify-center gap-2 text-brand-gray hover:text-brand-orange transition-colors text-sm font-medium select-none">
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-open/earlier:rotate-180"
              />
              Earlier work — {earlier.length} practice{' '}
              {earlier.length === 1 ? 'build' : 'builds'} from 2023
            </summary>
            <p className="text-center text-brand-gray/60 text-xs mt-3 max-w-lg mx-auto">
              Static HTML/CSS sites I built while learning. Kept here for the record.
            </p>
            <div className="portfolio-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {earlier.map((p) => (
                <ProjectCard key={p.id} p={p} onOpen={setModal} />
              ))}
            </div>
          </details>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className={`modal-content bg-brand-card border border-brand-border rounded-2xl ${modal.gallery?.length ? 'max-w-4xl' : 'max-w-2xl'} w-full max-h-[90vh] overflow-y-auto`}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-border">
              <div>
                <h3 id="project-modal-title" className="text-white font-bold text-lg">
                  {modal.title}
                </h3>
                <span className="text-brand-orange text-xs font-medium">{modal.category}</span>
              </div>
              <button
                ref={closeBtnRef}
                onClick={() => setModal(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-brand-gray hover:text-white transition"
                aria-label="Close project details"
              >
                <X size={16} />
              </button>
            </div>

            {/* Screenshot */}
            <div className="p-5 border-b border-brand-border">
              {modal.gallery?.length ? (
                <Gallery key={modal.id} items={modal.gallery} title={modal.title} live={modal.live} />
              ) : (
                <BrowserMockup
                  image={modal.image}
                  title={modal.title}
                  emoji={modal.emoji}
                  tech={modal.tech}
                  accent={modal.accent}
                  live={modal.live}
                />
              )}
            </div>

            {/* Case study */}
            <div className="p-5 space-y-6">
              {/* Meta row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-brand-bg border border-brand-border rounded-lg p-3">
                  <p className="text-brand-gray/60 text-[10px] uppercase tracking-wider mb-1">
                    My Role
                  </p>
                  <p className="text-white text-xs font-semibold">{modal.role}</p>
                </div>
                <div className="bg-brand-bg border border-brand-border rounded-lg p-3">
                  <p className="text-brand-gray/60 text-[10px] uppercase tracking-wider mb-1">
                    Type
                  </p>
                  <p className="text-white text-xs font-semibold">{modal.category}</p>
                </div>
              </div>

              {/* Tech stack as chips */}
              <div>
                <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {modal.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium text-brand-gray bg-brand-bg border border-brand-border rounded-md px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* The narrative */}
              {[
                { label: 'The Problem', content: modal.problem },
                { label: 'What I Built', content: modal.solution },
                { label: 'The Outcome', content: modal.result },
              ].map(({ label, content }) => (
                <div key={label}>
                  <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="text-brand-gray text-sm leading-relaxed">{content}</p>
                </div>
              ))}

              {/* Key features */}
              {modal.features?.length > 0 && (
                <div>
                  <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mb-2">
                    Key Features
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {modal.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-brand-gray text-xs leading-relaxed"
                      >
                        <CheckCircle2 size={13} className="text-brand-orange mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links — only render a live link when there actually is one */}
              <div className="flex flex-wrap gap-3 pt-2">
                {modal.github && (
                  <a
                    href={modal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs flex items-center gap-2"
                  >
                    <Github size={14} /> GitHub
                  </a>
                )}
                {modal.live && modal.live !== '#' ? (
                  <>
                    <a
                      href={modal.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs flex items-center gap-2"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    {modal.status === 'building' && (
                      <span className="text-brand-orange/80 text-xs flex items-center gap-2 px-2 py-3">
                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
                        interface still in progress
                      </span>
                    )}
                  </>
                ) : modal.status === 'building' ? (
                  <span className="text-brand-orange text-xs flex items-center gap-2 px-4 py-3">
                    <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
                    In active development — launching soon
                  </span>
                ) : modal.status === 'built' ? (
                  <span className="text-emerald-300 text-xs flex items-center gap-2 px-4 py-3">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    Built and working — not yet deployed publicly
                  </span>
                ) : (
                  <span className="text-brand-gray/50 text-xs flex items-center gap-2 px-4 py-3">
                    <Lock size={13} /> Local build — not deployed yet
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
