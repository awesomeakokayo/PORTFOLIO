import Navigation from '../components/Navigation'
import SkipToContent from '../components/SkipToContent'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import WhatICanDo from '../components/WhatICanDo'
import UpcomingProjects from '../components/UpcomingProjects'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen">
      <SkipToContent />
      <Navigation />
      <Hero />
      <Projects />
      <TechStack />
      <WhatICanDo />
      <UpcomingProjects />
      <Footer />
    </div>
  )
}

export default Home
