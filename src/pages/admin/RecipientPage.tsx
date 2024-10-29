import { Table } from '@/components/common/Table/Table'

// 돌봄대상자
interface Recipient {
  id: number
  name: string
  birth: string
  gender: string
  careLevel: string
  careNumber: string
  startDate: string
  institution: string
  institutionNumber: number
  careworkerId: number
  [key: string]: unknown
}

const recipients: Recipient[] = [
  {
    id: 1,
    name: '이지수',
    birth: '2002.04.30.',
    gender: '여성',
    careLevel: 'Level 1',
    careNumber: '1234',
    startDate: '2024.01.01.',
    institution: '000 요양원',
    institutionNumber: 101,
    careworkerId: 1,
  },
]

const columns: { key: keyof Recipient; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: '이름' },
  { key: 'birth', label: '생년월일' },
  { key: 'gender', label: '성별' },
  { key: 'careLevel', label: 'Care Level' }, // 한국어로 뭐라고 표기?
  { key: 'careNumber', label: 'Care Number' }, // 한국어로 뭐라고 표기?
  { key: 'startDate', label: '시작일' },
  { key: 'institution', label: '요양원' },
  // { key: 'institutionNumber', label: '요양원 ID' }, // 사용자에게 안 보여줘도 될 것 같음
  // { key: 'careworkerId', label: '요양관리사 ID' },
]

export const RecipientPage = () => (
  <Table title="돌봄대상자 목록" columns={columns} data={recipients} />
)
