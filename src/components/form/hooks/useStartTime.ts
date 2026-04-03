import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useEffect, useState } from 'react'

export function useStartTime(question?: DottedName) {
  // Start time of the question
  //(we need to use question to update the start time when the question changes, but it is not exactly usefull as a dependency)
  const [startTime, setStartTime] = useState(() => Date.now())

  useEffect(() => {
    if (question) {
      setStartTime(Date.now())
    }
  }, [question])

  return startTime
}
