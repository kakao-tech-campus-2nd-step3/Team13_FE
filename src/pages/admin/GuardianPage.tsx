import { Table } from '@/components/common/Table/Table'

// 보호자
interface Guardian {
  phone: string
  name: string
  isActive: boolean
  [key: string]: unknown
}

const guardians: Guardian[] = [{ phone: '010-0000-0000', name: '이지수', isActive: true }]

const columns: { key: keyof Guardian; label: string }[] = [
  { key: 'name', label: '이름' },
  { key: 'phone', label: '연락처' },
  //   { key: 'isActive', label: 'DB에 남겨두는 용도' },
]

export const GuardianPage = () => <Table title="보호자 목록" columns={columns} data={guardians} />
