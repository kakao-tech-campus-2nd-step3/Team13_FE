import { breakpoints } from '@/styles/breakpoints/breakpoints'
import { ResponsiveCSSObjects, ResponsiveColumns } from '@/styles/styles'
import { css, keyframes, SerializedStyles } from '@emotion/react'

// Creates keyframe animations for landing transitions
export function getLandingKeyframesArray(
  direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom',
) {
  switch (direction) {
    case 'left':
      return [
        { transform: 'translateX(-100px)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ]
    case 'right':
      return [
        { transform: 'translateX(100px)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      ]
    case 'top':
      return [
        { transform: 'translateY(-100px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ]
    case 'bottom':
    default:
      return [
        { transform: 'translateY(100px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ]
  }
}

export function getLandingKeyframes(reverse: boolean = false, fromY: string = '20px') {
  return keyframes`
    from {
      transform: translateY(${reverse ? `-${fromY}` : fromY});
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `
}

// Serializes responsive CSS objects based on breakpoints
export function serializeResponsiveCss(sizes?: ResponsiveCSSObjects): SerializedStyles {
  if (!sizes) return css``

  const styles: SerializedStyles[] = []
  Object.entries(sizes).forEach(([sizeKey, cssObject]) => {
    const key = sizeKey as keyof typeof breakpoints // Type constraint
    const mediaStyle = css`
      @media (min-width: ${breakpoints[key]}) {
        ${css(cssObject)}
      }
    `
    styles.push(mediaStyle)
  })

  return css(styles)
}

// Serializes responsive column configurations for grid layouts
export function serializeResponsiveColumns(
  responsiveColumns?: ResponsiveColumns,
): SerializedStyles {
  if (!responsiveColumns) return css``

  const styles: SerializedStyles[] = []
  Object.entries(responsiveColumns).forEach(([sizeKey, columns]) => {
    const key = sizeKey as keyof typeof breakpoints // Type constraint
    const colTemplate = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns
    const mediaStyle = css`
      @media (min-width: ${breakpoints[key]}) {
        grid-template-columns: ${colTemplate};
      }
    `
    styles.push(mediaStyle)
  })

  return css(styles)
}
