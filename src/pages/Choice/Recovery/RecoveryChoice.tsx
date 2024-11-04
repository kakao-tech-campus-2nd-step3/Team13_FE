import styled from 'styled-components'
import program from '@/assets/icons/program_book.svg'
import moving from '@/assets/icons/running.svg'
import cognitiveTreatment from '@/assets/icons/cognitive_treatment.svg'
import physicalTreatment from '@/assets/icons/physical_treatment.svg'

import Button from '@/components/common/Button/Button'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { WriteBox } from '@/components/features/MultipleChoice/WriteBox'
import { useNavigate } from 'react-router-dom'
import { ChartData } from '@/types/types'
import { useEffect, useState } from 'react'

export const RecoveryChoicePage = () => {
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState<ChartData['recoveryTraining']>({
    recoveryProgram: '',
    recoveryTraining: false,
    recoveryNote: '',
  })

  useEffect(() => {
    const savedData = localStorage.getItem('recoveryTraining')
    if (savedData) {
      setSelectedOptions(JSON.parse(savedData))
    }
  }, [])

  const handleSelectOption = (key: keyof ChartData['recoveryTraining'], value: any) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [key]: value }
      localStorage.setItem('bodyManagement', JSON.stringify(updatedOptions))
      return updatedOptions
    })
  }

  const handleInputChange = (key: keyof ChartData['recoveryTraining'], value: any) => {
    handleSelectOption(key, value)
  }

  return (
    <Wrapper>
      <Steps currentStep={4} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>기능 회복 훈련</Heading.Medium>
      <ChoiceGrid>
        <WriteBox
          icon={program}
          title="기능향상 프로그램"
          placeholderFirst="입력해주세요"
          firstInputValue={selectedOptions.recoveryProgram}
          onFirstInputChange={(value) => handleInputChange('recoveryProgram', value)}
        />
        <CheckBox
          icon={moving}
          title="신체 동작 훈련"
          checked={selectedOptions.recoveryTraining}
          onChange={() => handleSelectOption('recoveryTraining', !selectedOptions.recoveryTraining)}
        />
        {/* <CheckBox icon={cognitiveTreatment} title="인지기능 훈련" checked={selectedOptions.??}
          onChange={() => handleSelectOption('??', !selectedOptions.??)}/>
        <CheckBox icon={physicalTreatment} title="물리치료" checked={selectedOptions.??}
          onChange={() => handleSelectOption('??', !selectedOptions.??)}/> */}
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          onClick={() => {
            navigate('/recipients')
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
