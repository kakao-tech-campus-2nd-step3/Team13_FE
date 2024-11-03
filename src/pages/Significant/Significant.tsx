import { useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { TextArea } from '@/components/common/TextArea/TextArea'
import styled from 'styled-components'

interface DIYProps {
  step: number
  title: string
  navigateTo: string
}

export const SignificantPage = ({ step, title, navigateTo }: DIYProps) => {
  const navigate = useNavigate()
  const handleConfirmClick = () => {
    navigate(navigateTo)
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
      ></TextArea>
      <Button
        theme="dark"
        onClick={handleConfirmClick}
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
