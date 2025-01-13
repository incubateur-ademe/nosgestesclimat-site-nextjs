import CategoryBreadcrumbs from './categoryHero/CategoryBreadcrumbs'

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
        <CategoryBreadcrumbs slug={slug} title={title} />

        <div className="relative flex flex-col items-center gap-8 pb-20 pt-8 md:flex-row">
          <h1 className="text-3xl font-medium md:w-1/2 md:text-5xl">{title}</h1>
          <p
            className="text-base md:w-1/2 md:text-lg"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  )
}
