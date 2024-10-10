import axios from 'axios'

interface FileWithPath extends File {
  path?: string
}

export interface OCRResponse {
  images: Array<{
    fields: Array<{
      inferText: string
      inferConfidence: number
    }>
  }>
}

const requestOCR = async (imageFile: FileWithPath[] | File[]): Promise<OCRResponse | null> => {
  try {
    if (!imageFile[0]) {
      window.alert('이미지를 업로드 해주세요.')
      return null
    }

    const message = {
      version: 'V2',
      requestId: Math.random().toString(),
      timestamp: new Date().getTime(),
      lang: 'ko',
      images: [
        {
          format: imageFile[0].type.split('/')[1],
          name: imageFile[0].name,
        },
      ],
    }

    const formData = new FormData()
    formData.append('message', JSON.stringify(message))
    formData.append('file', imageFile[0])

    const response = await axios.post<OCRResponse>(
      '/api' + import.meta.env.VITE_NAVER_OCR_INVOKE_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-OCR-SECRET': import.meta.env.VITE_NAVER_X_OCR_SECRET || '',
        },
      },
    )

    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('OCR 요청 중 오류 발생:', error)
    return null
  }
}

export { requestOCR }
