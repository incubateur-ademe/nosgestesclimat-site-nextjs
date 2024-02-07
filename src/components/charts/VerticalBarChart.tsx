'use client'

import Card from '@/design-system/layout/Card'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}
export default function VerticalBarChart({
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Card
      className={twMerge(
        'mt-4 h-[171px] w-full rounded-lg border-none bg-grey-100 p-3 shadow-none',
        className
      )}>
      <ul className="flex h-full items-end justify-between gap-2">
        {children}
      </ul>
    </Card>
  )
}
