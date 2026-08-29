import { useEffect, useRef, useState } from 'react'

/**
 * Live-updating `prefers-reduced-motion` flag. Components use this to render a
 * genuinely different layout — never to hide content behind an animation the
 * visitor has asked us not to play.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Returns true when the visitor is on a pointer-less device or has asked for
 * reduced motion — in either case we skip the cursor-driven 3D entirely
 * rather than shipping janky transforms to a phone.
 */
export function prefersStatic() {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(hover: none)').matches
  )
}

/**
 * Mouse-tracking 3D tilt. Attach the returned ref to the element that should
 * rotate; give it the `tilt-3d` class (and `glare` for the specular sheen).
 *
 * Reads are batched into a single rAF so a fast cursor can't queue up layout
 * thrash on a grid of cards.
 */
export default function useTilt({ max = 9, scale = 1.02 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersStatic()) return

    let frame = null
    let rect = null

    const apply = (rotX, rotY, s) => {
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${s})`
    }

    const onEnter = () => {
      rect = el.getBoundingClientRect()
      el.classList.add('is-tilting')
    }

    const onMove = (e) => {
      // Cache the rect on enter; re-read only if we somehow never got one.
      if (!rect) rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        apply((0.5 - y) * max * 2, (x - 0.5) * max * 2, scale)
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
      })
    }

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      rect = null
      el.classList.remove('is-tilting')
      apply(0, 0, 1)
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [max, scale])

  return ref
}

/**
 * Magnetic pull — the element leans toward the cursor while it's nearby.
 * Used on primary CTAs so they feel "alive" without being distracting.
 */
export function useMagnetic({ strength = 0.28 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersStatic()) return

    let frame = null

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      })
    }

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return ref
}
