import axios from 'axios'

const role = localStorage.getItem('role')?.toLowerCase()

// API 경로 설정 함수
const getCalendarPath = () => `/v1/${role}/chart/recipient`

// API 호출 함수
export const getCalendarData = async () => {
  const path = getCalendarPath()
  try {
    const response = await axios.get(path)
    return response.data
  } catch (error) {
    console.error('Calendar data 요청 중 오류:', error)
    return { success: false, response: [], error: { status: 500, message: 'API 호출 실패' } }
  }
}
