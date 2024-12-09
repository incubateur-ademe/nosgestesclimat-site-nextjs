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
]

const lang = script.dataset.lang

const url = new URL(hostname)

url.pathname = `/${lang ? lang + '/' : ''}simulateur/bilan`

url.searchParams.append('iframe', 'true')
url.searchParams.append('integratorUrl', integratorUrl)

possibleOptions.forEach(({ key, legacy }) => {
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
  style: 'border: none; width: 100%; display: block; height: 801px;',
}

for (var key in iframeAttributes) {
  iframe.setAttribute(key, iframeAttributes[key])
}

script.parentNode.insertBefore(iframe, script)

window.addEventListener('message', function (evt) {
  if (
    evt.data.kind === 'resize-height' &&
    iframe.style.height !== `${evt.data.value}px`
  ) {
    iframe.style.height = `${evt.data.value}px`
  }
})
