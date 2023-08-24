import { ButtonSize } from '@/types/values'
import { MouseEventHandler } from 'react'

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  size?: ButtonSize
  color?: 'primary' | 'secondary' | 'text'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  id?: string
} & React.PropsWithChildren

export const colorClassNames = {
  primary:
    'border-0 transition-colors text-white bg-primary shadow-sm hover:bg-primaryDark hover:!text-white',
  secondary:
    'border-solid border-2 !border-primary text-primary shadow-sm bg-transparent hover:bg-primaryLight',
  text: 'border-0 text-primary bg-transparent !shadow-none hover:bg-primaryLight hover:!text-primary',
}

export const sizeClassNames = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-4 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-6 text-2xl',
}

export default function Button({
  onClick,
  children,
  className,
  size = 'md',
  color = 'primary',
  type,
  disabled,
  id,
  ...props
}: Props) {
  return (
    <button
      onClick={disabled ? () => {} : onClick}
      type={type}
      aria-disabled={disabled}
      id={id}
      className={`inline-flex items-center transition-colors ${sizeClassNames[size]} rounded-md border border-transparent text-sm font-medium no-underline ${colorClassNames[color]} transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 aria-disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
