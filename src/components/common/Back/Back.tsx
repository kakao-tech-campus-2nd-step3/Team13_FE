import backArrow from '@/assets/icons/back_arrow.svg'
import image from '@/assets/images/profile.svg'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Back({ myPage = true }) {
  const navigate = useNavigate()

  const goBack = () => {
    const previousPage = document.referrer
    console.log(previousPage)
    if (!previousPage.includes('/login')) {
      navigate(-1)
    }
  }

  const navigateToMyPage = () => {
    navigate('/my')
  }

  return (
    <Wrapper>
      <div
        onClick={goBack}
        style={{
          cursor: 'pointer',
        }}
      >
        <img src={backArrow} alt="back_arrow" />
      </div>
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
