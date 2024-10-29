import Steps from '@/components/common/Steps/Steps'
import { Heading, Paragraph, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import { BeatLoader } from 'react-spinners'
import { useRef, useState } from 'react'
import play from '@/assets/icons/play.svg'
import styled from 'styled-components'

export const AudioRecordPage = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const mediaRecorder = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
      mediaRecorder.current = recorder

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data)
      }

      recorder.onstop = () => {
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' })
        const newAudioUrl = `${URL.createObjectURL(audioBlob)}#${Date.now()}`
        setAudioUrl(newAudioUrl)
        downloadAudioFile(audioBlob)

        audioChunks.current = []
      }

      recorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('마이크에 접근할 수 없습니다. 권한을 허용해 주세요.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.current?.stop()
      setIsRecording(false)
    }
  }

  const downloadAudioFile = (audioBlob: Blob) => {
    const link = document.createElement('a')
    const url = URL.createObjectURL(audioBlob)
    const fileName = `recording_${Date.now().toString()}.webm`
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Wrapper>
      <Steps currentStep={2} totalSteps={6} />
      <div
        style={{
          flexGrow: '1',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
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
        <div>
          {isRecording ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                height: '210px',
              }}
            >
              <RecordCircle>
                <BeatLoader
                  color="#4894FE"
                  margin={6}
                  size={8}
                  speedMultiplier={1.2}
                  style={{ height: '80px', width: '80px' }}
                />
              </RecordCircle>
              <Paragraph.Large style={{ color: colors.text.subtle }}>00:05:36</Paragraph.Large>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                height: '210px',
              }}
            >
              <RecordCircle>
                <BeatLoader
                  color="#4894FE"
                  margin={6}
                  size={8}
                  speedMultiplier={0}
                  style={{ height: '80px', width: '80px' }}
                />
              </RecordCircle>
            </div>
          )}
        </div>
      </div>
      <div>
        {isRecording ? (
          <button onClick={stopRecording}>녹음 중지</button>
        ) : (
          <button onClick={startRecording}>녹음 시작</button>
        )}

        {audioUrl && (
          <div>
            <h2>녹음된 파일:</h2>
            <audio controls preload="auto" src={audioUrl}></audio>
          </div>
        )}
      </div>
      <WaveBackground>
        <Mountain3 />
        <Mountain2 />
        <Mountain1 />
        <CenteredImage src={play} alt={play} />
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
  padding: 0 23px;
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
const CenteredImage = styled.img`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  width: 34px;
  height: 40px;
`
