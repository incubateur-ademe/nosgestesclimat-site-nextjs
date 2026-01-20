import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_ALIMENTATION_NEWSLETTER,
  LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import Button from '@/design-system/buttons/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { useForm } from 'react-hook-form'
import Trans from '../translation/trans/TransClient'
import NewsletterCheckbox from './newsletterManagement/NewsletterCheckbox'

const NEWSLETTERS = [
  {
    id: LIST_MAIN_NEWSLETTER,
    title: t(
      'newsletterManagement.mainNewsletter.title',
      'Les actualités de Nos Gestes Climat 🌱'
    ),
    description: t(
      'newsletterManagement.mainNewsletter.description',
      "Nos dernières évolutions et nos recommandations d'actions, les articles récents, les nouvelles formations, et plus encore. Une fois par mois"
    ),
  },
  {
    id: LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
    title: t(
      'newsletterManagement.transportNewsletter.title',
      'Nos Gestes Transports 🚗 '
    ),
    description: t(
      'newsletterManagement.transportNewsletter.description',
      "4 infolettres (sur 4 semaines), pour comprendre l'impact de nos déplacements et agir concrètement. Pour avancer vers des trajets plus légers"
    ),
  },
  {
    id: LIST_NOS_GESTES_LOGEMENT_NEWSLETTER,
    title: t(
      'newsletterManagement.logementNewsletter.title',
      'Nos Gestes Logement 🏠'
    ),
    description: t(
      'newsletterManagement.logementNewsletter.description',
      "3 infolettres (sur 3 semaines), pour découvrir comment nos choix d'habitat influencent notre empreinte carbone. Pour un logement plus sobre et confortable."
    ),
  },
  {
    id: LIST_NOS_GESTES_ALIMENTATION_NEWSLETTER,
    title: t(
      'newsletterManagement.alimentationNewsletter.title',
      'Nos Gestes Alimentation 🍎'
    ),
    description: t(
      'newsletterManagement.alimentationNewsletter.description',
      "4 infolettres (sur 4 semaines), pour découvrir l'empreinte de notre alimentation, et comprendre comment aligner son assiette avec les enjeux planétaires."
    ),
  },
]

interface Props {
  newslettersSubscriptions: number[]
}

export default function NewsletterManagement({
  newslettersSubscriptions,
}: Props) {
  const { register, handleSubmit, watch } = useForm<{
    newsletterIds: number[]
  }>({
    defaultValues: { newsletterIds: newslettersSubscriptions },
  })

  const { register: registerEmail, handleSubmit: handleSubmitEmail } = useForm<{
    email: string
  }>({
    defaultValues: { email: '' },
  })

  const newsletterIds = watch('newsletterIds')

  const onSubmitSubscriptions = () => {
    console.log(newsletterIds)
  }

  return (
    <>
      <form onSubmit={handleSubmit(() => {})}>
        {NEWSLETTERS.map((newsletter) => (
          <NewsletterCheckbox
            {...register(`newsletterIds.${newsletter.id}`)}
            key={newsletter.id}
            newsletter={newsletter}
          />
        ))}
      </form>

      <form onSubmit={handleSubmitEmail(onSubmitSubscriptions)}>
        <EmailInput {...registerEmail('email')} />
        <Button type="submit">
          <Trans i18nKey="newsletterManagement.saveSubscriptions">
            Valider mon inscription
          </Trans>
        </Button>
      </form>
    </>
  )
}
