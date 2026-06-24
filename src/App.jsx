import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Stats from './components/Stats'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Stats />
        <Portfolio />
        <Testimonials />
        <CTA />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
