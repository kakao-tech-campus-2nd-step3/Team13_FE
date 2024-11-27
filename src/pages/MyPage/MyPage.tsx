import { colors } from '@/styles/colors/colors'
import * as S from './MyPage.styles'
import { IoPersonCircle } from 'react-icons/io5'
import Button from '@/components/common/Button/Button'
import { Input } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useLogout } from '@/api/hooks/common/useLogout'
import { useUserInfo } from '@/api/hooks/user/my/useUserInfo'

export const MyPage = () => {
  const { data, isLoading, isError, updateUserInfo } = useUserInfo()
  const logout = useLogout()

  const role = localStorage.getItem('role') || 'careworker'

  const [alarmTime, setAlarmTime] = useState(data?.alertTime || '')
  const [smsSubscription, setSmsSubscription] = useState(data?.smsSubscription || false)
  const [lineSubscription, setLineSubscription] = useState(data?.lineSubscription || false)
  const [workingDays, setWorkingDays] = useState<string[]>([])

  useEffect(() => {
    if (data) {
      setAlarmTime(data.alertTime || '')
      setSmsSubscription(data.smsSubscription || false)
      setLineSubscription(data.lineSubscription || false)
      if (role === 'careworker' && 'workingDays' in data) {
        setWorkingDays(data.workingDays || [])
      }
    }
  }, [data, role])

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlarmTime(e.target.value)
  }

  const handleUpdate = () => {
    const updatedData = {
      alertTime: alarmTime,
      smsSubscription,
      lineSubscription,
      ...(role === 'careworker' && { workingDays }),
    }

    updateUserInfo(updatedData)
  }

  const translateWorkingDays = (workingDays: string[]): string => {
    const dayMap: { [key: string]: string } = {
      MONDAY: '월',
      TUESDAY: '화',
      WEDNESDAY: '수',
      THURSDAY: '목',
      FRIDAY: '금',
      SATURDAY: '토',
      SUNDAY: '일',
    }
    return workingDays.map((day) => dayMap[day] || day).join(', ')
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
          <S.Value>{role === 'careworker' ? '요양보호사' : '보호자'}</S.Value>
        </S.InfoItem>
        {role === 'careworker' && data && (
          <>
            <S.InfoItem>
              <S.Label>소속</S.Label>
              <S.Value>{'institutionName' in data ? data.institutionName : ''}</S.Value>
            </S.InfoItem>
            <S.InfoItem>
              <S.Label>근무일</S.Label>
              <S.Value>
                {'workingDays' in data ? translateWorkingDays(data.workingDays) : ''}
              </S.Value>
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
                onChange={() => {
                  if (!smsSubscription) {
                    alert(
                      'SMS와 LINE 중 하나만 선택 가능합니다. SMS 수신 동의를 선택하면 LINE 수신 동의가 해제됩니다.',
                    )
                    setLineSubscription(false)
                  }
                  setSmsSubscription(!smsSubscription)
                }}
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
                onChange={() => {
                  if (!lineSubscription) {
                    alert(
                      'SMS와 LINE 중 하나만 선택 가능합니다. LINE 수신 동의를 선택하면 SMS 수신 동의가 해제됩니다.',
                    )
                    setSmsSubscription(false)
                  }
                  setLineSubscription(!lineSubscription)
                }}
              />
              동의
            </label>
          </S.Value>
        </S.InfoItem>
      </S.InfoSection>
      <Button theme="dark" width="300px" margin="40px" onClick={handleUpdate}>
        수정
      </Button>
    </S.Container>
  )
}
