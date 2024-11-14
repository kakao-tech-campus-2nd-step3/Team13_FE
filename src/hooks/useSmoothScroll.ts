function useSmoothScroll(targetPosition: number) {
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const duration = 500
  let startTime: number | null = null

  const animation = (currentTime: any) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime!
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)

    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  const ease = (time: number, base: number, _distance: number, _duration: number) => {
    time /= _duration / 2
    if (time < 1) return (_distance / 2) * time * time + base
    time--
    return (-_distance / 2) * (time * (time - 2) - 1) + base
  }

  requestAnimationFrame(animation)
}

export default useSmoothScroll
