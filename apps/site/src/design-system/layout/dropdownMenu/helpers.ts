import { twMerge } from 'tailwind-merge'

export interface DropdownMenuItemClassNameProps {
  isActive?: boolean
  index?: number
  itemsCount?: number
  className?: string
}
export type DropdownMenuItemPosition = 'only' | 'first' | 'middle' | 'last'

const positionClassNames: Record<DropdownMenuItemPosition, string> = {
  only: 'rounded-lg',
  first: 'rounded-t-lg',
  middle: 'rounded-none',
  last: 'rounded-b-lg',
}

export function getDropdownMenuItemPosition(
  index: number,
  total: number
): DropdownMenuItemPosition {
  if (total === 1) {
    return 'only'
  }

  if (index === 0) {
    return 'first'
  }

  if (index === total - 1) {
    return 'last'
  }

  return 'middle'
}

export function getDropdownMenuItemClassName({
  isActive = false,
  index = 0,
  itemsCount = 1,
  className,
}: DropdownMenuItemClassNameProps) {
  return twMerge(
    'dropdown-menu-item flex w-full items-center gap-2 px-4 py-3 text-sm no-underline transition-colors',
    positionClassNames[getDropdownMenuItemPosition(index, itemsCount)],
    isActive
      ? 'bg-primary-700 hover:bg-primary-700 text-white hover:text-white'
      : 'bg-white hover:bg-primary-50 active:bg-primary-100',
    className
  )
}
