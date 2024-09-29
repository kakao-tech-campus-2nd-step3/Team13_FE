import Steps from '@/components/common/Steps'
import styled from 'styled-components'

export const DIY = () => {
  return (
    <Wrapper>
      <Steps currentStep={2} totalSteps={5} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
