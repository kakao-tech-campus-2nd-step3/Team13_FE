import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export const useSpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  const toggleListening = () => {
    if (listening) {
      console.log(transcript)
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true })
    }
  }

  const toggleReset = () => {
    resetTranscript()
  }

  return { transcript, listening, toggleListening, toggleReset }
}
