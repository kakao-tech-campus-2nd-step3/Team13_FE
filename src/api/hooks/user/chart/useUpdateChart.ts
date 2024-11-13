import fetchInstance from '@/api/instance/instance'
import { Chart, ChartResponseData } from './types'

const postChartPath = `/v1/careworker/chart`

export const updateChartData = async (chartId: number) => {
  const chartData = localStorage.getItem('chartData')
  const recipientId = localStorage.getItem('recipientId')

  if (!chartData || !recipientId) {
    throw new Error('chartData 또는 recipientId가 없습니다.')
  }

  const parsedChartData = JSON.parse(chartData)

  const chart: Chart = {
    conditionDisease: '',
    recipientId: Number(recipientId),
    bodyManagement: {
      wash: parsedChartData.bodyManagement?.wash || false,
      bath: parsedChartData.bodyManagement?.bath || false,
      mealType: parsedChartData.bodyManagement?.mealType || '',
      intakeAmount: parsedChartData.bodyManagement?.intakeAmount || '',
      physicalRestroom: parsedChartData.bodyManagement?.physicalRestroom || '',
      hasWalked: parsedChartData.bodyManagement?.hasWalked || false,
      positionChangeRequired: parsedChartData.bodyManagement?.positionChangeRequired || false,
      mobilityAssistance: parsedChartData.bodyManagement?.mobilityAssistance || false,
      physicalNote: parsedChartData.bodyManagement?.physicalNote || '',
    },
    cognitiveManagement: {
      cognitiveHelp: parsedChartData.cognitiveManagement?.cognitiveHelp || false,
      companionshipProvided: parsedChartData.cognitiveManagement?.companionshipProvided || false,
      cognitiveNote: parsedChartData.cognitiveManagement?.cognitiveNote || '',
    },
    nursingManagement: {
      systolic: parsedChartData.nursingManagement?.systolic || '',
      diastolic: parsedChartData.nursingManagement?.diastolic || '',
      healthTemperature: parsedChartData.nursingManagement?.healthTemperature || '',
      healthCareProvided: parsedChartData.nursingManagement?.healthCareProvided || false,
      nursingCareProvided: parsedChartData.nursingManagement?.nursingCareProvided || false,
      emergencyCareProvided: parsedChartData.nursingManagement?.emergencyCareProvided || false,
      healthNote: parsedChartData.nursingManagement?.healthNote || '',
    },
    recoveryTraining: {
      recoveryProgram: parsedChartData.recoveryTraining?.recoveryProgram || '',
      recoveryTraining: parsedChartData.recoveryTraining?.recoveryTraining || false,
      cognitiveTrainingProvided:
        parsedChartData.recoveryTraining?.cognitiveTrainingProvided || false,
      physicalTherapyProvided: parsedChartData.recoveryTraining?.physicalTherapyProvided || false,
      recoveryNote: parsedChartData.recoveryTraining?.recoveryNote || '',
    },
  }
  const response = await fetchInstance.put<ChartResponseData>(`${postChartPath}/${chartId}`, chart)

  localStorage.removeItem('chartData')
  return response.data
}
