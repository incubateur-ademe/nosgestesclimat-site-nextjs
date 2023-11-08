import { PropsWithChildren } from 'react'

export default function Navigation({ children }: PropsWithChildren) {
  return (
    <nav className="h-full">
      <ul className="flex h-full gap-8">{children}</ul>
    </nav>
  )
}
