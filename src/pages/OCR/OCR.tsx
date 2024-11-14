import React, { useState } from 'react'
import { requestOCR } from '@/services/ocrService'
import { OCRResponse } from '@/services/ocrService'

export const OCRPage = () => {
  const [imageFile, setImageFile] = useState<File[]>([])
  const [ocrResult, setOcrResult] = useState<OCRResponse | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(Array.from(e.target.files))
    }
  }

  const handleOCRRequest = async () => {
    const result = await requestOCR(imageFile)
    setOcrResult(result)
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleOCRRequest}>OCR 요청</button>

      {ocrResult && (
        <div>
          <h3>분석 결과:</h3>
          <pre>{JSON.stringify(ocrResult, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
