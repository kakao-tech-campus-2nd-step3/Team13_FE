import apiInstance from '@/provider/Auth/apiInstance'
import { Chart } from './types'

const postChartPath = () => `/v1/careworker/chart`

export const submitChartData = async () => {
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
      '{"recoveryProgram": "", "recoveryTraining": false, "recoveryNote": ""}',
  )
  // Assemble the chart data from localStorage
  const chartData: Chart = {
    conditionDisease: localStorage.getItem('conditionDisease') || '',
    recipientId: localStorage.getItem('recipientId') || '',
    bodyManagement: {
      wash: bodyManagement.wash,
      bath: bodyManagement.bath,
      mealType: bodyManagement.mealType,
      intakeAmount: bodyManagement.intakeAmount,
      physicalRestroom: bodyManagement.physicalRestroom,
<<<<<<<< HEAD:src/api/hooks/chart/usePostChart.tsx
      has_walked: bodyManagement.has_walked,
      isPositionChangeRequired: bodyManagement.isPositionChangeRequired,
      isMobilityAssistance: bodyManagement.isMobilityAssistance,
========
      hasWalked: bodyManagement.hasWalked,
      positionChangeRequired: bodyManagement.positionChangeRequired,
      mobilityAssistance: bodyManagement.mobilityAssistance,
>>>>>>>> week11:src/api/hooks/user/chart/usePostChart.ts
      physicalNote: localStorage.getItem('physicalNote') || '',
    },
    cognitiveManagement: {
      cognitiveHelp: cognitiveManagement.cognitiveHelp,
<<<<<<<< HEAD:src/api/hooks/chart/usePostChart.tsx
      isCompanionshipProvided: cognitiveManagement.isCompanionshipProvided,
========
      companionshipProvided: cognitiveManagement.companionshipProvided,
>>>>>>>> week11:src/api/hooks/user/chart/usePostChart.ts
      cognitiveNote: localStorage.getItem('cognitiveNote') || '',
    },
    nursingManagement: {
      systolic: nursingManagement.systolic,
      diastolic: nursingManagement.diastolic,
      healthTemperature: nursingManagement.healthTemperature,
<<<<<<<< HEAD:src/api/hooks/chart/usePostChart.tsx
      isHealthCareProvided: nursingManagement.isHealthCareProvided,
      isNursingCareProvided: nursingManagement.isNursingCareProvided,
      isEmergencyCareProvided: nursingManagement.isEmergencyCareProvided,
========
      healthCareProvided: nursingManagement.healthCareProvided,
      nursingCareProvided: nursingManagement.nursingCareProvided,
      emergencyCareProvided: nursingManagement.emergencyCareProvided,
>>>>>>>> week11:src/api/hooks/user/chart/usePostChart.ts
      healthNote: localStorage.getItem('healthNote') || '',
    },
    recoveryTraining: {
      recoveryProgram: recoveryTraining.recoveryProgram,
      recoveryTraining: recoveryTraining.recoveryTraining,
<<<<<<<< HEAD:src/api/hooks/chart/usePostChart.tsx
      isCognitiveTrainingProvided: recoveryTraining.isCognitiveTrainingProvided,
      isPhysicalTherapyProvided: recoveryTraining.isPhysicalTherapyProvided,
========
      cognitiveTrainingProvided: recoveryTraining.cognitiveTrainingProvided,
      physicalTherapyProvided: recoveryTraining.physicalTherapyProvided,
>>>>>>>> week11:src/api/hooks/user/chart/usePostChart.ts
      recoveryNote: localStorage.getItem('recoveryNote') || '',
    },
  }

  try {
    await apiInstance.post(postChartPath(), chartData)
    console.log('Chart data submitted successfully!')
    localStorage.removeItem('bodyManagement')
    localStorage.removeItem('cognitiveManagement')
    localStorage.removeItem('nursingManagement')
    localStorage.removeItem('recoveryTraining')
    localStorage.removeItem('conditionDisease')
    localStorage.removeItem('recipientId')
    localStorage.removeItem('physicalNote')
    localStorage.removeItem('cognitiveNote')
    localStorage.removeItem('healthNote')
    localStorage.removeItem('recoveryNote')
  } catch (error) {
    console.error('Error submitting chart data:', error)
  }
}
