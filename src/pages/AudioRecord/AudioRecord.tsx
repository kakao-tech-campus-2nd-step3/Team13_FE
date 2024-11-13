import { Heading, Paragraph } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import { BeatLoader } from 'react-spinners'
import { useState } from 'react'
import styled from 'styled-components'
import { useSpeechToText } from '@/components/features/SpeechToText/hooks/useSpeechToText'
import { FaPlay, FaStop } from 'react-icons/fa'

export const AudioRecordPage = () => {
  const { transcript, listening, toggleListening } = useSpeechToText()
  const [isRecording, setIsRecording] = useState(false)

  const handleToggleListening = () => {
    toggleListening()
    setIsRecording(!listening)
  }

  const handleResetAndListen = () => {
    setIsRecording(true)
  }

  return (
    <Wrapper>
      <Content>
        <Heading.Medium
          style={{
            marginBottom: '18px',
            lineHeight: '1.3',
            textAlign: 'center',
          }}
        >
          오늘 김영숙 환자의 인지 관리 <br />
          특이사항을 입력해주세요.
        </Heading.Medium>
        <Paragraph.Large style={{ color: colors.text.subtle }}>
          주변 소음이 들리지 않도록 해주세요.
        </Paragraph.Large>
        <RecordSection>
          <RecordCircle>
            <BeatLoader
              color={colors.primary.main}
              margin={6}
              size={8}
              speedMultiplier={isRecording ? 1.2 : 0}
            />
          </RecordCircle>
        </RecordSection>
      </Content>
      <TextArea value={transcript} readOnly />
      <WaveBackground>
        <Mountain3 />
        <Mountain2 />
        <Mountain1 />
        <CenteredImage onClick={isRecording ? handleToggleListening : handleResetAndListen}>
          {isRecording ? <FaStop color="#fff" size="30" /> : <FaPlay color="#fff" size="30" />}
        </CenteredImage>
      </WaveBackground>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 24px 0 24px;
`

const Content = styled.div`
  //flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const RecordSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 210px;
`

const RecordCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f8f8f8;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 20px;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${colors.border.subtle};
  font-size: 1rem;
  color: ${colors.border.prominent};
  resize: none;
  outline: none;
`

const WaveBackground = styled.div`
  position: relative;
  width: 100vw;
  height: 250px; // 필요한 높이
  overflow: hidden;
  margin-top: auto;
`

const Mountain1 = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 230px;
  background-color: #4894fe;
  clip-path: ellipse(105% 90% at 50% 100%);
`

const Mountain2 = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 250px;
  background-color: #96c1ff;
  clip-path: ellipse(95% 90% at 75% 100%);
`

const Mountain3 = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 270px;
  background-color: #e4efff;
  clip-path: ellipse(100% 90% at 30% 100%);
`

const CenteredImage = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
`
