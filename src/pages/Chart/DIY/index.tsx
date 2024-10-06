import Button from '@/components/common/Button'
import Steps from '@/components/common/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { TextArea } from '@/components/common/TextArea'
import styled from 'styled-components'

export const DIY = () => {
  return (
    <Wrapper>
      <Steps currentStep={2} totalSteps={5} />
      <div style={{ padding: '23px 0', lineHeight: '1.2' }}>
        <Heading.Medium>
          오늘 김영숙 환자의 인지 관리
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
`
