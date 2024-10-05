import { ButtonHTMLAttributes, ReactNode } from 'react'
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  children?: ReactNode
  theme: ButtonTheme
  width?: string
  height?: string
  margin?: string
}

const themeStyles = {
  dark: {
    background: colors.background.main,
    color: 'white',
    border: `1px solid ${colors.primary.main}`,
  },
  'light-outlined': {
    background: 'transparent',
    color: colors.primary.main,
    border: `2px solid ${colors.primary.main}`,
  },
}

function Button({ icon, children, theme, width, height, margin, ...rest }: ButtonProps) {
  const { background, color, border } = themeStyles[theme] || themeStyles.dark // default색은 자유롭게 변경해 주세요!

  const buttonStyle = css`
    width: ${width || 'auto'};
    height: ${height || 'auto'};
    margin: ${margin || '0'};
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    padding: 19px 27px;
    font-size: 19px;
    border-radius: 16px;
    color: ${color};
    border: ${border};
    background-color: ${background};
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease;
    cursor: pointer;
  `

  const iconStyle = css`
    margin-right: 8px;
    display: flex;
    align-items: center;
  `

  return (
    <button css={buttonStyle} {...rest}>
      {icon && <span css={iconStyle}>{icon}</span>}
      {children}
    </button>
  )
}

type ButtonTheme = 'dark' | 'light-outlined'

export default Button
