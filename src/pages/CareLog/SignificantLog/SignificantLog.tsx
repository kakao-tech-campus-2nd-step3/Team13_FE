import { getDetailLogData } from '@/api/hooks/chart/useGetChart'
import { Chart } from '@/api/hooks/user/chart/types'
import Button from '@/components/common/Button/Button'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import { Spinner } from 'basic-loading'
import { useEffect, useState } from 'react'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

interface DIYProps {
  step: number
  title: string
  navigateTo: string
}

const noteFieldMap: { [key: string]: [keyof Chart, string] } = {
  '신체 활동 지원': ['bodyManagement', 'physicalNote'],
  '인지관리 및 의사소통': ['cognitiveManagement', 'cognitiveNote'],
  '건강 및 간호 관리': ['nursingManagement', 'healthNote'],
  '기능 회복 훈련': ['recoveryTraining', 'recoveryNote'],
}

function getNestedValue<T, K1 extends keyof T>(obj: T, path: [K1, string]): any {
  return obj?.[path[0]]?.[path[1] as keyof T[K1]] ?? ''
}
export const SignificantLogPage = ({ step, title, navigateTo }: DIYProps) => {
  const navigate = useNavigate()
  const selectedDate = localStorage.getItem('selectedDate')
  const { chartId } = useParams<{ chartId: string }>()
  const [detailLog, setDetailLog] = useState<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (chartId) {
      const fetchCareLogData = async () => {
        try {
          const response = await getDetailLogData({ chartId: Number(chartId) })
          if (response.success) {
            setDetailLog(response.response)
          }
        } catch (error) {
          console.error('Chart API 호출 중 오류 발생:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchCareLogData()
    }
  }, [chartId])

  const getNote = () => {
    if (!detailLog || !noteFieldMap[title]) return ''
    return getNestedValue(detailLog, noteFieldMap[title])
  }

  return (
    <Wrapper>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'end',
          justifyContent: 'start',
          marginBottom: '18px',
          gap: '10px',
        }}
      >
        <IoCalendarNumberOutline
          style={{ color: `${colors.border.prominent}`, width: '23px', height: '23px' }}
        />
        <div style={{ fontSize: '20px', color: `${colors.text.subtle}`, fontWeight: '700' }}>
          {selectedDate}
        </div>
      </div>
      <Steps currentStep={step} totalSteps={4} isLog={true} chartId={chartId} />
      <div style={{ padding: '26px 0 15px 0', lineHeight: '1.2' }}>
        <Heading.Medium>{title} 특이사항</Heading.Medium>
      </div>
      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner
            option={{ size: 70, thickness: 5, bgColor: '#EDF4FF', barColor: colors.primary.main }}
          />
        </div>
      ) : (
        <TextBox>{getNote()}</TextBox>
      )}
      <Button
        theme="dark"
        margin="26px 0"
        width="100%"
        height="62px"
        onClick={() => navigate(`${navigateTo.replace(':chartId', chartId!)}`)}
      >
        확인
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  padding: 0 23px;
`

const TextBox = styled.div`
  font-size: 20px;
  flex-grow: 1;
  padding: 5px;
  box-sizing: border-box;
  line-height: 1.6;
`
