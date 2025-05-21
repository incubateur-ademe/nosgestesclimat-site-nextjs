const axios = require('axios')
const puppeteer = require('puppeteer')
require('dotenv').config()

const urls = [
  'https://www.lemonde.fr/chaleur-humaine/article/2025/01/30/mesurez-votre-impact-environnement-avec-le-calculateur-d-empreinte-carbone-et-eau_6523433_6125299.html',
  'https://geneve.nosgestesclimat.ch/',
]

const iframeId = 'iframeNGC'

async function healthcheck() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()

    const errors = []

    for (const url of urls) {
      console.log(`\nChecking URL: ${url}`)

      try {
        await page.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

        try {
          await page.waitForSelector(`#${iframeId}`, { timeout: 5000 })
        } catch {
          console.log(`Iframe ${iframeId} not found on the page`)
          errors.push(url)
          continue
        }

        const iframe = await page.$(`#${iframeId}`)
        const frame = await iframe.contentFrame()

        if (!frame) {
          console.log(`Unable to access content of iframe ${iframeId}`)
          errors.push(url)
          continue
        }

        const pageContent = await frame.evaluate(() => document.body.innerText)

        const validPatterns = ['Avant de commencer']
        const isValid = validPatterns.every((pattern) =>
          pageContent.toLowerCase().includes(pattern.toLowerCase())
        )
        const errorPatterns = ['404', 'erreur', 'error', 'Avant de commencer']
        const hasError = errorPatterns.some((pattern) =>
          pageContent.toLowerCase().includes(pattern.toLowerCase())
        )

        if (hasError || !isValid) {
          console.log(`Content of iframe ${iframeId} contains an error`)
          errors.push(url)
        } else {
          console.log(`Content of iframe ${iframeId} is valid`)
        }
      } catch (error) {
        console.log(`Error while checking ${url}: ${error.message}`)
        errors.push(url)
      }
    }

    if (errors.length) {
      console.log('Errors found:', errors)
      const webhookUrl = process.env.MATTERMOST_WEBHOOK_URL
      console.log('Webhook URL:', webhookUrl ? 'is set' : 'is not set')

      if (webhookUrl) {
        try {
          console.log('Attempting to send notification to Mattermost...')
          const withSOrNot = errors.length > 1 ? 's' : ''
          const response = await axios.post(webhookUrl, {
            text: `🚨 Iframes cassées détectées sur le${withSOrNot} site${withSOrNot} suivant${withSOrNot} :\n\n${errors.map((url) => `• ${url}`).join('\n')}`,
          })
          console.log('Mattermost response status:', response.status)
          console.log('Mattermost response data:', response.data)
        } catch (error) {
          console.log('Failed to send to Mattermost:', error.message)
          if (error.response) {
            console.log('Response status:', error.response.status)
            console.log('Response data:', error.response.data)
          }
        }
      } else {
        console.log('Mattermost webhook URL not configured')
        console.log('Iframes are broken on the following sites:')
        errors.forEach((error) => console.log(error))
      }
    }
  } catch (error) {
    console.log(`Healthcheck error: ${error.message}`)
  } finally {
    await browser.close()
  }
}

healthcheck()
