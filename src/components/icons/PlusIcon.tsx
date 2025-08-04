import { useClientTranslation } from '@/hooks/useClientTranslation'
import { twMerge } from 'tailwind-merge'

export default function PlusIcon({ className }: { className?: string }) {
  const { t } = useClientTranslation()
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('fill-default inline-block stroke-[1.5]', className)}
      aria-hidden="true">
      <path
        d="M8 1V15M1 8H15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
