import { useState } from 'react'
import { useSaveImageUrl } from '@/api/hooks/user/OCR/useSaveImageUrl'
import { usePerformOCR } from '@/api/hooks/user/OCR/usePerformOCR'
import { fetchInstance } from '@/api/instance/instance'
import { OCRTable } from './OCRTable/OCRTable'
import { parseData } from '@/utils/dataParser'
import { transformData } from '@/utils/dataTransformer'
import { OCRLoadingPage } from './OCRLoading/OCRLoading'

export const OCRPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [objectKey, setObjectKey] = useState<string | null>(null)
  const [isOCRReady, setIsOCRReady] = useState(false)

  const saveImageUrlMutation = useSaveImageUrl()
  const { data: ocrResult, isLoading } = usePerformOCR(
    objectKey || '',
    localStorage.getItem('recipientId')!,
    {
      enabled: isOCRReady && !!objectKey,
    },
  ) // TODO: id 수정

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

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/OCR_template.xlsx'
    link.download = 'OCR_template.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleOCRRequest}>OCR 요청</button>

      {isLoading ? (
        <OCRLoadingPage />
      ) : (
        ocrResult && <OCRTable data={transformData(parseData(ocrResult))} />
      )}

      <button onClick={handleDownload}>양식 다운로드</button>
    </div>
  )
}
