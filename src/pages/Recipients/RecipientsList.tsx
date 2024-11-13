import { colors } from '@/styles/colors/colors'
import { useNavigate } from 'react-router-dom'
import newChart from '@/assets/icons/chart_write.svg'
import chartList from '@/assets/icons/chart_list.svg'
import styled from 'styled-components'

interface Props {
  recipientId: number
  picture: string
  name: string
  birthday: string
  width?: string
  height?: string
  borderRadius?: string
}

export const RecipientsList = ({
  recipientId,
  picture,
  name,
  birthday,
  width = '48px',
  height = '48px',
  borderRadius = '50%',
}: Props) => {
  const navigate = useNavigate()
  const currentRole = localStorage.getItem('role')
  console.log(recipientId)
  return (
    <Wrapper
      onClick={
        currentRole == 'guardian'
          ? () => {
              navigate('/calendar', { state: { recipientId, name, birthday } })
            }
          : () => {}
      }
    >
      <ProfileWrapper>
        <img
          src={picture}
          style={{
            height,
            width,
            borderRadius,
            marginRight: '20px',
          }}
        ></img>
        <div style={{ color: colors.text.moderate, fontSize: '24px', marginRight: '12px' }}>
          {name}
        </div>
        <div style={{ color: colors.text.subtle, fontSize: '20px' }}>{birthday}</div>
      </ProfileWrapper>

      {currentRole == 'careworker' ? (
        <SelectWrapper>
          <img
            src={newChart}
            alt="new chart"
            onClick={() => {
              localStorage.removeItem('recipientId')
              localStorage.setItem('recipientId', recipientId.toString())
              navigate('/share')
            }}
          />

          <img
            src={chartList}
            alt="chart list"
            onClick={() => {
              localStorage.removeItem('recipientId')
              localStorage.setItem('recipientId', recipientId.toString())
              navigate('/calendar', { state: { name, birthday } })
            }}
          />
        </SelectWrapper>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 1px;
  border-bottom: 1px solid ${colors.border.subtle};

  &:last-child {
    border-bottom: none;
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
`

const SelectWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row;
`
