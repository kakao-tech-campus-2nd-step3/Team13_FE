import IntroductionSection from './components/IntroductionSection'
import FeatureSection from './components/FeatureSection'
import HeroSection from './components/HeroSection'
import MainSection from './components/MainSection'
import Page from './templates/Page'
import { useEffect } from 'react'

export const LandingPage = () => {
  useEffect(() => {
    const heroSection = document.getElementById('hero-section')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <Page>
      <HeroSection id="hero-section" />
      <MainSection id="main-section" />
      <IntroductionSection id="introduction-section" />
      <FeatureSection id="feature-section" />
    </Page>
  )
}
