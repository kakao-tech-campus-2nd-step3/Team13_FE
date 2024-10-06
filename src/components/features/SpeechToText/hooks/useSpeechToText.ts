import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export const useSpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true })
    }
  }

  return { transcript, listening, toggleListening }
}
