export interface Chart {
  conditionDisease: string
  recipientId: number
  bodyManagement: {
    wash: boolean
    bath: boolean
    mealType: string
    intakeAmount: string
    physicalRestroom: string
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
  response: Chart[]
}

//일지 내역
export interface Calendar {
  chartId: number
  recipientName: string
  chartDate: string
  [key: string]: unknown
}

export type CalendarResponseData = {
  response: Calendar[]
}

//요약일지
export type Summary = {
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

export type SummaryResponseData = {
  response: Summary
}
