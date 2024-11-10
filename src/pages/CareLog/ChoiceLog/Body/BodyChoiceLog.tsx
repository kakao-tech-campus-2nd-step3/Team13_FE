import Date from '@/components/common/Date/Date'
import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import shower from '@/assets/icons/shower.svg'
import meal from '@/assets/icons/meal.svg'
import mealAmount from '@/assets/icons/meal_amount.svg'
import movement from '@/assets/icons/movement.svg'
import bathroom from '@/assets/icons/toilet.svg'
import wheelchair from '@/assets/icons/wheelchair.svg'
import walking from '@/assets/icons/walking.svg'
import Button from '@/components/common/Button/Button'
import { ChoiceBox } from '@/components/features/MultipleChoice/ChoiceBox'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { colors } from '@/styles/colors/colors'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface ListWrapperProps {
  isScrolled: boolean
}

export const BodyChoiceLogPage = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const handleScroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }
  return (
    <Wrapper>
      <TitleWrapper>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'end',
            justifyContent: 'start',
            marginBottom: '18px',
            gap: '10px',
          }}
        >
          <IoCalendarNumberOutline
            style={{ color: `${colors.border.prominent}`, width: '23px', height: '23px' }}
          />
          <div style={{ fontSize: '20px', color: `${colors.text.subtle}`, fontWeight: '700' }}>
            2024.09.19.
          </div>
        </div>
        <Steps currentStep={1} totalSteps={4} isLog={true} />
        <div
          style={{
            width: '100%',
            padding: '26px 0 15px 0',
            lineHeight: '1.2',
          }}
        >
          <Heading.Medium>신체 활동 지원</Heading.Medium>
        </div>
      </TitleWrapper>

      <ListWrapper onScroll={handleScroll} isScrolled={isScrolled}>
        <ChoiceGrid>
          <ChoiceBox icon={waterDrop} title="청결 관리" content={'O'} />
          <ChoiceBox icon={shower} title="목욕" content={'O'} />
          <ChoiceBox icon={movement} title="체위 변경" content={'X'} />
          <ChoiceBox icon={wheelchair} title="이동 도움" content={'O'} />
          <ChoiceBox icon={walking} title="산책 / 외출 동행" content={'X'} />
          <ChoiceBox icon={bathroom} title="화장실 이용 횟수" content={'5회'} />
          <ChoiceBox icon={meal} title="식사 종류" content={'일반식'} />
          <ChoiceBox icon={mealAmount} title="섭취량" content={'1/2 이상'} />
        </ChoiceGrid>

        <ButtonWrapper>
          <Button
            theme="dark"
            css={{
              width: '100%',
              height: '62px',
            }}
            onClick={() => {
              navigate('/careLog/significant/body')
            }}
          >
            확인
          </Button>
        </ButtonWrapper>
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
`

const TitleWrapper = styled.div`
  padding: 0 23px;
  width: 100%;
  box-sizing: border-box;
`

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px 14px;
  width: 100%;
  justify-items: center;
  padding: 10px 0 35px 0;
  box-sizing: border-box;

  @media (max-width: 300px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 0 26px 0;
  box-sizing: border-box;
  margin-top: auto; /* 항상 하단에 위치 */
`
const ListWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isScrolled'].includes(prop),
})<ListWrapperProps>`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  flex-grow: 1;
  padding: 0 23px;

  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 10px 10px -10px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: box-shadow 0.3s ease;
`
