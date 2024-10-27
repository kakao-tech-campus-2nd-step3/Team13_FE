import { IoCalendarNumberOutline } from 'react-icons/io5'
import * as S from './Date.styles'

interface Props {
  year: string
  month: string
  date: string
}

function Date({ year, month, date }: Props) {
  return (
    <S.Date>
      <S.LogoContainer>
        <IoCalendarNumberOutline />
      </S.LogoContainer>{' '}
      {year}.{month}.{date}.
    </S.Date>
  )
}

export default Date
