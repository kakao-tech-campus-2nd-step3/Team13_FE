import { fetchInstance } from '@/api/instance/instance'
import { ChartData } from '@/types/types'

const postChartPath = () => `/v1/careworker/chart`

export const submitChartData = async () => {
  const bodyManagement = JSON.parse(
    localStorage.getItem('bodyManagement') ||
      '{"wash": false, "bath": false, "mealType": "", "intakeAmount": "", "physicalRestroom": 0, "has_walked": false, "physicalNote": ""}',
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
      '{"recoveryProgram": "", "recoveryTraining": false, "recoveryNote": ""}',
  )
  // Assemble the chart data from localStorage
  const chartData: ChartData = {
    conditionDisease: localStorage.getItem('conditionDisease') || '',
    recipient: { id: localStorage.getItem('recipientId') || '' },
    bodyManagement: {
      wash: bodyManagement.wash,
      bath: bodyManagement.bath,
      mealType: bodyManagement.mealType,
      intakeAmount: bodyManagement.intakeAmount,
      physicalRestroom: bodyManagement.physicalRestroom,
      has_walked: bodyManagement.has_walked,
      isPositionChangeRequired: bodyManagement.isPositionChangeRequired,
      isMobilityAssistance: bodyManagement.isMobilityAssistance,
      physicalNote: localStorage.getItem('physicalNote') || '',
    },
    cognitiveManagement: {
      cognitiveHelp: cognitiveManagement.cognitiveHelp,
      isCompanionshipProvided: cognitiveManagement.isCompanionshipProvided,
      cognitiveNote: localStorage.getItem('cognitiveNote') || '',
    },
    nursingManagement: {
      systolic: nursingManagement.systolic,
      diastolic: nursingManagement.diastolic,
      healthTemperature: nursingManagement.healthTemperature,
      isHealthCareProvided: nursingManagement.isHealthCareProvided,
      isNursingCareProvided: nursingManagement.isNursingCareProvided,
      isEmergencyCareProvided: nursingManagement.isEmergencyCareProvided,
      healthNote: localStorage.getItem('healthNote') || '',
    },
    recoveryTraining: {
      recoveryProgram: recoveryTraining.recoveryProgram,
      recoveryTraining: recoveryTraining.recoveryTraining,
      isCognitiveTrainingProvided: recoveryTraining.isCognitiveTrainingProvided,
      isPhysicalTherapyProvided: recoveryTraining.isPhysicalTherapyProvided,
      recoveryNote: localStorage.getItem('recoveryNote') || '',
    },
  }

  try {
    await fetchInstance.post(postChartPath(), chartData)
    console.log('Chart data submitted successfully!')
  } catch (error) {
    console.error('Error submitting chart data:', error)
  }
}
