import { colors } from '@/styles/colors/colors'
import { useNavigate } from 'react-router-dom'
import newChart from '@/assets/icons/chart_write.svg'
import chartList from '@/assets/icons/chart_list.svg'
import styled from 'styled-components'
import { Calendar } from '@/api/hooks/user/chart/types'
import { getCalendarData } from '@/api/hooks/user/chart/useGetCalendar'
import { getDetailLogData } from '@/api/hooks/chart/useGetChart'

interface Props {
  recipientId: number
  picture: string
  name: string
  birthday: string
  width?: string
  height?: string
  borderRadius?: string
}

export const RecipientsList = ({
  recipientId,
  picture,
  name,
  birthday,
  width = '48px',
  height = '48px',
  borderRadius = '50%',
}: Props) => {
  const navigate = useNavigate()
  const currentRole = localStorage.getItem('role')
  const todayKST = new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '-')
    .replace('.', '')
  const formatBirthDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    return `${year.slice(2)}${month}${day}`
  }
  const role = localStorage.getItem('role')

  const handleNewChartClick = async () => {
    try {
      const response = await getCalendarData(recipientId, role!)
      const todayChart = response.find((chart: Calendar) => chart.chartDate === todayKST)

      if (todayChart) {
        const confirmUpdate = window.confirm(`해당 날짜의 일지가 존재합니다. 수정하시겠습니까?`)
        if (confirmUpdate) {
          const chartId = todayChart.chartId
          localStorage.setItem('chartId', chartId.toString())
          localStorage.removeItem('state')
          localStorage.setItem('state', 'put')
          const chartResponse = await getDetailLogData({ chartId: Number(chartId) })
          const chartData = chartResponse.response

          localStorage.setItem('chartData', JSON.stringify(chartData))
          navigate('/chart/choice/body')
        }
      } else {
        console.log('No chart for today found.')
        localStorage.removeItem('state')
        localStorage.removeItem('recipientId')
        localStorage.removeItem('recipientName')
        localStorage.removeItem('recipientBirthday')
        localStorage.setItem('state', 'post')
        localStorage.setItem('recipientId', recipientId.toString())
        localStorage.setItem('recipientName', name)
        localStorage.setItem('recipientBirthday', birthday)
        navigate('/chart')
      }
    } catch (error) {
      console.error('Error fetching chart data:', error)
    }
  }

  return (
    <Wrapper
      onClick={
        currentRole == 'guardian'
          ? () => {
              localStorage.removeItem('recipientId')
              localStorage.removeItem('recipientName')
              localStorage.removeItem('recipientBirthday')
              localStorage.setItem('recipientId', recipientId.toString())
              localStorage.setItem('recipientName', name)
              localStorage.setItem('recipientBirthday', birthday)
              navigate('/calendar', { state: { name, birthday } })
            }
          : () => {}
      }
    >
      <ProfileWrapper>
        <img
          src={picture}
          style={{
            height,
            width,
            borderRadius,
            marginRight: '20px',
          }}
        ></img>
        <div style={{ color: colors.text.moderate, fontSize: '24px', marginRight: '12px' }}>
          {name}
        </div>
        <div style={{ color: colors.text.subtle, fontSize: '20px' }}>
          {formatBirthDate(birthday)}
        </div>
      </ProfileWrapper>

      {currentRole == 'careworker' ? (
        <SelectWrapper>
          <img
            src={newChart}
            alt="new chart"
            onClick={() => {
              handleNewChartClick()
            }}
          />
          <img
            src={chartList}
            alt="chart list"
            onClick={() => {
              localStorage.removeItem('recipientId')
              localStorage.removeItem('recipientName')
              localStorage.removeItem('recipientBirthday')
              localStorage.setItem('recipientId', recipientId.toString())
              localStorage.setItem('recipientName', name)
              localStorage.setItem('recipientBirthday', birthday)
              navigate('/calendar', { state: { name, birthday } })
            }}
          />
        </SelectWrapper>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 1px;
  border-bottom: 1px solid ${colors.border.subtle};

  &:last-child {
    border-bottom: none;
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
`

const SelectWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
`
