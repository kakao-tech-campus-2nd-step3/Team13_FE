import { useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { TextArea } from '@/components/common/TextArea/TextArea'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { submitChartData } from '@/api/hooks/user/chart/usePostChart'

interface DIYProps {
  step: number
  title: string
  navigateTo: string
}

const noteFieldMap: { [key: string]: string } = {
  '신체 활동 지원': 'physicalNote',
  '인지관리 및 의사소통': 'cognitiveNote',
  '건강 및 간호 관리': 'healthNote',
  '기능 회복 훈련': 'recoveryNote',
}

export const SignificantPage = ({ step, title, navigateTo }: DIYProps) => {
  const navigate = useNavigate()
  const [note, setNote] = useState<string>('')

  useEffect(() => {
    const savedNote = localStorage.getItem(noteFieldMap[title])
    if (savedNote) {
      setNote(savedNote)
    }
  }, [title])

  const confirmClick = async () => {
    localStorage.setItem(noteFieldMap[title], note)
    if (step === 4) {
      const confirmSave = window.confirm('차트를 저장하시겠습니까?')
      if (confirmSave) {
        await submitChartData()
        localStorage.clear()
        navigate('/recipients')
      }
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
        theme="dark"
        onClick={confirmClick}
        css={{
          margin: '26px 0',
          width: '100%',
          height: '62px',
        }}
      >
        확인
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
