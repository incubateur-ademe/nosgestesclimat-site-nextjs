import { NGCRules } from '@/publicodes-state/types'

async function importLocalRules({
  regionCode,
  locale,
  isOptim,
}: {
  regionCode?: string
  locale: string
  isOptim: boolean
}) {
  try {
    return (await import(
      `${
        process.env.NGC_LOCAL_RULES_PATH
      }/co2-model.${regionCode}-lang.${locale}${isOptim ? '-opti' : ''}.json`
    )) as NGCRules
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
