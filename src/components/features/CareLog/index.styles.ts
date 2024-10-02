import styled from '@emotion/styled'
import { colors } from '@/styles/colors'

const Container = styled.div`
  padding: 2.5rem;
`

const Header = styled.div`
  margin-bottom: 16px;
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
  font-size: 20px;
  color: ${colors.text.subtle};
`

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 66px;
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
  margin-bottom: 160px;
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

const Activity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.text.subtle};
  margin-bottom: 24px;
  line-height: 24px;
  font-size: 20px;

  b {
    width: 180px;
    font-weight: bold;
    color: #000;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${colors.primary.main};
  color: #fff;
  border: none;
  border-radius: 16px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primary.mainOpacity15};
    color: ${colors.primary.main};
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
  Activity,
  Button,
}
