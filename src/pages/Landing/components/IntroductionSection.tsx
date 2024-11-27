import styled from '@emotion/styled'
import phoneImage1 from '@/assets/images/phone_1.svg'
import phoneImage2 from '@/assets/images/phone_2.svg'
import { useRef } from 'react'
import Container from '@/components/common/Container/Container'
import { Heading } from '@/components/common/Text/TextFactory'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'
import { colors } from '@/styles/colors/colors'

interface IntroductionSectionProps {
  id?: string
}

const IntroductionSection = ({ id }: IntroductionSectionProps) => {
  const spyRef = useRef<HTMLDivElement>(null)
  const spyRef2 = useRef<HTMLDivElement>(null)
  const phone1 = useRef<HTMLDivElement>(null)
  const phone2 = useRef<HTMLDivElement>(null)

  useIntersectionSlideEffect({ spyRef: spyRef, targetRef: phone1, direction: 'top' })
  useIntersectionSlideEffect({ spyRef: spyRef2, targetRef: phone2, direction: 'bottom' })

  return (
    <section id={id}>
      <PageWrapper>
        <PhoneContainer>
          <Container direction="column" justify="center" align="center">
            <div ref={phone1} style={{ opacity: '0' }}>
              <TextWrapper>
                <Heading.Medium>
                  보호자와 요양보호사를 이어주는
                  <br />
                  소통창구,
                </Heading.Medium>

                <Heading.XLarge style={{ color: colors.text.prominent }}>돌봄다리</Heading.XLarge>
              </TextWrapper>
              <div ref={spyRef} />
              <PhoneImage src={phoneImage1} alt="Phone 1" />
            </div>
          </Container>
          <div ref={spyRef2} />
          <div ref={phone2} style={{ opacity: '0' }}>
            <PhoneImage src={phoneImage2} alt="Phone 2" />
          </div>
        </PhoneContainer>
      </PageWrapper>
    </section>
  )
}

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, white 50%, #f2f2f2 50%);
`

const PhoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @media (min-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: row;
  }
`

const PhoneImage = styled.img`
  width: 300px;
  height: auto;
`

const TextWrapper = styled.div`
  margin-bottom: 2rem;
  text-align: start;
  color: #333;
  line-height: 1.4;
  height: 120px;
  gap: 5px;
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.sm}) {
    height: 170px;
    gap: 10px;
  }
`

export default IntroductionSection
