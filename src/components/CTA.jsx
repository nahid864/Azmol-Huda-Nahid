import { useEffect, useRef } from 'react'
import { Rocket } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ref.current?.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 md:py-24 bg-brand-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-brand-card border border-brand-orange/20 rounded-3xl p-10 md:p-16 shadow-2xl shadow-brand-orange/10 hover:border-brand-orange/40 transition-colors duration-500">
          <div className="reveal inline-flex items-center gap-2 bg-brand-orange/15 text-brand-orange text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            Open for Work
          </div>

          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Available for <span className="text-gradient">Freelancing</span>
          </h2>

          <p className="reveal text-brand-gray text-base sm:text-lg max-w-xl mx-auto mb-8">
            Let's build something great together. Whether it's a new project, a redesign,
            or fixing what's broken — I'm ready.
          </p>

          <div className="reveal flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
            >
              <Rocket size={18} />
              Hire Me Now
            </button>
            <a
              href="mailto:azmolhuda777@gmail.com"
              className="btn-outline text-base px-8 py-4"
            >
              azmolhuda777@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
