import { useEffect, useRef } from 'react'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  const imgRef = useRef(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const t = setTimeout(() => el.classList.add('visible'), 200)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,90,31,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,90,31,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Geometric decorative elements */}
      <div className="absolute top-20 right-[5%] w-72 h-72 md:w-96 md:h-96 pointer-events-none">
        <div className="geo-line absolute inset-0 rotate-12" style={{ border: '1px solid rgba(255,90,31,0.12)', borderRadius: '8px' }} />
        <div className="geo-line absolute inset-4 rotate-6" style={{ border: '1px solid rgba(255,90,31,0.08)', borderRadius: '8px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-brand-orange rounded-full shadow-[0_0_30px_10px_rgba(255,90,31,0.15)]" />
      </div>

      {/* Floating dots */}
      <div className="absolute top-40 left-10 w-2 h-2 bg-brand-orange rounded-full opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-brand-orange rounded-full opacity-30 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase reveal visible">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              Hello, I am
            </div>

            {/* Name */}
            <div className="reveal visible" style={{ transitionDelay: '0.1s' }}>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
                Azmol Huda
                <br />
                <span className="text-gradient">Nahid</span>
              </h1>
            </div>

            {/* Role */}
            <div className="reveal visible" style={{ transitionDelay: '0.2s' }}>
              <p className="text-lg sm:text-xl font-semibold text-brand-gray">
                Web Developer &amp; Programmer
              </p>
              <p className="text-brand-gray/70 mt-1 text-sm sm:text-base">
                NN Coders — WordPress, React &amp; Custom Web Solutions
              </p>
            </div>

            {/* Description */}
            <div className="reveal visible" style={{ transitionDelay: '0.3s' }}>
              <p className="text-brand-gray text-sm sm:text-base leading-relaxed max-w-lg">
                I craft high-performance websites and web apps that look great and
                drive real business results. From pixel-perfect front-ends to
                rock-solid back-ends — I've got you covered.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 reveal visible" style={{ transitionDelay: '0.4s' }}>
              <button onClick={() => scrollTo('portfolio')} className="btn-primary flex items-center gap-2">
                View My Work
                <ArrowDown size={16} />
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-outline flex items-center gap-2">
                Hire Me
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 pt-2 reveal visible" style={{ transitionDelay: '0.5s' }}>
              <a
                href="https://github.com/nahid864"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/azmol-huda-nahid-abb4621ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:azmolhuda777@gmail.com"
                className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <span className="text-brand-border text-xs ml-2">Follow Me</span>
            </div>
          </div>

          {/* Photo side */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            {/* Outer glow ring */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96">
              {/* Rotating border */}
              <div
                className="absolute -inset-3 rounded-full opacity-30"
                style={{
                  background: 'conic-gradient(from 0deg, #FF5A1F, transparent, #FF5A1F)',
                  animation: 'spin 8s linear infinite',
                }}
              />
              {/* Static glow */}
              <div className="absolute -inset-1 rounded-full bg-brand-orange/20 blur-xl" />

              {/* Hexagonal-ish container with clipping */}
              <div
                ref={imgRef}
                className="reveal relative w-full h-full rounded-full overflow-hidden border-4 border-brand-orange/40 shadow-2xl shadow-brand-orange/20"
                style={{ transitionDelay: '0.2s' }}
              >
                <img
                  src="/assets/images/hero.jpg"
                  alt="Azmol Huda Nahid — Web Developer & Programmer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-4 -left-4 bg-brand-card border border-brand-orange/40 rounded-xl px-4 py-3 shadow-xl">
                <p className="text-2xl font-extrabold text-white leading-none">3+</p>
                <p className="text-[10px] text-brand-gray uppercase tracking-wider mt-0.5">Years Exp.</p>
              </div>

              {/* Floating tech badge */}
              <div className="absolute -top-4 -right-4 bg-brand-orange text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xl">
                ⚡ React &amp; WP
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gray/50 bounce-slow">
          <div className="w-6 h-10 rounded-full border-2 border-brand-gray/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-brand-orange rounded-full animate-bounce" />
          </div>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
