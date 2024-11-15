import { useLogout } from '@/api/hooks/common/useLogout'
import backArrow from '@/assets/icons/back_arrow.svg'
import image from '@/assets/images/profile.svg'
import { colors } from '@/styles/colors/colors'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Back({ back = true, myPage = true, logout = false }) {
  const navigate = useNavigate()
  const userLogout = useLogout()

  const goBack = () => {
    const previousPage = document.referrer
    if (!previousPage.includes('/login')) {
      navigate(-1)
    }
  }

  const navigateToMyPage = () => {
    navigate('/my')
  }

  return (
    <Wrapper>
      {back ? (
        <div
          onClick={goBack}
          style={{
            cursor: 'pointer',
          }}
        >
          <img src={backArrow} alt="back_arrow" />
        </div>
      ) : (
        <div></div>
      )}

      {myPage ? (
        <div
          onClick={navigateToMyPage}
          style={{
            cursor: 'pointer',
          }}
        >
          <img src={image} alt="mypage" style={{ height: '40px', marginTop: '5px' }} />
        </div>
      ) : null}
      {logout ? (
        <div
          onClick={userLogout}
          style={{
            backgroundColor: `${colors.text.subtle}`,
            padding: '8px 10px',
            borderRadius: '10px',
            boxSizing: 'border-box',
            cursor: 'pointer',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          로그아웃
        </div>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
  z-index: 5000;
  align-items: center;
  height: 50px;
`

export default Back
