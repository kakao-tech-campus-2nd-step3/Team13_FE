import headerLogo from '@/assets/images/logo.svg'
import { css } from '@emotion/react'
import useHeaderScrollEffect from '@/hooks/useHeaderScrollEffect'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import Container from '@/components/common/Container/Container'
import { TextBody } from '@/components/common/Text/TextFactory'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import styled from 'styled-components'

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
      <HeaderContainer>
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
      </HeaderContainer>
    </Container>
  )
}

const HeaderContainer = styled.div`
width:100%;
height:70px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
max-width:100%;
padding: 0 5%;
box-sizing: border-box;
@media (min-width: ${breakpoints.xs}) {
  height:90px;
`

const ResponsiveLogo = () => (
  <div
    css={css`
      width: 55px;
      height: 55px;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      padding: 0 10px;
      box-sizing: border-box;
      background-image: url(${headerLogo});
      @media (min-width: ${breakpoints.xs}) {
        width: 70px;
        height: 70px;
        background-image: url(${headerLogo});
      }
    `}
    onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
  />
)

export default Header
