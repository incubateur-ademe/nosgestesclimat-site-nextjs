import Providers from '@/components/providers/Providers'
import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { PropsWithChildren } from 'react'
import DocumentationRouter from './_components/DocumentationRouter'
import DocumentationClient from './_components/documentationRouter/DocumentationClient'

export default async function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { slug: string[] } }>) {
  const supportedRegions = await getSupportedRegions()

  return (
    <>
      <DocumentationRouter
        supportedRegions={supportedRegions}
        slug={params.slug}
        clientDocumentation={
          <Providers supportedRegions={supportedRegions} isOptim={false}>
            <DocumentationClient
              supportedRegions={supportedRegions}
              slugs={params.slug}
            />
          </Providers>
        }
      />
      {children}
    </>
  )
}
