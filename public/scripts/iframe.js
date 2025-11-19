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
  const hostname = srcURL.origin || 'nosgestesclimat.fr'
  console.log(hostname)
  const possibleOptions = [
    { key: 'shareData', legacy: 'partagedatafinsimulation' },
  ]

  // Fonction pour vérifier si l'origine est autorisée
  async function isOriginAllowed(origin) {
    try {
      const apiUrl = `${hostname}/api/iframe-config?origin=${encodeURIComponent(origin)}`
      const response = await fetch(apiUrl)
      if (!response.ok) {
        return false
      }

      const data = await response.json()
      console.log(data)
      return data.isAllowed === true
    } catch (error) {
      console.warn(
        "Iframe Nos Gestes Climat: Impossible de vérifier l'origine autorisée",
        error
      )
      return false
    }
  }

  // Fonction principale asynchrone
  async function setupIframe() {
    const url = new URL(hostname)

    url.searchParams.append('iframe', 'true')
    url.searchParams.append('integratorUrl', integratorUrl)

    for (const { key, legacy } of possibleOptions) {
      const value = script.dataset[key] || script.dataset[legacy]

      url.searchParams.append(key, value)

      if (key === 'shareData') {
        const originAllowed = await isOriginAllowed(hostname)
        if (originAllowed) {
          url.searchParams.append('shareDataBypass', 'true')
        }
      }
    }

    const iframe = document.createElement('iframe')

    const iframeAttributes = {
      src: url.toString(),
      allowfullscreen: true,
      webkitallowfullscreen: true,
      mozallowfullscreen: true,
      allow: 'fullscreen',
      id: 'iframeNGC',
      title: 'Iframe Nos Gestes Climat',
    }

    const color = '#32337b'
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>
    #iframeNGC {
      border: none;
      border-radius: 1rem;
      display: block;
      margin: 10px auto;
      height: 800px;
      max-height: 80vh; /* Small smartphone screens should'nt have to scroll too much. We estimate that the host's header takes 20vh */
      width: 100%;
    }
    @media (min-width: 800px){
      #iframeNGC{
        max-width: 450px; /* On large monitors, the iframe should not extend too much, as to avoid confusion between the iframe (viewed as an app) and the rest of the content, e.g. when it's integrated in a blog article. Remember : the website is designed mobile first, so should work perfectly on this width */
        border: 8px solid ${color};
      }
    }
    #iframeNGC:fullscreen {
      width: 100%;
      height: 100%;
      max-height: 100%;
      max-width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: white;
    }
    </style>`
    )

    for (var key in iframeAttributes) {
      iframe.setAttribute(key, iframeAttributes[key])
    }

    const link = document.createElement('div')

    link.innerHTML = `
  <a href="https://nosgestesclimat.fr" target="_blank">Calculer mon empreinte carbone et eau ⬇️</a>
`

    link.style.cssText = `
  margin: 1rem auto .6rem;
  text-align: center;
`

    const fullscreenButton = document.createElement('button')

    fullscreenButton.innerHTML = `
  <div style="display: flex; gap: 4px; margin: 0 auto;">
    <img width="14px" height="14px" alt="" aria-hidden="true" style="filter: invert(1); vertical-align: middle; cursor: pointer"/>
    Passer en mode plein écran
  </div>
`

    fullscreenButton.style.cssText = `
  cursor:pointer;
  display: block;
  margin: 0 auto;
  border: none;
  padding: .2rem .8rem;
  border-radius: .4rem;
  background: ${color};
  font-weight: bold;
  color: white;
`

    fullscreenButton.addEventListener('click', () => {
      iframe.requestFullscreen()
    })

    script.parentNode.insertBefore(link, script)

    script.parentNode.insertBefore(fullscreenButton, script)
    // TODO : works, but we need to let the user come back !

    script.parentNode.insertBefore(iframe, script)
  }

  // Appeler la fonction asynchrone
  setupIframe()
}
