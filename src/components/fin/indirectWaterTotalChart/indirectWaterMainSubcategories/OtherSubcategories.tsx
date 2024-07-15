type Props = {
  total: number
  totalOfFilteredSubcategories: number
}

export default function OtherSubcategories({
  total,
  totalOfFilteredSubcategories,
}: Props) {
  const percentage = ((total - totalOfFilteredSubcategories) / total) * 100

  // We adjust the height to make up for the droplet shape (see Subcategory component for more details)
  const adjustedPercentage = percentage - percentage / 3

  return (
    <div
      style={{ height: adjustedPercentage + '%' }}
      className="flex items-center justify-center bg-gray-100">
      {Math.round(percentage)} % (autre)
    </div>
  )
}
