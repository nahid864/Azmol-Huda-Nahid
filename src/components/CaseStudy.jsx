import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle2, XCircle, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { CASE_STUDIES, CASE_STUDY_ORDER } from '../data/caseStudies'

const STATUS = {
  live: { label: 'Live', tone: 'border-emerald-400/40 text-emerald-300', dot: 'bg-emerald-400' },
  building: { label: 'Live · in progress', tone: 'border-brand-orange/40 text-brand-orange', dot: 'bg-brand-orange animate-pulse' },
  built: { label: 'Built · not yet deployed', tone: 'border-sky-400/40 text-sky-300', dot: 'bg-sky-400' },
}

function Lightbox({ shots, index, onClose, onGo }) {
  const shot = shots[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onGo(index + 1)
      if (e.key === 'ArrowLeft') onGo(index - 1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, onGo])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-white/10">
        <p className="text-brand-gray text-xs sm:text-sm leading-snug">
          <span className="text-brand-orange font-semibold tabular-nums mr-2">
            {index + 1} / {shots.length}
          </span>
          {shot.caption}
        </p>
        <button onClick={onClose} aria-label="Close viewer" className="shrink-0 w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
          <X size={18} />
        </button>
      </div>
      <div className="relative flex-1 min-h-0" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="h-full overflow-y-auto flex justify-center px-2 sm:px-16 py-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <img src={shot.src} alt={shot.caption} className={`max-w-full rounded-lg shadow-2xl ${shot.tall ? 'h-auto self-start' : 'max-h-full object-contain self-center'}`} />
        </div>
        {shots.length > 1 &&
          [-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => onGo(index + d)}
              aria-label={d < 0 ? 'Previous screenshot' : 'Next screenshot'}
              className={`absolute top-1/2 -translate-y-1/2 ${d < 0 ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} w-10 h-10 rounded-full bg-black/70 hover:bg-brand-orange text-white flex items-center justify-center`}
            >
              {d < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          ))}
      </div>
    </div>
  )
}

