import { colors } from '@/styles/colors/colors'
import styled from '@emotion/styled'

export const Container = styled.div`
  padding: 0 20px;
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  font-size: 24px;
  font-weight: bold;
`

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
`

export const ProfileName = styled.h2`
  margin-top: 12px;

  font-size: 20px;
  font-weight: bold;
`

export const LogOut = styled.p`
  margin-top: 8px;
  color: #666;
  padding: 8px;
  border-radius: 20px;
  background-color: ${colors.primary.mainOpacity15};
`

export const InfoSection = styled.div`
  width: 90%;
  margin-top: 32px;
  padding: 4px 16px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`

export const Label = styled.span`
  color: #333;
`

export const Value = styled.span`
  text-align: end;
  color: #555;
  width: 150px;
`

export const Checkbox = styled.input`
  margin-right: 4px;
`
