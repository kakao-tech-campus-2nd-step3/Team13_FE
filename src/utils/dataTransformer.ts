interface SectionData {
  [key: string]: string
}

interface DataStructure {
  bodyManagement: SectionData
  cognitiveManagement: SectionData
  nursingManagement: SectionData
  recoveryTraining: SectionData
}

const toggleYesNo = (value: string): string => {
  return value === '예' ? '아니오' : value === '아니오' ? '예' : value
}

const getRemainingMealTypes = (selectedType1: string, selectedType2: string): string => {
  const mealTypes = ['일반식', '죽', '유동식']
  return mealTypes.filter((type) => type !== selectedType1 && type !== selectedType2).join(', ')
}

const getRemainingIntakeAmounts = (selectedAmount1: string, selectedAmount2: string): string => {
  const intakeAmounts = ['1 (전부)', '1/2 이상', '1/2 미만']
  return intakeAmounts
    .filter((amount) => amount !== selectedAmount1 && amount !== selectedAmount2)
    .join(', ')
}

export const transformData = (data: DataStructure): DataStructure => {
  const transformedData: DataStructure = {
    bodyManagement: {},
    cognitiveManagement: {},
    nursingManagement: {},
    recoveryTraining: {},
  }

  for (const sectionKey in data) {
    const section = data[sectionKey as keyof DataStructure]

    for (const key in section) {
      const value = section[key]

      if (value === '예' || value === '아니오') {
        // "예"와 "아니오" 값을 반대로 변환
        transformedData[sectionKey as keyof DataStructure][key] = toggleYesNo(value)
      } else if (key === 'mealType') {
        // "식사 종류"를 콤마로 구분하여 선택된 항목을 추출
        const selectedMealTypes = value.split(',').map((item) => item.trim())
        transformedData[sectionKey as keyof DataStructure][key] = getRemainingMealTypes(
          selectedMealTypes[0] || '',
          selectedMealTypes[1] || '',
        )
      } else if (key === 'intakeAmount') {
        // "섭취량"을 콤마로 구분하여 선택된 항목을 추출
        const selectedIntakeAmounts = value.split(',').map((item) => item.trim())
        transformedData[sectionKey as keyof DataStructure][key] = getRemainingIntakeAmounts(
          selectedIntakeAmounts[0] || '',
          selectedIntakeAmounts[1] || '',
        )
      } else {
        // 그 외의 항목은 그대로 복사
        transformedData[sectionKey as keyof DataStructure][key] = value
      }
    }
  }

  return transformedData
}
