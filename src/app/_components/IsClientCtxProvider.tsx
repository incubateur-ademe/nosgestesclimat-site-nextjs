import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const IsClientCtx = createContext(false)

export const IsClientCtxProvider = ({ children }: PropsWithChildren) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  return (
    <IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>
  )
}

export function useIsClient() {
  return useContext(IsClientCtx)
}
