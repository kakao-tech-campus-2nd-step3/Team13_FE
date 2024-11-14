import backArrow from '@/assets/icons/back_arrow.svg'
import { useNavigate } from 'react-router-dom'

function Back() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    const previousPage = document.referrer
    console.log(previousPage)
    if (!previousPage.includes('/login')) {
      navigate(-1)
    }
  }

  return (
    <div
      onClick={handleGoBack}
      style={{
        width: '100%',
        paddingLeft: '15px',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        zIndex: '5000',
        alignItems: 'center',
        cursor: 'pointer',
        height: '20px',
      }}
    >
      <img src={backArrow} alt="back_arrow" />
    </div>
  )
}

export default Back
