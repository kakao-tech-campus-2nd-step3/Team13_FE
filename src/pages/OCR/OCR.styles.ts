import { colors } from '@/styles/colors/colors'
import styled from '@emotion/styled'

export const FileInput = styled.input`
  display: none;
`

export const SquareWrapper = styled.div`
  border: 3px dashed ${colors.border.subtle};
  border-radius: 8px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`
