import Button from '@/components/common/Button'
import Steps from '@/components/common/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { TextArea } from '@/components/common/TextArea'
import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const OCRCheck = () => {
  return (
    <Wrapper>
      <Steps currentStep={2} totalSteps={5} />
      <div style={{ padding: '23px 0', lineHeight: '1.2' }}>
        <Heading.Medium>
          오늘 김영숙 환자의 인지 관리
          <br />
          특이 사항을 입력해 주세요.
        </Heading.Medium>
      </div>
      <TextArea customSize="large" style={{ flexGrow: 1, width: '100%', boxShadow: 'border-box' }}>
        김영숙 환자는 오늘 아침부터 기분이 매우 양호하며, 웃음을 자주 보였습니다. 아침 식사 후에는
        간호사와 함께 짧은 산책을 하였고, 이후에도 활발하게 활동했습니다. 점심에는 미역국을 특히
        맛있게 드셨으며, 식사 후에는 잠깐의 낮잠을 취했습니다. 오후에는 간단한 스트레칭을 통해 몸을
        풀었고, 체온 측정 결과 정상 범위 내에 있었습니다. 가족 방문이 있었던 오늘, 환자는 가족과의
        대화에서 더욱 즐거워 보였으며, 전반적으로 기분이 좋아보이셨습니다.
      </TextArea>
      <div
        style={{
          width: '100%',
          alignContent: 'center',
          justifyContent: 'center',
          display: 'flex',
          padding: '14px 0 ',
          boxSizing: 'border-box',
        }}
      >
        <Heading.Medium style={{ color: colors.text.prominent }}>
          입력된 내용이 맞나요 ?
        </Heading.Medium>
      </div>
      <Button
        theme="dark"
        css={{
          margin: '0 0 26px 0',
          width: '100%',
          height: '62px',
        }}
      >
        확인
      </Button>
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
