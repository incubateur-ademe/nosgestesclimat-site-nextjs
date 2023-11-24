async function importLocalRules({
  regionCode,
  locale,
  isOptim,
}: {
  regionCode?: string
  locale: string
  isOptim: boolean
}) {
  if (!(process.env.NODE_ENV === 'development')) return Promise.resolve({})

  try {
    return (await import(
      `../../../nosgestesclimat/public/co2-model.${regionCode}-lang.${locale}${
        isOptim ? '-opti' : ''
      }.json`
    )) as unknown
  } catch (e) {
    console.log(e)
  }
}

export default importLocalRules

// // Code to use to import .publicodes directly
// const yamlContext = await require.context(
//   '../../../nosgestesclimat/data',
//   true,
//   /\.publicodes$/
// )

// let rules = {}
// console.log(yamlContext.keys())
// yamlContext.keys().forEach((file) => {
//   const yaml = yamlContext(file)

//   rules = { ...rules, ...yaml }
// })

// rules = Object.fromEntries(
//   Object.entries(rules).filter(([key]) => !key.includes('importer'))
// )
// console.log(rules)
// return rules
