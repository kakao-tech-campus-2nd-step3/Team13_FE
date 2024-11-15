import { MutableRefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import takePicture from '@/assets/icons/take_picture.svg'
import downloadPicture from '@/assets/icons/download_picture.svg'
import leftRightSwitch from '@/assets/icons/switch.svg'
import { colors } from '@/styles/colors/colors'
import fetchInstance from '@/api/instance/instance'
import { useSaveImageUrl } from '@/api/hooks/user/OCR/useSaveImageUrl'

export const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null) as MutableRefObject<HTMLVideoElement>
  const [isCaptured, setIsCaptured] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [objectKey, setObjectKey] = useState<string | null>(null)
  const saveImageUrlMutation = useSaveImageUrl()

  const pauseVideo = () => {
    videoRef.current.pause()
    setIsCaptured(true)
  }

  const saveImage = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const context = canvas.getContext('2d')

    if (context) {
      if (isFlipped) {
        context.translate(canvas.width, 0)
        context.scale(-1, 1)
      }
      context.drawImage(videoRef.current, 0, 0)
    }

    const dataUrl = canvas.toDataURL('image/png')
    const file = dataURLtoFile(dataUrl, 'captured_image.png')
    setObjectKey(`${Date.now()}`)
    handleOCRRequest(file)
  }

  // Helper function to convert data URL to File
  const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  const handleOCRRequest = async (file: File) => {
    if (!file || !objectKey) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      await fetchInstance.post(`/v1/s3/chart/test-upload?objectKey=${objectKey}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      await saveImageUrlMutation.mutateAsync(objectKey)
      alert('OCR 요청이 성공적으로 전송되었습니다.')
    } catch (error) {
      console.error('OCR 요청 중 오류가 발생했습니다:', error)
    }
  }

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
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
              <img src={downloadPicture} alt="OCR 요청" />
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
  font-size: 23px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  width: 80%;
  padding: 10px;
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
