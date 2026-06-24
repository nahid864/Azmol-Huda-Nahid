import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'James Carter',
    role: 'CEO, BrightStart Agency',
    avatar: 'JC',
    color: '#3B82F6',
    stars: 5,
    quote:
      'Azmol delivered our React web app ahead of schedule and the code quality was exceptional. He communicated clearly throughout and genuinely cared about the end result. Highly recommended!',
  },
  {
    name: 'Sarah Thompson',
    role: 'Founder, EcoShop Online',
    avatar: 'ST',
    color: '#10B981',
    stars: 5,
    quote:
      'Our WooCommerce store runs so much faster after Azmol optimised it. He added custom features and fixed SEO issues I didn\'t even know existed. Sales have gone up noticeably since the launch.',
  },
  {
    name: 'Riya Patel',
    role: 'Marketing Manager, TechNova',
    avatar: 'RP',
    color: '#8B5CF6',
    stars: 5,
    quote:
      'Professional, responsive and incredibly skilled. NN Coders built our company landing page and the result was stunning. The animations and mobile responsiveness are top-notch.',
  },
  {
    name: 'David Müller',
    role: 'Product Owner, SwiftSaaS',
    avatar: 'DM',
    color: '#F59E0B',
    stars: 5,
    quote:
      'Azmol helped us build a complex dashboard with Firebase and MongoDB integration. His problem-solving ability is fantastic — every issue got resolved quickly and cleanly.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [auto])

  const go = (dir) => {
    setAuto(false)
    setIdx((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const t = testimonials[idx]

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-28 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="section-subheading">Client Feedback</p>
          <h2 className="section-heading">
            What Clients <span className="text-gradient">Say</span>
          </h2>
        </div>

        {/* Card */}
        <div className="reveal relative bg-brand-card border border-brand-border rounded-2xl p-8 md:p-12 text-center shadow-2xl">
          {/* Quote mark */}
          <div className="text-6xl text-brand-orange/20 font-serif absolute top-6 left-8 leading-none select-none">
            "
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star key={i} size={16} className="text-brand-orange fill-brand-orange" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-brand-gray text-base sm:text-lg leading-relaxed italic mb-8 relative z-10">
            "{t.quote}"
          </blockquote>

          {/* Avatar + info */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{ backgroundColor: t.color }}
            >
              {t.avatar}
            </div>
            <p className="text-white font-semibold">{t.name}</p>
            <p className="text-brand-gray text-sm">{t.role}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8 reveal">
          <button
            onClick={() => go(-1)}
            className="w-10 h-10 rounded-full bg-brand-card border border-brand-border text-brand-gray hover:text-brand-orange hover:border-brand-orange transition flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAuto(false); setIdx(i) }}
                className={`rounded-full transition-all duration-300 ${
                  i === idx ? 'w-6 h-2 bg-brand-orange' : 'w-2 h-2 bg-brand-border hover:bg-brand-gray'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-10 h-10 rounded-full bg-brand-card border border-brand-border text-brand-gray hover:text-brand-orange hover:border-brand-orange transition flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
