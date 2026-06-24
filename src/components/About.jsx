import { useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

const skills = [
  { label: 'React / JavaScript', pct: 90 },
  { label: 'WordPress', pct: 90 },
  { label: 'HTML / CSS / Bootstrap', pct: 95 },
  { label: 'PHP / Python', pct: 80 },
  { label: 'Node.js / MongoDB', pct: 80 },
]

const highlights = [
  'B.Sc in CSE — Daffodil International University (2023)',
  'Radio Engineer at Taurus International (Sep 2024 – Feb 2025)',
  'Graphic Design Intern — Zenana & 1972 Conscious (Jun–Oct 2025)',
  'English (Full Professional) · Bangla (Native)',
]

export default function About() {
  const sectionRef = useRef(null)
  const barsRef = useRef([])

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
          <div className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0">
              <img
                src="/assets/images/hero.jpg"
                alt="Azmol Huda Nahid"
                className="w-full object-cover rounded-2xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Experience badge */}
            <div className="absolute top-6 -right-4 lg:-right-8 bg-brand-orange text-white rounded-2xl px-5 py-4 shadow-2xl text-center">
              <p className="text-3xl font-extrabold leading-none">3+</p>
              <p className="text-xs font-medium mt-1 opacity-90">Years of<br />Experience</p>
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
                Hi, I'm <strong className="text-white">Azmol Huda Nahid</strong> — a full-stack web developer
                and founder of <strong className="text-brand-orange">NN Coders</strong>. I specialise in
                building modern, high-performance websites and web applications that genuinely
                help businesses grow.
              </p>
              <p>
                I'm energetic, detail-oriented, and I love turning complex problems into clean,
                elegant code. Whether it's a blazing-fast React app, a powerful WordPress site,
                or a robust Laravel back-end — I bring the same level of craft and commitment
                to every project.
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

            {/* CTA row */}
            <div className="reveal flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-sm"
              >
                Hire Me Now
              </button>
              <a
                href="mailto:azmolhuda777@gmail.com"
                className="btn-outline text-sm"
              >
                azmolhuda777@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
