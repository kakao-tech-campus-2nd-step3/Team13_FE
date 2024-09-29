import Back from '@/components/common/Back'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'

export const Layout = () => (
  <Wrapper>
    <Back />
    <InnerWrapper>
      <Outlet />
    </InnerWrapper>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 15px;
  box-sizing: border-box;
  position: relative;
`

const InnerWrapper = styled.div`
  width: 100%;
  height: calc(100vh-50px);
  position: absolute;
  top: 0;
  left: 0;

  margin-top: 50px;
`
