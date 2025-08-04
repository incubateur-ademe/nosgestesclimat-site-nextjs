import { useClientTranslation } from '@/hooks/useClientTranslation'
import { twMerge } from 'tailwind-merge'

export default function ArrowRightIcon({ className }: { className?: string }) {
  const { t } = useClientTranslation()
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('fill-default inline-block stroke-[1.5]', className)}
      role="img"
      aria-label={t('icons.arrowRight.ariaLabel', 'Flèche droite')}>
      {/* ... */}
    </svg>
  )
}
