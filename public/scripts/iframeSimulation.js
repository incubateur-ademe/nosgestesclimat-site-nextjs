const script =
  document.getElementById('ecolab-climat') ||
  document.getElementById('nosgestesclimat')

if (!script) {
  console.error('Iframe Nos Gestes Climat: No target element found')
}

// Avoid unwanted reloading loop
const currentParams = new URLSearchParams(window.location.search)
if (!currentParams.has('iframe') && !currentParams.has('integratorUrl')) {
  const integratorUrl = window.location.href.toString()

  const srcURL = new URL(script.src)
  const hostname = srcURL.origin || 'https://nosgestesclimat.fr'

  const possibleOptions = [
    { key: 'shareData', legacy: 'partagedatafinsimulation' },
    { key: 'region' },
    { key: 'lang' },
    { key: 'onlySimulation' },
    { key: 'pr' },
    { key: 'withHomepage' },
    { key: 'maxHeight' },
  ]

  const lang = script.dataset.lang

  const url = new URL(hostname)

  // Display or not homepage or directly show the simulator
  const withHomepage = script.dataset.withHomepage

  if (withHomepage) {
    url.pathname = `/${lang ? lang + '/accueil-iframe' : 'accueil-iframe'}`
  } else {
    url.pathname = `/${lang ? lang + '/' : ''}simulateur/bilan`
  }

  // Append iframe and integratorUrl params to allow iframe event to be triggered
  url.searchParams.append('iframe', 'true')
  url.searchParams.append('integratorUrl', integratorUrl)

  // Append matomo tracking params
  url.searchParams.append(
    'mtm_campaign',
    currentParams.get('mtm_campaign') || `relais_${integratorUrl}`
  )
  url.searchParams.append('mtm_kwd', currentParams.get('mtm_kwd') || 'iframe')

  possibleOptions
    .filter(({ key }) => key !== 'maxHeight')
    .forEach(({ key, legacy }) => {
      const value = script.dataset[key] || script.dataset[legacy]

      if (value) {
        url.searchParams.append(key === 'pr' ? 'PR' : key, value)
      }
    })

  const iframe = document.createElement('iframe')

  const iframeAttributes = {
    src: url.toString(),
    allowfullscreen: true,
    webkitallowfullscreen: true,
    mozallowfullscreen: true,
    allow: 'fullscreen',
    id: 'iframeNGC',
    style: `border: none; width: 100%; display: block; height: 801px; ${
      script.dataset.maxHeight
        ? `max-height: ${script.dataset.maxHeight}px;`
        : ''
    }`,
    title: 'Iframe Nos Gestes Climat',
  }

  for (var key in iframeAttributes) {
    iframe.setAttribute(key, iframeAttributes[key])
  }

  script.parentNode.insertBefore(iframe, script)
}
