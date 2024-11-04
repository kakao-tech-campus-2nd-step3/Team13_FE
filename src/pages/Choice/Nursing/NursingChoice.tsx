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
    systolic: 0,
    diastolic: 0,
    healthTemperature: '',
    healthNote: '',
  })

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem('nursingManagement')
    if (savedData) {
      setSelectedOptions(JSON.parse(savedData))
    }
  }, [])

  const handleSelectOption = (key: keyof ChartData['nursingManagement'], value: any) => {
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [key]: value }
      localStorage.setItem('nursingManagement', JSON.stringify(updatedOptions))
      return updatedOptions
    })
  }

  const handleInputChange = (key: keyof ChartData['nursingManagement'], value: any) => {
    handleSelectOption(key, value)
  }

  return (
    <Wrapper>
      <Steps currentStep={3} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>
        건강 및 간호 관리
      </Heading.Medium>
      <ChoiceGrid>
        <WriteBox
          icon={waterDrop}
          title="혈압"
          unit="mmHg"
          isDualInput={true}
          placeholderFirst="최고"
          placeholderSecond="최저"
          firstInputValue={selectedOptions.systolic.toString()}
          secondInputValue={selectedOptions.diastolic.toString()}
          onFirstInputChange={(value) => handleInputChange('systolic', Number(value) || 0)}
          onSecondInputChange={(value) => handleInputChange('diastolic', Number(value) || 0)}
        />
        <WriteBox
          icon={temperature}
          title="체온"
          unit="°C"
          isDualInput={false}
          placeholderFirst="입력해주세요"
          firstInputValue={selectedOptions.healthTemperature}
          onFirstInputChange={(value) => handleInputChange('healthTemperature', value)}
        />
        {/* <CheckBox icon={health} title="건강 관리" 
        checked={selectedOptions.??}
        onChange={() => handleSelectOption('??', !selectedOptions.??)}/>
        <CheckBox icon={nursing} title="간호 관리" checked={selectedOptions.??}
        onChange={() => handleSelectOption('??', !selectedOptions.??)}/>
        <CheckBox icon={emergency} title="기타(응급)" checked={selectedOptions.??}
        onChange={() => handleSelectOption('??', !selectedOptions.??)}/> */}
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          onClick={() => {
            navigate('/chart/choice/recovery')
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
