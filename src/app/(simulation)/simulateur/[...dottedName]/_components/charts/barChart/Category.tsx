import Subcategories from './category/Subcategories'

type Props = {
  category: string
  value: number
  max: number
  current: boolean
  isOpen: boolean
  setIsOpen: any
}

export default function Category({
  category,
  max,
  current,
  isOpen,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`p-4 pb-1 rounded-xl ${current ? 'bg-primaryLight' : ''}`}>
      {isOpen ? <Subcategories category={category} max={max} /> : null}
    </div>
  )
}
