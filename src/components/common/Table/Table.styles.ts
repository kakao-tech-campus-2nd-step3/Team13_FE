import styled from '@emotion/styled'
import { colors } from '@/styles/colors/colors'

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 23px;
`

const Table = styled.table`
  margin-top: 1rem;
  min-width: 100vw;
  width: 100%;
  border-collapse: collapse;
`

const Thead = styled.thead`
  tr {
    background-color: ${colors.primary.main};
    color: #fff;
  }

  th {
    padding: 16px;
    text-align: center;
    white-space: nowrap;
  }
`

const Tbody = styled.tbody`
  padding: 1rem 0.5rem;

  tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    vertical-align: middle;
  }

  tr:nth-of-type(even) {
    background-color: ${colors.primary.mainOpacity15};
  }

  td {
    padding: 12px;
    vertical-align: middle;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${colors.border.subtle};
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
`
const TableButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: end;
  margin-right: 20px;
`

export { Title, Table, Thead, Tbody, Input, TableButtonWrapper, ButtonWrapper }
