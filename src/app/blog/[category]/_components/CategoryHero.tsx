import dynamic from 'next/dynamic'

const CategoryBreadcrumb = dynamic(
  () => import('./categoryHero/CategoryBreadcrumbs'),
  {
    loading: () => <div>Loading...</div>,
  }
)

export default function CategoryHero({
  title,
  description,
  slug,
}: {
  title: string
  description: string
  slug: string
}) {
  return (
    <div className="relative mb-20 mt-12 w-full">
      <div className="absolute -left-1/2 bottom-0 top-0 h-full w-[200%] bg-heroLightBackground" />
      <div className="mx-auto max-w-5xl">
        <CategoryBreadcrumb slug={slug} title={title} />

        <div className="relative flex flex-col items-center gap-8 pb-20 pt-2 md:flex-row">
          <h1 className="text-4xl font-bold md:w-1/2">{title}</h1>
          <p className="text-lg md:w-1/2">{description}</p>
        </div>
      </div>
    </div>
  )
}
