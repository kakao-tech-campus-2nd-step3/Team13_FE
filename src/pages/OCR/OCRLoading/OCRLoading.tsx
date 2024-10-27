import { Heading } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import { Spinner } from 'basic-loading'
import styled from 'styled-components'

export const OCRLoadingPage = () => {
  return (
    <Wrapper>
      <div style={{ marginBottom: '37px' }}>
        <Spinner
          option={{ size: 80, thickness: 15, bgColor: '#EDF4FF', barColor: colors.primary.main }}
        />
      </div>

      <Heading.Medium
        style={{
          color: colors.text.subtle,
          fontWeight: '300',
          lineHeight: '1.3',
          textAlign: 'center',
        }}
      >
        손글씨를 인식 중입니다
        <br />
        잠시만 기다려주세요
      </Heading.Medium>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
