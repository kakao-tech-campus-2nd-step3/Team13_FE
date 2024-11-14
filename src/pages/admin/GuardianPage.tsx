import { Table } from '@/components/common/Table/Table'
import { useGetGuardians } from '@/api/hooks/admin/guardian/useGetGuardian'
import { useAddGuardian } from '@/api/hooks/admin/guardian/useAddGuardian'
import { useDeleteGuardian } from '@/api/hooks/admin/guardian/useDeleteGuardian'
import { useUpdateGuardian } from '@/api/hooks/admin/guardian/useUpdateGuardian'
import { Guardian } from '@/api/hooks/admin/guardian/types'

const columns: { key: keyof Guardian; label: string }[] = [
  { key: 'institutionId', label: '요양원 ID' },
  { key: 'name', label: '이름' },
  { key: 'phone', label: '연락처' },
  { key: 'loginPassword', label: '비밀번호' },
]

export const GuardianPage = () => {
  const { data: guardians, isLoading, isError } = useGetGuardians()
  const { mutate: addGuardian } = useAddGuardian()
  const { mutate: deleteGuardian } = useDeleteGuardian()
  const { mutate: updateGuardian } = useUpdateGuardian()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>

  return (
    <Table
      title="보호자 목록"
      columns={columns}
      data={guardians || []}
      onAddRow={addGuardian}
      onDeleteRow={(guardianId: number) => deleteGuardian(guardianId)}
      onUpdateRow={(updatedRow) => {
        const { id: guardianId, ...updatedData } = updatedRow
        updateGuardian({ guardianId, updatedData })
      }}
      downloadUrl="/v1/excel/guardian/download"
      uploadUrl="/v1/excel/guardian/upload"
    />
  )
}
