import { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import takePicture from '@/assets/icons/take_picture.svg'
import downloadPicture from '@/assets/icons/download_picture.svg'
import leftRightSwitch from '@/assets/icons/switch.svg'
import { colors } from '@/styles/colors/colors'

export const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null) as MutableRefObject<HTMLVideoElement>
  const [isCaptured, setIsCaptured] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const pauseVideo = () => {
    videoRef.current.pause()
    setIsCaptured(true)
  }

  const saveImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    const context = canvas.getContext('2d')

    if (context != null) {
      if (isFlipped) {
        context.translate(canvas.width, 0)
        context.scale(-1, 1)
      }
      context.drawImage(videoRef.current, 0, 0)
    }

    const dataUrl = canvas.toDataURL('image/png')

    downloadUrl(dataUrl)
  }

  const downloadUrl = (url: string, name?: string) => {
    const ae = document.createElement('a')
    const fileName = name || Date.now().toString()

    ae.href = url
    ae.download = fileName + '.png'

    document.body.appendChild(ae)
    ae.click()
    document.body.removeChild(ae)
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play()
          }
        }
      })
      .catch((error) => {
        alert(error)
      })
  }, [])

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <Wrapper>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
          height: '100vh',
          width: '100vw',
        }}
      ></video>
      <Message>
        정확한 인식을 위해 <span style={{ color: `${colors.brand.primary}` }}>밝은 곳</span>에서
        <br /> <span style={{ color: `${colors.brand.primary}` }}>화면에 가득</span> 차게
        촬영해주세요.
      </Message>
      <ButtonContainer>
        <CenterButton>
          {!isCaptured ? (
            <StyledButton onClick={pauseVideo}>
              <img src={takePicture} alt="촬영" />
            </StyledButton>
          ) : (
            <StyledButton onClick={saveImage}>
              <img src={downloadPicture} alt="다운로드" />
            </StyledButton>
          )}
        </CenterButton>
        <RightButton>
          {isCaptured ? (
            <StyledButton
              onClick={() => {
                setIsCaptured(false)
                videoRef.current.play()
              }}
            >
              재촬영
            </StyledButton>
          ) : (
            <StyledButton onClick={toggleFlip}>
              <img src={leftRightSwitch} alt="좌우반전" />
            </StyledButton>
          )}
        </RightButton>
      </ButtonContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Message = styled.div`
  position: absolute;
  top: 70px;
  color: #7c7c7c;
  font-size: 23px; /* 텍스트 크기 */
  font-weight: 600;
  line-height: 1.3;
  text-align: center; /* 텍스트 정렬 */
  width: 80%; /* 텍스트 폭 */
  padding: 10px; /* 여백 */
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CenterButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const RightButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 30px;
`

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #7c7c7c;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  width: 60px;
  height: 60px; /* 버튼 크기 조절 */

  img {
    width: 100%;
    height: 100%; /* 이미지가 버튼 크기에 맞게 */
    object-fit: contain;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
