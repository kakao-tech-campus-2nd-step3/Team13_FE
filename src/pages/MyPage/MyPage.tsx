import { colors } from '@/styles/colors/colors'
import * as S from './MyPage.styles'
import { IoPersonCircle } from 'react-icons/io5'
import Button from '@/components/common/Button/Button'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'

// 추후 삭제 예정
const mockData = {
  name: '김쿠키님',
  nursingHome: '00 요양원',
  workDays: '월, 수, 금',
  alarmTime: '08:00',
}

export const MyPageWithMock = () => <MyPage {...mockData} />

export default MyPageWithMock

interface MyPageProps {
  name: string
  nursingHome: string
  workDays: string
  alarmTime: string
}

export const MyPage: React.FC<MyPageProps> = ({
  name,
  nursingHome,
  workDays,
  alarmTime: propsAlarmTime,
}) => {
  const [alarmTime, setAlarmTime] = useState(propsAlarmTime)

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlarmTime(e.target.value)
  }

  return (
    <S.Container>
      <S.Header>마이페이지</S.Header>
      <S.ProfileSection>
        <div>
          <IoPersonCircle size="100" color={colors.border.subtle} />
        </div>
        <S.ProfileName>{name}</S.ProfileName>
        <S.Role>요양보호사</S.Role>
      </S.ProfileSection>
      <S.InfoSection>
        <S.InfoItem>
          <S.Label>소속</S.Label>
          <S.Value>{nursingHome}</S.Value>
        </S.InfoItem>
        <S.InfoItem>
          <S.Label>근무일</S.Label>
          <S.Value>{workDays}</S.Value>
        </S.InfoItem>
        <S.InfoItem>
          <S.Label>알림 시간</S.Label>
          <S.Value>
            <Input type="time" defaultValue={alarmTime} onChange={handleTimeChange} />
          </S.Value>
        </S.InfoItem>
      </S.InfoSection>
      <Button theme="dark" width="300px" margin="40px">
        확인
      </Button>
    </S.Container>
  )
}
