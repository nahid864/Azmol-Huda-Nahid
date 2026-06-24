import { useEffect, useRef } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'

const posts = [
  {
    id: 1,
    date: 'May 20, 2025',
    title: 'Why Every Business Needs a Custom Website (Not Just a Template)',
    excerpt:
      'Templates are a great starting point, but they hold your brand back. Here\'s why investing in a custom website pays off in the long run.',
    tag: 'Web Dev',
    color: '#FF5A1F',
    emoji: '🌐',
  },
  {
    id: 2,
    date: 'Apr 10, 2025',
    title: 'React vs WordPress: Which Should You Choose in 2025?',
    excerpt:
      'Both are powerful — but they solve different problems. I break down when to pick each and how to avoid the most common mistake.',
    tag: 'React',
    color: '#61DAFB',
    emoji: '⚛️',
  },
  {
    id: 3,
    date: 'Mar 3, 2025',
    title: '5 SEO Mistakes Killing Your Rankings (and How to Fix Them)',
    excerpt:
      'After auditing dozens of sites, the same errors keep showing up. Learn the quick wins that can lift your organic traffic fast.',
    tag: 'SEO',
    color: '#10B981',
    emoji: '🔍',
  },
]

export default function Blog() {
  const sectionRef = useRef(null)

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

  return (
    <section id="blog" ref={sectionRef} className="py-20 md:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="reveal">
            <p className="section-subheading">Insights</p>
            <h2 className="section-heading">
              Latest <span className="text-gradient">Articles</span>
            </h2>
          </div>
          <a
            href="#"
            className="reveal text-brand-orange text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all posts <ArrowRight size={14} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article key={p.id} className="reveal card group cursor-pointer">
              {/* Thumbnail placeholder */}
              <div
                className="w-full h-40 rounded-lg mb-4 flex items-center justify-center text-5xl"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
              >
                {p.emoji}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: `${p.color}20`, color: p.color }}
                >
                  {p.tag}
                </span>
                <span className="text-brand-gray/60 text-xs flex items-center gap-1">
                  <Calendar size={11} /> {p.date}
                </span>
              </div>

              <h3 className="text-white font-semibold text-sm sm:text-base mb-2 group-hover:text-brand-orange transition-colors leading-snug">
                {p.title}
              </h3>
              <p className="text-brand-gray text-xs leading-relaxed line-clamp-3">{p.excerpt}</p>

              <button className="mt-4 text-brand-orange text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Read more <ArrowRight size={12} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
