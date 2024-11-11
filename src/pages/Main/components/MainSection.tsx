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
  const spyRef = useRef<HTMLDivElement>(null)
  const boyIntroRef = useRef<HTMLDivElement>(null)
  const girlIntroRef = useRef<HTMLDivElement>(null)
  const boyIntroRef2 = useRef<HTMLDivElement>(null)
  const howWeDid = useRef<HTMLDivElement>(null)
  const Card1 = useRef<HTMLDivElement>(null)
  const Card2 = useRef<HTMLDivElement>(null)
  const Card3 = useRef<HTMLDivElement>(null)

  useIntersectionSlideEffect({ spyRef: boyIntroRef, targetRef: boyIntroRef })
  useIntersectionSlideEffect({ spyRef: girlIntroRef, targetRef: girlIntroRef })
  useIntersectionSlideEffect({ spyRef: boyIntroRef2, targetRef: boyIntroRef2 })
  useIntersectionSlideEffect({ spyRef: spyRef, targetRef: howWeDid, delay: 300 })
  useIntersectionSlideEffect({ spyRef: Card1, targetRef: Card1 })
  useIntersectionSlideEffect({ spyRef: Card2, targetRef: Card2 })
  useIntersectionSlideEffect({ spyRef: Card3, targetRef: Card3 })

  return (
    <section id={id}>
      <ContainerWrapper>
        <MainTitleContainer>
          <Section ref={boyIntroRef}>
            <Image src={boyIntro} alt="boyIntro" />
            <IntroText>
              수기로 작성하는게 가장 익숙하고 쉬운데
              <br />
              작성한 차트를 보관하고 보호자와 공유하기가 어려워요.
            </IntroText>
          </Section>
          <SectionReversed ref={girlIntroRef}>
            <IntroText>
              보호자와 친근하게 대화하듯이 내용을 작성하고 싶은데
              <br />
              작성하고 싶은 내용들을 모두 다 손으로 적기가 힘들어요.
            </IntroText>
            <Image src={girlIntro} alt="girlIntro" />
          </SectionReversed>
          <Section ref={boyIntroRef2}>
            <Image src={boyIntro2} alt="boyIntro2" />
            <IntroText>
              온라인으로 작성하는 게 편해서 사이트를 이용하고 싶은데
              <br />
              다른 사이트들은 너무 복잡해서 작성하기가 어려워요.
            </IntroText>
          </Section>
        </MainTitleContainer>
        <div
          ref={howWeDid}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0',
          }}
        >
          <ContainerWrapper>
            <Heading.SMedium style={{ display: 'flex', justifyContent: 'center' }}>
              <div ref={spyRef} />
              돌봄다리는 이렇게 해결했어요 !
            </Heading.SMedium>
            <CardContainer>
              <div ref={Card1} style={{ opacity: '0' }}>
                <Card
                  pic={ocr}
                  title="손글씨 인식"
                  description="제공하는 차트에 손으로 작성하여 촬영만 하세요 !"
                />
              </div>
              <div ref={Card2} style={{ opacity: '0' }}>
                <Card
                  pic={mic}
                  title="음성 인식"
                  description="보호자와 공유하고 싶은 내용을 말로 편하게 이야기하세요 !"
                  isBlue={false}
                />
              </div>
              <div ref={Card3} style={{ opacity: '0' }}>
                <Card
                  pic={DIY}
                  title="직접 작성"
                  description="보기 쉽게 디자인된 사이트에 좀 더 편하게 차트를 작성하세요 !"
                />
              </div>
            </CardContainer>
          </ContainerWrapper>
        </div>
      </ContainerWrapper>
    </section>
  )
}

const ContainerWrapper = styled.div`
  padding: 130px 35px 100px 35px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  justify-content: center;
  @media (max-width: ${breakpoints.sm}) {
    padding: 75px 35px 45px 35px;
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  width: 100%;
  opacity: 0;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`

const CardContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  max-width: ${MAX_CONTENT_WIDTH};
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 35px;
  text-align: left;
  @media (min-width: ${breakpoints.md}) {
    justify-content: space-between;
    flex-direction: row;
    margin-top: 80px;
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
  @media (max-width: ${breakpoints.sm}) {
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
        <ImageWrapper>
          <img src={pic} alt={title} style={{ width: '100%' }} />
        </ImageWrapper>
      </ImageContainer>
      <TextContainer>
        <Heading.Small>{title}</Heading.Small>
        <TextBody.Medium style={{ lineHeight: '1.4' }}>{description}</TextBody.Medium>
      </TextContainer>
    </CardBox>
  )
}
const CardBox = styled.div`
  width: 250px;
  height: 320px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  text-align: left;
  @media (min-width: ${breakpoints.sm}) {
    width: 300px;
    height: 500px;
  }
`
const ImageContainer = styled.div`
  width: 250px;
  height: 210px;
  border-radius: 32px 32px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: ${breakpoints.sm}) {
    width: 300px;
    height: 330px;
  }
`
const ImageWrapper = styled.div`
  width: 170px;
  @media (min-width: ${breakpoints.sm}) {
    width: 230px;
  }
`
const TextContainer = styled.div`
  width: 250px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  padding: 37px;
  box-sizing: border-box;
  @media (min-width: ${breakpoints.sm}) {
    width: 300px;
    height: 170px;
    gap: 20px;
  }
`
export default MainSection
