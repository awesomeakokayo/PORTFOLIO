import Navigation from '../components/Navigation'
import SkipToContent from '../components/SkipToContent'
import Hero from '../components/Hero'
import Trust from '../components/Trust'
import About from '../components/About'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      <SkipToContent />
      <Navigation />
      <Hero />
      <Trust />
      <About />
      <Services />
      <Projects />
      <Process />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
