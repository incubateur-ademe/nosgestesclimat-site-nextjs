import Providers from '@/components/providers/Providers'
import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { PropsWithChildren } from 'react'
import DocumentationRouter from './_components/DocumentationRouter'
import DocumentationClient from './_components/documentationRouter/DocumentationClient'
import DocumentationServer from './_components/documentationRouter/DocumentationServer'

export default async function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { slug: string[] } }>) {
  const supportedRegions = await getSupportedRegions()

  return (
    <>
      <DocumentationRouter
        serverDocumentation={
          <DocumentationServer
            supportedRegions={supportedRegions}
            slugs={params.slug}
          />
        }
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
