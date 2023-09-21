import { PropsWithChildren } from 'react'

type Props = {
  noMargin?: boolean
  className?: string
}
export default function Slide({
  noMargin,
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={`mx-auto h-[30rem] w-[34rem] max-w-full rounded-lg bg-primaryLight${
        noMargin ? '' : ' p-4 md:p-8'
      } overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
