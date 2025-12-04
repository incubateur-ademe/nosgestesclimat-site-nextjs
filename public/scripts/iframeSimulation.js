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
    { key: 'mtm_campaign' },
    { key: 'mtm_kwd' },
    { key: 'orgaPath' },
    // 'o/orga-de-clem/premiere-campagne'
  ]

  const lang = script.dataset.lang

  const url = new URL(hostname)

  // Display or not homepage / orga campaign or directly show the simulator
  const orgaPath = script.dataset.orgaPath
  const withHomepage = script.dataset.withHomepage

  if (orgaPath) {
    url.pathname = `/${lang ? lang + '/' : ''}${orgaPath}`
  } else if (withHomepage) {
    url.pathname = `/${lang ? lang + '/accueil-iframe' : 'accueil-iframe'}`
  } else {
    url.pathname = `/${lang ? lang + '/' : ''}simulateur/bilan`
  }

  // Append iframe and integratorUrl params to allow iframe event to be triggered
  url.searchParams.append('iframe', 'true')
  url.searchParams.append('integratorUrl', integratorUrl)

  // Append matomo tracking params
  const matomoCampaignParam =
    script.dataset.mtm_campaign ??
    (orgaPath
      ? `Organisation_${orgaPath.split('/')[1]}`
      : currentParams.get('mtm_campaign') || `relais_${integratorUrl}`)

  const matomoKwdParam =
    script.dataset.mtm_kwd ??
    (orgaPath
      ? orgaPath.split('/')[2]
      : currentParams.get('mtm_kwd') || 'iframe')

  url.searchParams.append('mtm_campaign', matomoCampaignParam)
  url.searchParams.append('mtm_kwd', matomoKwdParam)

  possibleOptions
    .filter(
      ({ key }) =>
        ['maxHeight', 'mtm_campaign', 'mtm_kwd', 'path'].includes(key) === false
    )
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
