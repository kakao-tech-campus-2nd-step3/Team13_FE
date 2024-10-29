import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'
import cameraIcon from '@/assets/icons/camera.svg'
import galleryIcon from '@/assets/icons/gallery.svg'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom' // 추가
import Button from '@/components/common/Button/Button'

interface Props {
  icon: string
  title: string
  sub: string
  onClick: () => void
  children?: React.ReactNode
}

export const SharePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate() // 추가

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleNext = () => {
    navigate('/chart') // 이동할 페이지 경로로 수정
  }

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '50px',
          justifyContent: 'space-between',
          marginBottom: '44px',
        }}
      >
        <TextBody.Large style={{ color: colors.text.subtle }}>
          오늘 피요양자는 어떤 일상을 보냈나요?
        </TextBody.Large>
        <Heading.Medium>보호자와 일상을 공유해 보세요!</Heading.Medium>
      </div>
      <div style={{ gap: '30px', display: 'flex', flexDirection: 'column', marginBottom: '50px' }}>
        <ShareSquare
          icon={cameraIcon}
          title="사진 찍기"
          sub="피요양자의 일상을 촬영해 주세요."
          onClick={() => {}}
        />
        <ShareSquare
          icon={galleryIcon}
          title="갤러리에서 선택"
          sub="미리 찍은 피요양자의 사진을 업로드 해주세요."
          onClick={handleFileSelect}
        >
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </ShareSquare>
      </div>
      <ButtonWrapper>
        <Button theme="dark" margin="26px 0" width="100%" height="62px" onClick={handleNext}>
          다음
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

const ShareSquare = ({ icon, title, sub, onClick, children }: Props) => {
  return (
    <SquareWrapper onClick={onClick}>
      <img src={icon} alt={icon} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '11px',
        }}
      >
        <Heading.Small>{title}</Heading.Small>
        <TextBody.Large style={{ padding: '0 10px', color: colors.text.subtle }}>
          {sub}
        </TextBody.Large>
      </div>
      {children}
    </SquareWrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SquareWrapper = styled.div`
  border: 2px dashed ${colors.border.subtle};
  border-radius: 8px;
  height: 180px;
  width: 100%;
  gap: 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 클릭할 수 있도록 커서 스타일 추가 */
`

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 23px 26px 23px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
`
