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
    physicalNote: string
  }
  cognitiveManagement: {
    cognitiveHelp: boolean
    cognitiveNote: string
  }
  nursingManagement: {
    systolic: number
    diastolic: number
    healthTemperature: string
    healthNote: string
  }
  recoveryTraining: {
    recoveryProgram: string
    recoveryTraining: boolean
    recoveryNote: string
  }
}
