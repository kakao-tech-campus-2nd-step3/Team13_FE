import { colors } from '@/styles/colors/colors'
import styled from '@emotion/styled'

const FileListWrapper = styled.div`
  width: 100%;
  height: 100%;
`
const FileList = styled.div`
  border-radius: 4px;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: ${colors.primary.mainOpacity15};
`

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

export { FileListWrapper, FileList, FileInput, SquareWrapper, ButtonWrapper, customModalStyles }
