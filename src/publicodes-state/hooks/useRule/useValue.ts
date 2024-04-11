'use client'

import { useMemo } from 'react'
import { NGCEvaluatedNode, NodeValue } from '../../types'

type Props = {
  evaluation: NGCEvaluatedNode | null
  type: string | undefined
}

export default function useValue({ evaluation, type }: Props) {
  const value = useMemo<NodeValue>(() => evaluation?.nodeValue, [evaluation])

  const displayValue = useMemo<string>(() => {
    if (type === 'choices') {
      const stringValue = String(value)
      return stringValue.startsWith("'")
        ? stringValue.substring(1, stringValue.length - 1)
        : stringValue
    }
    if (type === 'boolean') {
      return value === true
        ? 'oui'
        : value === false || value === null // `value` is null when `ruleDisabledByItsParent` knowing that the parent becomes `null` according to this value.
          ? 'non'
          : ''
    }
    if (type === 'mosaic') {
      return 'mosaic'
    }
    if (Number(value) === value) {
      return String(value)
    }
    return ''
  }, [value, type])

  const numericValue = useMemo<number>(
    () => (Number(value) === value ? value : 0),
    [value]
  )

  return {
    value,
    displayValue,
    numericValue,
  }
}
