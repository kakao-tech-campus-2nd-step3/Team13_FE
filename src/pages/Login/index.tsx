import Button from '@/components/common/Button'
import { TextField } from '@/components/common/TextField'
import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import { useState } from 'react'

export const LoginPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Wrapper>
      <form
        style={{
          width: '100vw',
          height: '460px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignContent: 'center',
          padding: '0 26px',
          boxSizing: 'border-box',
        }}
      >
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
          <TextField
            customSize="small"
            placeholder="전화번호 ( '-' 제외)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ fontSize: '20px', marginBottom: '20px' }}
          ></TextField>
          <TextField
            customSize="small"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: '20px' }}
          ></TextField>
        </div>
        <div>
          <Button
            theme="dark"
            css={{
              width: '100%',
              height: '62px',
            }}
          >
            로그인
          </Button>
        </div>
      </form>
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
