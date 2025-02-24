import Loader from '@/design-system/layout/Loader'
import { twMerge } from 'tailwind-merge'

export default function CTAButtonsPlaceholder({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={twMerge(
        'flex h-[56px] w-full items-center justify-center',
        className
      )}>
      <Loader color="dark" />
    </div>
  )
}
