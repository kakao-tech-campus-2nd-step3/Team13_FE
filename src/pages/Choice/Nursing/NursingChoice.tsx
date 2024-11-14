import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import temperature from '@/assets/icons/temperature.svg'
import health from '@/assets/icons/health.svg'
import nursing from '@/assets/icons/nursing.svg'
import emergency from '@/assets/icons/emergency.svg'

import Button from '@/components/common/Button/Button'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'
import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { WriteBox } from '@/components/features/MultipleChoice/WriteBox'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Chart } from '@/api/hooks/user/chart/types'

export const NursingChoicePage = () => {
  const navigate = useNavigate()
  const chartType = localStorage.getItem('chartType')
  const [selectedOptions, setSelectedOptions] = useState<Chart['nursingManagement']>({
    systolic: '',
    diastolic: '',
    healthTemperature: '',
    healthCareProvided: false,
    nursingCareProvided: false,
    emergencyCareProvided: false,
    healthNote: '',
  })

  const [errors, setErrors] = useState({
    systolicError: '',
    diastolicError: '',
    healthTemperatureError: '',
  })

  useEffect(() => {
    const savedChartData = localStorage.getItem('chartData')
    if (savedChartData) {
      const parsedData = JSON.parse(savedChartData)

      setSelectedOptions((prev) => ({
        ...prev,
        systolic: parsedData.nursingManagement?.systolic || '',
        diastolic: parsedData.nursingManagement?.diastolic || '',
        healthTemperature: parsedData.nursingManagement?.healthTemperature || '',
        healthCareProvided: parsedData.nursingManagement?.healthCareProvided || false,
        nursingCareProvided: parsedData.nursingManagement?.nursingCareProvided || false,
        emergencyCareProvided: parsedData.nursingManagement?.emergencyCareProvided || false,
        healthNote: parsedData.nursingManagement?.healthNote || '',
      }))
    }
  }, [])

  const selectOption = (key: keyof Chart['nursingManagement'], value: any) => {
    const existingChartData = JSON.parse(localStorage.getItem('chartData') || '{}')

    const updatedNursingManagement = {
      ...existingChartData.nursingManagement,
      [key]: value,
    }

    const updatedChartData = {
      ...existingChartData,
      nursingManagement: updatedNursingManagement,
    }
    localStorage.setItem('chartData', JSON.stringify(updatedChartData))

    // Update the component's state
    setSelectedOptions(updatedNursingManagement)
  }

  const handleInputChange = (key: keyof Chart['nursingManagement'], value: any) => {
    selectOption(key, value)
  }

  const validateInputs = () => {
    const { systolic, diastolic, healthTemperature } = selectedOptions
    const newErrors: any = {
      systolicError: '',
      diastolicError: '',
      healthTemperatureError: '',
    }

    if (!systolic) newErrors.systolicError = '최고 혈압을 입력해주세요'
    if (!diastolic) newErrors.diastolicError = '최저 혈압을 입력해주세요'
    if (!healthTemperature) newErrors.healthTemperatureError = '체온을 입력해주세요'

    setErrors(newErrors)

    return !Object.values(newErrors).some((error) => error)
  }

  const confirm = () => {
    if (validateInputs()) {
      if (chartType === 'DIY') {
        navigate('/chart/significant/nursing')
      } else if (chartType === 'record') {
        navigate('/chart/audioRecord/nursing')
      }
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
            firstInputValue={selectedOptions.systolic}
            secondInputValue={selectedOptions.diastolic}
            onFirstInputChange={(value) => handleInputChange('systolic', value)}
            onSecondInputChange={(value) => handleInputChange('diastolic', value)}
          />
          {errors.systolicError && <ErrorMessage>{errors.systolicError}</ErrorMessage>}
          {errors.diastolicError && <ErrorMessage>{errors.diastolicError}</ErrorMessage>}
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
          {errors.healthTemperatureError && (
            <ErrorMessage>{errors.healthTemperatureError}</ErrorMessage>
          )}
        </div>
        <CheckBox
          icon={health}
          title="건강 관리"
          checked={selectedOptions.healthCareProvided}
          onChange={() => selectOption('healthCareProvided', !selectedOptions.healthCareProvided)}
        />
        <CheckBox
          icon={nursing}
          title="간호 관리"
          checked={selectedOptions.nursingCareProvided}
          onChange={() => selectOption('nursingCareProvided', !selectedOptions.nursingCareProvided)}
        />
        <CheckBox
          icon={emergency}
          title="기타(응급)"
          checked={selectedOptions.emergencyCareProvided}
          onChange={() =>
            selectOption('emergencyCareProvided', !selectedOptions.emergencyCareProvided)
          }
        />
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
