const stack = [
  'Laravel', 'React', 'PHP', 'JavaScript', 'MySQL', 'Node.js',
  'MongoDB', 'WordPress', 'Python', 'Bootstrap', 'REST API',
  'Git', 'Tailwind', 'WooCommerce',
]

/**
 * Infinite horizontal ribbon of the stack. The list is rendered twice and the
 * track slides exactly -50%, so the loop point is invisible.
 */
export default function TechMarquee() {
  return (
    <div className="marquee-mask relative bg-brand-card border-y border-brand-border py-5 overflow-hidden">
      <div className="marquee-track" aria-hidden="true">
        {[...stack, ...stack].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex items-center gap-3 px-6 text-brand-gray text-sm font-semibold whitespace-nowrap hover:text-brand-orange transition-colors"
          >
            {tech}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/40" />
          </span>
        ))}
      </div>
      {/* Screen readers get the list once, without the duplicate */}
      <span className="sr-only">Tech stack: {stack.join(', ')}</span>
    </div>
  )
}
