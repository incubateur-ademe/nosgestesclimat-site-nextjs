import PageLayout from '@/components/layout/PageLayout'
import Main from '@/design-system/layout/Main'

import { Metadata } from 'next'
import Content from './_components/Content'

export const metadata: Metadata = {
	title: 'CGU',
	description: "Conditions générales d'utilisation du site.",
}

export default function CGU() {
	return (
		<PageLayout shouldShowMenu>
			<Main className="max-w-[800px] p-8">
				<Content />
			</Main>
		</PageLayout>
	)
}
