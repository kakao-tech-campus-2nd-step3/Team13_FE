import { useState } from 'react'
import Button from '../Button/Button'
import * as S from './Table.styles'
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md'
import { FileUploadModal } from '../Modal/Modal'

export interface TableRow extends Record<string, unknown> {
  id: number
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
  downloadUrl?: string
  uploadUrl?: string
}

export const Table = <T extends TableRow>({
  title,
  columns,
  data,
  onAddRow,
  onDeleteRow,
  onUpdateRow,
  downloadUrl,
  uploadUrl,
}: TableProps<T>) => {
  const [tableData, setTableData] = useState<T[]>(data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)

  const role = localStorage.getItem('role')

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

  const handleAction = (action: 'add' | 'update', rowIndex: number) => {
    const row = tableData[rowIndex]
    if (action === 'add' && onAddRow) {
      onAddRow(row)
    } else if (action === 'update' && onUpdateRow) {
      onUpdateRow(row)
    }
    const updatedData = [...tableData]
    updatedData[rowIndex].isNew = false
    setTableData(updatedData)
    setEditingRowIndex(null)
  }

  const handleDelete = (id?: number) => {
    if (id !== undefined && onDeleteRow) {
      onDeleteRow(id)
      setTableData(tableData.filter((row) => row.id !== id))
    }
  }

  const renderActionButton = (action: 'add' | 'update', rowIndex: number) => (
    <td colSpan={2}>
      <S.TableButtonWrapper>
        <Button
          theme="gray"
          width="100%"
          height="10px"
          onClick={() => handleAction(action, rowIndex)}
        >
          {action === 'add' ? '추가' : '수정'}
        </Button>
      </S.TableButtonWrapper>
    </td>
  )

  const renderTableRow = (row: T, rowIndex: number) => (
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
            <>{String(row[col.key] || '')}</>
          )}
        </td>
      ))}
      {row.isNew ? (
        renderActionButton('add', rowIndex)
      ) : editingRowIndex === rowIndex ? (
        renderActionButton('update', rowIndex)
      ) : (
        <>
          <td>
            <MdOutlineModeEdit
              style={{ cursor: 'pointer' }}
              onClick={() => setEditingRowIndex(rowIndex)}
            />
          </td>
          <td>
            <MdDeleteOutline style={{ cursor: 'pointer' }} onClick={() => handleDelete(row.id)} />
          </td>
        </>
      )}
    </tr>
  )

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
        <S.Tbody>{tableData.map((row, rowIndex) => renderTableRow(row, rowIndex))}</S.Tbody>
      </S.Table>

      <S.ButtonWrapper>
        <Button theme="light-outlined" height="50px" margin="0 5px 0 0" onClick={handleAddRow}>
          직접 추가
        </Button>

        {role !== 'admin' && (
          <Button theme="dark" height="50px" onClick={() => setIsModalOpen(true)}>
            파일 업로드로 추가
          </Button>
        )}

        <FileUploadModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          downloadUrl={downloadUrl}
          uploadUrl={uploadUrl}
        />
      </S.ButtonWrapper>
    </>
  )
}
