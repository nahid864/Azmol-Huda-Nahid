import { Github, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'

const year = new Date().getFullYear()

const links = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-brand-card border-t border-brand-border pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-brand-border">
          {/* Brand */}
          <div className="space-y-4">
            <button onClick={() => scrollTo('hero')} className="text-2xl font-bold">
              <span className="text-white">N</span>
              <span className="text-brand-orange">N</span>
              <span className="text-white"> Coders</span>
            </button>
            <p className="text-brand-gray text-sm leading-relaxed max-w-xs">
              We build websites that work — and grow your business. Based in Dhaka, serving
              clients worldwide.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              <a
                href="https://github.com/nahid864"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/azmol-huda-nahid-abb4621ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:azmolhuda777@gmail.com"
                className="w-9 h-9 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {links.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-brand-gray text-sm hover:text-brand-orange transition flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-brand-orange transition-all duration-200 rounded-full" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: <Mail size={14} />, text: 'azmolhuda777@gmail.com', href: 'mailto:azmolhuda777@gmail.com' },
                { icon: <Phone size={14} />, text: '+880 1757-853828', href: 'tel:+8801757853828' },
                { icon: <MapPin size={14} />, text: 'Dhaka, Bangladesh', href: null },
              ].map(({ icon, text, href }) => (
                <li key={text} className="flex items-center gap-2 text-brand-gray text-sm">
                  <span className="text-brand-orange shrink-0">{icon}</span>
                  {href ? (
                    <a href={href} className="hover:text-brand-orange transition truncate">{text}</a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-brand-gray text-xs">
          <p>
            © {year} <span className="text-brand-orange font-semibold">NN Coders</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={12} className="text-brand-orange fill-brand-orange" /> by Azmol Huda Nahid
          </p>
        </div>
      </div>
    </footer>
  )
}
