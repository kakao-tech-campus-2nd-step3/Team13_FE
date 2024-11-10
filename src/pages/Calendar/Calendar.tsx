import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Back from '@/components/common/Back/Back'
import { colors } from '@/styles/colors/colors'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { useNavigate } from 'react-router-dom'

interface CalendarProps {
  availableDates: { date: string; name: string }[]
}

const Calendar = ({ availableDates }: CalendarProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1) // January is 0
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])
  const navigate = useNavigate()
  // Extract available date strings for easier checking
  const availableDateStrings = availableDates.map((item) => item.date)

  useEffect(() => {
    // Calculate number of days in the selected month
    const days = new Date(selectedYear, selectedMonth, 0).getDate()
    setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1))
  }, [selectedYear, selectedMonth])

  const isDateAvailable = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return availableDateStrings.includes(dateStr)
  }

  const handleDayClick = (day: number) => {
    if (isDateAvailable(day)) {
      console.log(`Date clicked: ${selectedYear}-${selectedMonth}-${day}`)
      const clickedDate = availableDates.find(
        (item) =>
          item.date ===
          `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      )
      if (clickedDate) {
        console.log(`Selected name: ${clickedDate.name}`)
        // Redirect to another page or handle selection with clickedDate.name
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
          <Title>{`${selectedYear}. ${selectedMonth.toString().padStart(2, '0')}`}</Title>{' '}
          <MonthButton onClick={() => handleMonthChange('next')}>▶</MonthButton>
        </MonthWraper>
        <DaysGrid>
          {daysInMonth.map((day) => (
            <Day key={day} available={isDateAvailable(day)} onClick={() => handleDayClick(day)}>
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

// Example data for availableDates
const exampleAvailableDates = [
  { date: '2024-10-02', name: 'Event 1' },
  { date: '2024-09-04', name: 'Event 2' },
  { date: '2024-03-16', name: 'Event 3' },
  { date: '2024-11-02', name: 'Event 1' },
  { date: '2024-11-04', name: 'Event 2' },
  { date: '2024-11-16', name: 'Event 3' },
]

const CalendarPage = () => <Calendar availableDates={exampleAvailableDates} />

// Styled components
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
  available: boolean
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

export default CalendarPage
