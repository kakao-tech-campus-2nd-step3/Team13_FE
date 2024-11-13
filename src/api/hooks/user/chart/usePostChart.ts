import fetchInstance from '@/api/instance/instance'
import { Chart, ChartResponseData } from './types'

const postChartPath = `/v1/careworker/chart`

export const submitChartData = async () => {
  const recipientId = localStorage.getItem('recipientId')

  const bodyManagement = JSON.parse(
    localStorage.getItem('bodyManagement') ||
      '{"wash": false, "bath": false, "mealType": "", "intakeAmount": "", "physicalRestroom": 0, "hasWalked": false,"positionChangeRequired": false,"mobilityAssistance":false, "physicalNote": ""}',
  )
  const cognitiveManagement = JSON.parse(
    localStorage.getItem('cognitiveManagement') || '{"cognitiveHelp": false, "cognitiveNote": ""}',
  )
  const nursingManagement = JSON.parse(
    localStorage.getItem('nursingManagement') ||
      '{"systolic": 0, "diastolic": 0, "healthTemperature": "", "healthNote": ""}',
  )
  const recoveryTraining = JSON.parse(
    localStorage.getItem('recoveryTraining') ||
      '{"recoveryProgram": "없음", "recoveryTraining": false, "recoveryNote": ""}',
  )
  // Assemble the chart data from localStorage
  const chartData: Chart = {
    conditionDisease: localStorage.getItem('conditionDisease') || '없음',
    recipientId: localStorage.getItem('recipientId') || '',
    bodyManagement: {
      wash: bodyManagement.wash,
      bath: bodyManagement.bath,
      mealType: bodyManagement.mealType,
      intakeAmount: bodyManagement.intakeAmount,
      physicalRestroom: bodyManagement.physicalRestroom.toString(),
      hasWalked: bodyManagement.hasWalked,
      positionChangeRequired: bodyManagement.positionChangeRequired,
      mobilityAssistance: bodyManagement.mobilityAssistance,
      physicalNote: localStorage.getItem('physicalNote') || '',
    },
    cognitiveManagement: {
      cognitiveHelp: cognitiveManagement.cognitiveHelp,
      companionshipProvided: cognitiveManagement.companionshipProvided,
      cognitiveNote: localStorage.getItem('cognitiveNote') || '',
    },
    nursingManagement: {
      systolic: nursingManagement.systolic,
      diastolic: nursingManagement.diastolic,
      healthTemperature: nursingManagement.healthTemperature,
      healthCareProvided: nursingManagement.healthCareProvided,
      nursingCareProvided: nursingManagement.nursingCareProvided,
      emergencyCareProvided: nursingManagement.emergencyCareProvided,
      healthNote: localStorage.getItem('healthNote') || '',
    },
    recoveryTraining: {
      recoveryProgram: recoveryTraining.recoveryProgram,
      recoveryTraining: recoveryTraining.recoveryTraining,
      cognitiveTrainingProvided: recoveryTraining.cognitiveTrainingProvided,
      physicalTherapyProvided: recoveryTraining.physicalTherapyProvided,
      recoveryNote: localStorage.getItem('recoveryNote') || '',
    },
  }
  const response = await fetchInstance.post<ChartResponseData>(
    `${postChartPath}?recipient-id=${recipientId}`,
    chartData,
  )
  localStorage.removeItem('bodyManagement')
  localStorage.removeItem('physicalNote')
  localStorage.removeItem('cognitiveManagement')
  localStorage.removeItem('cognitiveNote')
  localStorage.removeItem('nursingManagement')
  localStorage.removeItem('healthNote')
  localStorage.removeItem('recoveryTraining')
  localStorage.removeItem('recoveryNote')
  return response.data
}
