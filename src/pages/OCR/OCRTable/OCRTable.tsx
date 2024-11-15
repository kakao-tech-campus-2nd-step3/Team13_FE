import React from 'react'
import * as S from './OCRTable.styles'

interface Section {
  [key: string]: string
}

interface Data {
  bodyManagement: Section
  cognitiveManagement: Section
  nursingManagement: Section
  recoveryTraining: Section
}

export const OCRTable: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <S.Table>
      <thead>
        <tr>
          <S.TableHeader>항목명</S.TableHeader>
          <S.TableHeader>택1 또는 서술</S.TableHeader>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([sectionName, sectionData]) => (
          <React.Fragment key={sectionName}>
            <tr>
              <S.SectionTitle colSpan={2}>{sectionName}</S.SectionTitle>
            </tr>
            {Object.entries(sectionData).map(([item, value]) => (
              <tr key={item}>
                <S.TableData>{item}</S.TableData>
                <S.TableData>{value as string}</S.TableData>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </S.Table>
  )
}
