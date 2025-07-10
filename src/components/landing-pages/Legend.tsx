export default function Legend({ htmlLegend }: { htmlLegend: string }) {
  console.log(htmlLegend)
  return (
    <div className="mx-auto w-full max-w-screen px-2 pt-18 pb-12 md:max-w-5xl md:px-0">
      <div
        className="markdown mt-12 text-sm"
        dangerouslySetInnerHTML={{ __html: htmlLegend }}
      />
    </div>
  )
}
