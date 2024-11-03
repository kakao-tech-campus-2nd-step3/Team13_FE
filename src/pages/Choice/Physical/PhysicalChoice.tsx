import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import shower from '@/assets/icons/shower.svg'
import meal from '@/assets/icons/meal.svg'
import mealAmount from '@/assets/icons/meal_amount.svg'
import movement from '@/assets/icons/movement.svg'
import bathroom from '@/assets/icons/toilet.svg'
import wheelchair from '@/assets/icons/wheelchair.svg'
import walking from '@/assets/icons/walking.svg'

import { TimesBox } from '../../../components/features/MultipleChoice/TimesBox'
import Button from '@/components/common/Button/Button'
import { CheckBox } from '../../../components/features/MultipleChoice/CheckBox'
import { useState } from 'react'
import { MultipleBox } from '../../../components/features/MultipleChoice/MultipleBox'
import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'

export const PhysicalChoicePage = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string | null }>({
    '식사 섭취량': null,
    '청결 관리': null,
  })

  const handleSelectOption = (title: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [title]: option }))
  }
  return (
    <Wrapper>
      <Steps currentStep={1} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>신체 활동 지원</Heading.Medium>
      <ChoiceGrid>
        <CheckBox icon={waterDrop} title="청결 관리" />
        <CheckBox icon={shower} title="목욕" />
        <MultipleBox
          icon={meal}
          title="식사 섭취량"
          options={['일반식', '죽', '유동식']}
          selectedOption={selectedOptions['식사 종류']}
          onSelectOption={(option) => handleSelectOption('식사 종류', option)}
        />
        <MultipleBox
          icon={mealAmount}
          title="식사 섭취량"
          options={['1 (전부)', '1/2 이상', '1/2 미만']}
          selectedOption={selectedOptions['식사 섭취량']}
          onSelectOption={(option) => handleSelectOption('식사 섭취량', option)}
        />
        <CheckBox icon={movement} title="체위 변경" />
        <TimesBox icon={bathroom} title="화장실 이용" />
        <CheckBox icon={wheelchair} title="이동 도움" />
        <CheckBox icon={walking} title="산책 / 외출" />
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
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
  margin-top: auto; /* 항상 하단에 위치 */
`
