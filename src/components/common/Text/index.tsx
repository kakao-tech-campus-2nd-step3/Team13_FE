import styled from '@emotion/styled'
import { FontWeight, ScreenSize } from '@/types/styles'
import { TextProps } from '@/types/props'
import { breakpoints } from '@/styles/breakpoints'

function Text({ children, weight, responsiveSize, as = 'p', color, ...rest }: TextProps) {
  const cssWeight = convertWeightToCss(weight)
  return (
    <ResponsiveText
      as={as}
      weight={cssWeight}
      responsiveSize={responsiveSize}
      color={color}
      {...rest}
    >
      {children}
    </ResponsiveText>
  )
}

const ResponsiveText = styled.p<TextProps>`
  font-weight: ${(props: TextProps) => props.weight};
  font-size: ${(props: TextProps) => props.defaultSize};
  color: ${(props: TextProps) => props.color};

  ${(props: TextProps) =>
    props.responsiveSize &&
    (Object.entries(props.responsiveSize) as [keyof typeof breakpoints, string][])
      .map(
        ([breakpoint, value]) => `
      @media (min-width: ${breakpoints[breakpoint]}) {
        font-size: ${value};
      }
  `,
      )
      .join('')}
`

function convertWeightToCss(weight?: FontWeight) {
  if (!weight) {
    return 400 // default to regular
  }
  switch (weight) {
    case 'medium':
      return 500
    case 'bold':
      return 700
    case 'regular':
      return 400
    case 'lighter':
      return 300
    case 'bolder':
      return 800
    default:
      return weight
  }
}

export default Text
