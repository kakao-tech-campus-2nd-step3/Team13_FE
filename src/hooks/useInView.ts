import { RefObject, useEffect, useRef, useState } from 'react'

interface UseInViewProps {
  ref: RefObject<HTMLElement>
  threshold: number
}

function useInView({ ref, threshold }: UseInViewProps) {
  const [inView, setInView] = useState(false)
  const observerRef = useRef(
    new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        threshold: threshold,
      },
    ),
  )

  useEffect(() => {
    if (!ref.current || !observerRef.current) return
    observerRef.current.observe(ref.current)

    return () => {
      if (ref.current) {
        observerRef.current.unobserve(ref.current)
      }
    }
  }, [ref])

  return { inView }
}

export default useInView
