import backArrow from '@/assets/icons/back_arrow.svg'

function Back() {
  return (
    <div
      onClick={() => {}}
      style={{
        width: '100vw',
        paddingLeft: '15px',
        boxSizing: 'border-box',
        display: 'flex',
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
