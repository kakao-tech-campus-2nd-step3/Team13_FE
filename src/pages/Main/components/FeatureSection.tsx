import styled from '@emotion/styled'
import AI from '@/assets/images/ai_clipboard.svg'
import LineLogo from '@/assets/images/line_logo.svg'
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
    <section id={id}>
      <Container direction="column" align="center" justify="center">
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
          <Container
            padding="80px 35px"
            style={{ maxWidth: `${MAX_CONTENT_WIDTH}`, width: `100%` }}
            align="center"
            justify="space-around"
            direction="row"
          >
            <Container direction="column" align="flex-start">
              <Heading.Medium style={{ marginBottom: '37px' }}>
                <span style={{ color: colors.text.prominent }}>AI 요약 기능</span>으로 일지 조회를
                더 간편하게
              </Heading.Medium>
              <TextBody.Large style={{ lineHeight: '1.8', fontWeight: '600' }}>
                요양보호사가 입력한 차트를 AI가 요약해줘요.
                <br />
                보호자는 차트를 더 편리하게 조회할 수 있어요.
              </TextBody.Large>
            </Container>
            <img src={AI} alt="ai clipboard" style={{ height: '270px', width: '270px' }} />
          </Container>
        </div>
        <div
          style={{
            backgroundColor: '#DBE6F6',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Container
            padding="80px 35px"
            style={{ maxWidth: `${MAX_CONTENT_WIDTH}`, width: `100%` }}
            align="center"
            justify="space-around"
            direction="row"
          >
            <img src={LineLogo} alt="line logo" style={{ height: '230px', width: '230px' }} />
            <Container direction="column" align="flex-end">
              <Heading.Medium style={{ marginBottom: '37px' }}>
                <span style={{ color: colors.text.prominent }}>원하는 시간</span>에{' '}
                <span style={{ color: colors.text.prominent }}>알림</span>을 받을 수 있게
              </Heading.Medium>
              <TextBody.Large style={{ lineHeight: '1.8', fontWeight: '600', textAlign: 'end' }}>
                요양보호사가 차트를 입력하면,
                <br />
                보호자를 지정한 시간에 라인 알림을 받을 수 있어요.
              </TextBody.Large>
            </Container>
          </Container>
        </div>
      </Container>
    </section>
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
