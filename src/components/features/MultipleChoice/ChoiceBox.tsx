import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'

interface Props {
  icon: string
  title: string
  content: string
}

export const ChoiceBox = ({ icon, title, content }: Props) => {
  return (
    <Box>
      <TitleBox>
        <img src={icon} alt={icon} style={{ height: '20px', marginRight: '3px' }} />
        <TitleContainer>
          <TitleText>{title}</TitleText>
          <BackgroundBar />
        </TitleContainer>
      </TitleBox>
      <PlusBox>{content}</PlusBox>
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

const PlusBox = styled.div`
  width: 154px;
  height: 59px;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 0px 5px;
  background-color: ${colors.primary.mainOpacity15};
  border-radius: 0 0 16px 16px;
  font-weight: 700;
  font-size: 15px;
`
