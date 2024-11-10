import { Table } from '@/components/common/Table/Table'
import { useGetInstitutions } from '@/api/hooks/admin/institution/useGetInstitution'
import { useAddInstitution } from '@/api/hooks/admin/institution/useAddInstitution'
import { useDeleteInstitution } from '@/api/hooks/admin/institution/useDeleteInstitution'
import { useUpdateInstitution } from '@/api/hooks/admin/institution/useUpdateInstitution'
import { Institution } from '@/api/hooks/admin/institution/types'

// const institutions: Institution[] = [{ institutionNumber: 101, institutionName: '000 요양원' }]

const columns: { key: keyof Institution; label: string }[] = [
  { key: 'institutionNumber', label: '요양원 ID' },
  { key: 'institutionName', label: '요양원명' },
]

export const InstitutionPage = () => {
  const { data: institutions, isLoading, isError } = useGetInstitutions()
  const { mutate: addInstitution } = useAddInstitution()
  const { mutate: deleteInstitution } = useDeleteInstitution()
  const { mutate: updateInstitution } = useUpdateInstitution()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>

  return (
    <Table
      title="요양원 목록"
      columns={columns}
      data={institutions || []}
      onAddRow={addInstitution}
      onDeleteRow={(institutionNumber: number) => deleteInstitution(institutionNumber)}
      onUpdateRow={(updatedRow) =>
        updateInstitution({
          institutionNumber: updatedRow.institutionNumber,
          updatedData: {
            institutionName: updatedRow.institutionName,
          },
        })
      }
    />
  )
}
