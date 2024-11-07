import Date from '@/components/common/Date/Date'
import styled from 'styled-components'
import program from '@/assets/icons/program_book.svg'
import moving from '@/assets/icons/running.svg'
import cognitiveTreatment from '@/assets/icons/cognitive_treatment.svg'
import physicalTreatment from '@/assets/icons/physical_treatment.svg'

import Button from '@/components/common/Button/Button'
import { ChoiceBox } from '@/components/features/MultipleChoice/ChoiceBox'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { colors } from '@/styles/colors/colors'
import Steps from '@/components/common/Steps/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { useNavigate } from 'react-router-dom'

export const RecoveryChoiceLogPage = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
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
      <Steps currentStep={4} totalSteps={4} isLog={true} />
      <div style={{ padding: '26px 0 0 0', lineHeight: '1.2' }}>
        <Heading.Medium>기능 회복 훈련</Heading.Medium>
      </div>
      <ChoiceGrid>
        <ChoiceBox icon={program} title="기능향상 프로그램" content={'재활 댄스'} />
        <ChoiceBox icon={moving} title="신체 동작 훈련" content={'O'} />
        <ChoiceBox icon={cognitiveTreatment} title="인지기능 훈련" content={'X'} />
        <ChoiceBox icon={physicalTreatment} title="물리치료" content={'O'} />
      </ChoiceGrid>
      <ButtonWrapper>
        <Button
          theme="dark"
          css={{
            width: '100%',
            height: '62px',
          }}
          onClick={() => {
            navigate('/careLog/significant/recovery')
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
  justify-content: start;
  align-items: start;
  flex-direction: column;
  padding: 0 23px;
`

const ChoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px 14px;
  width: 100%;
  justify-items: center;
  padding: 25px 0 35px 0;
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
