import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <div className="bg-white">{children}</div>
}
