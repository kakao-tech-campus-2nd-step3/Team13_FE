import { colors } from '@/styles/colors/colors'
import * as S from './MyPage.styles'
import { IoPersonCircle } from 'react-icons/io5'
import Button from '@/components/common/Button/Button'
import { Input } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useLogout } from '@/api/hooks/common/useLogout'
import { useUserInfo } from '@/api/hooks/user/my/useUserInfo'

export const MyPage = () => {
  const { data, isLoading, isError } = useUserInfo()

  const logout = useLogout()

  const [alarmTime, setAlarmTime] = useState(data?.alertTime || '')
  const [smsSubscription, setSmsSubscription] = useState(data?.smsSubscription || false)
  const [lineSubscription, setLineSubscription] = useState(data?.lineSubscription || false)

  useEffect(() => {
    if (data) {
      setAlarmTime(data.alertTime || '')
      setSmsSubscription(data.smsSubscription || false)
      setLineSubscription(data.lineSubscription || false)
    }
  }, [data])

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlarmTime(e.target.value)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading user data.</p>

  return (
    <S.Container>
      <S.Header>마이페이지</S.Header>
      <S.ProfileSection>
        <div>
          <IoPersonCircle size="100" color={colors.border.subtle} />
        </div>
        <S.ProfileName>{data?.name || ''}</S.ProfileName>
        <S.LogOut onClick={logout}>로그아웃</S.LogOut>
      </S.ProfileSection>
      <S.InfoSection>
        <S.InfoItem>
          <S.Label>역할</S.Label>
          <S.Value>
            {localStorage.getItem('role') === 'careworker' ? '요양보호사' : '보호자'}
          </S.Value>
        </S.InfoItem>
        {localStorage.getItem('role') === 'careworker' && data && (
          <>
            <S.InfoItem>
              <S.Label>소속</S.Label>
              <S.Value>{'institutionName' in data ? data.institutionName : ''}</S.Value>
            </S.InfoItem>
            <S.InfoItem>
              <S.Label>근무일</S.Label>
              <S.Value>{'workingDays' in data ? data.workingDays.join(', ') : ''}</S.Value>
            </S.InfoItem>
          </>
        )}
        <S.InfoItem>
          <S.Label>연락처</S.Label>
          <S.Value>{data?.phone || ''}</S.Value>
        </S.InfoItem>
        <S.InfoItem>
          <S.Label>알림 시간</S.Label>
          <S.Value>
            <Input type="time" value={alarmTime} onChange={handleTimeChange} />
          </S.Value>
        </S.InfoItem>
        <S.InfoItem>
          <S.Label>SMS 수신 동의</S.Label>
          <S.Value>
            <label>
              <S.Checkbox
                type="checkbox"
                checked={smsSubscription}
                onChange={() => setSmsSubscription(!smsSubscription)}
              />
              동의
            </label>
          </S.Value>
        </S.InfoItem>
        <S.InfoItem>
          <S.Label>LINE 수신 동의</S.Label>
          <S.Value>
            <label>
              <S.Checkbox
                type="checkbox"
                checked={lineSubscription}
                onChange={() => setLineSubscription(!lineSubscription)}
              />
              동의
            </label>
          </S.Value>
        </S.InfoItem>
      </S.InfoSection>
      <Button theme="dark" width="300px" margin="40px">
        수정
      </Button>
    </S.Container>
  )
}
