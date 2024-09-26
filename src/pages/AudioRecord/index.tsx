import React, { useState } from 'react'

export const AudioRecordPage = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
      setMediaRecorder(recorder)

      recorder.ondataavailable = (event) => {
        setAudioChunks((prev) => [...prev, event.data])
      }

      recorder.onstop = () => {
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
        const newAudioUrl = `${URL.createObjectURL(audioBlob)}#${Date.now()}`
        setAudioUrl(newAudioUrl)
        downloadAudioFile(audioBlob)
        setAudioChunks([])
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
      mediaRecorder.stop()
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
  )
}
