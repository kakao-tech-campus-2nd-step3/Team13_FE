import { useSpeechToText } from '@/components/features/SpeechToText/hooks/useSpeechToText'

export const SpeechToTextPage = () => {
  const { transcript, listening, toggleListening } = useSpeechToText()

  return (
    <div>
      <h1>Web Speech API</h1>
      <textarea className="transcript" value={transcript} onChange={() => {}} />
      <button onClick={toggleListening}>{listening ? '음성인식 중지' : '음성인식 시작'}</button>
    </div>
  )
}
