import { PropsWithChildren, createContext } from 'react'

type RouterContextType = {
  gotoEndPage: () => void
}
export const RouterContext = createContext<RouterContextType>({
  gotoEndPage: () => {},
})

export default function RouterProvider({ children }: PropsWithChildren) {
  return (
    <RouterContext.Provider value={{ gotoEndPage: () => '' }}>
      {children}
    </RouterContext.Provider>
  )
}
