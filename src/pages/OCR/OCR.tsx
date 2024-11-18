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
import { useNavigate } from 'react-router-dom'
import * as S from './OCR.styles'
import { IoCloudUploadOutline } from 'react-icons/io5'
import Button from '@/components/common/Button/Button'

export const OCRPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [objectKey, setObjectKey] = useState<string | null>(null)
  const [isOCRReady, setIsOCRReady] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)

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
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    } catch (error) {
      console.error('OCR 요청 중 오류가 발생했습니다:', error)
    }
  }

  const formatToChart = (data: DataStructure): Chart => {
    const recipientId = Number(localStorage.getItem('recipientId'))

    const physicalRestroom = data.bodyManagement?.physicalRestroom?.replace(/회$/, '') || ''

    const bloodPressure = data.nursingManagement?.systolic?.replace(/mmHg/g, '') || ''
    const [systolic, diastolic] = bloodPressure
      ? bloodPressure.split('/').map((val) => val.trim())
      : ['', '']

    const temperature = data.nursingManagement?.healthTemperature?.replace(/도$/, '') || ''

    return {
      conditionDisease: '',
      recipientId: recipientId,
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
        systolic,
        diastolic,
        healthTemperature: temperature,
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

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!ocrResult) return
    const transformedData = transformData(parseData(ocrResult))
    const chartData = formatToChart(transformedData)
    localStorage.setItem('chartData', JSON.stringify(chartData))

    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsRequesting(true)
      await submitChartData()
      alert(
        '차트 데이터가 성공적으로 저장되었습니다. 내용 수정이 필요하다면 돌봄대상자 목록에서 연필 아이콘을 클릭해 주세요.',
      )
      navigate('/recipients')
    } catch (error) {
      console.error('데이터 저장 중 오류가 발생했습니다:', error)
      alert('데이터 저장에 실패했습니다.')
    } finally {
      setIsRequesting(false)
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
    <S.Container>
      <label htmlFor="file-upload">
        <S.SquareWrapper>
          {imageFile ? (
            <>{imageFile.name}</>
          ) : (
            <>
              <IoCloudUploadOutline size="30" />
              파일 선택
            </>
          )}
        </S.SquareWrapper>

        <S.ButtonWrapper>
          <Button
            theme="gray"
            onClick={() => {
              const link = document.createElement('a')
              link.href = '/sample.png'
              link.download = 'sample.png'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            샘플 사진 다운로드
          </Button>

          <Button theme="gray" onClick={handleDownload}>
            양식 다운로드
          </Button>

          <Button theme="dark" onClick={handleOCRRequest}>
            OCR 요청
          </Button>
        </S.ButtonWrapper>
      </label>

      <S.FileInput id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
      {isRequesting && <OCRLoadingPage text="차트를 등록하는 중입니다." />}
      {isLoading ? (
        <OCRLoadingPage />
      ) : (
        ocrResult && (
          <div>
            <OCRTable data={transformData(parseData(ocrResult))} />
            <Button theme="dark" width="100%" margin="20px 0 12px 0" onClick={handleSubmit}>
              등록
            </Button>
          </div>
        )
      )}
    </S.Container>
  )
}
