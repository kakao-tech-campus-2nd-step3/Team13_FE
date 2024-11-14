import { CareWorker } from '@/api/hooks/admin/careWorker/types'
import { useAddCareWorker } from '@/api/hooks/admin/careWorker/useAddCareWorker'
import { useDeleteCareWorker } from '@/api/hooks/admin/careWorker/useDeleteCareWorker'
import { useGetCareWorkers } from '@/api/hooks/admin/careWorker/useGetCareWorker'
import { useUpdateCareWorker } from '@/api/hooks/admin/careWorker/useUpdateCareWorker'
import { Table } from '@/components/common/Table/Table'

const columns: { key: keyof CareWorker; label: string }[] = [
  { key: 'id', label: '순서' },
  { key: 'institutionId', label: '요양원 ID' },
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
  { key: 'phone', label: '연락처' },
  { key: 'loginPassword', label: '비밀번호' },
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
      title="요양보호사 목록"
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
      downloadUrl="/v1/excel/careworker/download"
      uploadUrl="/v1/excel/careworker/upload"
    />
  )
}
