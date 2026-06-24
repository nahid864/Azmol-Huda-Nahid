import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 40, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

function Counter({ target, suffix, started }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-brand-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="reveal space-y-1">
              <p className="text-white text-4xl sm:text-5xl font-extrabold">
                <Counter target={s.value} suffix={s.suffix} started={started} />
              </p>
              <p className="text-white/80 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
