import { useEffect, useState } from 'react'

export default function useTimeLeft() {
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeleft) => (prevTimeleft > 0 ? prevTimeleft - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { timeLeft, setTimeLeft }
}
