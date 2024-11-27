import { breakpoints } from '@/styles/breakpoints/breakpoints'
import styled from '@emotion/styled'

type TextBoxProps = {
  children: React.ReactNode
}

const IntroText = styled.div<TextBoxProps>`
  display: flex;
  padding: 60px 45px;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 8px;
  border-radius: 36px;
  background: #f2f2f2;
  color: black;
  font-size: 23px;
  font-weight: 600;
  line-height: 1.6;

  @media (max-width: ${breakpoints.md}) {
    padding: 50px 35px;
    font-size: 16px;
    line-height: 28px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 40px 25px;
    font-size: 15px;
    line-height: 26px;
  }

  @media (max-width: ${breakpoints.xs}) {
    padding: 30px 20px;
    font-size: 14px;
    line-height: 24px;
    border-radius: 24px;
  }
`

export default IntroText
