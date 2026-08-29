import { useEffect, useRef } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { BLOG_URL } from '../config'

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
  const published = Boolean(BLOG_URL)

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
              {published ? 'Latest ' : 'Writing '}
              <span className="text-gradient">Articles</span>
            </h2>
            {!published && (
              <p className="text-brand-gray text-sm mt-2 max-w-lg">
                Topics I'm writing about next — drawn from what actually comes up in client
                work.
              </p>
            )}
          </div>
          {BLOG_URL && (
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal text-brand-orange text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all posts <ArrowRight size={14} />
            </a>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article
              key={p.id}
              className={`reveal card group ${published ? 'cursor-pointer' : 'cursor-default'}`}
            >
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
                {published ? (
                  <span className="text-brand-gray/60 text-xs flex items-center gap-1">
                    <Calendar size={11} /> {p.date}
                  </span>
                ) : (
                  <span className="text-brand-gray/50 text-[10px] font-semibold uppercase tracking-wider border border-brand-border rounded px-2 py-0.5">
                    Coming soon
                  </span>
                )}
              </div>

              <h3 className="text-white font-semibold text-sm sm:text-base mb-2 group-hover:text-brand-orange transition-colors leading-snug">
                {p.title}
              </h3>
              <p className="text-brand-gray text-xs leading-relaxed line-clamp-3">{p.excerpt}</p>

              {/* Only offer "Read more" when there is somewhere for it to go */}
              {published && (
                <a
                  href={BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-brand-orange text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read more <ArrowRight size={12} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
