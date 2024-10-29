import backArrow from '@/assets/icons/back_arrow.svg'
import { useNavigate } from 'react-router-dom'

function Back() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div
      onClick={handleGoBack}
      style={{
        width: '100vw',
        paddingLeft: '15px',
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
