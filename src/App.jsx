import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Services from './components/Services'
import AIAutomation from './components/AIAutomation'
import Portfolio from './components/Portfolio'
import CTA from './components/CTA'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <AIAutomation />
        <Portfolio />
        <CTA />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
