import { Separator as SeparatorPrimitive } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type SeparatorVariant = 'short' | 'full'

interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: SeparatorVariant
}

export default function Separator({
  className = '',
  variant = 'short',
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      className={cn(classNamesByVariant[variant], className)}
      {...props}
    />
  )
}

const classNamesByVariant: Record<SeparatorVariant, string> = {
  short:
    'data-horizontal:h-[3px] data-horizontal:w-12 md:data-horizontal:w-20 bg-secondary-700 my-8 rounded-full',
  full: 'data-horizontal:h-px bg-slate-200',
}
