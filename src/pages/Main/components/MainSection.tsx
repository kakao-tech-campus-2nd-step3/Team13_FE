import styled from '@emotion/styled'
import boyIntro from '@/assets/images/man_1.svg'
import girlIntro from '@/assets/images/woman_1.svg'
import boyIntro2 from '@/assets/images/man_2.svg'
import ocr from '@/assets/images/ocr.svg'
import mic from '@/assets/images/mic.svg'
import DIY from '@/assets/images/DIY.svg'
import { ReactNode, useRef } from 'react'
import Container from '@/components/common/Container/Container'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import IntroText from '@/components/molecules/IntroText'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'
import { colors } from '@/styles/colors/colors'

interface MainSectionProps {
  id?: string
}

const MainSection = ({ id }: MainSectionProps) => {
  const colorScheme = colors

  const spyRef = useRef<HTMLDivElement>(null)
  const boyIntroRef = useRef<HTMLDivElement>(null)
  const girlIntroRef = useRef<HTMLDivElement>(null)
  const boyIntroRef2 = useRef<HTMLDivElement>(null)

  useIntersectionSlideEffect({ spyRef, targetRef: boyIntroRef })
  useIntersectionSlideEffect({ spyRef, targetRef: girlIntroRef, delay: 400 })
  useIntersectionSlideEffect({ spyRef, targetRef: boyIntroRef2, delay: 800 })
  return (
    <section id={id}>
      <Container
        padding="120px 35px"
        style={{ backgroundColor: 'white' }}
        align="center"
        justify="center"
        direction="column"
      >
        <MainTitleContainer>
          <Section ref={boyIntroRef}>
            <Image src={boyIntro} alt="boyIntro" />
            <IntroText>
              수기로 작성하는게 가장 익숙하고 쉬운데
              <br />
              작성한 차트를 보관하고 보호자와 공유하기가 어려워요.
            </IntroText>
          </Section>

          <div
            ref={spyRef}
            style={{
              width: '100%',
              height: '10px',
            }}
          />
          <SectionReversed ref={girlIntroRef}>
            <IntroText>
              보호자와 친근하게 대화하듯이 내용을 작성하고 싶은데
              <br />
              작성하고 싶은 내용들을 모두 다 손으로 적기가 힘들어요.
            </IntroText>
            <Image src={girlIntro} alt="girlIntro" />
          </SectionReversed>
          <div
            ref={spyRef}
            style={{
              width: '100%',
              height: '10px',
            }}
          />
          <Section ref={boyIntroRef2}>
            <Image src={boyIntro2} alt="boyIntro2" />
            <IntroText>
              온라인으로 차트를 작성하는 게 편해서 사이트를 이용하고 싶은데
              <br />
              다른 사이트들은 너무 복잡해서 작성하기가 어려워요.
            </IntroText>
          </Section>
        </MainTitleContainer>
        <Heading.Medium style={{ marginTop: '200px' }}>
          돌봄다리는 이렇게 해결했어요 !
        </Heading.Medium>
        <CardContainer>
          <Card
            pic={ocr}
            title="손글씨 인식"
            description="제공하는 차트에 손으로 작성하여 촬영만 하세요 !"
          />
          <Card
            pic={mic}
            title="음성 인식"
            description="보호자와 공유하고 싶은 내용을 말로 편하게 이야기하세요 !"
            isBlue={false}
          />
          <Card
            pic={DIY}
            title="직접 작성"
            description="보기 쉽게 디자인된 사이트에 좀 더 편하게 차트를 작성하세요 !"
          />
        </CardContainer>
      </Container>
    </section>
  )
}

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  width: 100%;
  opacity: 0;

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }
`
const CardContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 50px;
  justify-content: space-between;
  display: flex;
  max-width: ${MAX_CONTENT_WIDTH};
  width: 100%;
  text-align: left;
  @media (min-width: ${breakpoints.sm}) {
    margin-top: 80px;
    margin-bottom: 50px;
  }
`

const Image = styled.img`
  width: 250px;
  height: 250px;

  @media (max-width: ${breakpoints.sm}) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: ${breakpoints.xs}) {
    width: 150px;
    height: 150px;
  }
`

const SectionReversed = styled(Section)`
  @media (max-width: ${breakpoints.md}) {
    flex-direction: column-reverse;
  }
`
function MainTitleContainer({ children }: { children: ReactNode }) {
  return (
    <Container direction="column" gap="20px" maxWidth={MAX_CONTENT_WIDTH} size="full-width">
      {children}
    </Container>
  )
}

interface CardProps {
  pic: string
  title: string
  description: string
  isBlue?: boolean
}

function Card({ pic, title, description, isBlue = true }: CardProps) {
  return (
    <CardBox>
      <ImageContainer style={{ backgroundColor: isBlue ? `${colors.brand.primary}` : '#DBE6F6' }}>
        <img src={pic} style={{ width: '230px' }} />
      </ImageContainer>
      <TextContainer>
        <Heading.Small>{title}</Heading.Small>
        <TextBody.Medium style={{ lineHeight: '1.4' }}>{description}</TextBody.Medium>
      </TextContainer>
    </CardBox>
  )
}
const CardBox = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  text-align: left;
`
const ImageContainer = styled.div`
  width: 300px;
  height: 330px;
  border-radius: 32px 32px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TextContainer = styled.div`
  width: 300px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  padding: 37px;
  box-sizing: border-box;
`
export default MainSection
