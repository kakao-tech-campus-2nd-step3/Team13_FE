import Button from '@/components/common/Button'
import Date from '@/components/common/Date/Date'
import Steps from '@/components/common/Steps'
import { Heading } from '@/components/common/Text/TextFactory'
import { TextArea } from '@/components/common/TextArea'
import styled from 'styled-components'

export const DetailLogEntry = () => {
  return (
    <Wrapper>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: '18px',
        }}
      >
        <Date year="2024" month="09" date="19" />
      </div>

      <Steps currentStep={2} totalSteps={4} />
      <div style={{ padding: '26px 0 15px 0', lineHeight: '1.2' }}>
        <Heading.Medium>상태 변화 정보</Heading.Medium>
      </div>
      <TextBox>
        김영숙 환자는 오늘 아침부터 기분이 매우 양호하며, 웃음을 자주 보였습니다. 아침 식사 후에는
        간호사와 함께 짧은 산책을 하였고, 이후에도 활발하게 활동했습니다. 점심에는 미역국을 특히
        맛있게 드셨으며, 식사 후에는 잠깐의 낮잠을 취했습니다. 오후에는 간단한 스트레칭을 통해 몸을
        풀었고, 체온 측정 결과 정상 범위 내에 있었습니다. 가족 방문이 있었던 오늘, 환자는 가족과의
        대화에서 더욱 즐거워 보였으며, 전반적으로 긍정적인 반응을 보였습니다. 환자의 상태가 잘
        유지되고 있으므로, 계속 뭐시기 저시기 어쩌구 저쩌구 울랄라 낮잠을 취했습니다. 오후에는
        간단한 스트레칭을 통해 몸을 풀었고, 체온 측정 결과 정상 범위 내에 있었습니다. 가족 방문이
        있었던 오늘, 환자는 가족과의 대화에서 더욱 즐거워 보였으며, 전반적으로 긍정적인 반응을
        보였습니다. 환자의 상태가 잘 유지되고 있으므로, 계속 뭐시기 저시기 어쩌구 저쩌구 울랄라
      </TextBox>
      <Button
        theme="dark"
        css={{
          margin: '26px 0',
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

const TextBox = styled.div`
  font-size: 20px;
  flex-grow: 1;
  padding: 5px;
  box-sizing: border-box;
  line-height: 1.6;
  overflow: scroll;
`
