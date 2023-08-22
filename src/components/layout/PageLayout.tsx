import { PropsWithChildren } from 'react'
import Logo from '../Logo'
import SideMenu from './Navigation'

const pageWithMenuClassnames = 'flex justify-start'
const pageWithoutMenuClassnames = ''

export default function PageLayout({
	children,
	shouldShowMenu,
}: PropsWithChildren<{ shouldShowMenu?: boolean }>) {
	return (
		<>
			{!shouldShowMenu && <Logo />}
			<div
				className={
					shouldShowMenu ? pageWithMenuClassnames : pageWithoutMenuClassnames
				}
			>
				{shouldShowMenu && <SideMenu />}
				<div className="p-8">{children}</div>
			</div>
		</>
	)
}
