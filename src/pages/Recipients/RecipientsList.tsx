import { colors } from '@/styles/colors'
import styled from 'styled-components'

interface Props {
  picture: string
  name: string
  birthday: string
  width?: string
  height?: string
  borderRadius?: string
}

export const RecipientsList = ({
  picture,
  name,
  birthday,
  width = '48px',
  height = '48px',
  borderRadius = '50%',
}: Props) => {
  return (
    <Wrapper>
      <img
        src={picture}
        style={{
          height,
          width,
          borderRadius,
          marginRight: '26px',
        }}
      ></img>
      <div style={{ color: colors.text.moderate, fontSize: '24px', marginRight: '12px' }}>
        {name}
      </div>
      <div style={{ color: colors.text.subtle, fontSize: '20px' }}>{birthday}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  margin-top: 1px;
  border-bottom: 1px solid ${colors.border.subtle};

  &:last-child {
    border-bottom: none;
  }
`
