// OCRPage.tsx
import { useState } from 'react'
import { useSaveImageUrl } from '@/api/hooks/user/OCR/useSaveImageUrl'
import { usePerformOCR } from '@/api/hooks/user/OCR/usePerformOCR'
import { fetchInstance } from '@/api/instance/instance'
import { OCRTable } from './OCRTable/OCRTable'
import { parseData } from '@/utils/dataParser'
import { transformData } from '@/utils/dataTransformer'
import { OCRLoadingPage } from './OCRLoading/OCRLoading'
import { submitChartData } from '@/api/hooks/user/chart/usePostChart'
import { Chart } from '@/api/hooks/user/chart/types'
import { DataStructure } from '@/utils/dataParser'

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
  )

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

  const formatToChart = (data: DataStructure): Chart => {
    const recipientId = Number(localStorage.getItem('recipientId'))

    // physicalRestroom에서 "회" 글자 제거
    const physicalRestroom = data.bodyManagement?.physicalRestroom.replace(/회$/, '') || ''

    // systolic과 diastolic을 분리하고, "mmHg" 제거
    const bloodPressure = data.nursingManagement?.systolic.replace(/mmHg/g, '') || ''
    const [systolic, diastolic] = bloodPressure.split('/').map((val) => val.trim())

    return {
      conditionDisease: '',
      recipientId,
      bodyManagement: {
        wash: data.bodyManagement?.wash === '예',
        bath: data.bodyManagement?.bath === '예',
        mealType: data.bodyManagement?.mealType || '',
        intakeAmount: data.bodyManagement?.intakeAmount || '',
        physicalRestroom: physicalRestroom,
        hasWalked: false,
        positionChangeRequired: false,
        mobilityAssistance: false,
        physicalNote: data.bodyManagement?.physicalNote || '',
      },
      cognitiveManagement: {
        cognitiveHelp: data.cognitiveManagement?.cognitiveHelp === '예',
        companionshipProvided: false,
        cognitiveNote: data.cognitiveManagement?.cognitiveNote || '',
      },
      nursingManagement: {
        systolic: systolic || '', // systolic 값
        diastolic: diastolic || '', // diastolic 값
        healthTemperature: data.nursingManagement?.healthTemperature || '',
        healthCareProvided: false,
        nursingCareProvided: false,
        emergencyCareProvided: false,
        healthNote: data.nursingManagement?.healthNote || '',
      },
      recoveryTraining: {
        recoveryProgram: data.recoveryTraining?.recoveryProgram || '',
        recoveryTraining: data.recoveryTraining?.recoveryTraining === '예',
        cognitiveTrainingProvided: false,
        physicalTherapyProvided: false,
        recoveryNote: data.recoveryTraining?.recoveryNote || '',
      },
    }
  }

  const handleSubmit = async () => {
    if (!ocrResult) return
    const transformedData = transformData(parseData(ocrResult))
    const chartData = formatToChart(transformedData)
    console.log(chartData)
    // 로컬 스토리지에 chartData 저장
    localStorage.setItem('chartData', JSON.stringify(chartData))

    try {
      await submitChartData() // 로컬 스토리지의 데이터를 사용해 POST 요청 전송
      alert('차트 데이터가 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error('데이터 저장 중 오류가 발생했습니다:', error)
      alert('데이터 저장에 실패했습니다.')
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
        ocrResult && (
          <div>
            <OCRTable data={transformData(parseData(ocrResult))} />
            <button onClick={handleSubmit}>확인</button>
          </div>
        )
      )}

      <button onClick={handleDownload}>양식 다운로드</button>
    </div>
  )
}
