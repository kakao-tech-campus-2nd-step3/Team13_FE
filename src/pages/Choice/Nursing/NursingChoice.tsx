import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import temperature from '@/assets/icons/temperature.svg'
import health from '@/assets/icons/health.svg'
import nursing from '@/assets/icons/nursing.svg'
import emergency from '@/assets/icons/emergency.svg'

import Button from '@/components/common/Button/Button'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { WriteBox } from '@/components/features/MultipleChoice/WriteBox'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'
import { useNavigate } from 'react-router-dom'
import { ChartData } from '@/types/types'
import { useEffect, useState } from 'react'

export const NursingChoicePage = () => {
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState<ChartData['nursingManagement']>({
    systolic: '',
    diastolic: '',
    healthTemperature: '',
    isHealthCareProvided: false,
    isNursingCareProvided: false,
    isEmergencyCareProvided: false,
    healthNote: '',
  })
  const [errors, setErrors] = useState({
    systolic: '',
    diastolic: '',
    healthTemperature: '',
  })

  const handleSelectOption = (key: keyof ChartData['nursingManagement'], value: any) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [key]: value }
      localStorage.setItem('nursingManagement', JSON.stringify(updatedOptions))
      return updatedOptions
    })
  }

  const handleInputChange = (key: keyof ChartData['nursingManagement'], value: string) => {
    handleSelectOption(key, value.replace(/\D/g, ''))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: '', // Clear error when user types something valid
    }))
  }

  const validateInputs = () => {
    const { systolic, diastolic, healthTemperature } = selectedOptions
    const newErrors: typeof errors = {
      systolic: '',
      diastolic: '',
      healthTemperature: '',
    }

    if (!systolic) newErrors.systolic = '최고 혈압을 입력해주세요'
    if (!diastolic) newErrors.diastolic = '최저 혈압을 입력해주세요'
    if (!healthTemperature) newErrors.healthTemperature = '체온을 입력해주세요'

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleConfirm = () => {
    if (validateInputs()) {
      navigate('/chart/significant/nursing')
    }
  }

  return (
    <Wrapper>
      <Steps currentStep={3} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>
        건강 및 간호 관리
      </Heading.Medium>
      <ChoiceGrid>
        <div>
          <WriteBox
            icon={waterDrop}
            title="혈압"
            unit="mmHg"
            isDualInput={true}
            placeholderFirst="최고"
            placeholderSecond="최저"
            firstInputValue={selectedOptions.systolic.toString()}
            secondInputValue={selectedOptions.diastolic.toString()}
            onFirstInputChange={(value) => handleInputChange('systolic', value)}
            onSecondInputChange={(value) => handleInputChange('diastolic', value)}
          />
          {errors.systolic && <ErrorMessage>{errors.systolic}</ErrorMessage>}
          {errors.diastolic && <ErrorMessage>{errors.diastolic}</ErrorMessage>}
        </div>
        <div>
          <WriteBox
            icon={temperature}
            title="체온"
            unit="°C"
            isDualInput={false}
            placeholderFirst="입력해주세요"
            firstInputValue={selectedOptions.healthTemperature}
            onFirstInputChange={(value) => handleInputChange('healthTemperature', value)}
          />
          {errors.healthTemperature && <ErrorMessage>{errors.healthTemperature}</ErrorMessage>}
        </div>
        <CheckBox
          icon={health}
          title="건강 관리"
          checked={selectedOptions.isHealthCareProvided}
          onChange={() =>
            handleSelectOption('isHealthCareProvided', !selectedOptions.isHealthCareProvided)
          }
        />
        <CheckBox
          icon={nursing}
          title="간호 관리"
          checked={selectedOptions.isNursingCareProvided}
          onChange={() =>
            handleSelectOption('isNursingCareProvided', !selectedOptions.isNursingCareProvided)
          }
        />
        <CheckBox
          icon={emergency}
          title="기타(응급)"
          checked={selectedOptions.isEmergencyCareProvided}
          onChange={() =>
            handleSelectOption('isEmergencyCareProvided', !selectedOptions.isEmergencyCareProvided)
          }
        />
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          onClick={handleConfirm}
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
  margin-top: auto; /* Always positioned at the bottom */
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
