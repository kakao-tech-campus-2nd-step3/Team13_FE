import styled from 'styled-components'
import cognitive from '@/assets/icons/cognitive.svg'
import clap from '@/assets/icons/clap.svg'

import Button from '@/components/common/Button/Button'
import { CheckBox } from '../../../components/features/MultipleChoice/CheckBox'
import { useState } from 'react'
import { Heading } from '@/components/common/Text/TextFactory'
import Steps from '@/components/common/Steps/Steps'

export const CognitiveChoicePage = () => {
  return (
    <Wrapper>
      <Steps currentStep={2} totalSteps={4} />
      <Heading.Medium style={{ marginTop: '26px', width: '100%' }}>
        인지관리 및 의사소통
      </Heading.Medium>
      <ChoiceGrid>
        <CheckBox icon={cognitive} title="인지관리 지원" />
        <CheckBox icon={clap} title="말벗 및 격려" />
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
