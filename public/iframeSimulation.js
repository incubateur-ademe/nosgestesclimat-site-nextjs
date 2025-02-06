// Add the iframe-resizer script to the page
const iframeResizeScript = document.createElement('script')
iframeResizeScript.src =
  'https://cdn.jsdelivr.net/npm/@iframe-resizer/parent@5.3.2'
document.head.appendChild(iframeResizeScript)

iframeResizeScript.onload = () => {
  const script =
    document.getElementById('ecolab-climat') ||
    document.getElementById('nosgestesclimat')

  const integratorUrl = encodeURIComponent(window.location.href.toString())

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

  // Check if withHomepage is true
  const withHomepage = script.dataset.withHomepage

  if (withHomepage) {
    url.pathname = `/${lang ? lang + '/' : ''}`
  } else {
    url.pathname = `/${lang ? lang + '/' : ''}simulateur/bilan`
  }

  url.searchParams.append('iframe', 'true')
  url.searchParams.append('integratorUrl', integratorUrl)

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
  }

  for (var key in iframeAttributes) {
    iframe.setAttribute(key, iframeAttributes[key])
  }

  script.parentNode.insertBefore(iframe, script)

  iframe.onload = () => {
    // eslint-disable-next-line no-undef
    iframeResize({ license: 'GPLv3', checkOrigin: false }, iframe)
  }

  window.addEventListener('message', function (evt) {
    if (
      evt.data.kind === 'resize-height' &&
      iframe.style.height !== `${evt.data.value}px`
    ) {
      iframe.style.height = `${evt.data.value}px`
    }
  })
}
