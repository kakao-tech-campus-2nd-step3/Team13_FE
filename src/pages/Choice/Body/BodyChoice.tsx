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
import { useEffect, useState } from 'react'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'
import { MultipleBox } from '@/components/features/MultipleChoice/MultipleBox'
import { TimesBox } from '@/components/features/MultipleChoice/TimesBox'
import { useNavigate } from 'react-router-dom'
import { Chart } from '@/api/hooks/user/chart/types'
interface ListWrapperProps {
  isScrolled: boolean
}
export const BodyChoicePage = () => {
  const navigate = useNavigate()
  const chartType = localStorage.getItem('chartType')
  const [selectedOptions, setSelectedOptions] = useState<Chart['bodyManagement']>({
    wash: false,
    bath: false,
    mealType: '',
    intakeAmount: '',
    physicalRestroom: '',
    hasWalked: false,
    positionChangeRequired: false,
    mobilityAssistance: false,
    physicalNote: '',
  })
  const [isScrolled, setIsScrolled] = useState(false)
  const scroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }
  useEffect(() => {
    const savedChartData = localStorage.getItem('chartData')
    if (savedChartData) {
      const parsedData = JSON.parse(savedChartData)

      setSelectedOptions((prev) => ({
        ...prev,
        wash: parsedData.bodyManagement?.wash || false,
        bath: parsedData.bodyManagement?.bath || false,
        mealType: parsedData.bodyManagement?.mealType || '',
        intakeAmount: parsedData.bodyManagement?.intakeAmount || '',
        physicalRestroom: parsedData.bodyManagement?.physicalRestroom || '',
        hasWalked: parsedData.bodyManagement?.hasWalked || false,
        positionChangeRequired: parsedData.bodyManagement?.positionChangeRequired || false,
        mobilityAssistance: parsedData.bodyManagement?.mobilityAssistance || false,
        physicalNote: parsedData.bodyManagement?.physicalNote || '',
      }))
    }
  }, [])

  const [errors, setErrors] = useState({
    mealType: '',
    intakeAmount: '',
    physicalRestroom: '',
  })

  const selectOption = (key: keyof Chart['bodyManagement'], value: any) => {
    const existingChartData = JSON.parse(localStorage.getItem('chartData') || '{}')

    const updatedBodyManagement = {
      ...existingChartData.bodyManagement,
      [key]: value,
    }

    const updatedChartData = {
      ...existingChartData,
      bodyManagement: updatedBodyManagement,
    }
    localStorage.setItem('chartData', JSON.stringify(updatedChartData))

    setSelectedOptions(updatedBodyManagement)
  }
  const validateInputs = () => {
    const { mealType, intakeAmount, physicalRestroom } = selectedOptions
    const newErrors: typeof errors = {
      mealType: '',
      intakeAmount: '',
      physicalRestroom: '',
    }

    if (!mealType) newErrors.mealType = '식사 종류를 선택해주세요'
    if (!intakeAmount) newErrors.intakeAmount = '섭취량을 선택해주세요'
    if (!physicalRestroom) newErrors.physicalRestroom = '화장실 이용 횟수를 입력해주세요'

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const confirm = () => {
    if (validateInputs()) {
      if (chartType === 'DIY') {
        navigate('/chart/significant/body')
      } else if (chartType === 'record') {
        navigate('/chart/audioRecord/body')
      }
    }
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <Steps currentStep={1} totalSteps={4} />
        <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>신체 활동 지원</Heading.Medium>
      </TitleWrapper>
      <ListWrapper onScroll={scroll} isScrolled={isScrolled}>
        <ChoiceGrid>
          <CheckBox
            icon={waterDrop}
            title="청결 관리"
            checked={selectedOptions.wash}
            onChange={() => selectOption('wash', !selectedOptions.wash)}
          />
          <CheckBox
            icon={shower}
            title="목욕"
            checked={selectedOptions.bath}
            onChange={() => selectOption('bath', !selectedOptions.bath)}
          />
          <CheckBox
            icon={movement}
            title="체위 변경"
            checked={selectedOptions.positionChangeRequired}
            onChange={() =>
              selectOption('positionChangeRequired', !selectedOptions.positionChangeRequired)
            }
          />
          <CheckBox
            icon={wheelchair}
            title="이동 도움"
            checked={selectedOptions.mobilityAssistance}
            onChange={() => selectOption('mobilityAssistance', !selectedOptions.mobilityAssistance)}
          />
          <CheckBox
            icon={walking}
            title="산책 / 외출 동행"
            checked={selectedOptions.hasWalked}
            onChange={() => selectOption('hasWalked', !selectedOptions.hasWalked)}
          />
          <div>
            <TimesBox
              icon={bathroom}
              title="화장실 이용 횟수"
              count={selectedOptions.physicalRestroom}
              onCountChange={(count) => selectOption('physicalRestroom', count.toString())}
            />
            {errors.physicalRestroom && <ErrorMessage>{errors.physicalRestroom}</ErrorMessage>}
          </div>
          <div>
            <MultipleBox
              icon={meal}
              title="식사 종류"
              options={['일반식', '죽', '유동식']}
              selectedOption={selectedOptions.mealType}
              onSelectOption={(option) => selectOption('mealType', option)}
            />
            {errors.mealType && <ErrorMessage>{errors.mealType}</ErrorMessage>}
          </div>
          <div>
            <MultipleBox
              icon={mealAmount}
              title="섭취량"
              options={['1 (전부)', '1/2 이상', '1/2 미만']}
              selectedOption={selectedOptions.intakeAmount}
              onSelectOption={(option) => selectOption('intakeAmount', option)}
            />
            {errors.intakeAmount && <ErrorMessage>{errors.intakeAmount}</ErrorMessage>}
          </div>
        </ChoiceGrid>
        <ButtonWrapper>
          <Button
            theme="dark"
            onClick={confirm}
            css={{
              width: '100%',
              height: '62px',
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
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
`

const TitleWrapper = styled.div`
  padding: 0 23px;
  margin-bottom: 15px;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
