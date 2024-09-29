import { colors } from '@/styles/colors'
import styled from 'styled-components'
import checkIcon from '@/assets/icons/check_icon.svg'

interface StepsProps {
  currentStep: number
  totalSteps: number
}

function Steps({ currentStep, totalSteps }: StepsProps) {
  return (
    <StepWrapper>
      {[...Array(totalSteps)].map((_, index) => {
        const isCurrent = index + 1 === currentStep // Current step logic
        const isCompleted = index < currentStep - 1 // Completed step logic

        return (
          <Step key={index}>
            {isCompleted ? (
              <Done>
                <img src={checkIcon} alt="done" style={{ width: '13px' }} />
              </Done>
            ) : (
              <StepNumber isCurrent={isCurrent} isCompleted={isCompleted}>
                {index + 1}
              </StepNumber>
            )}
            {index < totalSteps - 1 && <Divider isCompleted={isCompleted} />}
          </Step>
        )
      })}
    </StepWrapper>
  )
}

const StepWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;
  justify-content: space-between;
  flex-direction: row;
`

const Step = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  width: 100%;
`
const Done = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  background-color: ${colors.background.done};
`
const StepNumber = styled.div<{ isCurrent: boolean; isCompleted: boolean }>`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ isCurrent, isCompleted }) => {
    if (isCurrent) return `${colors.background.main}`
    if (isCompleted) return `${colors.background.done}`
    return 'lightgrey'
  }};
  color: white;
  font-weight: 500;
`

const Divider = styled.div<{ isCompleted: boolean }>`
  width: 100%;
  height: 2px;
  background-color: ${({ isCompleted }) =>
    isCompleted ? colors.background.done : colors.background.disable};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1000;
  margin-left: 12.5px;
`

export default Steps
