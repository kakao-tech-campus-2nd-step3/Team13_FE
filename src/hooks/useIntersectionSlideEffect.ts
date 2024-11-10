import { RefObject, useCallback } from 'react'
import { getLandingKeyframesArray } from '@/utils'
import useIntersectionEffect from './useIntersectionEffect'

interface UseIntersectionSlideEffectProps {
  spyRef: RefObject<HTMLElement>
  targetRef: RefObject<HTMLElement>
  reverse?: boolean
  delay?: number
}

function useIntersectionSlideEffect({
  spyRef,
  targetRef,
  reverse,
  delay,
}: UseIntersectionSlideEffectProps) {
  const effectCallback = useCallback(() => {
    if (!targetRef.current) return
    const keyframes = getLandingKeyframesArray()
    targetRef.current.animate(keyframes, {
      easing: 'ease-in-out',
      duration: 1000,
      fill: 'forwards',
      delay: delay || 0,
    })
  }, [targetRef, reverse])
  useIntersectionEffect({ spyRef, threshold: 0.8, callback: effectCallback, triggerOnce: true })
}

export default useIntersectionSlideEffect
