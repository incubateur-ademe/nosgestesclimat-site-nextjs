import { PropsWithChildren } from 'react'

export default function Kicker({ children }: PropsWithChildren) {
  return <p className="text-secondary-500 mb-1 font-bold">{children}</p>
}
