import { getDetailLogData } from '@/api/hooks/chart/useGetChart'
import Button from '@/components/common/Button/Button'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import { ChartData } from '@/types/types'
import { useEffect, useState } from 'react'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

interface DIYProps {
  step: number
  title: string
  navigateTo: string
}

// Update the map to use a tuple of keys for two-level deep access
const noteFieldMap: { [key: string]: [keyof ChartData, string] } = {
  '신체 활동 지원': ['bodyManagement', 'physicalNote'],
  '인지관리 및 의사소통': ['cognitiveManagement', 'cognitiveNote'],
  '건강 및 간호 관리': ['nursingManagement', 'healthNote'],
  '기능 회복 훈련': ['recoveryTraining', 'recoveryNote'],
}

// Utility function to get nested values based on a two-level path
function getNestedValue(obj: any, path: [string, string]): any {
  return obj?.[path[0]]?.[path[1]] ?? ''
}

export const SignificantLogPage = ({ step, title, navigateTo }: DIYProps) => {
  const navigate = useNavigate()
  const { chartId, selectedDate } = useParams<{ chartId: string; selectedDate: string }>()
  const [detailLog, setDetailLog] = useState<ChartData | null>(null)

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
      <Steps currentStep={step} totalSteps={4} isLog={true} />
      <div style={{ padding: '26px 0 15px 0', lineHeight: '1.2' }}>
        <Heading.Medium>{title} 특이사항</Heading.Medium>
      </div>
      <TextBox>{getNote()}</TextBox>
      <Button
        theme="dark"
        margin="26px 0"
        width="100%"
        height="62px"
        onClick={() => navigate(navigateTo, { state: { selectedDate } })}
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
  overflow: scroll;
`
