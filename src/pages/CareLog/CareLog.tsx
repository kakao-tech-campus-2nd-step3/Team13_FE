/** @jsxImportSource @emotion/react */
import Button from '@/components/common/Button/Button'
import * as S from '../../styles/pages/CareLog.styles'
import '../../styles/pages/CareLog.styles'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Summary } from '@/api/hooks/user/chart/types'
import { getSummaryData } from '@/api/hooks/user/chart/useGetSummary'

export const CareLogPage = () => {
  const location = useLocation()
  const { selectedDate } = location.state || {}
  const { chartId } = useParams<{ chartId: string }>()
  const navigate = useNavigate()
  const [careLog, setCareLog] = useState<Summary>()

  const name = localStorage.getItem('recipientName')
  const birthday = localStorage.getItem('recipientBirthday')

  const formatBirthDate = (dateString: string) => {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    return `${year}.${month}.${day}`
  }
  console.log(selectedDate)
  useEffect(() => {
    if (chartId) {
      const fetchCalendarData = async () => {
        try {
          const data = await getSummaryData(Number(chartId))
          setCareLog(data)
        } catch (error) {
          console.error('Failed to fetch recipients:', error)
        }
      }
      fetchCalendarData()
    }
  }, [chartId])

  return (
    <S.Container>
      <S.Header>
        <S.Birth>{formatBirthDate(birthday!)}</S.Birth>
        <S.Name>
          돌봄대상자 <span>{name}</span> 님
        </S.Name>
        <S.SubTitle>
          {careLog?.institutionName} 요양원 | {formatBirthDate(careLog?.updatedAt!)} 업데이트
        </S.SubTitle>
      </S.Header>

      <S.TagContainer>
        <S.Tag>{careLog?.tagResponse.tag1}</S.Tag>
        <S.Tag>{careLog?.tagResponse.tag2}</S.Tag>
        <S.Tag>{careLog?.tagResponse.tag3}</S.Tag>
      </S.TagContainer>

      <S.Content>
        <S.Date>
          <S.LogoContainer>
            <IoCalendarNumberOutline />
          </S.LogoContainer>
          {selectedDate}
        </S.Date>
        <S.LogWrapper>
          <S.Activity>
            <b>신체 활동 지원</b>
          </S.Activity>
          <S.Activity>{careLog?.summaryResponse.body_management}</S.Activity>
          <S.Activity>
            <b>인지관리 및 의사소통</b>
          </S.Activity>
          <S.Activity>{careLog?.summaryResponse.cognitive_management}</S.Activity>
          <S.Activity>
            <b>건강 및 간호 관리</b>
          </S.Activity>
          <S.Activity>{careLog?.summaryResponse.nursing_management}</S.Activity>
          <S.Activity>
            <b>기능 회복 훈련</b>
          </S.Activity>
          <S.Activity>{careLog?.summaryResponse.recovery_training}</S.Activity>
        </S.LogWrapper>
      </S.Content>

      <Button
        theme="dark"
        margin="26px 0"
        width="100%"
        height="62px"
        onClick={() => navigate(`/careLog/choice/body/${chartId}`, { state: { selectedDate } })}
      >
        상세 일지 보기
      </Button>
    </S.Container>
  )
}
