import { useState } from 'react'
import Button from '../Button/Button'
import * as S from './Table.styles'
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md'
import { FileUploadModal } from '../Modal/Modal'

interface TableRow extends Record<string, unknown> {
  id?: number
  isNew?: boolean
  institutionNumber?: number
}

interface TableProps<T extends TableRow> {
  title: string
  columns: { key: keyof T; label: string }[]
  data: T[]
  onAddRow?: (newRow: Partial<T>) => void
  onDeleteRow?: (institutionNumber: number) => void
  onUpdateRow?: (updatedRow: T) => void
}

export const Table = <T extends TableRow>({
  title,
  columns,
  data,
  onAddRow,
  onDeleteRow,
  onUpdateRow,
}: TableProps<T>) => {
  const [tableData, setTableData] = useState<T[]>(data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)

  const handleAddRow = () => {
    const newRow: T = { id: tableData.length + 1, isNew: true } as T
    columns.forEach((col) => {
      if (col.key !== 'id') newRow[col.key] = '' as T[keyof T]
    })
    setTableData([...tableData, newRow])
  }

  const handleCellChange = (rowIndex: number, key: keyof T, value: string) => {
    const updatedData = [...tableData]
    updatedData[rowIndex] = { ...updatedData[rowIndex], [key]: value }
    setTableData(updatedData)
  }

  const handlePost = (rowIndex: number) => {
    const rowToAdd = tableData[rowIndex]
    if (onAddRow) {
      onAddRow(rowToAdd)
      const updatedData = [...tableData]
      updatedData[rowIndex].isNew = false
      setTableData(updatedData)
    }
  }

  const handleDelete = (institutionNumber?: number) => {
    if (institutionNumber !== undefined && onDeleteRow) {
      onDeleteRow(institutionNumber)
      const updatedData = tableData.filter((row) => row.institutionNumber !== institutionNumber)
      setTableData(updatedData)
    }
  }

  const handleEdit = (rowIndex: number) => {
    setEditingRowIndex(rowIndex)
  }

  const handleUpdate = (rowIndex: number) => {
    const updatedRow = tableData[rowIndex]
    if (onUpdateRow) {
      onUpdateRow(updatedRow)
    }
    setEditingRowIndex(null)
  }

  return (
    <>
      <S.Title>{title}</S.Title>
      <S.Table>
        <S.Thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.label}</th>
            ))}
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </S.Thead>
        <S.Tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {row.isNew || (editingRowIndex === rowIndex && col.key !== 'id') ? (
                    <S.Input
                      placeholder={col.label}
                      type="text"
                      value={String(row[col.key] || '')}
                      onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                    />
                  ) : (
                    <>{String(row[col.key])}</>
                  )}
                </td>
              ))}
              {row.isNew ? (
                <td colSpan={2}>
                  <S.TableButtonWrapper>
                    <Button
                      theme="gray"
                      width="100%"
                      height="10px"
                      onClick={() => handlePost(rowIndex)}
                    >
                      확인
                    </Button>
                  </S.TableButtonWrapper>
                </td>
              ) : editingRowIndex === rowIndex ? (
                <td colSpan={2}>
                  <S.TableButtonWrapper>
                    <Button
                      theme="gray"
                      width="100%"
                      height="10px"
                      onClick={() => handleUpdate(rowIndex)}
                    >
                      수정
                    </Button>
                  </S.TableButtonWrapper>
                </td>
              ) : (
                <>
                  <td>
                    <MdOutlineModeEdit
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEdit(rowIndex)}
                    />
                  </td>
                  <td>
                    <MdDeleteOutline
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(row.institutionNumber)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </S.Tbody>
      </S.Table>

      <S.ButtonWrapper>
        <Button theme="light-outlined" height="50px" margin="0 5px 0 0" onClick={handleAddRow}>
          직접 추가
        </Button>

        <Button theme="dark" height="50px" onClick={() => setIsModalOpen(true)}>
          파일 업로드로 추가
        </Button>

        <FileUploadModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
      </S.ButtonWrapper>
    </>
  )
}
