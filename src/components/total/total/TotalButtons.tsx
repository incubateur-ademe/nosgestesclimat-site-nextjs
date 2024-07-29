import ListIcon from '@/components/icons/ListIcon'
import SaveIcon from '@/components/icons/SaveIcon'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'

type Props = {
  toggleQuestionList: () => void
}

export default function TotalButtons({ toggleQuestionList }: Props) {
  return (
    <div className="flex">
      <Button
        color="text"
        size="sm"
        className="h-10 w-10 !p-0 font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2"
        onClick={() => {
          toggleQuestionList()
        }}>
        <ListIcon className="h-6 w-6 fill-primary-700" />
        <span className="hidden lg:inline">
          <Trans>Liste des questions</Trans>
        </span>
      </Button>
      <Button
        color="text"
        size="sm"
        className="h-10 w-10 !p-0 font-medium lg:w-auto lg:gap-2 lg:!px-4 lg:!py-2"
        onClick={() => {}}>
        <SaveIcon className="h-6 w-6 fill-primary-700" />
        <span className="hidden lg:inline">
          <Trans>Reprendre plus tard</Trans>
        </span>
      </Button>
    </div>
  )
}
