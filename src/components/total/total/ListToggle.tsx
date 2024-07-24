import { useClientTranslation } from '@/hooks/useClientTranslation'

type Props = {
  toggleQuestionList: () => void
}

export default function ListToggle({ toggleQuestionList }: Props) {
  const { t } = useClientTranslation()

  return (
    <button
      onClick={toggleQuestionList}
      className="absolute right-4 h-8 w-8 md:right-6"
      title={t('Voir la liste des questions')}>
      <svg
        className="fill-white"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m30 8.178c0-1.65-1.35-3-3-3h-12.04c-1.65 0-3 1.35-3 3s1.35 3 3 3h12.04c1.65 0 3-1.35 3-3z"></path>
        <path d="m22.04 13.178h-17.04c-1.65 0-3 1.35-3 3s1.35 3 3 3h17.04c1.65 0 3-1.35 3-3s-1.35-3-3-3z"></path>
        <path d="m22.04 21.178h-17.04c-1.65 0-3 1.35-3 3s1.35 3 3 3h17.04c1.65 0 3-1.35 3-3s-1.35-3-3-3z"></path>
        <path d="m4.966 11.531h.034c.293 0 .572-.129.762-.353l4.001-4.71c.358-.421.307-1.052-.114-1.409-.423-.359-1.054-.306-1.409.114l-3.185 3.748-1.25-1.694c-.329-.444-.954-.539-1.398-.211s-.539.954-.211 1.398l2 2.71c.182.246.465.396.771.405z"></path>
      </svg>
    </button>
  )
}
