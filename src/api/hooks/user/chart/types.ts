export interface Chart {
  conditionDisease: string
  recipientId: string
  bodyManagement: {
    wash: boolean
    bath: boolean
    mealType: string
    intakeAmount: string
    physicalRestroom: number
    hasWalked: boolean
    positionChangeRequired: boolean
    mobilityAssistance: boolean
    physicalNote: string
  }
  cognitiveManagement: {
    cognitiveHelp: boolean
    companionshipProvided: boolean
    cognitiveNote: string
  }
  nursingManagement: {
    systolic: string
    diastolic: string
    healthTemperature: string
    healthCareProvided: boolean
    nursingCareProvided: boolean
    emergencyCareProvided: boolean
    healthNote: string
  }
  recoveryTraining: {
    recoveryProgram: string
    recoveryTraining: boolean
    cognitiveTrainingProvided: boolean
    physicalTherapyProvided: boolean
    recoveryNote: string
  }
  [key: string]: unknown
}

export type ChartResponseData = {
  chartData: Chart[]
}
