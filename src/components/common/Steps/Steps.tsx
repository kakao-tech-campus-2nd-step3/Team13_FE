import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'
import checkIcon from '@/assets/icons/check_icon.svg'
import { useNavigate } from 'react-router-dom'

interface StepsProps {
  currentStep: number
  totalSteps: number
  isLog?: boolean
  chartId?: string
}

const stepPaths_post = [
  '/chart/choice/body',
  '/chart/choice/cognitive',
  '/chart/choice/nursing',
  '/chart/choice/recovery',
]

const stepPaths_get = [
  '/careLog/choice/body',
  '/careLog/choice/cognitive',
  '/careLog/choice/nursing',
  '/careLog/choice/recovery',
]

function Steps({ currentStep, totalSteps, isLog = false, chartId = '' }: StepsProps) {
  const navigate = useNavigate()
  const stepPaths = isLog ? stepPaths_get : stepPaths_post
  const handleStepClick = (index: number, isCompleted: boolean, isCurrent: boolean) => {
    if (isLog) {
      navigate(`${stepPaths[index]}/${chartId}`)
    } else if (isCompleted || isCurrent) {
      navigate(stepPaths[index])
    }
  }

  return (
    <StepWrapper>
      {[...Array(totalSteps)].map((_, index) => {
        const isCurrent = index + 1 === currentStep
        const isCompleted = index < currentStep - 1

        return (
          <Step key={index} onClick={() => handleStepClick(index, isCompleted, isCurrent)}>
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
  width: 96%;
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
  cursor: pointer;
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

const StepNumber = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCurrent', 'isCompleted'].includes(prop),
})<{ isCurrent: boolean; isCompleted: boolean }>`
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

const Divider = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCompleted'].includes(prop),
})<{ isCompleted: boolean }>`
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
