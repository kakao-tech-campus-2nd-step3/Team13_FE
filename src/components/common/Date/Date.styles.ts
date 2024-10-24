import { colors } from '@/styles/colors'
import styled from 'styled-components'

const Date = styled.div`
  color: ${colors.text.subtle};
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
`

const LogoContainer = styled.div`
  color: ${colors.primary.main};
  background-color: #ececec;
  width: 24px;
  height: 24px;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`

export { Date, LogoContainer }
