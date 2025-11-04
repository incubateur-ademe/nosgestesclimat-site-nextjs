import { getIsUserAuthenticated } from '@/helpers/authentication/getIsUserAuthenticated'
import { twMerge } from 'tailwind-merge'
import LogoLinkServer from '../misc/LogoLinkServer'
import MySpaceButton from './headerServer/MySpaceButton'

type Props = {
  isSticky?: boolean
}

export default async function HeaderServer({ isSticky = true }: Props) {
  const authenticatedUser = await getIsUserAuthenticated()

  return (
    <header
      id="header-server-container"
      className={twMerge(
        'h-20 items-center bg-white shadow-xs',
        isSticky ? 'sticky top-0 z-300' : ''
      )}>
      <div className="absolute top-0 right-0 bottom-0 left-0 h-20 w-full items-center border-b border-gray-200 bg-white shadow-xs md:flex">
        <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between gap-6 px-4 md:px-0">
          <div className="flex origin-left items-center justify-center">
            <LogoLinkServer />
          </div>

          <div className="flex h-full items-center">
            <MySpaceButton authenticatedUser={authenticatedUser} />
          </div>
        </div>
      </div>
    </header>
  )
}
