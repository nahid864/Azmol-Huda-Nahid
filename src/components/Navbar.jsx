import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['About', 'Services', 'Portfolio', 'Skills', 'Testimonials', 'Blog', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
    setActive(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-blur ${
        scrolled ? 'bg-[#0D0D0D]/90 border-b border-white/5 shadow-xl' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-1 text-xl md:text-2xl font-bold tracking-tight">
          <span className="text-white">N</span>
          <span className="text-brand-orange">N</span>
          <span className="text-white"> Coders</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className={`transition-colors duration-200 hover:text-brand-orange ${
                  active === l ? 'text-brand-orange' : 'text-brand-gray'
                }`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex">
          <button onClick={() => scrollTo('Contact')} className="btn-primary text-sm">
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden mobile-menu bg-brand-card border-b border-brand-border px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <li key={l}>
                <button
                  onClick={() => scrollTo(l)}
                  className="w-full text-left py-2.5 px-3 text-brand-gray hover:text-brand-orange hover:bg-white/5 rounded-lg transition text-sm font-medium"
                >
                  {l}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button onClick={() => scrollTo('Contact')} className="btn-primary w-full text-sm">
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
