const axios = require('axios')
const { chromium } = require('playwright')
require('dotenv').config()

const urls = [
  'https://www.lemonde.fr/chaleur-humaine/article/2025/01/30/mesurez-votre-impact-environnement-avec-le-calculateur-d-empreinte-carbone-et-eau_6523433_6125299.html',
  'https://geneve.nosgestesclimat.ch/',
]

const iframeId = 'iframeNGC'

async function checkConnection(url) {
  try {
    const response = await axios.get(url, { timeout: 30000 })
    return response.status === 200
  } catch (error) {
    console.log(`Connection check failed for ${url}:`, error.message)
    return false
  }
}

async function healthcheck() {
  const browser = await chromium.launch({
    headless: true,
  })

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    })
    const page = await context.newPage()

    const errors = []

    for (const url of urls) {
      console.log(`\nChecking URL: ${url}`)

      if (!(await checkConnection(url))) {
        console.log(`Cannot connect to ${url}, skipping...`)
        errors.push(url)
        continue
      }

      try {
        await page.goto(url, {
          waitUntil: 'networkidle',
          timeout: 120000,
        })

        try {
          // Retry mechanism for iframe loading and validation
          let retryCount = 0
          const maxRetries = 3
          let iframeValid = false

          while (retryCount < maxRetries && !iframeValid) {
            try {
              console.log(
                `Attempt ${retryCount + 1}/${maxRetries} for iframe validation`
              )

              // Wait for iframe loading
              await page.waitForSelector(`#${iframeId}`, { timeout: 30000 })

              // Wait for the iframe to be stabilized
              await page.waitForTimeout(10000)

              const frame = page.frameLocator(`#${iframeId}`)
              const pageContent = await frame.locator('body').innerText()

              const validPatterns = ['Avant de commencer']
              const isValid = validPatterns.every((pattern) =>
                pageContent.toLowerCase().includes(pattern.toLowerCase())
              )
              const errorPatterns = ['404', 'erreur', 'error']
              const hasError = errorPatterns.some((pattern) =>
                pageContent.toLowerCase().includes(pattern.toLowerCase())
              )

              if (hasError || !isValid) {
                console.log(
                  `Content of iframe ${iframeId} contains an error (attempt ${retryCount + 1})`
                )
                if (retryCount === maxRetries - 1) {
                  errors.push(url)
                }
              } else {
                console.log(`Content of iframe ${iframeId} is valid`)
                iframeValid = true
              }
            } catch (error) {
              console.log(
                `Iframe validation attempt ${retryCount + 1} failed:`,
                error.message
              )
              if (retryCount === maxRetries - 1) {
                console.log(
                  `Iframe ${iframeId} not found or not accessible after ${maxRetries} attempts:`,
                  error.message
                )
                errors.push(url)
              } else {
                console.log(`Retrying in 5 seconds...`)
                await page.waitForTimeout(5000)
              }
            }
            retryCount++
          }
        } catch (error) {
          console.log(
            `Iframe ${iframeId} not found or not accessible:`,
            error.message
          )
          errors.push(url)
          continue
        }
      } catch (error) {
        console.log(`Navigation error details:`, {
          message: error.message,
          name: error.name,
          stack: error.stack,
        })
        errors.push(url)
        continue
      }
    }

    // if (errors.length) {
    //   console.log('Errors found:', errors)
    //   const webhookUrl = process.env.MATTERMOST_WEBHOOK_URL
    //   console.log('Webhook URL:', webhookUrl ? 'is set' : 'is not set')

    //   if (webhookUrl) {
    //     try {
    //       console.log('Attempting to send notification to Mattermost...')
    //       const withSOrNot = errors.length > 1 ? 's' : ''
    //       const response = await axios.post(webhookUrl, {
    //         text: `🚨 Iframes cassées détectées sur le${withSOrNot} site${withSOrNot} suivant${withSOrNot} :\n\n${errors.map((url) => `• ${url}`).join('\n')}`,
    //       })
    //       console.log('Mattermost response status:', response.status)
    //       console.log('Mattermost response data:', response.data)
    //     } catch (error) {
    //       console.log('Failed to send to Mattermost:', error.message)
    //       if (error.response) {
    //         console.log('Response status:', error.response.status)
    //         console.log('Response data:', error.response.data)
    //       }
    //     }
    //   } else {
    //     console.log('Mattermost webhook URL not configured')
    //     console.log('Iframes are broken on the following sites:')
    //     errors.forEach((error) => console.log(error))
    //   }
    // }
  } catch (error) {
    console.log(`Healthcheck error: ${error.message}`)
  } finally {
    await browser.close()
  }
}

healthcheck()
