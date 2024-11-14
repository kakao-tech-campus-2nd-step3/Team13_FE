import Back from '../Back/Back'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'

export const Layout = () => (
  <WrapperBody>
    <Wrapper>
      <Back />
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
    </Wrapper>
  </WrapperBody>
)

export const LayoutWithoutMyPage = () => (
  <WrapperBody>
    <Wrapper>
      <Back myPage={false} />
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
    </Wrapper>
  </WrapperBody>
)
export const LayoutWithoutBack = () => (
  <WrapperBody>
    <Wrapper>
      <Back back={false} />
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
    </Wrapper>
  </WrapperBody>
)

export const AdminLayout = () => (
  <AdminWrapperBody>
    <AdminWrapper>
      <Back myPage={false} logout={true} />
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
    </AdminWrapper>
  </AdminWrapperBody>
)

const WrapperBody = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
  }
`
const AdminWrapperBody = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  box-sizing: border-box;
`

const AdminWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`
const InnerWrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 50px;
  box-sizing: border-box;
`
