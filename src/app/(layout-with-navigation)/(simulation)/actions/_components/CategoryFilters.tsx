type Props = {
  categories: any
  // metric: string
  isSelected: boolean
  countByCategory: any
}

export default function CategoryFilters({
  categories,
  // metric,
  isSelected,
  countByCategory,
}: Props) {
  // const router = useRouter()

  return (
    <ul className="flex flex-wrap list-none justify-center pl-0">
      {categories.map((category: any) => {
        const getBackgroundColor = () => {
          switch (true) {
            case !countByCategory[category.dottedName]:
              return '#ccc'
            case isSelected:
              return '#aaa'
            case isSelected === category.dottedName:
            default:
              return category.color
          }
        }
        return (
          <li
            key={category.dottedName}
            className="rounded-sm height-[1.8rem]"
            style={{
              backgroundColor: getBackgroundColor(),
            }}>
            <button
              className="text-white font-bold"
              onClick={() => {
                // Todo : implement logic
                /*
                setSearchParams(
                  new URLSearchParams({
                    ...(metric ? { métrique: metric } : {}),
                    ...(selected === category.dottedName
                      ? {}
                      : { catégorie: category.dottedName }),
                  })
                )
                */
              }}>
              {category.title}{' '}
              <span className="bg-white text-primaryDark rounded-md w-4 inline-block">
                {countByCategory[category.dottedName] || 0}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
