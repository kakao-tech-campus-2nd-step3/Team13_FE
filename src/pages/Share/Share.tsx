import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors'
import styled from 'styled-components'
import cameraIcon from '@/assets/icons/camera.svg'
import galleryIcon from '@/assets/icons/gallery.svg'

interface Props {
  icon: string
  title: string
  sub: string
}

export const SharePage = () => {
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
      <div style={{ gap: '30px', display: 'flex', flexDirection: 'column' }}>
        <ShareSquare icon={cameraIcon} title="사진 찍기" sub="피요양자의 일상을 촬영해 주세요." />
        <ShareSquare
          icon={galleryIcon}
          title="갤러리에서 선택"
          sub="미리 찍은 피요양자의 사진을 업로드 해주세요."
        />
      </div>
    </Wrapper>
  )
}

const ShareSquare = ({ icon, title, sub }: Props) => {
  return (
    <SquareWrapper>
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
  border: 3px dashed ${colors.border.subtle};
  border-radius: 8px;
  height: 180px;
  width: 100%;
  gap: 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
