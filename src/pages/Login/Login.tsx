import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import { InputField } from '@/components/common/InputField/InputField'
import { colors } from '@/styles/colors/colors'
import styled from '@emotion/styled'
import { AuthProvider } from '@/provider/Auth/authApi'

export const LoginPage = () => {
  const [userId, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  const login = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await AuthProvider(role!, { userId, password })
      role === 'careworker' || role === 'guardian' ? navigate('/recipients') : navigate('/select')
    } catch (error) {
      console.error('Login failed:', error)
      alert('로그인에 실패하였습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <Wrapper>
      <StyledForm onSubmit={login}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
            안녕하세요 :) 돌봄다리입니다.
          </div>
          {role === 'careworker' || role === 'guardian' ? (
            <div style={{ color: colors.primary.main, fontSize: '15px' }}>
              전화번호와 비밀번호를 입력해주세요.
            </div>
          ) : (
            <div style={{ color: colors.primary.main, fontSize: '15px' }}>
              아이디와 비밀번호를 입력해주세요.
            </div>
          )}
        </div>
        <div>
          {role === 'careworker' || role === 'guardian' ? (
            <InputField
              placeholder="전화번호 ( '-' 제외)"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setId(e.target.value)}
              style={{ fontSize: '20px', marginBottom: '20px' }}
            />
          ) : (
            <InputField
              placeholder="아이디"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setId(e.target.value)}
              style={{ fontSize: '20px', marginBottom: '20px' }}
            />
          )}
          <InputField
            placeholder="비밀번호"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: '20px' }}
          />
        </div>
        <Button theme="dark" width="100%" height="62px" type="submit">
          로그인
        </Button>
      </StyledForm>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledForm = styled.form`
  width: 100%;
  height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 26px;
  box-sizing: border-box;
`
