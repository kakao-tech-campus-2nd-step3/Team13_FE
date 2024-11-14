import { ReactNode, useRef, useState } from 'react'
import Button from '@/components/common/Button/Button'
import heroImg from '@/assets/images/hero_img.svg'
import arrowBlue from '@/assets/icons/arrow-blue.svg'
import Container from '@/components/common/Container/Container'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'
import { breakpoints } from '@/styles/breakpoints/breakpoints'
import useIntersectionSlideEffect from '@/hooks/useIntersectionSlideEffect'
import { useNavigate } from 'react-router-dom'

function HeroSection({ id }: { id?: string }) {
  const navigate = useNavigate()
  const spyRef = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLDivElement>(null)

  const [isModalOpen, setModalOpen] = useState(false)

  useIntersectionSlideEffect({ spyRef: spyRef, targetRef: title, direction: 'top' })
  useIntersectionSlideEffect({ spyRef: spyRef, targetRef: button, direction: 'bottom' })

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <section id={id}>
      <HeroContainer>
        <Container
          size="full-width"
          maxWidth="100%"
          direction="column"
          justify="space-around"
          align="flex-start"
        >
          <div ref={spyRef} />
          <TitleContainer ref={title}>
            <Heading.XXLarge
              css={{
                color: 'white',
                lineHeight: '1.2',
              }}
            >
              안녕하세요,
              <br />
              돌봄다리입니다 :)
            </Heading.XXLarge>
          </TitleContainer>
          <div ref={spyRef} />
          <ButtonContainer ref={button}>
            <HeroImage />
            <Container
              direction="column"
              align="flex-start"
              style={{ marginTop: '30px', gap: '10px' }}
            >
              <TextBody.MLarge css={{ color: 'white' }}>
                이미 돌봄다리 서비스를 이용 중이시라면,
              </TextBody.MLarge>
              <Button
                theme="white"
                onClick={() => navigate('/role')}
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
              <TextBody.MLarge css={{ marginTop: '20px', color: 'white' }}>
                돌봄다리 서비스 신규 신청을 원하신다면,
              </TextBody.MLarge>
              <Button
                theme="white"
                onClick={openModal}
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
                <TextBody.Large weight="bold">서비스 이용 신청</TextBody.Large>
                <img src={arrowBlue} alt="" />
              </Button>
            </Container>
          </ButtonContainer>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <Heading.Medium>Contact us !</Heading.Medium>
              <TextBody.Large>e-mail: halfmoonjy99@gmail.com</TextBody.Large>
            </Modal>
          )}
        </Container>
      </HeroContainer>
    </section>
  )
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: start;
  margin-bottom: 10px;
  padding: 0 20%;
  box-sizing: border-box;
  opacity: 0;
  @media (min-width: ${breakpoints.sm}) {
    padding-top: 70px;
    padding-left: 200px;
    box-sizing: border-box;
    justify-content: start;
    align-items: start;
    margin-bottom: 50px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  opacity: 0;

  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
    align-items: start;
    width: 100%;
    height: 500px;
  }
`

function HeroContainer({ children }: { children: ReactNode }) {
  return (
    <Container
      size={{ width: '100%', height: '100vh' }}
      style={{
        backgroundSize: 'cover',
        backgroundColor: `${colors.background.main}`,
      }}
      responsiveStyle={{
        sm: {
          height: '100vh',
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
  return (
    <Container
      size={{ width: 'auto', height: '300px' }}
      responsiveStyle={{
        sm: {
          height: '500px',
        },
      }}
    >
      <img src={heroImg} alt="HeroImg" style={{ height: '100%' }} />
    </Container>
  )
}

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>{children}</ModalContainer>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Darkened overlay effect
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: white;
  height: 20%;
  width: 80%;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  gap: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default HeroSection
