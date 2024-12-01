/** @jsxImportSource @emotion/react */
import React from 'react'
import Button from '@/components/common/Button/Button'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Summary } from '@/api/hooks/user/chart/types'
import { getSummaryData } from '@/api/hooks/user/chart/useGetSummary'
import { Spinner } from 'basic-loading'
import { colors } from '@/styles/colors/colors'
import styled from 'styled-components'
import { useDeleteChart } from '@/api/hooks/user/chart/useDeleteChart'

interface LogWrapperProps {
  isScrolled: boolean
}

export const CareLogPage = () => {
  const { chartId } = useParams<{ chartId: string }>()
  const navigate = useNavigate()
  const selectedDate = localStorage.getItem('selectedDate')
  const [careLog, setCareLog] = useState<Summary>()
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const { mutate: deleteChart } = useDeleteChart()
  const scroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }
  const name = localStorage.getItem('recipientName')
  const birthday = localStorage.getItem('recipientBirthday')
  const role = localStorage.getItem('role')
  const formatBirthDate = (dateString: string) => {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    return `${year}.${month}.${day}`
  }

  useEffect(() => {
    if (chartId) {
      const fetchCalendarData = async () => {
        try {
          const data = await getSummaryData(Number(chartId))
          setCareLog(data)
        } catch (error) {
          console.error('Failed to fetch recipients:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchCalendarData()
    }
  }, [chartId])

  const deleteClick = () => {
    const confirmDelete = window.confirm(`해당 날짜의 일지를 삭제하시겠습니까?`)
    if (confirmDelete && chartId) {
      deleteChart(Number(chartId))
    }
  }

  return isLoading ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner
        option={{ size: 70, thickness: 5, bgColor: '#EDF4FF', barColor: colors.primary.main }}
      />
    </div>
  ) : (
    <Container>
      <Header>
        <Birth>{formatBirthDate(birthday!)}</Birth>
        <Name>
          돌봄대상자 <span>{name}</span> 님
        </Name>
        <SubTitle>
          {careLog?.institutionName} 요양원 | {formatBirthDate(careLog?.updatedAt!)} 업데이트
        </SubTitle>
      </Header>

      <TagContainer>
        <Tag>{careLog?.tagResponse.tag1}</Tag>
        <Tag>{careLog?.tagResponse.tag2}</Tag>
        <Tag>{careLog?.tagResponse.tag3}</Tag>
      </TagContainer>

      <Content>
        <Date>
          <LogoContainer>
            <IoCalendarNumberOutline />
          </LogoContainer>
          {selectedDate}
        </Date>
        <LogWrapper onScroll={scroll} isScrolled={isScrolled}>
          <Activity>
            <b>신체 활동 지원</b>
          </Activity>
          <Activity>{careLog?.summaryResponse.body_management}</Activity>
          <Activity>
            <b>인지관리 및 의사소통</b>
          </Activity>
          <Activity>{careLog?.summaryResponse.cognitive_management}</Activity>
          <Activity>
            <b>건강 및 간호 관리</b>
          </Activity>
          <Activity>{careLog?.summaryResponse.nursing_management}</Activity>
          <Activity>
            <b>기능 회복 훈련</b>
          </Activity>
          <Activity>{careLog?.summaryResponse.recovery_training}</Activity>
        </LogWrapper>
      </Content>
      <ButtonWrapper>
        {role === 'careworker' ? (
          <Button theme="gray" margin="26px 0" width="60%" height="62px" onClick={deleteClick}>
            일지 삭제
          </Button>
        ) : null}
        <Button
          theme="dark"
          margin="26px 0"
          width="100%"
          height="62px"
          onClick={() => navigate(`/careLog/choice/body/${chartId}`)}
        >
          상세 일지 보기
        </Button>
      </ButtonWrapper>
    </Container>
  )
}
const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 0 23px;
  box-sizing: border-box;
`

const Header = styled.div`
  margin: 0 0 16px 0;
`

const Birth = styled.div`
  font-size: 20px;
  color: ${colors.text.subtle};
  margin-bottom: 12px;
`

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 36px;

  span {
    color: ${colors.primary.main};
  }
`

const SubTitle = styled.p`
  font-size: 18px;
  color: ${colors.text.subtle};
`

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  padding: 0 0 35px 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.border.subtle};
  margin-bottom: 27px;
`

const Tag = styled.span`
  background-color: ${colors.primary.mainOpacity15};
  color: ${colors.primary.main};
  font-size: 12px;
  font-weight: bold;
  padding: 8px 6px;
  border-radius: 4px;
`

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const LogoContainer = styled.div`
  color: ${colors.primary.main};
  background-color: #ececec;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`

const Date = styled.div`
  color: ${colors.text.subtle};
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`
const LogWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isScrolled'].includes(prop),
})<LogWrapperProps>`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  flex-grow: 1;

  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 10px 10px -10px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: box-shadow 0.3s ease;
`
const Activity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${colors.text.subtle};
  margin-bottom: 5px;
  line-height: 24px;
  font-size: 18px;

  b {
    width: 230px;
    font-weight: bold;
    color: #000;
    margin-top: 10px;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`
