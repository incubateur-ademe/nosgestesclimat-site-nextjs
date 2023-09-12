import { PropsWithChildren } from 'react'

type Props = {
  noMargin?: boolean
}
export default function Slide({
  noMargin,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={`h-full rounded-lg bg-primaryLight${
        noMargin ? '' : ' p-4 md:p-12'
      } overflow-hidden`}>
      {children}
    </div>
  )
}
