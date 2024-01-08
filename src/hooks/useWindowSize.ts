import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowWidth(window?.innerWidth)
      setWindowHeight(window?.innerHeight)
    }
    window.addEventListener('resize', updateWindowSize)
    updateWindowSize()

    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

  return { windowWidth, windowHeight }
}
