import { ReactNode } from 'react'
import Button from '@/components/common/Button/Button'
import heroImg from '@/assets/images/hero_img.svg'
import arrowBlue from '@/assets/icons/arrow-blue.svg'
import Container from '@/components/common/Container/Container'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import { getLandingKeyframes } from '@/utils'

function HeroSection({ id }: { id?: string }) {
  return (
    <section id={id}>
      <HeroContainer>
        <Container size="full-width" maxWidth="1210px" direction="column" align="flex-start">
          <Container direction="column" align="flex-start" style={{ marginBottom: '50px' }}>
            <Heading.XXLarge
              css={{
                opacity: 0,
                color: 'white',
                lineHeight: '1.2',
                marginLeft: '100px',
                animation: `${getLandingKeyframes(true)} 0.8s ease-in-out forwards 1s`,
              }}
            >
              안녕하세요,
              <br />
              돌봄다리입니다 :)
            </Heading.XXLarge>
          </Container>
          <Container
            direction="row"
            align="flex-start"
            size="full-width"
            maxWidth="1210px"
            justify="space-evenly"
            style={{ animation: `${getLandingKeyframes()} 0.8s ease-in-out forwards 1s` }}
          >
            <HeroImage />
            <Container direction="column" align="flex-start">
              <TextBody.Large css={{ color: 'white' }}>
                이미 돌봄다리 서비스를 이용 중이시라면,
              </TextBody.Large>
              <Button
                theme="white"
                css={{
                  marginTop: '15px',
                  borderRadius: '40px',
                  width: '300px',
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TextBody.Large weight="bold">서비스 이용하기</TextBody.Large>
                <img src={arrowBlue} alt="" />
              </Button>
              <TextBody.Large css={{ marginTop: '64px', color: 'white' }}>
                돌봄다리 서비스 신규 신청을 원하신다면,
              </TextBody.Large>
              <Button
                theme="white"
                css={{
                  marginTop: '15px',
                  borderRadius: '40px',
                  width: '300px',
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  animation: `${getLandingKeyframes()} 0.5s ease-in-out forwards 1s`,
                }}
              >
                <TextBody.Large weight="bold">서비스 이용 신청</TextBody.Large>
                <img src={arrowBlue} alt="" />
              </Button>
            </Container>
          </Container>
        </Container>
      </HeroContainer>
    </section>
  )
}

function HeroContainer({ children }: { children: ReactNode }) {
  return (
    <Container
      size={{ width: '100%', height: '600px' }}
      style={{
        backgroundSize: 'cover',
        backgroundColor: `${colors.background.main}`,
        padding: '50px 0 0 0',
      }}
      responsiveStyle={{
        sm: {
          height: '900px',
        },
      }}
      justify="center"
      align="center"
    >
      {children}
    </Container>
  )
}

function HeroImage() {
  return <img src={heroImg} alt="HeroImg" />
}

export default HeroSection
