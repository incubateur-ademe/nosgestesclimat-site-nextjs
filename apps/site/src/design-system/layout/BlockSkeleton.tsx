import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function BlockSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      data-testid="block-skeleton"
      className={cn('mt-4 mb-8 h-[100px] bg-primary-100', className)}
    />
  )
}
