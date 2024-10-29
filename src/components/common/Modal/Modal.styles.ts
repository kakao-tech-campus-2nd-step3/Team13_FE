import { colors } from '@/styles/colors'
import styled from '@emotion/styled'

const FileInput = styled.input`
  display: none;
`

const SquareWrapper = styled.div`
  border: 3px dashed ${colors.border.subtle};
  border-radius: 8px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
  },
}

export { FileInput, SquareWrapper, ButtonWrapper, customModalStyles }
