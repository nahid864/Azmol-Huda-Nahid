import { useEffect, useRef } from 'react'
import { Bot, Workflow, Sparkles, Search, ArrowRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useTilt'

/* Every card names something that exists in Nuigent and can be opened on the
   case-study page. "I use ChatGPT daily" is what the old version claimed, and
   in 2026 that is table stakes, not an edge. */
const aiSkills = [
  {
    icon: <Bot size={22} />,
    title: 'Grounded answers, not guesses',
    level: 'In production',
    tone: 'strong',
    blurb: 'Replies built from real prices, stock and customer history.',
    detail:
      'The agent answers from the shop\'s own product, price and inventory data. When the answer is not in that data, or the question is sensitive, it escalates to a human instead of inventing something.',
  },
  {
    icon: <Workflow size={22} />,
    title: 'A human gate on every send',
    level: 'In production',
    tone: 'strong',
    blurb: 'Approve, edit or reject before anything reaches a customer.',
    detail:
      'Nothing goes out unreviewed unless the owner switches a channel to auto. Approve, edit and reject run through one shared service, and the edits feed back in so the drafts improve.',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Six models with a judge',
    level: 'In production',
    tone: 'strong',
    blurb: 'Five Groq models plus Gemini, merged by a judge model.',
    detail:
      'Answers are generated in parallel and merged, so one model being rate-limited or wrong does not take the shop offline. Rate-limit retries honour the provider\'s own hint rather than a fixed sleep.',
  },
  {
    icon: <Search size={22} />,
    title: 'Tested like software, not a demo',
    level: '1,089 tests',
    tone: 'active',
    blurb: 'Tenant isolation proved by a test that reads the source.',
    detail:
      'An AST test parses the codebase and fails the build if any scoped query is missing its business_id. Per-business credentials are encrypted in the database rather than shared in one .env.',
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
            Plenty of people can call an LLM API. The hard part is making one safe
            enough to answer your customers unsupervised. Everything below runs in
            Nuigent, the agent handling the front desk of my own shop, 24/7.
          </p>
          <a
            href="#/work/nuigent"
            className="inline-flex items-center gap-1.5 text-brand-orange text-sm font-semibold mt-4 hover:gap-2.5 transition-all"
          >
            Read the Nuigent case study <ArrowRight size={14} />
          </a>
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
