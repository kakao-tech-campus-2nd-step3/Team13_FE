import styled from '@emotion/styled'
import phoneImage1 from '@/assets/images/phone_1.svg'
import phoneImage2 from '@/assets/images/phone_2.svg'
import { ReactNode, useRef } from 'react'
import Container from '@/components/common/Container/Container'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import IntroText from '@/components/molecules/IntroText'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'
import { colors } from '@/styles/colors/colors'

interface IntroductionSectionProps {
  id?: string
}

const IntroductionSection = ({ id }: IntroductionSectionProps) => {
  const spyRef = useRef<HTMLDivElement>(null)
  const boyIntroRef = useRef<HTMLDivElement>(null)
  const girlIntroRef = useRef<HTMLDivElement>(null)
  const boyIntroRef2 = useRef<HTMLDivElement>(null)

  useIntersectionSlideEffect({ spyRef, targetRef: boyIntroRef })
  useIntersectionSlideEffect({ spyRef, targetRef: girlIntroRef, delay: 400 })
  useIntersectionSlideEffect({ spyRef, targetRef: boyIntroRef2, delay: 800 })
  return (
    <PageWrapper>
      <Container direction="row">
        <TextWrapper>
          <Heading.Small>
            보호자와 요양보호자를 이어주는
            <br />
            소통창구,
          </Heading.Small>
          <Heading.Medium style={{ color: colors.text.prominent, marginTop: '10px' }}>
            돌봄다리
          </Heading.Medium>
          <PhoneImage src={phoneImage2} alt="Phone 2" style={{ height: '810px' }} />
        </TextWrapper>
        <PhoneImage src={phoneImage1} alt="Phone 1" style={{ height: '810px' }} />
      </Container>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, white 50%, #f2f2f2 50%);
`

const PhoneImage = styled.img`
  width: 200px; // Adjust as needed
  height: auto;
`

const TextWrapper = styled.div`
  margin-bottom: 2rem;
  text-align: start;
  color: #333;
  line-height: 1.4;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  a {
    font-size: 1.5rem;
    color: #4a90e2; // Blue link color
    font-weight: bold;
    text-decoration: none;
  }
`

export default IntroductionSection
