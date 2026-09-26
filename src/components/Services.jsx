import { useEffect, useRef } from 'react'
import TiltCard from './TiltCard'

/* Four things I have shipped to production and can show you the code for.
   The long list this replaced advertised work with nothing to point at. */
const services = [
  {
    icon: '🤖',
    title: 'AI automation that a business can trust',
    desc: 'LLM workflows grounded in your own data, with a human approval gate, escalation when the answer is not known, and tests around the whole thing. Python and FastAPI.',
    proof: { label: 'See Nuigent', href: '#/work/nuigent' },
  },
  {
    icon: '🛒',
    title: 'E-commerce and admin platforms',
    desc: 'Laravel storefronts and back offices: catalogue, stock that survives a race, courier integration, reports, and role-based access down to the page.',
    proof: { label: 'See Everyday Crackers', href: '#/work/everyday-crackers' },
  },
  {
    icon: '🔗',
    title: 'Integrations between systems that were never meant to talk',
    desc: 'REST APIs, webhooks with real signature checks, Google Sheets pipelines, and retry queues so a sale is never lost when one side is down.',
    proof: { label: 'See the stock sync', href: '#/work/everyday-crackers' },
  },
  {
    icon: '🏢',
    title: 'Multi-tenant SaaS',
    desc: 'One install, many customers, with tenant isolation enforced by the framework rather than by remembering, and fixed roles proved by a test that walks every route.',
    proof: { label: 'See Savoria', href: '#/work/savoria' },
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="section-subheading">What I Offer</p>
          <h2 className="section-heading">
            Services That <span className="text-gradient">Deliver Results</span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Four things I have taken to production. Each one links to the project
            where you can see it working.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div key={s.title} className="reveal scene">
              <TiltCard
                max={10}
                scale={1.03}
                className="card border-glow group cursor-default h-full"
              >
                <div className="layer-2 text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                  {s.icon}
                </div>
                <h3 className="layer-1 text-white font-semibold text-base mb-2 group-hover:text-brand-orange transition-colors">
                  {s.title}
                </h3>
                <p className="text-brand-gray text-xs leading-relaxed">{s.desc}</p>
                <a
                  href={s.proof.href}
                  className="relative z-10 inline-flex items-center gap-1 text-brand-orange text-xs font-semibold mt-4 hover:gap-2 transition-all"
                >
                  {s.proof.label} →
                </a>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
