import { Heading } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import styled, { keyframes } from 'styled-components'

interface OCRLoadingPageProps {
  text?: string
}

export const OCRLoadingPage: React.FC<OCRLoadingPageProps> = ({ text }) => {
  return (
    <Wrapper>
      <div style={{ marginBottom: '37px', width: '130px', height: '130px' }}>
        <Loader />
      </div>

      <Heading.Medium
        style={{
          color: colors.text.subtle,
          fontWeight: '300',
          lineHeight: '1.3',
          textAlign: 'center',
        }}
      >
        {text || (
          <>
            손글씨를 인식 중입니다
            <br />
            잠시만 기다려주세요
          </>
        )}
      </Heading.Medium>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const pulsIn = keyframes`
  0% {
    box-shadow: inset 0 0 0 0.6rem #5aa7ff;
    opacity: 1;
  }
  50%, 100% {
    box-shadow: inset 0 0 0 0 #5aa7ff;
    opacity: 0;
  }
`

const pulsOut = keyframes`
  0%, 50% {
    box-shadow: 0 0 0 0 #5aa7ff;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 0.6rem #5aa7ff;
    opacity: 1;
  }
`

const Loader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 8rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    animation: ${pulsOut} 1.8s ease-in-out infinite;
    filter: drop-shadow(0 0 0.4rem rgba(90, 167, 255, 0.75));
  }

  &:before {
    width: 100%;
    padding-bottom: 100%;
    box-shadow: inset 0 0 0 0.6rem #5aa7ff;
    animation-name: ${pulsIn};
  }

  &:after {
    width: calc(100% - 1.2rem);
    padding-bottom: calc(100% - 1.2rem);
    box-shadow: 0 0 0 0 #5aa7ff;
  }
`
