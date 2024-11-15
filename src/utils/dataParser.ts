interface SectionData {
  [key: string]: string
}

export interface DataStructure {
  bodyManagement: SectionData
  cognitiveManagement: SectionData
  nursingManagement: SectionData
  recoveryTraining: SectionData
}

export const parseData = (text: string): DataStructure => {
  const data: DataStructure = {
    bodyManagement: {},
    cognitiveManagement: {},
    nursingManagement: {},
    recoveryTraining: {},
  }

  const bodyManagementMatch = text.match(
    /청결 관리.*?섭취량.*?(?=인지관리지원|인지관리 및 의사소통)/s,
  )
  if (bodyManagementMatch) {
    let sectionText = bodyManagementMatch[0].replace(/신체 활동 지원|특이사항/g, '').trim()
    data.bodyManagement['wash'] = sectionText.match(/청결 관리\s(.*?)\s/)?.[1] || ''
    data.bodyManagement['bath'] = sectionText.match(/목욕\s(.*?)\s/)?.[1] || ''
    data.bodyManagement['physicalRestroom'] =
      sectionText.match(/화장실 이용 횟수\s(.*?)\s/)?.[1] || ''

    const mealTypeMatch = sectionText.match(/(일반식|죽|유동식)/g)
    if (mealTypeMatch) {
      data.bodyManagement['mealType'] = mealTypeMatch.join(', ')
    }

    const intakeAmountMatch = sectionText.match(/(1\s*\(전부\)|1\/2\s*이상|1\/2\s*미만)/g)
    if (intakeAmountMatch) {
      data.bodyManagement['intakeAmount'] = intakeAmountMatch.join(', ')
    }

    sectionText = sectionText
      .replace(
        /청결 관리\s.*?\s|목욕\s.*?\s|산책\/외출\s.*?\s|화장실 이용 횟수\s.*?\s|(일반식|죽|유동식|1\s*\(전부\)|1\/2\s*이상|1\/2\s*미만|식사 종류|섭취량)/g,
        '',
      )
      .trim()
    data.bodyManagement['physicalNote'] = sectionText
  }

  const cognitiveManagementMatch = text.match(
    /인지관리지원.*?인지관리 및 의사소통.*?(?=혈압|건강 및 간호 관리)/s,
  )
  if (cognitiveManagementMatch) {
    let sectionText = cognitiveManagementMatch[0]
      .replace(/인지관리 및 의사소통|특이사항/g, '')
      .trim()
    data.cognitiveManagement['cognitiveHelp'] =
      sectionText.match(/인지관리지원\s(.*?)\s/)?.[1] || ''
    sectionText = sectionText.replace(/인지관리지원\s.*?\s/g, '').trim()
    data.cognitiveManagement['cognitiveNote'] = sectionText
  }

  const nursingManagementMatch = text.match(/혈압.*?체온.*?(?=기능향상 프로그램|기능 회복 훈련)/s)
  if (nursingManagementMatch) {
    let sectionText = nursingManagementMatch[0].replace(/건강 및 간호 관리|특이사항/g, '').trim()
    data.nursingManagement['systolic'] = sectionText.match(/혈압\s(.*?)\s/)?.[1] || ''
    data.nursingManagement['healthTemperature'] = sectionText.match(/체온\s(.*?)\s/)?.[1] || ''
    sectionText = sectionText.replace(/혈압\s.*?\s|체온\s.*?\s/g, '').trim()
    data.nursingManagement['healthNote'] = sectionText
  }

  const recoveryTrainingMatch = text.match(/기능향상 프로그램(.*?)신체 동작 훈련(.*)/s)
  if (recoveryTrainingMatch) {
    data.recoveryTraining['recoveryProgram'] = recoveryTrainingMatch[1].trim()

    const recoveryNoteMatch = text.match(/기능 회복 훈련(.*)/s)
    if (recoveryNoteMatch) {
      data.recoveryTraining['recoveryNote'] = recoveryNoteMatch[1].replace(/특이사항/g, '').trim()
    }

    const physicalTrainingWord = recoveryTrainingMatch[2].trim().split(/\s+/)[0]
    data.recoveryTraining['recoveryTraining'] = physicalTrainingWord
  }

  return data
}
