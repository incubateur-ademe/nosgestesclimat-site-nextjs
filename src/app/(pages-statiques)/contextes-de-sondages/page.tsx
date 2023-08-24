import PageLayout from '@/components/layout/PageLayout'
import Main from '@/design-system/layout/Main'
import { Metadata } from 'next'
import Content from './_components/Content'

export const metadata: Metadata = {
	title: 'Documentation Contexte Sondage',
	description: "Informations relatives à la création d'un contexte spécifique.",
}

export default function ContextesSondages() {
	return (
		<PageLayout shouldShowMenu>
			<Main className="max-w-[800px] p-8">
				<Content />
			</Main>
		</PageLayout>
	)
}
