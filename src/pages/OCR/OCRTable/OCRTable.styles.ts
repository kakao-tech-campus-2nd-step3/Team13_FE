import styled from '@emotion/styled'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
`

export const TableHeader = styled.th`
  border: 1px solid #000;
  padding: 8px;
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
`

export const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #fafafa;
  }
`

export const TableData = styled.td`
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
`

export const SectionTitleRow = styled.tr`
  background-color: #e0e0e0;
`

export const SectionTitle = styled.td`
  font-weight: bold;
  text-align: left;
  padding: 10px;
  border: 1px solid #000;
  background-color: #e0e0e0;
`

export const SubsectionTitle = styled.td`
  font-weight: bold;
  text-align: left;
  padding: 8px;
  border: 1px solid #000;
  background-color: #f9f9f9;
`

export const ColSpanCell = styled.td`
  border: 1px solid #000;
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
