import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
          observer.unobserve(entries[0].target)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const field = (key, label, type = 'text', rows) => (
    <div>
      <label className="text-brand-gray text-xs font-medium block mb-1.5">
        {label} <span className="text-brand-orange">*</span>
      </label>
      {rows ? (
        <textarea
          rows={rows}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={`Your ${label.toLowerCase()}…`}
          className={`w-full bg-brand-bg border rounded-lg px-4 py-3 text-white text-sm placeholder-brand-gray/40 outline-none focus:border-brand-orange transition-colors resize-none ${
            errors[key] ? 'border-red-500' : 'border-brand-border'
          }`}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={`Your ${label.toLowerCase()}…`}
          className={`w-full bg-brand-bg border rounded-lg px-4 py-3 text-white text-sm placeholder-brand-gray/40 outline-none focus:border-brand-orange transition-colors ${
            errors[key] ? 'border-red-500' : 'border-brand-border'
          }`}
        />
      )}
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="section-subheading">Get in Touch</p>
          <h2 className="section-heading">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            Have a project in mind? Fill in the form or reach out directly — I typically reply within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            <div className="reveal space-y-4">
              {[
                { icon: <Mail size={18} />, label: 'Email', value: 'azmolhuda777@gmail.com', href: 'mailto:azmolhuda777@gmail.com' },
                { icon: <Phone size={18} />, label: 'Phone', value: '+880 1757-853828', href: 'tel:+8801757853828' },
                { icon: <MapPin size={18} />, label: 'Location', value: 'Dhaka, Bangladesh', href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 bg-brand-card border border-brand-border rounded-xl px-5 py-4 hover:border-brand-orange/40 transition">
                  <div className="w-10 h-10 bg-brand-orange/15 rounded-lg flex items-center justify-center text-brand-orange shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-brand-gray text-xs">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm font-medium hover:text-brand-orange transition">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="reveal flex gap-3">
              <a
                href="https://github.com/nahid864"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-brand-gray hover:text-brand-orange hover:border-brand-orange transition text-sm font-medium"
                aria-label="GitHub"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/azmol-huda-nahid-abb4621ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-brand-gray hover:text-brand-orange hover:border-brand-orange transition text-sm font-medium"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>

            {/* Quick availability */}
            <div className="reveal bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-sm font-semibold">Currently Available</span>
              </div>
              <p className="text-brand-gray text-xs leading-relaxed">
                I'm open to new freelance projects and collaborations. Response time is typically
                within 12–24 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal bg-brand-card border border-brand-border rounded-2xl p-6 md:p-8">
            {sent ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                <p className="text-brand-gray text-sm">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button onClick={() => setSent(false)} className="btn-outline text-sm mt-2">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {field('name', 'Name')}
                  {field('email', 'Email', 'email')}
                </div>
                {field('subject', 'Subject')}
                {field('message', 'Message', 'text', 5)}

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
