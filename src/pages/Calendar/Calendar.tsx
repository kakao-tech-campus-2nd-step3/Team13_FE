import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { colors } from '@/styles/colors/colors'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCalendarData } from '@/api/hooks/chart/useGetCalendar'
import { CalendarData } from '@/types/types' // CalendarData 타입을 가져옵니다.

export const CalendarPage = () => {
  const location = useLocation()
  const { name, birthday } = location.state || {}
  const [selectedDate, setSelectedDate] = useState('')
  const [availableDates, setAvailableDates] = useState<CalendarData[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // API 호출
    const fetchCalendarData = async () => {
      try {
        const response = await getCalendarData()
        if (response.success) {
          // API 응답을 CalendarData 타입에 맞게 변환
          const dates = response.response.map((item: CalendarData) => ({
            chartId: item.chartId,
            recipientName: item.recipientName,
            chartDate: item.chartDate,
          }))
          setAvailableDates(dates)
        }
      } catch (error) {
        console.error('Calendar API 호출 중 오류 발생:', error)
      }
    }
    fetchCalendarData()
  }, [])

  useEffect(() => {
    // 월의 날짜 수 계산
    const days = new Date(selectedYear, selectedMonth, 0).getDate()
    setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1))
  }, [selectedYear, selectedMonth])

  const isDateAvailable = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return availableDates.some((item) => item.chartDate === dateStr)
  }

  const handleDayClick = (day: number) => {
    if (isDateAvailable(day)) {
      const clickedDate = availableDates.find(
        (item) =>
          item.chartDate ===
          `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      )
      if (clickedDate) {
        console.log(`Selected chartId: ${clickedDate.chartId}`)
        console.log(`Selected name: ${clickedDate.recipientName}`)
        setSelectedDate(
          `${selectedYear}.${String(selectedMonth).padStart(2, '0')}.${String(day).padStart(2, '0')}.`,
        )
        navigate(`/careLog/${clickedDate.chartId}`, { state: { name, birthday, selectedDate } })
      }
    }
  }

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedMonth(selectedMonth > 1 ? selectedMonth - 1 : 12)
      setSelectedYear(selectedMonth > 1 ? selectedYear : selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth < 12 ? selectedMonth + 1 : 1)
      setSelectedYear(selectedMonth < 12 ? selectedYear : selectedYear + 1)
    }
  }

  return (
    <Wrapper>
      <Header>
        <Heading.Medium style={{ color: 'black', margin: '70px 0 13px 0' }}>
          <span style={{ color: `${colors.text.prominent}` }}>김쿠키</span> 님의 요양일지
        </Heading.Medium>
        <TextBody.Large style={{ color: `${colors.text.subtle}` }}>
          일지를 확인할 날짜를 선택해주세요.
        </TextBody.Large>
      </Header>
      <CalendarWrapper>
        <MonthWraper>
          <MonthButton onClick={() => handleMonthChange('prev')}>◀</MonthButton>
          <Title>{`${selectedYear}. ${selectedMonth.toString().padStart(2, '0')}`}</Title>
          <MonthButton onClick={() => handleMonthChange('next')}>▶</MonthButton>
        </MonthWraper>
        <DaysGrid>
          {daysInMonth.map((day) => (
            <Day
              key={day}
              available={isDateAvailable(day) || undefined}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </Day>
          ))}
        </DaysGrid>
      </CalendarWrapper>
      <Footer>
        <div
          style={{ borderBottom: `1px solid  ${colors.text.subtle}` }}
          onClick={() => navigate('/recipients')}
        >
          <TextBody.Large style={{ color: `${colors.text.subtle}` }}>
            돌봄대상자 목록으로 가기
          </TextBody.Large>
        </div>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 0 28px;
  box-sizing: border-box;
`
const Header = styled.div`
  width: 100%;
  margin-bottom: 80px;
`

const Footer = styled.div`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CalendarWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
`
const MonthWraper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`

const MonthButton = styled.button`
  background: none;
  border: none;
  color: ${colors.text.subtle};
  font-size: 0.9rem;
  cursor: pointer;
`

const DaysGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 20px;
  box-sizing: border-box;
`

interface DayProps {
  available?: boolean
}

const Day = styled.div<DayProps>`
  padding: 20px 7px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 20px;
  font-weight: 600;
  font-size: 20px;
  color: ${({ available }) => (available ? colors.primary.main : colors.border.subtle)};
  cursor: ${({ available }) => (available ? 'pointer' : 'default')};
  pointer-events: ${({ available }) => (available ? 'auto' : 'none')};
  &:hover {
    background-color: ${({ available }) => (available ? colors.primary.main : 'transparent')};
    color: ${({ available }) => (available ? 'white' : colors.border.subtle)};
  }
`
