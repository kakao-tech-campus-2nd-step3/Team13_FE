import { RefObject, useCallback } from 'react'
import { getLandingKeyframesArray } from '@/utils'
import useIntersectionEffect from './useIntersectionEffect'

interface UseIntersectionSlideEffectProps {
  spyRef: RefObject<HTMLElement>
  targetRef: RefObject<HTMLElement>
  delay?: number
  direction?: 'left' | 'right' | 'top' | 'bottom'
}

function useIntersectionSlideEffect({
  spyRef,
  targetRef,
  delay,
  direction = 'bottom', // default to bottom if not specified
}: UseIntersectionSlideEffectProps) {
  const effectCallback = useCallback(() => {
    if (!targetRef.current) return
    const keyframes = getLandingKeyframesArray(direction) // Pass direction to get appropriate keyframes
    targetRef.current.animate(keyframes, {
      easing: 'ease-in-out',
      duration: 1000,
      fill: 'forwards',
      delay: delay || 0,
    })
  }, [targetRef, direction, delay])

  useIntersectionEffect({ spyRef, threshold: 0.8, callback: effectCallback, triggerOnce: true })
}

export default useIntersectionSlideEffect
