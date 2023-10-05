import { useDataServer } from '@/hooks/useDataServer'
import { useDebug } from '@/hooks/useDebug'
import { PropsWithChildren } from 'react'

export default function QueryParamsProvider({ children }: PropsWithChildren) {
  useDebug()
  useDataServer()
  return children
}
