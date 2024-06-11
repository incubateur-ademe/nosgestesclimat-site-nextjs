import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'
import { GroupCreationProvider } from './_contexts/GroupCreationContext'

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  return (
    <FormProvider>
      <GroupCreationProvider>{children}</GroupCreationProvider>
    </FormProvider>
  )
}
