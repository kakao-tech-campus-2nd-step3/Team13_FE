import { Table } from '@/components/common/Table/Table'

// 요양원
interface Institution {
  institutionNumber: number
  institutionName: string
  [key: string]: unknown
}

const institutions: Institution[] = [{ institutionNumber: 101, institutionName: '000 요양원' }]

const columns: { key: keyof Institution; label: string }[] = [
  { key: 'institutionNumber', label: '요양원 ID' },
  { key: 'institutionName', label: '요양원명' },
]

export const InstitutionPage = () => (
  <Table title="요양원 목록" columns={columns} data={institutions} />
)
