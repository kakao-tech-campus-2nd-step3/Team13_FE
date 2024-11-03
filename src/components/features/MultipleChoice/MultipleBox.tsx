import whiteCheck from '@/assets/icons/check_white.svg'
import grayCheck from '@/assets/icons/check_gray.svg'
import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'

interface Props {
  icon: string
  title: string
  options: string[]
  selectedOption: string | null
  onSelectOption: (option: string) => void
}

export const MultipleBox = ({ icon, title, options, selectedOption, onSelectOption }: Props) => {
  return (
    <Box>
      <TitleBox>
        <img src={icon} alt={icon} style={{ height: '20px', marginRight: '3px' }} />
        <TitleContainer>
          <TitleText>{title}</TitleText>
          <BackgroundBar />
        </TitleContainer>
      </TitleBox>
      <OptionsContainer>
        {options.map((option) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Check
              key={option}
              onClick={() => onSelectOption(option)}
              isSelected={selectedOption === option}
            >
              {selectedOption === option ? <img src={whiteCheck} alt="selected" /> : null}
            </Check>
            <OptionText>{option}</OptionText>
          </div>
        ))}
      </OptionsContainer>
    </Box>
  )
}

const Box = styled.div`
  width: 154px;
  height: auto;
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
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 15px 15px;
`

const Check = styled.div<{ isSelected: boolean }>`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ isSelected }) => (isSelected ? colors.background.main : 'white')};
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`

const OptionText = styled.span`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 700;
`
