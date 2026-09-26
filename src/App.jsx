import { useEffect, useState } from 'react'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Services from './components/Services'
import AIAutomation from './components/AIAutomation'
import Portfolio from './components/Portfolio'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudy from './components/CaseStudy'

// Hash routing keeps GitHub Pages happy: #/work/<slug> is a case study,
// any other hash is a section anchor on the home page.
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const work = hash.match(/^#\/work\/([\w-]+)/)?.[1]

  // Arriving on the home page from a case study: sections have only just
  // mounted, so the browser's own anchor jump has already missed them.
  useEffect(() => {
    if (work || !hash || hash.startsWith('#/')) return
    // Sections above keep growing for a moment as images decode, so settle
    // the jump a few times rather than once.
    const jump = () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    const timers = [0, 150, 450, 900].map((ms) => setTimeout(jump, ms))
    const stop = () => timers.forEach(clearTimeout)
    window.addEventListener('wheel', stop, { once: true })
    window.addEventListener('touchstart', stop, { once: true })
    return () => {
      stop()
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
    }
  }, [hash, work])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      {work ? (
        <CaseStudy slug={work} />
      ) : (
        <main id="main">
          <Hero />
          <TechMarquee />
          <About />
          <Services />
          <AIAutomation />
          <Portfolio />
          <CTA />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  )
}
