import { PropsWithChildren } from 'react'

export default function Kicker({ children }: PropsWithChildren) {
  return <p className="text-secondary-700 mb-1 font-bold">{children}</p>
}