function ShotGrid({ shots, onOpen, cols = 'sm:grid-cols-2' }) {
  return (
    <div className={`grid gap-4 ${cols}`}>
      {shots.map((s, i) => (
        <figure key={s.src} className="group">
          <button
            onClick={() => onOpen(shots, i)}
            className="relative block w-full overflow-hidden rounded-xl border border-brand-border bg-brand-card aspect-[16/10] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label={`Enlarge: ${s.caption}`}
          >
            <img src={s.src} alt="" loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
            <span className="absolute bottom-2 right-2 bg-black/70 text-white rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition">
              <Maximize2 size={14} />
            </span>
            {s.tall && (
              <span className="absolute bottom-2 left-2 bg-black/70 text-white/80 text-[10px] rounded-md px-2 py-0.5">Full page</span>
            )}
          </button>
          <figcaption className="text-brand-gray text-xs leading-relaxed mt-2">{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

const CELL = {
  yes: <CheckCircle2 size={16} className="text-emerald-400 mx-auto" aria-label="Full access" />,
  no: <span className="text-brand-gray/40" aria-label="No access">—</span>,
  record: <span className="text-[10px] font-semibold text-amber-300 bg-amber-300/10 border border-amber-300/30 rounded-full px-2 py-0.5 whitespace-nowrap">Add only</span>,
  enter: <span className="text-[10px] font-semibold text-sky-300 bg-sky-300/10 border border-sky-300/30 rounded-full px-2 py-0.5 whitespace-nowrap">On entry</span>,
}

function AccessMatrix({ access }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-brand-border">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-brand-card text-brand-gray text-xs uppercase tracking-wider">
              <th className="text-left font-semibold px-4 py-3">Area</th>
              {access.roles.map((r) => (
                <th key={r} className="font-semibold px-3 py-3 text-center">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {access.rows.map(([area, cells]) => (
              <tr key={area} className="border-t border-brand-border">
                <td className="px-4 py-3 text-white/90">{area}</td>
                {cells.map((c, i) => (
                  <td key={i} className="px-3 py-3 text-center">{CELL[c]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs text-brand-gray">
        {Object.entries(access.legend).map(([k, v]) => (
          <span key={k} className="flex items-center gap-2">{CELL[k]} {v}</span>
        ))}
      </div>
    </div>
  )
}

function Roles({ roles, onOpen }) {
  const [active, setActive] = useState(roles[0].key)
  const role = roles.find((r) => r.key === active)
  return (
    <div>
      <div role="tablist" aria-label="Roles" className="flex flex-wrap gap-2 mb-6">
        {roles.map((r) => (
          <button
            key={r.key}
            role="tab"
            aria-selected={r.key === active}
            onClick={() => setActive(r.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              r.key === active
                ? 'bg-brand-orange text-white'
                : 'bg-brand-card border border-brand-border text-brand-gray hover:border-brand-orange hover:text-brand-orange'
            }`}
          >
            {r.name} <span className="opacity-70 tabular-nums">· {r.pages}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-8">
        <div className="space-y-5">
          <div>
            <h4 className="text-white text-xl font-semibold">{role.name}</h4>
            <p className="text-brand-gray text-xs mt-1">{role.pages} of 66 pages open to this role</p>
          </div>
          <p className="text-brand-gray text-sm leading-relaxed">{role.summary}</p>
          <ul className="space-y-2">
            {role.can.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-white/90"><CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />{c}</li>
            ))}
          </ul>
          <ul className="space-y-2">
            {role.cannot.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-brand-gray"><XCircle size={15} className="text-red-400/80 mt-0.5 shrink-0" />{c}</li>
            ))}
          </ul>
        </div>
        <ShotGrid key={role.key} shots={role.shots} onOpen={onOpen} />
      </div>
    </div>
  )
}

function Section({ eyebrow, title, intro, children }) {
  return (
    <section className="py-12 md:py-16 border-t border-brand-border">
      {eyebrow && <p className="section-subheading text-left">{eyebrow}</p>}
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      {intro && <p className="text-brand-gray text-sm md:text-base leading-relaxed mt-3 max-w-3xl">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function CaseStudy({ slug }) {
  const cs = CASE_STUDIES[slug]
  const [viewer, setViewer] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (cs) document.title = `${cs.title} · Case study | Azmol Huda Nahid`
    return () => {
      document.title = 'Azmol Huda Nahid | Full-Stack Web Developer'
    }
  }, [slug, cs])

  if (!cs) {
    return (
      <main id="main" className="min-h-screen pt-32 px-4 text-center">
        <p className="text-white text-lg">That project page does not exist.</p>
        <a href="#portfolio" className="btn-primary inline-flex mt-6">Back to all projects</a>
      </main>
    )
  }

  const open = (shots, index) => setViewer({ shots, index })
  const go = (i) => setViewer((v) => ({ ...v, index: (i + v.shots.length) % v.shots.length }))
  const status = STATUS[cs.status]
  const pos = CASE_STUDY_ORDER.indexOf(slug)
  const prev = CASE_STUDIES[CASE_STUDY_ORDER[(pos - 1 + CASE_STUDY_ORDER.length) % CASE_STUDY_ORDER.length]]
  const next = CASE_STUDIES[CASE_STUDY_ORDER[(pos + 1) % CASE_STUDY_ORDER.length]]

  return (
    <main id="main" className="bg-brand-bg min-h-screen pt-24 md:pt-28">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <a href="#portfolio" className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-orange text-sm transition">
          <ArrowLeft size={16} /> All projects
        </a>

        {/* Hero */}
        <header className="mt-6 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 border ${status.tone} text-[11px] font-semibold uppercase tracking-wider rounded-full px-3 py-1`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className="text-xs text-brand-orange bg-brand-orange/10 border border-brand-orange/30 rounded-full px-3 py-1">{cs.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-5">{cs.title}</h1>
            <p className="text-brand-gray text-base md:text-lg leading-relaxed mt-4">{cs.tagline}</p>
            <p className="text-white/60 text-xs mt-3">{cs.statusNote}</p>
            <dl className="mt-6 text-sm">
              <dt className="text-brand-gray/60 text-[10px] uppercase tracking-wider">My role</dt>
              <dd className="text-white font-medium mt-1">{cs.role}</dd>
            </dl>
            <div className="flex flex-wrap gap-3 mt-6">
              {cs.live && (
                <a href={cs.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-flex items-center gap-2">
                  <ExternalLink size={15} /> Visit live site
                </a>
              )}
              {cs.github && (
                <a href={cs.github} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm inline-flex items-center gap-2">
                  <Github size={15} /> Source code
                </a>
              )}
            </div>
          </div>
          <button onClick={() => open([cs.hero], 0)} className="block rounded-2xl overflow-hidden border border-brand-border shadow-2xl shadow-black/50 text-left" aria-label={`Enlarge: ${cs.hero.caption}`}>
            <div className="bg-[#1e1e1e] px-3 py-2 flex items-center gap-2 border-b border-brand-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="flex-1 mx-3 bg-[#2a2a2a] rounded-md px-3 py-1 text-[10px] text-brand-gray truncate">
                {cs.live ? cs.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : cs.slug}
              </span>
            </div>
            <img src={cs.hero.src} alt={cs.hero.caption} className="w-full aspect-[16/10] object-cover object-top" />
          </button>
        </header>

        {/* At a glance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {cs.glance.map((g) => (
            <div key={g.label} className="bg-brand-card border border-brand-border rounded-xl p-4">
              <p className="text-white text-xl md:text-2xl font-bold">{g.value}</p>
              <p className="text-brand-gray text-xs mt-1">{g.label}</p>
            </div>
          ))}
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mt-6">
          {cs.stack.map((t) => (
            <span key={t} className="text-[11px] font-medium text-brand-gray bg-brand-card border border-brand-border rounded-md px-2.5 py-1">{t}</span>
          ))}
        </div>

        {/* Story */}
        <Section eyebrow="Overview" title="The problem, and what I built">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['The problem', cs.problem],
              ['What I built', cs.built],
              ['The outcome', cs.outcome],
            ].map(([label, body]) => (
              <div key={label} className="bg-brand-card border border-brand-border rounded-xl p-5">
                <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
                <p className="text-brand-gray text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Roles (Savoria) */}
        {cs.roles && (
          <Section eyebrow="Access control" title={cs.rolesTitle} intro={cs.rolesIntro}>
            <AccessMatrix access={cs.access} />
            <div className="mt-12">
              <Roles roles={cs.roles} onOpen={open} />
            </div>
          </Section>
        )}

        {/* Feature sections */}
        {cs.sections.map((s) => (
          <Section key={s.id} eyebrow="Feature" title={s.title} intro={s.intro}>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mb-8">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-white/90 leading-relaxed">
                  <CheckCircle2 size={15} className="text-brand-orange mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <ShotGrid shots={s.shots} onOpen={open} cols={s.shots.length % 3 === 0 || s.shots.length > 4 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} />
          </Section>
        ))}

        {/* Decisions */}
        <Section eyebrow="Engineering" title="Decisions worth explaining">
          <div className="grid md:grid-cols-2 gap-4">
            {cs.decisions.map((d) => (
              <div key={d.title} className="bg-brand-card border border-brand-border rounded-xl p-5">
                <h3 className="text-white font-semibold">{d.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed mt-2">{d.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <p className="text-brand-gray/60 text-xs leading-relaxed border-t border-brand-border pt-6">{cs.note}</p>

        {/* Prev / next */}
        <nav aria-label="More projects" className="grid sm:grid-cols-2 gap-4 mt-10">
          <a href={`#/work/${prev.slug}`} className="group bg-brand-card border border-brand-border hover:border-brand-orange rounded-xl p-5 transition">
            <span className="text-brand-gray text-xs flex items-center gap-1"><ArrowLeft size={13} /> Previous project</span>
            <span className="text-white font-semibold group-hover:text-brand-orange block mt-1">{prev.title}</span>
          </a>
          <a href={`#/work/${next.slug}`} className="group bg-brand-card border border-brand-border hover:border-brand-orange rounded-xl p-5 transition sm:text-right">
            <span className="text-brand-gray text-xs flex items-center gap-1 sm:justify-end">Next project <ArrowRight size={13} /></span>
            <span className="text-white font-semibold group-hover:text-brand-orange block mt-1">{next.title}</span>
          </a>
        </nav>
      </article>

      {viewer && <Lightbox shots={viewer.shots} index={viewer.index} onClose={() => setViewer(null)} onGo={go} />}
    </main>
  )
}
