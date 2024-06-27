import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * This hook is used to show a message then hide it after a certain amount of time.
 */
export function useAutoFlick() {
  const [value, setValue] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const flick = useCallback(() => {
    setValue(true)

    timeoutRef.current = setTimeout(() => {
      setValue(false)
    }, 3000)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return { value, flick }
}
