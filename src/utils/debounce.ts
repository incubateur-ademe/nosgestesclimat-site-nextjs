import { useMemo } from 'react'

function debounce<T extends unknown[]>(
  func: (...args: T) => void | Promise<void>,
  wait: number
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (...args: T): void {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function useDebounce<T extends unknown[]>(
  func: (...args: T) => void | Promise<void>,
  wait: number
): (...args: T) => void {
  return useMemo(() => {
    return debounce(func, wait)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
