import Link from '@/components/Link'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { HTMLProps } from 'react'

type Props = {
  href: string
}

export default function InfoLink({
  href,
  ...props
}: Props & HTMLProps<HTMLAnchorElement>) {
  const { t } = useClientTranslation()

  return (
    <Link
      href={href}
      className="rounded-full bg-primary-700 text-white"
      {...props}>
      <Image
        src="/images/misc/info.svg"
        width={24}
        height={24}
        alt={t("Plus d'information à ce sujet")}
      />
    </Link>
  )
}
