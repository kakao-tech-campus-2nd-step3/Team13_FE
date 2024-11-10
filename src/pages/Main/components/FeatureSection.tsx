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

interface FeatureSectionProps {
  id?: string
}

const FeatureSection = ({ id }: FeatureSectionProps) => {
  return (
    <Container
      padding="120px 35px"
      style={{ backgroundColor: 'white' }}
      align="center"
      justify="center"
      direction="column"
    >
      <Container direction="row" align="center">
        <Heading.Small>
          <span style={{ color: colors.text.prominent }}>AI 요약 기능</span>으로 일지 조회를 더
          간편하게
        </Heading.Small>
      </Container>
    </Container>
  )
}

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-end;
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

export default FeatureSection
