import { RefObject, useEffect, useState } from 'react'
import useInView from '@/hooks/useInView'

interface UseIntersectionEffectProps {
  spyRef: RefObject<HTMLElement>
  threshold: number
  callback: () => void
  triggerOnce?: boolean
}

function useIntersectionEffect({
  spyRef,
  threshold,
  callback,
  triggerOnce,
}: UseIntersectionEffectProps) {
  const { inView } = useInView({ ref: spyRef, threshold })
  const [isExecutedOnce, setIsExecutedOnce] = useState(false)

  useEffect(() => {
    if (!inView) {
      return
    }
    if (triggerOnce && isExecutedOnce) {
      return
    }

    callback()
    setIsExecutedOnce(true)
  }, [inView, isExecutedOnce])

  return { isExecutedOnce }
}

export default useIntersectionEffect
