import Back from '../Back/Back'
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
  padding-top: 15px;
  box-sizing: border-box;
  position: relative;
`

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 50px;
  box-sizing: border-box;
`
