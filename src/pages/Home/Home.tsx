import arrowBlue from '@/assets/icons/arrow-blue.svg'
import arrowWhite from '@/assets/icons/arrow-white.svg'
import logo from '@/assets/images/logo_sample.svg'
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
  return (
    <Wrapper>
      <LogoWrapper>
        <img src={logo} alt="logo" />
        <Heading.Large style={{ color: `${colors.text.subtle}` }}>돌봄 다리</Heading.Large>
      </LogoWrapper>
      <RoleButton title="요양보호사" role="CAREWORKER" isBlue={false} />
      <RoleButton title="보호자" role="GUARDIAN" isBlue={true} />
    </Wrapper>
  )
}

const RoleButton = ({ title, role, isBlue }: RoleProps) => {
  const navigate = useNavigate()

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

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 25px;
  box-sizing: border-box;
  gap: 42px;
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
  height: 138px;
  padding: 10px 20px;
  border-radius: 8px;
  box-sizing: border-box;
  margin: 5px;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
