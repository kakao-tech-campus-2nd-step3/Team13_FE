import { useEffect, useState } from 'react'
import { css, CSSObject } from '@emotion/react'
import { colors } from '@/styles/colors/colors'

function useHeaderScrollEffect() {
  const defaultStyle = css`
    background-color: transparent;
    box-shadow: none;
  `
  const scrolledStyle = css`
    background-color: ${colors.background.main};
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  `
  const [headerStyle, setHeaderStyle] = useState<CSSObject>(defaultStyle)
  const onScroll = () => {
    if (window.scrollY > 200) {
      setHeaderStyle(scrolledStyle)
      return
    }
    setHeaderStyle(defaultStyle)
  }
  useEffect(() => {
    if (!window) return
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { headerStyle }
}

export default useHeaderScrollEffect
