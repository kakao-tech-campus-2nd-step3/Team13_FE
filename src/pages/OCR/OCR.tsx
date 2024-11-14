import { useState } from 'react'
import { useSaveImageUrl } from '@/api/hooks/user/OCR/useSaveImageUrl'
import { usePerformOCR } from '@/api/hooks/user/OCR/usePerformOCR'
import { fetchInstance } from '@/api/instance/instance'

export const OCRPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [objectKey, setObjectKey] = useState<string | null>(null)
  const [isOCRReady, setIsOCRReady] = useState(false)

  const saveImageUrlMutation = useSaveImageUrl()
  const { data: ocrResult } = usePerformOCR(objectKey || '', '8', {
    enabled: isOCRReady && !!objectKey,
  }) //TODO: id 수정

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
      setObjectKey(`${Date.now()}`)
      setIsOCRReady(false)
    }
  }

  const handleOCRRequest = async () => {
    if (!imageFile || !objectKey) return

    try {
      await fetchInstance.post(
        `/v1/s3/chart/test-upload?objectKey=${objectKey}`,
        { file: imageFile },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      await saveImageUrlMutation.mutateAsync(objectKey)
      setIsOCRReady(true)
    } catch (error) {
      console.error('OCR 요청 중 오류가 발생했습니다:', error)
    }
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
