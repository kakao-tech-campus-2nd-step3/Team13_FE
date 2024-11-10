import IntroductionSection from './components/IntroductionSection'
import FeatureSection from './components/FeatureSection'
import HeroSection from './components/HeroSection'
import MainSection from './components/MainSection'
import Page from './templates/Page'

export const MainPage = () => {
  return (
    <Page>
      <HeroSection id="hero-section" />
      <MainSection id="main-section" />
      <IntroductionSection id="introduction-section" />
      <FeatureSection id="feature-section" />
    </Page>
  )
}
