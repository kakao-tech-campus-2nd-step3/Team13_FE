import { Table } from '@/components/common/Table/Table'

// 요양관리사
interface CareWorker {
  id: number
  institutionId: number
  name: string
  email: string
  phone: string
  [key: string]: unknown
}

const careWorkers: CareWorker[] = [
  { id: 1, institutionId: 100, name: '이지수', email: '1234@example.com', phone: '010-0000-0000' },
  { id: 2, institutionId: 101, name: '이지수', email: '1234@example.com', phone: '010-0000-0000' },
]

const columns: { key: keyof CareWorker; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'institutionId', label: '요양원 ID' },
  { key: 'name', label: '이름' },
  { key: 'email', label: '이메일' },
  { key: 'phone', label: '연락처' },
]

export const CareWorkerPage = () => (
  <>
    <Table title="요양관리사 목록" columns={columns} data={careWorkers} />
  </>
)
