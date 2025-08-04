import { useClientTranslation } from '@/hooks/useClientTranslation'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}

export default function ChevronLeft({ className }: Props) {
  const { t } = useClientTranslation()

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('stroke-primary-700', className)}
      role="img"
      aria-label={t('icons.chevronLeft.ariaLabel', 'Précédent')}>
      <path
        d="M15 18L9 12L15 6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
