import styled from 'styled-components'
import program from '@/assets/icons/program_book.svg'
import moving from '@/assets/icons/running.svg'
import cognitiveTreatment from '@/assets/icons/cognitive_treatment.svg'
import physicalTreatment from '@/assets/icons/physical_treatment.svg'

import Button from '@/components/common/Button/Button'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { WriteBox } from '@/components/features/MultipleChoice/\bWriteBox'

export const RecoveryChoicePage = () => {
  return (
    <Wrapper>
      <Steps currentStep={4} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>기능 회복 훈련</Heading.Medium>
      <ChoiceGrid>
        <WriteBox icon={program} title="기능향상 프로그램" placeholderFirst="입력해주세요" />
        <CheckBox icon={moving} title="신체 동작 훈련" />
        <CheckBox icon={cognitiveTreatment} title="인지기능향상 훈련" />
        <CheckBox icon={physicalTreatment} title="물리치료" />
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
