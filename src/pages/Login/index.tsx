import Button from '@/components/common/Button'
import { InputField } from '@/components/common/InputField'
import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import { useState } from 'react'

export const LoginPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Wrapper>
      <StyledForm>
        <div
          style={{
            justifyContent: 'start',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '2rem',
              marginBottom: '10px',
            }}
          >
            안녕하세요 :)
            <br />
            돌봄다리입니다.
          </div>
          <div style={{ color: colors.primary.main, fontSize: '15px' }}>
            전화번호와 비밀번호를 입력해주세요.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputField
            customSize="small"
            placeholder="전화번호 ( '-' 제외)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ fontSize: '20px', marginBottom: '20px' }}
          ></InputField>
          <InputField
            customSize="small"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: '20px' }}
          ></InputField>
        </div>
        <div>
          <Button theme="dark" width="100%" height="62px">
            로그인
          </Button>
        </div>
      </StyledForm>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledForm = styled.form`
  width: 100vw;
  height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  padding: 0 26px;
  box-sizing: border-box;
`
