import styled from 'styled-components'
import cognitive from '@/assets/icons/cognitive.svg'
import clap from '@/assets/icons/clap.svg'

import Button from '@/components/common/Button/Button'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Chart } from '@/api/hooks/user/chart/types'

export const CognitiveChoicePage = () => {
  const navigate = useNavigate()
  const chartType = localStorage.getItem('chartType')
  const [selectedOptions, setSelectedOptions] = useState<Chart['cognitiveManagement']>({
    cognitiveHelp: false,
    companionshipProvided: false,
    cognitiveNote: '',
  })

  useEffect(() => {
    const savedChartData = localStorage.getItem('chartData')
    if (savedChartData) {
      const parsedData = JSON.parse(savedChartData)

      setSelectedOptions((prev) => ({
        ...prev,
        cognitiveHelp: parsedData.cognitiveManagement?.cognitiveHelp || false,
        companionshipProvided: parsedData.cognitiveManagement?.companionshipProvided || false,
        cognitiveNote: parsedData.cognitiveManagement?.cognitiveNote || '',
      }))
    }
  }, [])

  const selectOption = (key: keyof Chart['cognitiveManagement'], value: any) => {
    const existingChartData = JSON.parse(localStorage.getItem('chartData') || '{}')

    const updatedCognitiveManagement = {
      ...existingChartData.cognitiveManagement,
      [key]: value,
    }

    const updatedChartData = {
      ...existingChartData,
      cognitiveManagement: updatedCognitiveManagement,
    }
    localStorage.setItem('chartData', JSON.stringify(updatedChartData))

    // Update the component's state
    setSelectedOptions(updatedCognitiveManagement)
  }

  return (
    <Wrapper>
      <Steps currentStep={2} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>
        인지관리 및 의사소통
      </Heading.Medium>
      <ChoiceGrid>
        <CheckBox
          icon={cognitive}
          title="인지관리 지원"
          checked={selectedOptions.cognitiveHelp}
          onChange={() => selectOption('cognitiveHelp', !selectedOptions.cognitiveHelp)}
        />
        <CheckBox
          icon={clap}
          title="말벗 및 격려"
          checked={selectedOptions.companionshipProvided}
          onChange={() =>
            selectOption('companionshipProvided', !selectedOptions.companionshipProvided)
          }
        />
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          onClick={() => {
            if (chartType === 'DIY') {
              navigate('/chart/significant/cognitive')
            } else if (chartType === 'record') {
              navigate('/chart/audioRecord/cognitive')
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
