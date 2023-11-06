import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  value?: string | number
  onChange?: any
  className?: string
}

// TODO: This is a bit light
export default function Select({
  value,
  onChange,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={twMerge(
        `border-grey-300  max-w-[30rem] rounded-md border border-solid bg-grey-100 p-4 text-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary `,
        className
      )}>
      {children}
    </select>
  )
}
