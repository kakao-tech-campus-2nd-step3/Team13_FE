import arrowBlue from '@/assets/icons/arrow-blue.svg'
import { Heading } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors/colors'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface RoleProps {
  title: string
  navigateTo: string
}

export const SelectPage = () => {
  const role = localStorage.getItem('role')
  return (
    <Wrapper>
      <ButtonWrapper>
        <Heading.Medium style={{ marginBottom: '10px' }}>관리할 항목을 선택해주세요</Heading.Medium>
        <RoleButton title="보호자 관리 목록" navigateTo="/admin/guardian" />
        <RoleButton title="돌봄대상자 관리 목록" navigateTo="/admin/recipient" />{' '}
        {role === 'admin' ? (
          <RoleButton title="요양원 관리 목록" navigateTo="/admin/institution" />
        ) : null}
        <RoleButton title="요양보호사 관리 목록" navigateTo="/admin/careWorker" />
      </ButtonWrapper>
    </Wrapper>
  )
}

const RoleButton = ({ title, navigateTo }: RoleProps) => {
  const navigate = useNavigate()

  return (
    <RoleWrapper
      onClick={() => {
        navigate(navigateTo)
      }}
    >
      <Heading.Small style={{ fontWeight: '600' }}>{title}</Heading.Small>
      <img src={arrowBlue} alt="" />
    </RoleWrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 28px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
  }
`

const ButtonWrapper = styled.div`
  width: 600px;
  min-width: 300px;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 28px;
  box-sizing: border-box;
  gap: 33px;
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
  }
`

const RoleWrapper = styled.div`
  background-color: white;
  border: 2px solid ${colors.text.subtle};
  color: ${colors.text.prominent};
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
