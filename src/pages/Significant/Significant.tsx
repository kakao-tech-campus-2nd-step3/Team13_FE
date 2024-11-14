import { useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { TextArea } from '@/components/common/TextArea/TextArea'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { submitChartData } from '@/api/hooks/user/chart/usePostChart'
import { updateChartData } from '@/api/hooks/user/chart/useUpdateChart'

interface DIYProps {
  step: number
  title: string
  navigateTo: string
}

const noteFieldMap: { [key: string]: string[] } = {
  '신체 활동 지원': ['bodyManagement', 'physicalNote'],
  '인지관리 및 의사소통': ['cognitiveManagement', 'cognitiveNote'],
  '건강 및 간호 관리': ['nursingManagement', 'healthNote'],
  '기능 회복 훈련': ['recoveryTraining', 'recoveryNote'],
}

export const SignificantPage = ({ step, title, navigateTo }: DIYProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [note, setNote] = useState<string>('')
  const state = localStorage.getItem('state')

  useEffect(() => {
    const savedChartData = localStorage.getItem('chartData')
    if (savedChartData) {
      const parsedData = JSON.parse(savedChartData)
      const field = noteFieldMap[title]
      const savedNote = parsedData?.[field[0]]?.[field[1]] || ''
      setNote(savedNote)
    } else {
      setNote('')
    }
  }, [title])

  const confirmClick = async () => {
    const existingChartData = JSON.parse(localStorage.getItem('chartData') || '{}')
    const field = noteFieldMap[title]
    const updatedChartData = {
      ...existingChartData,
      [field[0]]: {
        ...existingChartData[field[0]],
        [field[1]]: note,
      },
    }
    localStorage.setItem('chartData', JSON.stringify(updatedChartData))

    if (step === 4) {
      const confirmSave = window.confirm('차트를 저장하시겠습니까?')
      if (confirmSave) {
        setLoading(true)
        try {
          if (state === 'post') {
            await submitChartData()
          } else if (state === 'put') {
            await updateChartData(Number(localStorage.getItem('chartId')))
          }
        } catch (error) {
          console.error('Error saving chart:', error)
        } finally {
          setLoading(false)
        }
      }
      navigate('/recipients')
    } else {
      navigate(navigateTo)
    }
  }

  return (
    <Wrapper>
      <Steps currentStep={step} totalSteps={4} />
      <div style={{ padding: '23px 0', lineHeight: '1.2' }}>
        <Heading.Medium>
          {title}에 대한
          <br />
          특이 사항을 입력해 주세요.
        </Heading.Medium>
      </div>
      <TextArea
        customSize="large"
        style={{ flexGrow: 1, width: '100%', boxShadow: 'border-box' }}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button
        theme={loading ? 'gray' : 'dark'}
        onClick={confirmClick}
        disabled={loading}
        css={{
          margin: '26px 0',
          width: '100%',
          height: '62px',
        }}
      >
        {loading ? '저장 중...' : '확인'}
      </Button>
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

export default SignificantPage
