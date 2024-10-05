import { TextProps } from '@/types/props'
import Text from '@/components/common/Text'

export function createTextComponent(props: Partial<TextProps>) {
  return function TextComponent(extraProps: TextProps) {
    return <Text {...props} {...extraProps} />
  }
}

export const TextBody = {
  Large: createTextComponent({
    defaultSize: '16px',
    responsiveSize: {
      sm: '22px',
    },
    as: 'p',
  }),
  Medium: createTextComponent({
    defaultSize: '14px',
    responsiveSize: {
      sm: '18px',
    },
    as: 'p',
  }),
  Small: createTextComponent({
    defaultSize: '12px',
    responsiveSize: {
      sm: '16px',
    },
    as: 'p',
  }),
}

export const Heading = {
  XLarge: createTextComponent({
    defaultSize: '32px',
    responsiveSize: {
      sm: '46px',
    },
    as: 'h1',
    weight: 'bold',
  }),
  Large: createTextComponent({
    defaultSize: '28px',
    responsiveSize: {
      sm: '40px',
    },
    as: 'h2',
    weight: 'bold',
  }),
  Medium: createTextComponent({
    defaultSize: '24px',
    responsiveSize: {
      sm: '34px',
    },
    as: 'h3',
    weight: 'bold',
  }),
  Small: createTextComponent({
    defaultSize: '20px',
    responsiveSize: {
      sm: '28px',
    },
    as: 'h4',
    weight: 'bold',
  }),
  XSmall: createTextComponent({
    defaultSize: '18px',
    responsiveSize: {
      sm: '26px',
    },
    as: 'h5',
    weight: 'bold',
  }),
}

export const Paragraph = {
  Large: createTextComponent({
    defaultSize: '18px',
    responsiveSize: {
      sm: '24px',
    },
    as: 'p',
  }),
  Medium: createTextComponent({
    defaultSize: '16px',
    responsiveSize: {
      sm: '20px',
    },
    as: 'p',
  }),
  Small: createTextComponent({
    defaultSize: '14px',
    responsiveSize: {
      sm: '18px',
    },
    as: 'p',
  }),
}
