export type ChartData = {
  conditionDisease: string
  recipient: {
    id: string
  }
  bodyManagement: {
    wash: boolean
    bath: boolean
    mealType: string
    intakeAmount: string
    physicalRestroom: number
    has_walked: boolean
    isPositionChangeRequired: boolean
    isMobilityAssistance: boolean
    physicalNote: string
  }
  cognitiveManagement: {
    cognitiveHelp: boolean
    isCompanionshipProvided: boolean
    cognitiveNote: string
  }
  nursingManagement: {
    systolic: string
    diastolic: string
    healthTemperature: string
    isHealthCareProvided: boolean
    isNursingCareProvided: boolean
    isEmergencyCareProvided: boolean
    healthNote: string
  }
  recoveryTraining: {
    recoveryProgram: string
    recoveryTraining: boolean
    isCognitiveTrainingProvided: boolean
    isPhysicalTherapyProvided: boolean
    recoveryNote: string
  }
}

export type CalendarData = {
  chartId: number
  recipientName: string
  chartDate: string
}

export type CareLogData = {
  summaryResponse: {
    condition_disease: string
    body_management: string
    nursing_management: string
    cognitive_management: string
    recovery_training: string
  }
  tagResponse: {
    tag1: string
    tag2: string
    tag3: string
  }
  updatedAt: string
  institutionName: string
}
