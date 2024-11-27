import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { colors } from '@/styles/colors/colors'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCalendarData } from '@/api/hooks/user/chart/useGetCalendar'
import { Calendar } from '@/api/hooks/user/chart/types'

export const CalendarPage = () => {
  const location = useLocation()
  const { name, birthday } = location.state || {}
  const [selectedDate, setSelectedDate] = useState('')
  const [availableDates, setAvailableDates] = useState<Calendar[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])
  const [startDay, setStartDay] = useState(0)
  const navigate = useNavigate()

  const recipientId = Number(localStorage.getItem('recipientId'))
  const role = localStorage.getItem('role')

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const data = await getCalendarData(recipientId, role!)
        setAvailableDates(data)
      } catch (error) {
        console.error('Failed to fetch recipients:', error)
      }
    }
    fetchCalendarData()
  }, [])

  useEffect(() => {
    const days = new Date(selectedYear, selectedMonth, 0).getDate()
    setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1))

    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay()
    setStartDay(firstDayOfMonth)
  }, [selectedYear, selectedMonth])

  const isDateAvailable = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return availableDates.some((item) => item.chartDate === dateStr)
  }

  const dayClick = (day: number) => {
    if (isDateAvailable(day)) {
      const clickedDate = availableDates.find(
        (item) =>
          item.chartDate ===
          `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      )
      if (clickedDate) {
        const newSelectedDate = `${selectedYear}.${String(selectedMonth).padStart(2, '0')}.${String(day).padStart(2, '0')}`
        setSelectedDate(newSelectedDate)
        localStorage.setItem('selectedDate', newSelectedDate)
        navigate(`/careLog/${clickedDate.chartId}`, {
          state: { name, birthday },
        })
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
          <span style={{ color: `${colors.text.prominent}` }}>
            {localStorage.getItem('recipientName')}
          </span>
          님의 요양일지
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
          {Array(startDay)
            .fill(null)
            .map((_, idx) => (
              <Placeholder key={`empty-${idx}`} />
            ))}
          {daysInMonth.map((day) => (
            <Day
              key={day}
              available={isDateAvailable(day) ? 'true' : undefined}
              onClick={() => dayClick(day)}
            >
              {day}
            </Day>
          ))}
        </DaysGrid>
      </CalendarWrapper>
      <Footer>
        <div
          style={{ borderBottom: `1px solid  ${colors.text.subtle}`, cursor: 'pointer' }}
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

const Placeholder = styled.div`
  padding: 20px 7px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 20px;
  background: none;
  cursor: default;
`
const Wrapper = styled.div`
  width: 100%;
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
  available?: string
}

const Day = styled.div<DayProps>`
  padding: 20px 7px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 20px;
  font-weight: 600;
  font-size: 20px;
  color: ${({ available }) => (available === 'true' ? colors.primary.main : colors.border.subtle)};
  cursor: ${({ available }) => (available === 'true' ? 'pointer' : 'default')};
  pointer-events: ${({ available }) => (available === 'true' ? 'auto' : 'none')};
  &:hover {
    background-color: ${({ available }) =>
      available === 'true' ? colors.primary.main : 'transparent'};
    color: ${({ available }) => (available === 'true' ? 'white' : colors.border.subtle)};
  }
`
