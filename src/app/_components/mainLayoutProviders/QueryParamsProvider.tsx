import { useDebug } from '@/hooks/useDebug'
import useModelVersion from '@/hooks/useModelVersion'
import { usePRNumber } from '@/hooks/usePRNumber'
import { PropsWithChildren } from 'react'

export default function QueryParamsProvider({ children }: PropsWithChildren) {
  useDebug()
  usePRNumber()
  useModelVersion()
  return children
}
