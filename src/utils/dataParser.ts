interface SectionData {
  [key: string]: string
}

interface DataStructure {
  physicalActivitySupport: SectionData
  cognitiveManagementAndCommunication: SectionData
  healthAndNursingCare: SectionData
  functionalRecoveryTraining: SectionData
}

export const parseData = (text: string): DataStructure => {
  const data: DataStructure = {
    physicalActivitySupport: {},
    cognitiveManagementAndCommunication: {},
    healthAndNursingCare: {},
    functionalRecoveryTraining: {},
  }

  const physicalActivitySupportMatch = text.match(
    /청결 관리.*?섭취량.*?(?=인지관리지원|인지관리 및 의사소통)/s,
  )
  if (physicalActivitySupportMatch) {
    let sectionText = physicalActivitySupportMatch[0].replace(/신체 활동 지원|특이사항/g, '').trim()
    data.physicalActivitySupport['hygieneManagement'] =
      sectionText.match(/청결 관리\s(.*?)\s/)?.[1] || ''
    data.physicalActivitySupport['bathing'] = sectionText.match(/목욕\s(.*?)\s/)?.[1] || ''
    data.physicalActivitySupport['outdoorActivity'] =
      sectionText.match(/산책\/외출\s(.*?)\s/)?.[1] || ''
    data.physicalActivitySupport['toiletUsageFrequency'] =
      sectionText.match(/화장실 이용 횟수\s(.*?)\s/)?.[1] || ''

    const mealTypeMatch = sectionText.match(/(일반식|죽|유동식)/g)
    if (mealTypeMatch) {
      data.physicalActivitySupport['mealType'] = mealTypeMatch.join(', ')
    }

    const intakeAmountMatch = sectionText.match(/(1\s*\(전부\)|1\/2\s*이상|1\/2\s*미만)/g)
    if (intakeAmountMatch) {
      data.physicalActivitySupport['intakeAmount'] = intakeAmountMatch.join(', ')
    }

    sectionText = sectionText
      .replace(
        /청결 관리\s.*?\s|목욕\s.*?\s|산책\/외출\s.*?\s|화장실 이용 횟수\s.*?\s|(일반식|죽|유동식|1\s*\(전부\)|1\/2\s*이상|1\/2\s*미만|식사 종류|섭취량)/g,
        '',
      )
      .trim()
    data.physicalActivitySupport['specialNotes'] = sectionText
  }

  const cognitiveManagementAndCommunicationMatch = text.match(
    /인지관리지원.*?인지관리 및 의사소통.*?(?=혈압|건강 및 간호 관리)/s,
  )
  if (cognitiveManagementAndCommunicationMatch) {
    let sectionText = cognitiveManagementAndCommunicationMatch[0]
      .replace(/인지관리 및 의사소통|특이사항/g, '')
      .trim()
    data.cognitiveManagementAndCommunication['cognitiveSupport'] =
      sectionText.match(/인지관리지원\s(.*?)\s/)?.[1] || ''
    sectionText = sectionText.replace(/인지관리지원\s.*?\s/g, '').trim()
    data.cognitiveManagementAndCommunication['specialNotes'] = sectionText
  }

  const healthAndNursingCareMatch = text.match(
    /혈압.*?체온.*?(?=기능향상 프로그램|기능 회복 훈련)/s,
  )
  if (healthAndNursingCareMatch) {
    let sectionText = healthAndNursingCareMatch[0].replace(/건강 및 간호 관리|특이사항/g, '').trim()
    data.healthAndNursingCare['bloodPressure'] = sectionText.match(/혈압\s(.*?)\s/)?.[1] || ''
    data.healthAndNursingCare['bodyTemperature'] = sectionText.match(/체온\s(.*?)\s/)?.[1] || ''
    sectionText = sectionText.replace(/혈압\s.*?\s|체온\s.*?\s/g, '').trim()
    data.healthAndNursingCare['specialNotes'] = sectionText
  }

  const functionalRecoveryTrainingMatch = text.match(/기능향상 프로그램(.*?)신체 동작 훈련(.*)/s)
  if (functionalRecoveryTrainingMatch) {
    data.functionalRecoveryTraining['enhancementProgram'] =
      functionalRecoveryTrainingMatch[1].trim()

    const specialNotesMatch = text.match(/기능 회복 훈련(.*)/s)
    if (specialNotesMatch) {
      data.functionalRecoveryTraining['specialNotes'] = specialNotesMatch[1]
        .replace(/특이사항/g, '')
        .trim()
    }

    const physicalTrainingWord = functionalRecoveryTrainingMatch[2].trim().split(/\s+/)[0]
    data.functionalRecoveryTraining['physicalTraining'] = physicalTrainingWord
  }

  return data
}
