'use client'

import ButtonLink from '@/design-system/buttons/ButtonLink'

export default function BannerLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <ButtonLink
      onClick={() => {
      }}
      size="sm"
      className="border-primary-100 text-primary-800 hover:border-primary-200 hover:bg-primary-100 hover:text-primary-800 inline-flex! bg-white px-2 py-1 transition-colors duration-300"
      href={href}>
      {label}
    </ButtonLink>
  )
}
