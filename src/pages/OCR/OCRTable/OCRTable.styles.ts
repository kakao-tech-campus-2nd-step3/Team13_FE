import styled from '@emotion/styled'
import { colors } from '@/styles/colors/colors'

export const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
`

export const TableHeader = styled.th`
  border: 1px solid #ccc;
  padding: 8px;
  background-color: #e2e2e2;
  font-weight: bold;
  text-align: center;
`

export const TableData = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
`

export const SectionTitle = styled.td`
  font-weight: bold;
  text-align: left;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: ${colors.primary.mainOpacity15};
`

export const SubsectionTitle = styled.td`
  font-weight: bold;
  text-align: left;
  padding: 8px;
  border: 1px solid #ccc;
`

export const ColSpanCell = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
`

export const ColGroup = styled.colgroup`
  & col:first-of-type {
    width: 30%;
  }
  & col:last-of-type {
    width: 70%;
  }
`
