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
import { ChartData } from '@/types/types'
import { useEffect, useState } from 'react'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'
import { MultipleBox } from '@/components/features/MultipleChoice/MultipleBox'
import { TimesBox } from '@/components/features/MultipleChoice/TimesBox'
import { useNavigate } from 'react-router-dom'

export const BodyChoicePage = () => {
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState<ChartData['bodyManagement']>({
    wash: false,
    bath: false,
    mealType: '',
    intakeAmount: '',
    physicalRestroom: 0,
    has_walked: false,
    physicalNote: '',
  })

  useEffect(() => {
    const savedData = localStorage.getItem('bodyManagement')
    if (savedData) {
      setSelectedOptions(JSON.parse(savedData))
    }
  }, [])

  const handleSelectOption = (key: keyof ChartData['bodyManagement'], value: any) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [key]: value }
      localStorage.setItem('bodyManagement', JSON.stringify(updatedOptions))
      return updatedOptions
    })
  }

  return (
    <Wrapper>
      <Steps currentStep={1} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>신체 활동 지원</Heading.Medium>
      <ChoiceGrid>
        <CheckBox
          icon={waterDrop}
          title="청결 관리"
          checked={selectedOptions.wash}
          onChange={() => handleSelectOption('wash', !selectedOptions.wash)}
        />
        <CheckBox
          icon={shower}
          title="목욕"
          checked={selectedOptions.bath}
          onChange={() => handleSelectOption('bath', !selectedOptions.bath)}
        />
        {/* <CheckBox icon={movement} title='체위 변경' checked={selectedOptions.??} onChange={() => handleSelectOption('', !selectedOptions.??)} */}
        {/* <CheckBox
          icon={wheelchair}
          title="이동 도움"
          checked={selectedOptions.??}
          onChange={() => handleSelectOption('??', !selectedOptions.??)}
        /> */}
        <CheckBox
          icon={walking}
          title="산책 / 외출"
          checked={selectedOptions.has_walked}
          onChange={() => handleSelectOption('has_walked', !selectedOptions.has_walked)}
        />{' '}
        <TimesBox
          icon={bathroom}
          title="화장실 이용 횟수"
          count={selectedOptions.physicalRestroom}
          onCountChange={(count) => handleSelectOption('physicalRestroom', count)}
        />
        <MultipleBox
          icon={meal}
          title="식사 종류"
          options={['일반식', '죽', '유동식']}
          selectedOption={selectedOptions.mealType}
          onSelectOption={(option) => handleSelectOption('mealType', option)}
        />
        <MultipleBox
          icon={mealAmount}
          title="섭취량"
          options={['1 (전부)', '1/2 이상', '1/2 미만']}
          selectedOption={selectedOptions.intakeAmount}
          onSelectOption={(option) => handleSelectOption('intakeAmount', option)}
        />
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          onClick={() => {
            navigate('/chart/choice/cognitive')
          }}
          css={{
            width: '100%',
            height: '62px',
          }}
        >
          확인
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

// 스타일 정의 그대로 유지
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 23px;
`

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px 14px;
  width: 100%;
  justify-items: center;
  padding: 35px 0;
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
