import { useEffect, useState } from 'react'

/** Thin reading-progress bar pinned above the navbar. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let frame = null

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        setPct(scrollable > 0 ? window.scrollY / scrollable : 0)
        frame = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] pointer-events-none">
      <div
        className="scroll-progress h-full bg-gradient-to-r from-brand-orange to-orange-400"
        style={{ transform: `scaleX(${pct})` }}
      />
    </div>
  )
}
