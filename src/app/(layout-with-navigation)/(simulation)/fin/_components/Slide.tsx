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
      className={`max-w-screen mx-auto h-[30rem] w-[34rem] rounded-lg bg-primaryLight${
        noMargin ? '' : ' p-4 md:p-12'
      } overflow-hidden`}>
      {children}
    </div>
  )
}
