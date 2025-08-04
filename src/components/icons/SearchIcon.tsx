import { useClientTranslation } from '@/hooks/useClientTranslation'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  width?: string
  height?: string
}

export default function SearchIcon({ className, ...props }: Props) {
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
      aria-label={t('icons.search.ariaLabel', 'Rechercher')}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 4C7.35786 4 4 7.35786 4 11.5C4 15.6421 7.35786 19 11.5 19C13.5131 19 15.341 18.2069 16.6881 16.916C16.7192 16.8729 16.7542 16.8317 16.793 16.7929C16.8318 16.7541 16.873 16.7191 16.9161 16.688C18.2069 15.3409 19 13.5131 19 11.5C19 7.35786 15.6421 4 11.5 4ZM18.8876 17.4733C20.2086 15.8414 21 13.7631 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21C13.7632 21 15.8415 20.2086 17.4734 18.8875L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.8876 17.4733Z"
      />
    </svg>
  )
}
