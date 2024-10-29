import minus from '@/assets/icons/minus.svg'
import plus from '@/assets/icons/plus.svg'
import { colors } from '@/styles/colors/colors'
import { useState } from 'react'
import styled from 'styled-components'

interface Props {
  icon: string
  title: string
}

export const ChoiceBox = ({ icon, title }: Props) => {
  const [times, setTimes] = useState(0)
  const increaseTimes = () => setTimes((prev) => prev + 1)
  const decreaseTimes = () => setTimes((prev) => (prev > 0 ? prev - 1 : 0))

  return (
    <Box>
      <TitleBox>
        <img src={icon} alt={icon} style={{ height: '20px', marginRight: '3px' }} />
        <TitleContainer>
          <TitleText>{title}</TitleText>
          <BackgroundBar />
        </TitleContainer>
      </TitleBox>
      <PlusBox>
        <Background>
          <img src={minus} alt="minus" onClick={decreaseTimes} />
          <div
            style={{
              width: '45px',
              height: '32px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '17px',
              fontWeight: '700',
            }}
          >
            {times}
          </div>
          <img src={plus} alt="plus" onClick={increaseTimes} />
        </Background>
      </PlusBox>
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
`

const Background = styled.div`
  width: 119px;
  height: 41px;
  border-radius: 8px;
  background-color: #ececec;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
`
