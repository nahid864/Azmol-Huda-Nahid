import { useEffect, useRef } from 'react'
import { Bot, Workflow, Sparkles, Search, ArrowRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useTilt'

/**
 * Levels here mirror the skills report exactly — including the honest
 * "Building now" framing for automation workflows. Overclaiming an emerging
 * skill is the fastest way to lose a technical interviewer's trust.
 */
const aiSkills = [
  {
    icon: <Bot size={22} />,
    title: 'ChatGPT · Claude · Gemini',
    level: 'Advanced',
    tone: 'strong',
    blurb: 'Daily driver for coding, research & delivery.',
    detail:
      'I use frontier LLMs every single day — pair-programming, code review, debugging, research and drafting. Not occasional experimentation: it is a core part of how I ship faster than I could alone.',
  },
  {
    icon: <Workflow size={22} />,
    title: 'AI Automation Workflows',
    level: 'Building now',
    tone: 'active',
    blurb: 'Python scripts & n8n flows, API-triggered or scheduled.',
    detail:
      'Actively building automation that chains AI APIs with Python scripting and n8n — content pipelines, scheduled jobs and API-triggered workflows that take repetitive manual work off a team\'s plate.',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Prompt Engineering',
    level: 'Intermediate',
    tone: 'mid',
    blurb: 'Practical, applied to real dev & content work.',
    detail:
      'Structured prompting, context design and iterative refinement — applied to production development tasks and content generation, not theory from a course.',
  },
  {
    icon: <Search size={22} />,
    title: 'AI Research Tooling',
    level: 'Working knowledge',
    tone: 'mid',
    blurb: 'Perplexity & AI-assisted technical research.',
    detail:
      'Using AI research tools to move quickly through unfamiliar documentation, evaluate libraries and validate technical approaches before committing to them.',
  },
]

const toneStyles = {
  strong: 'bg-brand-orange text-white',
  active: 'bg-green-500/20 text-green-400 border border-green-500/40',
  mid: 'bg-brand-orange/15 text-brand-orange border border-brand-orange/30',
}

export default function AIAutomation() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 90)
          })
          observer.unobserve(entries[0].target)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-brand-bg overflow-hidden"
    >
      {/* Ambient depth */}
      <div
        className="orb orb-drift"
        style={{
          width: 420,
          height: 420,
          background: 'rgba(255,90,31,0.16)',
          top: '-10%',
          right: '-6%',
        }}
      />
      <div
        className="orb orb-drift"
        style={{
          width: 340,
          height: 340,
          background: 'rgba(120,90,255,0.12)',
          bottom: '-12%',
          left: '-4%',
          animationDelay: '4s',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-[11px] font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
            My Edge
          </div>
          <h2 className="section-heading">
            AI &amp; <span className="text-shimmer">Automation</span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Most developers still build everything by hand. I pair full-stack engineering with
            daily AI fluency — so you get the same quality, shipped considerably faster, with
            the repetitive parts automated away.
          </p>
        </div>

        {/* Skill cards — flip on hover, but only when motion is welcome.
            Under reduced-motion the detail is rendered inline instead, so the
            content is never trapped behind an animation that won't play. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {aiSkills.map((s) =>
            reduced ? (
              <div
                key={s.title}
                className="reveal bg-brand-card border border-brand-border rounded-2xl p-6 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/12 text-brand-orange flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="text-white font-semibold text-[15px] leading-snug mb-2">
                  {s.title}
                </h3>
                <p className="text-brand-gray text-xs leading-relaxed mb-4 flex-1">{s.detail}</p>
                <span
                  className={`self-start text-[10px] font-bold px-2.5 py-1 rounded-md ${toneStyles[s.tone]}`}
                >
                  {s.level}
                </span>
              </div>
            ) : (
              <div
                key={s.title}
                className="reveal flip-scene h-[230px] rounded-2xl"
                tabIndex={0}
                /* The CSS flips on :focus-within, so focusing IS the activation —
                   it's a disclosure, not a button. group+label keeps the whole
                   thing announced as one unit. */
                role="group"
                aria-label={`${s.title} — ${s.level}. ${s.detail}`}
              >
                <div className="flip-inner">
                  {/* Front */}
                  <div className="flip-face bg-brand-card border border-brand-border rounded-2xl p-6 justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-brand-orange/12 text-brand-orange flex items-center justify-center mb-4">
                        {s.icon}
                      </div>
                      <h3 className="text-white font-semibold text-[15px] leading-snug mb-2">
                        {s.title}
                      </h3>
                      <p className="text-brand-gray text-xs leading-relaxed">{s.blurb}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${toneStyles[s.tone]}`}
                      >
                        {s.level}
                      </span>
                      <span className="text-brand-gray/40 text-[10px] uppercase tracking-wider">
                        Hover
                      </span>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="flip-face flip-back bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl p-6 justify-center">
                    <p className="text-white text-xs leading-relaxed font-medium">{s.detail}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Positioning strip */}
        <div className="reveal bg-brand-card border border-brand-border rounded-2xl p-6 md:p-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-2">
              Want repetitive work taken off your plate?
            </h3>
            <p className="text-brand-gray text-sm leading-relaxed">
              Reporting, content pipelines, data entry, scheduled syncs — if it happens the same
              way every week, it can usually be automated. Tell me the process and I'll tell you
              honestly whether it's worth automating.
            </p>
          </div>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-primary text-sm flex items-center justify-center gap-2 w-full md:w-auto"
          >
            Let's Talk <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  )
}
