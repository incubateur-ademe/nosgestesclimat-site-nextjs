import { PropsWithChildren } from 'react'

export default function Navigation({ children }: PropsWithChildren) {
  return (
    <nav className="h-full">
      <ul className="flex h-full ">{children}</ul>
    </nav>
  )
}
