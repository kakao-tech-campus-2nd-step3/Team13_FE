import whiteCheck from '@/assets/icons/check_white.svg'
import grayCheck from '@/assets/icons/check_gray.svg'
import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'

interface Props {
  icon: string
  title: string
  checked: boolean
  onChange: () => void
}

export const CheckBox = ({ icon, title, checked, onChange }: Props) => {
  return (
    <Box>
      <TitleBox>
        <img src={icon} alt={icon} style={{ height: '20px', marginRight: '3px' }} />
        <TitleContainer>
          <TitleText>{title}</TitleText>
          <BackgroundBar />
        </TitleContainer>
      </TitleBox>
      <Check>
        <div
          onClick={onChange}
          style={{
            width: '25px',
            height: '25px',
            backgroundColor: checked ? colors.background.main : 'white',
            borderRadius: '4px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '17px',
            fontWeight: '700',
          }}
        >
          {checked ? (
            <img src={whiteCheck} alt="white_check" />
          ) : (
            <img src={grayCheck} alt="gray_check" />
          )}
        </div>
      </Check>
    </Box>
  )
}

// 스타일 정의 그대로 유지
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

const Check = styled.div`
  width: 154px;
  height: 59px;
  justify-content: center;
  align-items: center;
  display: flex;
`
