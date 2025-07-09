export default function Legend({ htmlLegend }: { htmlLegend: string }) {
  return (
    <div
      className="mt-12 text-sm italic"
      dangerouslySetInnerHTML={{ __html: htmlLegend }}
    />
  )
}
