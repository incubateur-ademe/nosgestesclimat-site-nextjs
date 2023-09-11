type Props = {
  onClick: any
  color?: 'white' | 'primary'
}

export const colorClassNames = {
  primary: 'border-primary text-primary',
  white: 'border-white text-white',
}
export default function QuestionButton({ onClick, color = 'primary' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${colorClassNames[color]} z-10 h-6 w-6 rounded-full border-2 bg-transparent text-sm font-bold leading-none md:h-7 md:w-7 md:text-lg`}>
      ?
    </button>
  )
}
