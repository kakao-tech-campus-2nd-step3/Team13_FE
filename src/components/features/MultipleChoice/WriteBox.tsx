import styled from 'styled-components'
import { colors } from '@/styles/colors/colors'

interface Props {
  icon: string
  title: string
  unit?: string
  isDualInput?: boolean
  placeholderFirst?: string
  placeholderSecond?: string
  firstInputValue?: string
  secondInputValue?: string
  onFirstInputChange?: (value: any) => void
  onSecondInputChange?: (value: any) => void
}

export const WriteBox = ({
  icon,
  title,
  unit = '',
  isDualInput = false,
  placeholderFirst = '',
  placeholderSecond = '',
  firstInputValue = '',
  secondInputValue = '',
  onFirstInputChange = () => {},
  onSecondInputChange = () => {},
}: Props) => {
  const handleFirstInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFirstInputChange(event.target.value)
  }

  const handleSecondInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSecondInputChange(event.target.value)
  }

  return (
    <Box>
      <TitleBox>
        <img src={icon} alt={icon} style={{ height: '20px', marginRight: '3px' }} />
        <TitleContainer>
          <TitleText>{title}</TitleText>
          <BackgroundBar />
        </TitleContainer>
      </TitleBox>
      <InputContainer>
        {isDualInput ? (
          <>
            <StyledInput
              type="text"
              value={firstInputValue}
              onChange={handleFirstInputChange}
              placeholder={placeholderFirst}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = placeholderFirst)}
              width="25%"
            />
            <Separator>/</Separator>
            <StyledInput
              type="text"
              value={secondInputValue}
              onChange={handleSecondInputChange}
              placeholder={placeholderSecond}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = placeholderSecond)}
              width="25%"
            />
            <UnitText>{unit}</UnitText>
          </>
        ) : (
          <>
            <StyledInput
              type="text"
              value={firstInputValue}
              onChange={handleFirstInputChange}
              placeholder={placeholderFirst}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = placeholderFirst)}
              width="60%"
            />
            <UnitText>{unit}</UnitText>
          </>
        )}
      </InputContainer>
    </Box>
  )
}

const Box = styled.div`
  width: 154px;
  height: 118px;
  border: 1px solid ${colors.background.disable};
  border-radius: 16px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`

const TitleBox = styled.div`
  width: 154px;
  height: 59px;
  border-bottom: 1px solid ${colors.background.disable};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleText = styled.div`
  font-weight: 700;
  font-size: 15px;
  padding: 0 4px 2px 4px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`

const BackgroundBar = styled.div`
  position: absolute;
  bottom: 0;
  height: 10px;
  width: 100%;
  background-color: rgba(72, 148, 254, 0.3);
  z-index: 0;
`

const InputContainer = styled.div`
  width: 154px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

const StyledInput = styled.input<{ width: string }>`
  width: ${({ width }) => width};
  height: 25px;
  padding: 4px;
  border: none;
  border-bottom: 1px solid ${colors.background.disable};
  font-size: 15px;
  text-align: center;
  outline: none;

  &:focus {
    border-color: ${colors.primary.main};
  }
`

const Separator = styled.span`
  font-size: 15px;
  color: ${colors.text.prominent};
`

const UnitText = styled.span`
  font-size: 14px;
  color: ${colors.text.subtle};
`
