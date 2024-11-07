import styled from '@emotion/styled'
import { colors } from '@/styles/colors/colors'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 0 23px;
  box-sizing: border-box;
`

const Header = styled.div`
  margin: 0 0 16px 0;
`

const Birth = styled.div`
  font-size: 20px;
  color: ${colors.text.subtle};
  margin-bottom: 12px;
`

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 36px;

  span {
    color: ${colors.primary.main};
  }
`

const SubTitle = styled.p`
  font-size: 18px;
  color: ${colors.text.subtle};
`

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  padding: 0 0 35px 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${colors.border.subtle};
  margin-bottom: 27px;
`

const Tag = styled.span`
  background-color: ${colors.primary.mainOpacity15};
  color: ${colors.primary.main};
  font-size: 12px;
  font-weight: bold;
  padding: 8px 6px;
  border-radius: 4px;
`

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const LogoContainer = styled.div`
  color: ${colors.primary.main};
  background-color: #ececec;
  width: 24px;
  height: 24px;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`

const Date = styled.div`
  color: ${colors.text.subtle};
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`
const LogWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
`
const Activity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${colors.text.subtle};
  margin-bottom: 5px;
  line-height: 24px;
  font-size: 18px;

  b {
    width: 230px;
    font-weight: bold;
    color: #000;
    margin-top: 10px;
  }
`

export {
  Container,
  Header,
  Birth,
  Name,
  SubTitle,
  TagContainer,
  Tag,
  Content,
  LogoContainer,
  Date,
  LogWrapper,
  Activity,
}
