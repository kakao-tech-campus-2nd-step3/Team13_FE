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
import { useEffect, useState } from 'react'
import { Chart } from '@/api/hooks/user/chart/types'

export const RecoveryChoicePage = () => {
  const navigate = useNavigate()
  const chartType = localStorage.getItem('chartType')
  const [selectedOptions, setSelectedOptions] = useState<Chart['recoveryTraining']>({
    recoveryProgram: '',
    recoveryTraining: false,
    cognitiveTrainingProvided: false,
    physicalTherapyProvided: false,
    recoveryNote: '',
  })

  useEffect(() => {
    const savedChartData = localStorage.getItem('chartData')
    if (savedChartData) {
      const parsedData = JSON.parse(savedChartData)

      setSelectedOptions((prev) => ({
        ...prev,
        recoveryProgram: parsedData.recoveryTraining?.recoveryProgram || '',
        recoveryTraining: parsedData.recoveryTraining?.recoveryTraining || false,
        cognitiveTrainingProvided: parsedData.recoveryTraining?.cognitiveTrainingProvided || false,
        physicalTherapyProvided: parsedData.recoveryTraining?.physicalTherapyProvided || false,
        recoveryNote: parsedData.recoveryTraining?.recoveryNote || '',
      }))
    }
  }, [])

  const selectOption = (key: keyof Chart['recoveryTraining'], value: any) => {
    const existingChartData = JSON.parse(localStorage.getItem('chartData') || '{}')

    const updatedRecoveryTraining = {
      ...existingChartData.recoveryTraining,
      [key]: value,
    }

    const updatedChartData = {
      ...existingChartData,
      recoveryTraining: updatedRecoveryTraining,
    }
    localStorage.setItem('chartData', JSON.stringify(updatedChartData))

    setSelectedOptions(updatedRecoveryTraining)
  }

  const handleInputChange = (key: keyof Chart['recoveryTraining'], value: any) => {
    selectOption(key, value)
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
          onChange={() => selectOption('recoveryTraining', !selectedOptions.recoveryTraining)}
        />
        <CheckBox
          icon={cognitiveTreatment}
          title="인지기능 훈련"
          checked={selectedOptions.cognitiveTrainingProvided}
          onChange={() =>
            selectOption('cognitiveTrainingProvided', !selectedOptions.cognitiveTrainingProvided)
          }
        />
        <CheckBox
          icon={physicalTreatment}
          title="물리치료"
          checked={selectedOptions.physicalTherapyProvided}
          onChange={() =>
            selectOption('physicalTherapyProvided', !selectedOptions.physicalTherapyProvided)
          }
        />
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          onClick={() => {
            if (chartType === 'DIY') {
              navigate('/chart/significant/recovery')
            } else if (chartType === 'record') {
              navigate('/chart/audioRecord/recovery')
            }
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
  justify-content: start;
  align-items: start;
  flex-direction: column;
  padding: 0 23px;
  box-sizing: border-box;
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
