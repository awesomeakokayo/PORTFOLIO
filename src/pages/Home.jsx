import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Process from '../components/Process'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import GlassCursor from '../components/GlassCursor'

const Home = () => {
  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)]">
      <GlassCursor />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Process />
      <Stats />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
