import Footer from '@/components/layout/Footer'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Main from '@/design-system/layout/Main'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  const { t } = await getServerTranslation()
  return (
    <>
      <Main>
        <div className="mx-auto flex flex-col items-center justify-center gap-4 px-4 pb-8 text-center md:mx-auto md:w-full  md:max-w-6xl md:items-start md:px-8 md:pb-10 md:text-left">
          <ButtonLink href="/simulateur/bilan" color="secondary" size="sm">
            {t('←\u202fRevenir au test')}
          </ButtonLink>
          {children}
        </div>
      </Main>
      <Footer />
    </>
  )
}
