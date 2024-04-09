type Props = {
  onClick: any
  color?: 'white' | 'primary'
  title?: string
}

export const colorClassNames = {
  primary: 'border-primary-700 text-primary-700',
  white: 'border-white text-white',
}
export default function QuestionButton({
  onClick,
  color = 'primary',
  title,
}: Props) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`${colorClassNames[color]} z-10 h-6 w-6 rounded-full border-2 bg-transparent text-sm font-bold leading-none md:h-7 md:w-7 md:text-lg md:leading-none`}>
      ?
    </button>
  )
}
