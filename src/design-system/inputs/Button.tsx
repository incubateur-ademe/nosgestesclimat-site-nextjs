import { ButtonSize } from '@/types/values'
import { HtmlHTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  size?: ButtonSize
  color?: 'primary' | 'secondary' | 'text' | 'link'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  id?: string
  title?: string
} & PropsWithChildren

export const colorClassNames = {
  primary:
    '!text-white bg-primary-700 border-2 border-primary-700 shadow-sm hover:text-white hover:bg-primary-800',
  secondary:
    'border-solid border-primary-700 border-2 text-primary-700 bg-transparent shadow-sm hover:text-primary-700 hover:bg-primary-100 hover:border-primary-700',
  emerald:
    '!text-emerald-default bg-emerald-light border-2 border-emerald-dark shadow-sm hover:text-white hover:bg-emerald-default hover:text-emerald-dark hover:border-emerald-dark',
  blue: '!text-blue-default bg-blue-light border-2 border-blue-dark shadow-sm hover:text-white hover:bg-blue-default hover:text-blue-dark hover:border-blue-dark',
  text: 'text-primary-700 bg-transparent border-2 border-transparent shadow-none hover:bg-primary-200 hover:text-primary-700 hover:border-primary-200',
  link: 'text-primary-700 bg-transparent border-2 border-transparent shadow-none hover:text-primary-700 underline !px-0',
}

export const sizeClassNames = {
  sm: 'px-3 py-0.5 text-sm',
  md: 'px-5 py-2 text-lg',
  lg: 'px-5 py-2 text-xl ',
  xl: 'px-10 py-4 text-2xl',
}

export const baseClassNames =
  'inline-flex items-center whitespace-nowrap rounded-full font-bold no-underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-3 aria-disabled:opacity-50'

export default function Button({
  onClick,
  children,
  className,
  size = 'md',
  color = 'primary',
  type,
  disabled,
  id,
  title,
  ...props
}: PropsWithChildren<ButtonProps & HtmlHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      onClick={
        disabled
          ? (e) => {
              e.preventDefault
            }
          : onClick
      }
      type={type}
      aria-disabled={disabled}
      title={title}
      id={id}
      className={twMerge(
        `${twMerge(
          baseClassNames,
          `${sizeClassNames[size]} ${colorClassNames[color]}`
        )}`,
        className
      )}
      {...props}>
      {children}
    </button>
  )
}
