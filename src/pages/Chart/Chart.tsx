import { Heading, Paragraph, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'
import cameraIcon from '@/assets/icons/camera.svg'
import nextArrow from '@/assets/icons/next_arrow.svg'
import recording from '@/assets/icons/recording.svg'
import pencil from '@/assets/icons/pencil.svg'
import cameraLineIcon from '@/assets/icons/camera_line.svg'
import galleryLineIcon from '@/assets/icons/gallery_line.svg'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  icon: string
  title: string
  sub: string
  onClick: () => void
}

export const ChartPage = () => {
  const [showPopup, setShowPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  localStorage.removeItem('chartType')

  const navigateToRecord = () => {
    localStorage.setItem('chartType', 'record')
    navigate('/chart/choice/body')
  }

  const navigateToDIY = () => {
    localStorage.setItem('chartType', 'DIY')
    navigate('/chart/choice/body')
  }

  useEffect(() => {
    localStorage.removeItem('bodyManagement')
    localStorage.removeItem('physicalNote')
    localStorage.removeItem('cognitiveManagement')
    localStorage.removeItem('cognitiveNote')
    localStorage.removeItem('nursingManagement')
    localStorage.removeItem('healthNote')
    localStorage.removeItem('recoveryTraining')
    localStorage.removeItem('recoveryNote')
  })

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '44px',
        }}
      >
        <TextBody.Large style={{ color: colors.text.subtle }}>
          오늘 {localStorage.getItem('recipientName')}님의 상태는 어땠나요?
        </TextBody.Large>
        <Heading.Medium>간편하게 차트를 작성해 보아요!</Heading.Medium>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ChartBlock
          icon={cameraIcon}
          title="사진 촬영"
          sub="작성한 차트를 촬영하거나 업로드 해주세요."
          onClick={() => setShowPopup(true)}
        ></ChartBlock>
        <ChartBlock
          icon={recording}
          title="음성 인식"
          sub="작성할 내용을 녹음해주세요."
          onClick={navigateToRecord}
        ></ChartBlock>
        <ChartBlock
          icon={pencil}
          title="직접 입력"
          sub="작성할 내용을 직접 입력해주세요."
          onClick={navigateToDIY}
        ></ChartBlock>
      </div>
      {showPopup && (
        <PopupOverlay onClick={() => setShowPopup(false)}>
          <PopupContent onClick={(e) => e.stopPropagation()} className="slide-up">
            <Option onClick={() => navigate('/camera')}>
              <img src={cameraLineIcon} alt="camera" />
              <Paragraph.Large>사진 촬영</Paragraph.Large>
            </Option>
            <Option onClick={() => navigate('/ocr')}>
              <img src={galleryLineIcon} alt="gallery" />
              <Paragraph.Large>갤러리에서 선택</Paragraph.Large>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
            </Option>
          </PopupContent>
        </PopupOverlay>
      )}
    </Wrapper>
  )
}

const ChartBlock = ({ icon, title, sub, onClick }: Props) => {
  return (
    <BlockWrapper onClick={onClick}>
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: '#FAFAFA',
          flexShrink: 0,
          marginLeft: '8px',
          marginRight: '7px',
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img src={icon} alt={icon} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          gap: '11px',
          flexGrow: '1',
        }}
      >
        <Heading.Medium>{title}</Heading.Medium>
        <TextBody.Large
          style={{
            color: colors.text.subtle,
            wordBreak: 'keep-all',
            lineHeight: '1.3',
          }}
        >
          {sub}
        </TextBody.Large>
      </div>

      <img src={nextArrow} alt="arrow" />
    </BlockWrapper>
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

const BlockWrapper = styled.div`
  border: 1px solid ${colors.border.subtle};
  border-radius: 0;
  height: 165px;
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;

  /* 첫 번째 블록의 윗쪽 부분 */
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  /* 마지막 블록의 아랫쪽 부분 */
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  /* 붙어있는 블록 간의 중복되는 border 처리 */
  &:not(:first-child) {
    border-top: 0;
  }
`
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`

const PopupContent = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 41px;
  border-radius: 24px 24px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;

  &.slide-up {
    transform: translateY(0);
  }
`

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  img {
    margin-right: 10px;
  }
`
