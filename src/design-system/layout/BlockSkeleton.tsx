import { twMerge } from 'tailwind-merge'

export default function BlockSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={twMerge('mt-4 mb-8 animate-pulse', className)}
      data-testid="block-skeleton">
      <div className="bg-primary-100 h-[100px] w-full rounded-md"></div>
    </div>
  )
}
