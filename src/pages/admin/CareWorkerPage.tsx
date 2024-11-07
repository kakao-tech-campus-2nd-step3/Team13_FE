import { CareWorker } from '@/api/hooks/admin/\bcareWorker/types'
import { useAddCareWorker } from '@/api/hooks/admin/\bcareWorker/useAddCareWorker'
import { useDeleteCareWorker } from '@/api/hooks/admin/\bcareWorker/useDeleteCareWorker'
import { useGetCareWorkers } from '@/api/hooks/admin/\bcareWorker/useGetCareWorker'
import { useUpdateCareWorker } from '@/api/hooks/admin/\bcareWorker/useUpdateCareWorker'
import { Table } from '@/components/common/Table/Table'

// const careWorkers: CareWorker[] = [
//   { id: 1, institutionId: 100, name: '이지수', email: '1234@example.com', phone: '010-0000-0000' },
//   { id: 2, institutionId: 101, name: '이지수', email: '1234@example.com', phone: '010-0000-0000' },
// ]

const columns: { key: keyof CareWorker; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'institutionId', label: '요양원 ID' },
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
  { key: 'phone', label: '연락처' },
]

export const CareWorkerPage = () => {
  const { data: careWorkers, isLoading, isError } = useGetCareWorkers()
  const { mutate: addCareWorker } = useAddCareWorker()
  const { mutate: deleteCareWorker } = useDeleteCareWorker()
  const { mutate: updateCareWorker } = useUpdateCareWorker()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>

  return (
    <Table
      title="요양관리사 목록"
      columns={columns}
      data={careWorkers || []}
      onAddRow={addCareWorker}
      onDeleteRow={(id: number) => deleteCareWorker(id)}
      onUpdateRow={(updatedRow) =>
        updateCareWorker({
          careworkerId: updatedRow.id,
          updatedData: {
            institutionId: updatedRow.institutionId,
            name: updatedRow.name,
            email: updatedRow.email,
            phone: updatedRow.phone,
          },
        })
      }
    />
  )
}
