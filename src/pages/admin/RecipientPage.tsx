import { Recipient } from '@/api/hooks/admin/recipient/types'
import { useAddRecipient } from '@/api/hooks/admin/recipient/useAddRecipient'
import { useDeleteRecipient } from '@/api/hooks/admin/recipient/useDeleteRecipient'
import { useGetRecipients } from '@/api/hooks/admin/recipient/useGetRecipient'
import { useUpdateRecipient } from '@/api/hooks/admin/recipient/useUpdateRecipient'
import { Table } from '@/components/common/Table/Table'

const columns: { key: keyof Recipient; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '이름' },
  { key: 'birth', label: '생년월일' },
  { key: 'gender', label: '성별' },
  { key: 'careLevel', label: 'Care Level' },
  { key: 'careNumber', label: 'Care Number' },
  { key: 'startDate', label: '시작일' },
  { key: 'institution', label: '요양원' },
  { key: 'institutionNumber', label: '요양원 ID' },
  { key: 'institutionId', label: '요양원 ID' },
  { key: 'careworkerId', label: '요양관리사 ID' },
  { key: 'guardianId', label: '보호자 ID' },
]

export const RecipientPage = () => {
  const { data: recipients, isLoading, isError } = useGetRecipients()
  const { mutate: addRecipient } = useAddRecipient()
  const { mutate: deleteRecipient } = useDeleteRecipient()
  const { mutate: updateRecipient } = useUpdateRecipient()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>

  return (
    <Table
      title="돌봄대상자 목록"
      columns={columns}
      data={recipients || []}
      onAddRow={addRecipient}
      onDeleteRow={(recipientId: number) => deleteRecipient(recipientId)}
      onUpdateRow={(updatedRow) => {
        const { id, ...updatedData } = updatedRow
        updateRecipient({
          recipientId: id,
          updatedData,
        })
      }}
      downloadUrl="/v1/excel/recipient/download"
      uploadUrl="/v1/excel/recipient/upload"
    />
  )
}
