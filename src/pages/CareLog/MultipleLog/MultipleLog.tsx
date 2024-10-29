import Date from '@/components/common/Date/Date'
import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import human from '@/assets/icons/human.svg'
import teeth from '@/assets/icons/teeth.svg'
import shower from '@/assets/icons/shower.svg'
import { ChoiceBox } from './ChoiceBox'
import Button from '@/components/common/Button/Button'

export const MultipleLogPage = () => {
  return (
    <Wrapper>
      <DateWrapper>
        <Date year="2024" month="09" date="19" />
      </DateWrapper>
      <ChoiceGrid>
        <ChoiceBox icon={waterDrop} title="세면 도움" times={1} />
        <ChoiceBox icon={human} title="몸 단장" times={1} />
        <ChoiceBox icon={teeth} title="구강 관리" times={1} />
        <ChoiceBox icon={shower} title="세면 도움" times={2} />
        <ChoiceBox icon={teeth} title="구강 관리" times={4} />
        <ChoiceBox icon={waterDrop} title="세면 도움" times={1} />
        <ChoiceBox icon={human} title="몸 단장" times={1} />
        <ChoiceBox icon={shower} title="세면 도움" times={1} />
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          css={{
            width: '100%',
            height: '62px',
          }}
        >
          확인
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 23px;
`

const DateWrapper = styled.div`
  width: 100%;
`

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px 14px;
  width: 100%;
  justify-items: center;
  padding: 35px 0;
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
