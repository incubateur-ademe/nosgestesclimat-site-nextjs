export async function importRulesFromModel({ fileName }: { fileName: string }) {
  console.log('dynamically importing rules', fileName)
  try {
    // Set chunk name
    return await import(
      /* webpackChunkName: "rules" */
      `@incubateur-ademe/nosgestesclimat/public/${fileName}`,
      { assert: { type: 'json' } }
    ).then((module) => module.default || module)
  } catch (e) {
    console.error('importFile error', e)
    return undefined
  }
}
