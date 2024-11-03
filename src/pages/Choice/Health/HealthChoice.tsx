import styled from 'styled-components'
import waterDrop from '@/assets/icons/water_drop.svg'
import temperature from '@/assets/icons/temperature.svg'
import health from '@/assets/icons/health.svg'
import nursing from '@/assets/icons/nursing.svg'
import emergency from '@/assets/icons/emergency.svg'

import Button from '@/components/common/Button/Button'

import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'
import { WriteBox } from '@/components/features/MultipleChoice/\bWriteBox'
import { CheckBox } from '@/components/features/MultipleChoice/CheckBox'

export const HealthChoicePage = () => {
  return (
    <Wrapper>
      <Steps currentStep={3} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>
        건강 및 간호 관리
      </Heading.Medium>
      <ChoiceGrid>
        <WriteBox
          icon={waterDrop}
          title="혈압"
          unit="mmHg"
          isDualInput={true}
          placeholderFirst="최고"
          placeholderSecond="최저"
        />
        <WriteBox
          icon={temperature}
          title="체온"
          unit="°C"
          isDualInput={false}
          placeholderFirst="입력해주세요"
        />
        <CheckBox icon={health} title="건강 관리" />
        <CheckBox icon={nursing} title="간호 관리" />
        <CheckBox icon={emergency} title="기타(응급)" />
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
