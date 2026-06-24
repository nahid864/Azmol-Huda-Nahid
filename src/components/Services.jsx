import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '🌐',
    title: 'WordPress Development',
    desc: 'Custom themes, plugins, WooCommerce stores & performance-tuned WordPress sites.',
  },
  {
    icon: '⚛️',
    title: 'React & Front-end Web Apps',
    desc: 'Blazing-fast, interactive SPAs and component-driven UIs built with React.',
  },
  {
    icon: '🖥️',
    title: 'Laravel / PHP Backend Development',
    desc: 'Scalable REST APIs, admin panels and database-driven apps with Laravel & PHP.',
  },
  {
    icon: '🔍',
    title: 'SEO Optimization & Maintenance',
    desc: 'Technical SEO audits, speed optimization and ongoing site health maintenance.',
  },
  {
    icon: '🤖',
    title: 'Social Media Automation',
    desc: 'Automated scheduling, engagement tools and workflow scripts for social platforms.',
  },
  {
    icon: '📣',
    title: 'Meta Business Setup & Ads',
    desc: 'Facebook & Instagram Business setup, pixel integration and ad campaign management.',
  },
  {
    icon: '🎨',
    title: 'Graphic Design',
    desc: 'Polished visuals, brand graphics, short-form video edits via Figma, Canva & CapCut.',
  },
  {
    icon: '💡',
    title: 'Problem Solving & Tech Consulting',
    desc: 'Architecture reviews, debugging, tech-stack advice and proof-of-concept builds.',
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
            From design to deployment — I handle the full stack so you can focus on growing
            your business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="reveal card group cursor-default"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-2 group-hover:text-brand-orange transition-colors">
                {s.title}
              </h3>
              <p className="text-brand-gray text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
