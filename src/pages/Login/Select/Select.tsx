import pencil from '@/assets/icons/emoji_pencil.svg'
import chart from '@/assets/icons/emoji_note.svg'
import { Heading } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface RoleProps {
  title: string
  role: string
  icon: string
  navigateTo: string
}

export const SelectPage = () => {
  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <div style={{ color: colors.primary.main, fontSize: '15px', marginBottom: '15px' }}>
          반갑습니다 요양보호사님 !
        </div>
        <div style={{ fontSize: '24px', fontWeight: '700' }}>어떤 작업을 수행하실건가요 ?</div>
      </div>

      <SelectButton title="새 차트 작성" role="CAREWORKER" icon={pencil} navigateTo="/recipients" />
      <SelectButton
        title="차트 확인 및 수정"
        role="GUARDIAN"
        icon={chart}
        navigateTo="/recipients"
      />
    </Wrapper>
  )
}

const SelectButton = ({ title, role, icon, navigateTo }: RoleProps) => {
  const navigate = useNavigate()

  return (
    <RoleWrapper
      onClick={() => {
        localStorage.setItem('role', role)
        navigate(navigateTo)
      }}
    >
      <img src={icon} alt={icon} style={{ padding: '0 15px 0 10px' }} />
      <Heading.Medium style={{ fontWeight: '600' }}>{title}</Heading.Medium>
    </RoleWrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 25px;
  box-sizing: border-box;
  gap: 30px;
`

const RoleWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  margin: 5px;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: start;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`
