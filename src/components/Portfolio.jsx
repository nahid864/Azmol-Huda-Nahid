import { useEffect, useRef, useState } from 'react'
import { X, ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Laravel Admin Panel',
    category: 'Laravel',
    image: '/assets/images/admin-panel.jpg',
    tech: ['Laravel', 'Blade', 'Bootstrap', 'MySQL'],
    problem: 'An e-commerce business needed a full-featured backend admin dashboard to manage products, inventory, orders, customers and ads — all from one place.',
    solution: 'Built a complete Laravel admin panel with 11 screens covering Dashboard, User Management, Products, Inventory, Customers, Orders, Order History, Ads Management and Activity Logs. Implemented role-based access control and real-time inventory tracking.',
    result: 'Fully functional e-commerce administration system with CRUD operations, role-based access, real-time inventory and activity logging across 11 dedicated screens.',
    github: 'https://github.com/nahid864',
    live: '#',
  },
  {
    id: 2,
    title: 'TinyOne',
    category: 'Front-end',
    image: '/assets/images/tinyone.png',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    problem: 'Needed a clean, minimal app-showcase landing page with fast load time and mobile-first layout.',
    solution: 'Crafted a hand-coded HTML/CSS/JS site with Bootstrap grid, custom animations and zero dependencies beyond Bootstrap.',
    result: 'Lighthouse performance score 95+, loads in under 1.5 s on mobile.',
    github: 'https://github.com/nahid864',
    live: 'https://nahid864.github.io/tinyone',
  },
  {
    id: 3,
    title: 'e-school',
    category: 'Front-end',
    image: '/assets/images/e-school.png',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    problem: 'Educational platform needed a clear, accessible UI to browse courses and enrol online.',
    solution: 'Designed a multi-section landing page with course cards, instructor profiles, stats counters and a registration form.',
    result: 'Intuitive layout with 1500+ topics, 1800+ students stats display — improved enrolment conversion for the client.',
    github: 'https://github.com/nahid864',
    live: 'https://nahid864.github.io/E-school',
  },
  {
    id: 4,
    title: 'Minimo',
    category: 'Front-end',
    image: '/assets/images/minimo.png',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    problem: 'A lifestyle blog needed a minimal, elegant design that puts photography and content front and centre.',
    solution: 'Created a clean masonry-style blog layout with full-width hero images, grid posts and a minimal newsletter section.',
    result: 'Sleek, brand-consistent presentation with excellent readability that resonated perfectly with the target audience.',
    github: 'https://github.com/nahid864',
    live: 'https://nahid864.github.io/Minimo',
  },
]

const filters = ['All', 'Laravel', 'Front-end']

function BrowserMockup({ image, title }) {
  return (
    <div className="rounded-xl overflow-hidden border border-brand-border bg-brand-card shadow-lg">
      {/* Browser chrome */}
      <div className="bg-[#1e1e1e] px-3 py-2 flex items-center gap-2 border-b border-brand-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 mx-3 bg-[#2a2a2a] rounded-md px-3 py-1 text-[10px] text-brand-gray truncate">
          nn-coders.dev/{title.toLowerCase().replace(/\s/g, '-')}
        </div>
      </div>
      {/* Screenshot area */}
      <div className="relative w-full" style={{ paddingBottom: '62.5%' }}>
        <img
          src={image}
          alt={`${title} project screenshot`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-brand-card to-[#1a1a1a]"
          style={{ display: 'none' }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">💻</div>
            <p className="text-brand-gray text-xs">{title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modal])

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 md:py-28 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="section-subheading">My Work</p>
          <h2 className="section-heading">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-brand-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
            A selection of projects I've built — click any card for full details.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 reveal">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === f
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                  : 'bg-brand-card border border-brand-border text-brand-gray hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="reveal group cursor-pointer"
              onClick={() => setModal(p)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <BrowserMockup image={p.image} title={p.title} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-orange/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 rounded-xl">
                  <div className="bg-white/20 rounded-full p-3">
                    <ExternalLink className="text-white" size={22} />
                  </div>
                  <p className="text-white font-semibold text-sm">View Details</p>
                </div>
              </div>
              <div className="mt-3 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold group-hover:text-brand-orange transition-colors">
                    {p.title}
                  </h3>
                  <span className="text-xs bg-brand-orange/15 text-brand-orange border border-brand-orange/30 rounded-full px-3 py-0.5">
                    {p.category}
                  </span>
                </div>
                <p className="text-brand-gray text-xs mt-1 line-clamp-1">{p.tech.slice(0, 4).join(' · ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="modal-content bg-brand-card border border-brand-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-border">
              <div>
                <h3 className="text-white font-bold text-lg">{modal.title}</h3>
                <span className="text-brand-orange text-xs font-medium">{modal.category}</span>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-brand-gray hover:text-white transition"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Screenshot */}
            <div className="p-5 border-b border-brand-border">
              <BrowserMockup image={modal.image} title={modal.title} />
            </div>

            {/* Details */}
            <div className="p-5 space-y-5">
              {[
                { label: 'Tech Stack', content: modal.tech.join(' · ') },
                { label: 'Problem', content: modal.problem },
                { label: 'Solution', content: modal.solution },
                { label: 'Result', content: modal.result },
              ].map(({ label, content }) => (
                <div key={label}>
                  <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-brand-gray text-sm leading-relaxed">{content}</p>
                </div>
              ))}

              {/* Links */}
              <div className="flex gap-3 pt-2">
                <a
                  href={modal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs flex items-center gap-2"
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href={modal.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs flex items-center gap-2"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
