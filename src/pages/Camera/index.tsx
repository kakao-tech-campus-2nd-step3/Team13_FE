import { MutableRefObject, useEffect, useRef, useState } from 'react'

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null) as MutableRefObject<HTMLVideoElement>
  const [isCaptured, setIsCaptured] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  // 1. 촬영
  const pauseVideo = () => {
    videoRef.current.pause()
    setIsCaptured(true)
  }

  // 2. 다운로드
  const saveImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    const context = canvas.getContext('2d')

    if (context != null) {
      if (isFlipped) {
        context.translate(canvas.width, 0)
        context.scale(-1, 1)
      }
      context.drawImage(videoRef.current, 0, 0)
    }

    const dataUrl = canvas.toDataURL('image/png')

    downloadUrl(dataUrl)
  }

  const downloadUrl = (url: string, name?: string) => {
    const ae = document.createElement('a')
    const fileName = name || Date.now().toString()

    ae.href = url
    ae.download = fileName + '.png'

    document.body.appendChild(ae)
    ae.click()
    document.body.removeChild(ae)
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play()
          }
        }
      })
      .catch((error) => {
        alert(error)
      })
  }, [])

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)' }}
      ></video>
      <button disabled={isCaptured} onClick={pauseVideo}>
        촬영
      </button>
      <button
        disabled={!isCaptured}
        onClick={() => {
          setIsCaptured(false)
          videoRef.current.play()
        }}
      >
        재촬영
      </button>
      <button disabled={!isCaptured} onClick={saveImage}>
        다운로드
      </button>
      <button disabled={isCaptured} onClick={toggleFlip}>
        {isFlipped ? '좌우반전 해제' : '좌우반전'}
      </button>
    </div>
  )
}
