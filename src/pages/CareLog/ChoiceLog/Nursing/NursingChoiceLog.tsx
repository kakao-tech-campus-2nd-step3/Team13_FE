import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import temperature from '@/assets/icons/temperature.svg'
import health from '@/assets/icons/health.svg'
import nursing from '@/assets/icons/nursing.svg'
import emergency from '@/assets/icons/emergency.svg'

import Button from '@/components/common/Button/Button'
import { ChoiceBox } from '@/components/features/MultipleChoice/ChoiceBox'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { colors } from '@/styles/colors/colors'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Chart } from '@/api/hooks/user/chart/types'
import { Spinner } from 'basic-loading'
import { getDetailLogData } from '@/api/hooks/chart/useGetChart'

export const NursingChoiceLogPage = () => {
  const navigate = useNavigate()
  const selectedDate = localStorage.getItem('selectedDate')
  const { chartId } = useParams<{ chartId: string }>()
  const [detailLog, setDetailLog] = useState<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (chartId) {
      // Convert chartId to a number and fetch data
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
      <Steps currentStep={3} totalSteps={4} isLog={true} chartId={chartId} />
      <div style={{ padding: '26px 0 0 0', lineHeight: '1.2' }}>
        <Heading.Medium>건강 및 간호 관리</Heading.Medium>
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
        <ChoiceGrid>
          <ChoiceBox
            icon={waterDrop}
            title="혈압"
            content={`${detailLog?.nursingManagement.systolic} / ${detailLog?.nursingManagement.diastolic} mmHg`}
          />
          <ChoiceBox
            icon={temperature}
            title="체온"
            content={`${detailLog?.nursingManagement.healthTemperature}°C`}
          />
          <ChoiceBox
            icon={health}
            title="건강 관리"
            content={detailLog?.nursingManagement.healthCareProvided ? 'O' : 'X'}
          />
          <ChoiceBox
            icon={nursing}
            title="간호 관리"
            content={detailLog?.nursingManagement.nursingCareProvided ? 'O' : 'X'}
          />
          <ChoiceBox
            icon={emergency}
            title="기타(응급)"
            content={detailLog?.nursingManagement.emergencyCareProvided ? 'O' : 'X'}
          />
        </ChoiceGrid>
      )}
      <ButtonWrapper>
        <Button
          theme="dark"
          css={{
            width: '100%',
            height: '62px',
          }}
          onClick={() => {
            navigate(`/careLog/significant/nursing/${chartId}`)
          }}
        >
          확인
        </Button>
      </ButtonWrapper>
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

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px 14px;
  width: 100%;
  justify-items: center;
  padding: 25px 0 35px 0;
  box-sizing: border-box;

  @media (max-width: 300px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 0 26px 0;
  box-sizing: border-box;
  margin-top: auto; /* 항상 하단에 위치 */
`
