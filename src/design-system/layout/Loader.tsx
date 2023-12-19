import { twMerge } from 'tailwind-merge'

type LoaderSizes = 'sm' | 'md' | 'lg'

type Props = {
  size?: LoaderSizes
  color?: 'light' | 'dark'
  className?: string
}

const sizesClassNames = {
  sm: 'w-3 h-3 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-12 h-12 border-4',
}

const colorsClassNames = {
  light: 'border-white border-b-transparent',
  dark: 'border-primary-700 border-b-transparent',
}

export default function Loader({
  size = 'md',
  color = 'light',
  className,
}: Props) {
  return (
    <span
      className={twMerge(
        `inline-block animate-spin rounded-[50%] border-solid ${sizesClassNames[size]} ${colorsClassNames[color]}`,
        className
      )}
    />
  )
}
