import { useEffect, useRef, useState } from 'react'
import { X, ExternalLink, Github, CheckCircle2, Lock } from 'lucide-react'
import TiltCard from './TiltCard'

const IMG_BASE = import.meta.env.BASE_URL + 'assets/images/'

const projects = [
  {
    id: 1,
    title: 'Laravel Admin Panel',
    category: 'Laravel',
    image: IMG_BASE + 'admin-panel.jpg',
    tech: ['Laravel', 'Blade', 'Bootstrap', 'MySQL'],
    problem: 'I wanted a real example of a full admin backend — not a tutorial clone — so I built one covering the exact features a live e-commerce operation actually needs: products, inventory, orders, customers and ads, all from one place.',
    solution: 'Built a complete Laravel admin panel with 11 screens covering Dashboard, User Management, Products, Inventory, Customers, Orders, Order History, Ads Management and Activity Logs. Implemented role-based access control and real-time inventory tracking.',
    result: 'Fully functional e-commerce administration system with CRUD operations, role-based access, real-time inventory and activity logging across 11 dedicated screens.',
    role: 'Solo Full-Stack Developer',
    features: [
      '11 dedicated admin screens',
      'Role-based access control',
      'Real-time inventory tracking',
      'Activity logging & audit trail',
    ],
    github: 'https://github.com/nahid864',
    live: '#',
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
  },
  {
    id: 5,
    title: 'Everyday Crackers',
    category: 'Full-stack',
    emoji: '🛒',
    accent: '#FF5A1F',
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade'],
    problem:
      'I wanted to build a complete online store end to end — not just a catalogue, but real checkout, order tracking and a back office that staff could actually run day to day.',
    solution:
      'Built the full e-commerce platform end-to-end in Laravel: product catalog, cart, checkout flow, order management and an admin dashboard for staff to manage stock and fulfilment.',
    result:
      'A production e-commerce system handling the complete customer journey from browsing to order fulfilment, with staff managing everything from one dashboard.',
    role: 'Solo Full-Stack Developer',
    features: [
      'Product catalog & search',
      'Shopping cart & checkout flow',
      'Order management & fulfilment',
      'Staff admin dashboard',
    ],
    github: 'https://github.com/nahid864',
    live: '#',
    status: 'building',
  },
  {
    id: 6,
    title: 'POS System',
    category: 'Full-stack',
    emoji: '🧾',
    accent: '#22C55E',
    tech: ['Laravel', 'PHP', 'MySQL'],
    problem:
      'I took the classic paper-ledger shop problem — stock counts that drift and no reliable view of what is actually selling — and built the system that fixes it.',
    solution:
      'Developed a Laravel point-of-sale system covering live inventory tracking, billing and sales reporting — so every sale updates stock automatically.',
    result:
      'Replaced manual record-keeping with accurate real-time inventory and sales reports the owner can act on.',
    role: 'Solo Full-Stack Developer',
    features: [
      'Live inventory tracking',
      'Billing & receipt generation',
      'Sales reporting dashboard',
      'Automatic stock deduction',
    ],
    github: 'https://github.com/nahid864',
    live: '#',
  },
  {
    id: 7,
    title: 'Black Electrical',
    category: 'Full-stack',
    emoji: '⚡',
    accent: '#61DAFB',
    tech: ['React', 'React Router', 'React Hook Form', 'Node.js', 'MongoDB'],
    problem:
      'I wanted a proper React app to work through — multi-page navigation and validated forms backed by a real database, not static pages — so I built one around an electrical-services brief.',
    solution:
      'Built a React front-end with React Router for navigation and React Hook Form for robust validated forms, wired to a Node.js + MongoDB back-end.',
    result:
      'A fast, fully interactive single-page app with reliable client-side validation and persistent data.',
    role: 'Front-end & Backend Developer',
    features: [
      'Multi-page routing (React Router)',
      'Validated forms (React Hook Form)',
      'Node.js REST backend',
      'MongoDB data persistence',
    ],
    github: 'https://github.com/nahid864',
    live: '#',
  },
  {
    id: 8,
    title: 'Beanova',
    category: 'Front-end',
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
]

const filters = ['All', 'Full-stack', 'Laravel', 'Front-end']

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

function BrowserMockup({ image, title, emoji = '💻', tech, accent = '#FF5A1F' }) {
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
          azmolnahid.dev/{title.toLowerCase().replace(/\s/g, '-')}
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

export default function Portfolio() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)
  const closeBtnRef = useRef(null)
  const firstFilterRun = useRef(true)

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

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
            <div
              key={p.id}
              className="reveal group cursor-pointer scene rounded-xl"
              onClick={() => setModal(p)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setModal(p)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View case study for ${p.title}`}
            >
              <TiltCard max={6} scale={1.015} className="relative overflow-hidden rounded-xl">
                <BrowserMockup
                  image={p.image}
                  title={p.title}
                  emoji={p.emoji}
                  tech={p.tech}
                  accent={p.accent}
                />
                {/* Status ribbon — actively-in-development projects */}
                {p.status === 'building' && (
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-brand-bg/90 border border-brand-orange/40 text-brand-orange text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                    In development
                  </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-orange/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 rounded-xl">
                  <div className="bg-white/20 rounded-full p-3">
                    <ExternalLink className="text-white" size={22} />
                  </div>
                  <p className="text-white font-semibold text-sm">View Details</p>
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
          ))}
        </div>
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
            className="modal-content bg-brand-card border border-brand-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
              <BrowserMockup
                image={modal.image}
                title={modal.title}
                emoji={modal.emoji}
                tech={modal.tech}
                accent={modal.accent}
              />
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
                <a
                  href={modal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs flex items-center gap-2"
                >
                  <Github size={14} /> GitHub
                </a>
                {modal.live && modal.live !== '#' ? (
                  <a
                    href={modal.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs flex items-center gap-2"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                ) : modal.status === 'building' ? (
                  <span className="text-brand-orange text-xs flex items-center gap-2 px-4 py-3">
                    <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
                    In active development — launching soon
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
