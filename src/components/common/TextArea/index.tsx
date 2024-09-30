import { colors } from '@/styles/colors'
import styled from '@emotion/styled'

type Props = {
  invalid?: boolean
  customSize?: 'large' | 'small' | 'responsive'
} & React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = (props: Props) => <Input {...props} />

const Input = styled.textarea<Pick<Props, 'invalid' | 'customSize'>>(
  {
    width: '100%',
    boxSizing: 'border-box',
    color: '#191919',
    transition: 'border-color 200ms',
    border: '1px solid',
    borderRadius: '16px',
    padding: '18px',

    '&:focus': {
      outline: 'none',
      borderColor: colors.border.prominent,
    },
    '&:disabled': {
      color: '#7d7d7d',
      cursor: 'not-allowed',
    },

    '&::placeholder': {
      color: '#9B9B9B',
    },
  },
  ({ customSize = 'responsive' }) => {
    const largeStyle = {
      minHeight: '404px',
      fontSize: '20px',
      lineHeight: '25px',
      padding: '10px',
      display: 'inline-block',
      verticalAlign: 'top',
      textAlign: 'start',
    }

    const smallStyle = {
      minHeight: '62px',
      fontSize: '20px',
      lineHeight: '1.5',
      padding: '0px 20px',
    }

    if (customSize === 'large') return largeStyle
    if (customSize === 'small') return smallStyle
    return {} // 기본 스타일
  },
  ({ invalid = false }) => {
    if (invalid) {
      return {
        borderColor: '#7d7d7d',
      }
    }

    return {
      borderColor: colors.border.subtle,
    }
  },
)
