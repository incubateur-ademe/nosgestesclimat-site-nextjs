import { ChangeEvent, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
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
        `border-grey-300  focus:border-primary-700 focus:ring-primary-700 max-w-[30rem] rounded-md border border-solid bg-grey-100 p-4 text-sm transition-colors focus:ring-2 `,
        className
      )}>
      {children}
    </select>
  )
}
