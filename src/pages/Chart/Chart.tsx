import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors'
import styled from 'styled-components'
import cameraIcon from '@/assets/icons/camera.svg'
import nextArrow from '@/assets/icons/next_arrow.svg'
import recording from '@/assets/icons/recording.svg'
import pencil from '@/assets/icons/pencil.svg'

interface Props {
  icon: string
  title: string
  sub: string
}

export const ChartPage = () => {
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
          오늘 피요양자는 상태는 어땠나요?
        </TextBody.Large>
        <Heading.Medium>간편하게 차트를 작성해 보아요!</Heading.Medium>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ChartBlock
          icon={cameraIcon}
          title="사진 촬영"
          sub="작성한 차트를 촬영하거나 업로드 해주세요."
        ></ChartBlock>
        <ChartBlock
          icon={recording}
          title="음성 녹음"
          sub="작성할 내용을 녹음해주세요."
        ></ChartBlock>
        <ChartBlock
          icon={pencil}
          title="직접 입력"
          sub="작성할 내용을 직접 입력해주세요."
        ></ChartBlock>
      </div>
    </Wrapper>
  )
}

const ChartBlock = ({ icon, title, sub }: Props) => {
  return (
    <BlockWrapper>
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FAFAFA',
          flexShrink: 0,
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
