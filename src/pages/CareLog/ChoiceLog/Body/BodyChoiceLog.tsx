import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import shower from '@/assets/icons/shower.svg'
import meal from '@/assets/icons/meal.svg'
import mealAmount from '@/assets/icons/meal_amount.svg'
import movement from '@/assets/icons/movement.svg'
import bathroom from '@/assets/icons/toilet.svg'
import wheelchair from '@/assets/icons/wheelchair.svg'
import walking from '@/assets/icons/walking.svg'
import Button from '@/components/common/Button/Button'
import { ChoiceBox } from '@/components/features/MultipleChoice/ChoiceBox'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { colors } from '@/styles/colors/colors'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDetailLogData } from '@/api/hooks/chart/useGetChart'
import { Chart } from '@/api/hooks/user/chart/types'
import { Spinner } from 'basic-loading'

interface ListWrapperProps {
  isScrolled: boolean
}

export const BodyChoiceLogPage = () => {
  const navigate = useNavigate()
  const selectedDate = localStorage.getItem('selectedDate')
  const { chartId } = useParams<{ chartId: string }>()
  const [detailLog, setDetailLog] = useState<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const scroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }

  useEffect(() => {
    if (chartId) {
      const fetchCareLogData = async () => {
        try {
          const response = await getDetailLogData({ chartId: Number(chartId) })
          if (response.success) {
            setDetailLog(response.response)
            localStorage.setItem('detailLog', JSON.stringify(response.response))
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
      <TitleWrapper>
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
        <Steps currentStep={1} totalSteps={4} isLog={true} chartId={chartId} />
        <div
          style={{
            width: '100%',
            padding: '26px 0 15px 0',
            lineHeight: '1.2',
          }}
        >
          <Heading.Medium>신체 활동 지원</Heading.Medium>
        </div>
      </TitleWrapper>

      <ListWrapper onScroll={scroll} isScrolled={isScrolled}>
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
              title="청결 관리"
              content={detailLog?.bodyManagement.wash ? 'O' : 'X'}
            />
            <ChoiceBox
              icon={shower}
              title="목욕"
              content={detailLog?.bodyManagement.bath ? 'O' : 'X'}
            />
            <ChoiceBox
              icon={movement}
              title="체위 변경"
              content={detailLog?.bodyManagement.positionChangeRequired ? 'O' : 'X'}
            />
            <ChoiceBox
              icon={wheelchair}
              title="이동 도움"
              content={detailLog?.bodyManagement.mobilityAssistance ? 'O' : 'X'}
            />
            <ChoiceBox
              icon={walking}
              title="산책 / 외출 동행"
              content={detailLog?.bodyManagement.hasWalked ? 'O' : 'X'}
            />
            <ChoiceBox
              icon={bathroom}
              title="화장실 이용 횟수"
              content={`${detailLog?.bodyManagement.physicalRestroom}회`}
            />
            <ChoiceBox
              icon={meal}
              title="식사 종류"
              content={`${detailLog?.bodyManagement.mealType}`}
            />
            <ChoiceBox
              icon={mealAmount}
              title="섭취량"
              content={`${detailLog?.bodyManagement.intakeAmount}`}
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
              navigate(`/careLog/significant/body/${chartId}`)
            }}
          >
            확인
          </Button>
        </ButtonWrapper>
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
`

const TitleWrapper = styled.div`
  padding: 0 23px;
  width: 100%;
  box-sizing: border-box;
`

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px 14px;
  width: 100%;
  justify-items: center;
  padding: 10px 0 35px 0;
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
  margin-top: auto;
`
const ListWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isScrolled'].includes(prop),
})<ListWrapperProps>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  flex-grow: 1;
  padding: 0 23px;

  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 10px 10px -10px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: box-shadow 0.3s ease;
`
