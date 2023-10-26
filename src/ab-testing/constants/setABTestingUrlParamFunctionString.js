export const setABTestingUrlParamFunctionString = `
function setABTestingUrlParam(key) {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)

  // If another ab-test is already set, add the new one to the list
  if (url.searchParams.has('ab-test')) {
    const currentABTests = url.searchParams.get('ab-test')?.split(',') || []

    currentABTests.push(key)
    url.searchParams.set('ab-test', currentABTests.join(','))

    window.history.replaceState({}, '', url)
    return
  }

  url.searchParams.append('ab-test', key)

  window.history.replaceState({}, '', url)
}

setABTestingUrlParam("abTestingKey")
`
