import { PropsWithChildren } from 'react'

export default function Navigation({ children }: PropsWithChildren) {
  return (
    <nav>
      <ul className="flex gap-2">{children}</ul>
    </nav>
  )
}
