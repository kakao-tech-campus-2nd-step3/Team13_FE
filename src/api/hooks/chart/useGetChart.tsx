import axios from 'axios'

const role = localStorage.getItem('role')?.toLowerCase()

const getCareLogPath = () => `/summary`
const getDetailLogPath = (chartId: number) => `/v1/${role}/chart/${chartId}`

export const getCareLogData = async ({ chartId }: { chartId: number }) => {
  const path = getCareLogPath()
  try {
    const response = await axios.get(path, { params: { chartId: chartId } })
    return response.data
  } catch (error) {
    console.error('요약일지 데이터 요청 중 오류:', error)
    return { success: false, response: [], error: { status: 500, message: 'API 호출 실패' } }
  }
}

export const getDetailLogData = async ({ chartId }: { chartId: number }) => {
  const path = getDetailLogPath(chartId) // Pass chartId to getDetailLogPath
  try {
    const response = await axios.get(path)
    return response.data
  } catch (error) {
    console.error('상세일지 데이터 요청 중 오류:', error)
    return { success: false, response: [], error: { status: 500, message: 'API 호출 실패' } }
  }
}
