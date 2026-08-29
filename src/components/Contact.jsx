import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { CONTACT_EMAIL, MAIL_COMPOSE_URL, GITHUB_URL, LINKEDIN_URL } from '../config'

/**
 * Posts submissions to a real inbox (Formspree, tied to azmolhudanahid@gmail.com).
 * The hard-coded fallback keeps the form working on the deployed site, where
 * .env is gitignored and never reaches the CI build — the endpoint is public by
 * design, so it's safe to ship. Override it via VITE_FORM_ENDPOINT in .env.
 * If a POST ever fails, the form falls back to the visitor's mail client.
 */
const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/xnpqqwjb'

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

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

  // Opens Gmail's web compose in a new tab with the fields pre-filled — works
  // even when the visitor has no mailto: handler wired up.
  const openMailClient = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    const url = `${MAIL_COMPOSE_URL}&su=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSendError('')
    setSending(true)

    // No endpoint configured yet → fall back to the visitor's mail client so
    // the message still reaches a real inbox instead of vanishing.
    if (!FORM_ENDPOINT) {
      openMailClient()
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      return
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _replyto: form.email,
        }),
      })

      if (!res.ok) throw new Error(`Form service returned ${res.status}`)

      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      // Never silently swallow it — tell the visitor and give them a way out.
      setSendError(
        "Couldn't send through the form. Click below to email me directly instead."
      )
    } finally {
      setSending(false)
    }
  }

  const field = (key, label, type = 'text', rows) => {
    const id = `contact-${key}`
    const errorId = `${id}-error`
    const hasError = Boolean(errors[key])

    // Shared wiring so assistive tech gets the label, the required state and
    // the error message — not just a styled box.
    const common = {
      id,
      value: form[key],
      onChange: (e) => setForm({ ...form, [key]: e.target.value }),
      placeholder: `Your ${label.toLowerCase()}…`,
      required: true,
      'aria-required': true,
      'aria-invalid': hasError,
      'aria-describedby': hasError ? errorId : undefined,
      className: `w-full bg-brand-bg border rounded-lg px-4 py-3 text-white text-sm placeholder-brand-gray/40 outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 transition-colors ${
        hasError ? 'border-red-500' : 'border-brand-border'
      }`,
    }

    return (
      <div>
        <label htmlFor={id} className="text-brand-gray text-xs font-medium block mb-1.5">
          {label}{' '}
          <span className="text-brand-orange" aria-hidden="true">
            *
          </span>
        </label>
        {rows ? (
          <textarea rows={rows} {...common} className={`${common.className} resize-none`} />
        ) : (
          <input type={type} {...common} />
        )}
        {hasError && (
          <p id={errorId} role="alert" className="text-red-400 text-xs mt-1">
            {errors[key]}
          </p>
        )}
      </div>
    )
  }

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
                { icon: <Mail size={18} />, label: 'Email', value: CONTACT_EMAIL, href: MAIL_COMPOSE_URL, external: true },
                { icon: <Phone size={18} />, label: 'Phone', value: '+880 1757-853828', href: 'tel:+8801757853828' },
                { icon: <MapPin size={18} />, label: 'Location', value: 'Dhaka, Bangladesh', href: null },
              ].map(({ icon, label, value, href, external }) => (
                <div key={label} className="flex items-center gap-4 bg-brand-card border border-brand-border rounded-xl px-5 py-4 hover:border-brand-orange/40 transition">
                  <div className="w-10 h-10 bg-brand-orange/15 rounded-lg flex items-center justify-center text-brand-orange shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-brand-gray text-xs">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-white text-sm font-medium hover:text-brand-orange transition"
                      >
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
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-brand-gray hover:text-brand-orange hover:border-brand-orange transition text-sm font-medium"
                aria-label="GitHub"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={LINKEDIN_URL}
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

                {sendError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                  >
                    <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                    <div className="space-y-2">
                      <p className="text-red-300 text-xs leading-relaxed">{sendError}</p>
                      <button
                        type="button"
                        onClick={openMailClient}
                        className="text-brand-orange text-xs font-semibold underline underline-offset-2 hover:text-white transition-colors"
                      >
                        Email me directly →
                      </button>
                    </div>
                  </div>
                )}

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
