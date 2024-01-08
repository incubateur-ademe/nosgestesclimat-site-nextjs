import { PropsWithChildren } from 'react'

export default function Kicker({ children }: PropsWithChildren) {
  return <p className="mb-1 font-bold text-secondary">{children}</p>
}
