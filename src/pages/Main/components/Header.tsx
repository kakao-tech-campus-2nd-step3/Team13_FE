import headerLogo from '@/assets/images/logo.svg'
import headerSmallLogo from '@/assets/images/small_logo.svg'
import { css } from '@emotion/react'
import useHeaderScrollEffect from '@/hooks/useHeaderScrollEffect'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import Container from '@/components/common/Container/Container'
import { TextBody } from '@/components/common/Text/TextFactory'
import { breakpoints } from '@/styles/breakpoints/breakpoints'

function Header() {
  const { headerStyle: scrollHeaderStyle } = useHeaderScrollEffect()
  const baseStyle = css`
    position: fixed;
    transition: all 0.15s ease-in;
    z-index: 1000;
  `
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const targetPosition = section.getBoundingClientRect().top + window.scrollY
      useSmoothScroll(targetPosition)
    }
  }

  return (
    <Container size="full-width" justify="center" style={css(baseStyle, scrollHeaderStyle)}>
      <Container
        size={{ width: '100%', height: '90px' }}
        justify="space-between"
        align="center"
        maxWidth="1210px"
        padding="0 20px"
      >
        <ResponsiveLogo />
        <Container
          gap="20px"
          responsiveStyle={{
            sm: {
              gap: '49px',
            },
          }}
        >
          <TextBody.Medium
            weight="bold"
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={() => scrollToSection('main-section')}
          >
            About
          </TextBody.Medium>

          <TextBody.Medium
            weight="bold"
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={() => scrollToSection('feature-section')}
          >
            Feature
          </TextBody.Medium>
        </Container>
      </Container>
    </Container>
  )
}

const ResponsiveLogo = () => (
  <div
    css={css`
      width: 70px;
      height: 70px;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      background-image: url(${headerSmallLogo});
      @media (min-width: ${breakpoints.sm}) {
        width: 70px;
        background-image: url(${headerLogo});
      }
    `}
    onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
  />
)

export default Header
