import FAQ from '@/components/landing-pages/FAQ'
import Partners from '@/components/landing-pages/Partners'
import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import Markdown from '@/design-system/utils/Markdown'
import type { Locale } from '@/i18nConfig'
import { fetchPartnerCampaign } from '@/services/cms/fetchPartnerCampaign'
import { redirect } from 'next/navigation'
import PartnerCampaignContent from './_components/PartnerCampaignContent'

export default async function PartnerCampaignPage({
  params,
}: {
  params: Promise<{ pollSlug: string; locale: Locale }>
}) {
  const { locale, pollSlug } = await params

  const partnerCampaign = await fetchPartnerCampaign({
    locale,
    pollSlug,
  })

  if (!partnerCampaign) {
    redirect(NOT_FOUND_PATH)
  }

  return (
    <PartnerCampaignContent
      pollSlug={pollSlug}
      partnerCampaign={partnerCampaign}
      partnersComponent={<Partners locale={locale} />}
      faqComponent={
        !!partnerCampaign.faq?.questions?.length && (
          <FAQ
            isBackgroundSkewed={false}
            className="bg-white"
            questions={partnerCampaign.faq.questions.map((questionObject) => ({
              question: questionObject.question,
              answer: <Markdown>{questionObject.answer}</Markdown>,
            }))}
          />
        )
      }
    />
  )
}
