import { useDebug } from '@/hooks/useDebug'
import { usePRNumber } from '@/hooks/usePRNumber'
import { PropsWithChildren } from 'react'

export default function QueryParamsProvider({ children }: PropsWithChildren) {
  useDebug()
  usePRNumber()
  return children
}
