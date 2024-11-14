import { Heading, Paragraph } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import { BeatLoader } from 'react-spinners'
import micImg from '@/assets/icons/mic_record.svg'
import styled from 'styled-components'
import { useSpeechToText } from '@/components/features/SpeechToText/hooks/useSpeechToText'
import { FaPlay, FaStop } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface DIYProps {
  title: string
  navigateTo: string
}

export const AudioRecordPage = ({ title, navigateTo }: DIYProps) => {
  const { transcript, listening, toggleListening, toggleReset } = useSpeechToText()
  const navigate = useNavigate()
  localStorage.removeItem('data')
  const done = () => {
    localStorage.setItem('data', transcript)
    toggleReset
    navigate(navigateTo)
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
          오늘 {localStorage.getItem('recipientName')}님의{' '}
          <span style={{ color: `${colors.text.prominent}` }}>{title} </span>
          <br />
          특이사항을 입력해주세요.
        </Heading.Medium>
        <Paragraph.Large style={{ color: colors.text.subtle }}>
          주변 소음이 들리지 않도록 해주세요.
        </Paragraph.Large>
        <RecordSection>
          <RecordCircle>
            {listening ? (
              <BeatLoader color="#4894FE" margin={6} size={8} />
            ) : (
              <img src={micImg} alt="mic" />
            )}
          </RecordCircle>
        </RecordSection>
      </Content>
      {transcript ? (
        <TextArea value={transcript} style={{ lineHeight: '1.4', color: 'black' }} readOnly />
      ) : null}

      <WaveBackground>
        <Mountain3 />
        <Mountain2 />
        <Mountain1 />
        {transcript && !listening ? (
          <ButtonWrapper>
            <TextButton onClick={toggleReset}>재녹음</TextButton>
            <CenteredImage onClick={toggleListening}>
              {listening ? <FaStop color="#fff" size="30" /> : <FaPlay color="#fff" size="30" />}
            </CenteredImage>
            <TextButton onClick={done}>완료</TextButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <TextButton></TextButton>
            <CenteredImage onClick={toggleListening}>
              {listening ? <FaStop color="#fff" size="30" /> : <FaPlay color="#fff" size="30" />}
            </CenteredImage>
            <TextButton></TextButton>
          </ButtonWrapper>
        )}
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
  padding: 30px 0 0 0;
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
  display: flex;
  background-color: white;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 20px;
`

const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  padding: 10px;
  line-height: 1.4;
  border-radius: 8px;
  border: 1px solid ${colors.border.subtle};
  font-size: 1rem;
  resize: none;
  outline: none;
`

const WaveBackground = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
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
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 4;
  padding: 0 25px;
`

const TextButton = styled.div`
  font-size: 16px;
  color: white;
  width: 44px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
`

const CenteredImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`
