/** @jsxImportSource @emotion/react */
import Button from '@/components/common/Button/Button'
import * as S from '../../styles/pages/CareLog.styles'
import '../../styles/pages/CareLog.styles'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCareLogData } from '@/api/hooks/chart/useGetChart'
import { CareLogData } from '@/types/types'

export const CareLogPage = () => {
  const location = useLocation()
  const { name, birthday, selectedDate } = location.state || {}
  const { chartId } = useParams<{ chartId: string }>()
  const navigate = useNavigate()
  const [careLog, setCareLog] = useState<CareLogData | null>(null)

  useEffect(() => {
    if (chartId) {
      // Convert chartId to a number and fetch data
      const fetchCareLogData = async () => {
        try {
          const response = await getCareLogData({ chartId: Number(chartId) })
          if (response.success) {
            setCareLog(response.response)
          }
        } catch (error) {
          console.error('요약일지 API 호출 중 오류 발생:', error)
        }
      }
      fetchCareLogData()
    }
  }, [chartId])

  return (
    <S.Container>
      <S.Header>
        <S.Birth>{birthday}</S.Birth>
        <S.Name>
          <span>{name}</span> 피요양자
        </S.Name>
        <S.SubTitle>
          {careLog?.institutionName} 요양원 |{careLog?.updatedAt} 업데이트
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
