import arrowBlue from '@/assets/icons/arrow-blue.svg'
import arrowWhite from '@/assets/icons/arrow-white.svg'
import logo from '@/assets/images/logo_transparent.svg'
import { Heading } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface RoleProps {
  title: string
  role: string
  isBlue: boolean
}

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <WrapperBody>
      <Wrapper>
        <LogoWrapper>
          <img src={logo} alt="logo" style={{ width: '140px' }} onClick={() => navigate('/')} />
        </LogoWrapper>
        <RoleButton title="요양보호사" role="careworker" isBlue={true} />
        <RoleButton title="보호자" role="guardian" isBlue={true} />
        <RoleButton title="요양원" role="institution" isBlue={false} />
        <RoleButton title="관리자" role="admin" isBlue={false} />
      </Wrapper>
    </WrapperBody>
  )
}

const RoleButton = ({ title, role, isBlue }: RoleProps) => {
  const navigate = useNavigate()
  localStorage.clear()

  return (
    <RoleWrapper
      isBlue={isBlue}
      onClick={() => {
        localStorage.setItem('role', role)
        navigate(`/login`)
      }}
    >
      <Heading.Medium style={{ fontWeight: '600' }}>{title} 로그인</Heading.Medium>
      {isBlue ? <img src={arrowWhite} alt="" /> : <img src={arrowBlue} alt="" />}
    </RoleWrapper>
  )
}

const WrapperBody = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 25px;
  box-sizing: border-box;
  gap: 33px;
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  margin: 0 10px 19px 0;
`

const RoleWrapper = styled.div<{ isBlue: boolean }>`
  background-color: ${({ isBlue }) => (isBlue ? colors.background.main : 'white')};
  border: ${({ isBlue }) => (isBlue ? 'none' : `2px solid ${colors.border.prominent}`)};
  color: ${({ isBlue }) => (isBlue ? 'white' : `${colors.text.prominent}`)};
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  margin: 4px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
