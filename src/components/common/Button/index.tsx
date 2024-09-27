import { ButtonHTMLAttributes, ReactNode } from 'react'
import { css } from '@emotion/react'
import { colors } from '@/styles/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  children?: ReactNode
  theme: ButtonTheme
}

function Button({ icon, children, theme, ...rest }: ButtonProps) {
  const buttonStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    padding: 19px 27px;
    font-size: 19px;
    border-radius: 16px;
    color: ${theme === 'dark' ? 'white' : colors.primary.main};
    border: ${getBorderStyle(theme)};
    background-color: ${getBackgroundColor(theme)};
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

function getBackgroundColor(theme: ButtonTheme) {
  if (theme === 'light-outlined') {
    return 'transparent'
  }
  if (theme === 'dark') {
    return colors.background.main
  }
  return colors.background.main
}

function getBorderStyle(theme: ButtonTheme) {
  if (theme === 'light-outlined') {
    return `2px solid ${colors.primary.main}`
  }
  const baseStyle = '1px solid '
  return baseStyle + (theme === 'dark' ? colors.primary.main : colors.text.subtle)
}

type ButtonTheme = 'dark' | 'light-outlined'

export default Button
