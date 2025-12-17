import type { PropsWithChildren } from 'react'

export default function Infos({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-3xl">{children}</div>
}
