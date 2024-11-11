import styled from '@emotion/styled'
import AI from '@/assets/images/ai_clipboard.svg'
import LineLogo from '@/assets/images/line_logo.svg'
import Container from '@/components/common/Container/Container'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'
import { colors } from '@/styles/colors/colors'
import { useRef } from 'react'

interface FeatureSectionProps {
  id?: string
}

const FeatureSection = ({ id }: FeatureSectionProps) => {
  const spyRef = useRef<HTMLDivElement>(null)
  const spyRef2 = useRef<HTMLDivElement>(null)
  const ai = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useIntersectionSlideEffect({ spyRef: spyRef, targetRef: ai, direction: 'left' })
  useIntersectionSlideEffect({ spyRef: spyRef2, targetRef: line, direction: 'right' })

  return (
    <section id={id}>
      <Container direction="column" align="center" justify="center">
        <div ref={spyRef} />
        <div
          style={{
            backgroundColor: '#f2f2f2',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            paddingTop: '80px',
          }}
        >
          <ContainerWrapper ref={ai}>
            <TextWrapper>
              <Heading.Medium>
                <span style={{ color: colors.text.prominent }}>AI 요약</span>으로 더 간편한 일지
                조회
              </Heading.Medium>
              <TextBody.Large style={{ lineHeight: '1.8', fontWeight: '600' }}>
                요양보호사가 입력한 차트를 AI가 요약해줘요.
                <br />
                보호자는 차트를 더 편리하게 조회할 수 있어요.
              </TextBody.Large>
            </TextWrapper>
            <img src={AI} alt="ai clipboard" style={{ height: '270px', width: '270px' }} />
          </ContainerWrapper>
        </div>
        <div ref={spyRef2} />
        <div
          style={{
            backgroundColor: '#DBE6F6',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <ContainerWrapperReverse ref={line}>
            <img src={LineLogo} alt="line logo" style={{ height: '230px', width: '230px' }} />
            <TextWrapper>
              <Heading.Medium>
                <span style={{ color: colors.text.prominent }}>원하는 시간</span>에{' '}
                <span style={{ color: colors.text.prominent }}>라인 알림</span> 받기
              </Heading.Medium>
              <TextBody.Large style={{ lineHeight: '1.8', fontWeight: '600' }}>
                요양보호사가 차트를 입력하면,
                <br />
                지정한 시간에 라인 알림을 받을 수 있어요.
              </TextBody.Large>
            </TextWrapper>
          </ContainerWrapperReverse>
        </div>
      </Container>
    </section>
  )
}

const ContainerWrapper = styled.div`
  display: flex;
  padding: 80px 35px;
  max-width: ${MAX_CONTENT_WIDTH};
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  opacity: 0;
  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    justify-content: space-around;
  }
`
const ContainerWrapperReverse = styled(ContainerWrapper)`
  @media (max-width: ${breakpoints.md}) {
    flex-direction: column-reverse;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  gap: 15px;
  @media (min-width: ${breakpoints.md}) {
    gap: 37px;
    height: 150px;
    justify-content: start;
    align-items: start;
  }
`

export default FeatureSection
