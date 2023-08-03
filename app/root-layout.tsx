import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: t('Connaissez-vous votre empreinte climat ?'),
	description: t('meta.publicodes.Landing.description'),
	openGraph: {
		images: 'https://nosgestesclimat.fr/images/dessin-nosgestesclimat.png',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1" />

				<link rel="icon" href="/images/favicon.png" />

				<link
					rel="alternate"
					hrefLang="en"
					href="https://nosgestesclimat.fr/?lang=en"
					data-react-helmet="true"
				/>
				<link
					rel="alternate"
					hrefLang="fr"
					href="https://nosgestesclimat.fr/?lang=fr"
					data-react-helmet="true"
				/>
				<link
					rel="alternate"
					hrefLang="x-default"
					href="https://nosgestesclimat.fr"
					data-react-helmet="true"
				/>

				<meta property="og:type" content="website" data-react-helmet="true" />

				<meta
					property="og:title"
					data-react-helmet="true"
					content="<%= htmlWebpackPlugin.options.title %>"
				/>

				<meta
					property="og:description"
					data-react-helmet="true"
					content="<%= htmlWebpackPlugin.options.description %>"
				/>

				<meta
					property="og:image"
					content="<%= htmlWebpackPlugin.options.logo %>"
					data-react-helmet="true"
				/>
				<meta
					name="google-site-verification"
					content="oQ9gPKS4kocrCJP6CoguSkdIKKZ6ilZz0aQw_ZIgtVc"
				/>

				<meta
					property="twitter:card"
					content="summary_large_image"
					data-react-helmet="true"
				/>

				<link rel="manifest" href="../manifest.webmanifest" />

				<meta name="theme-color" content="#5758BB" />

				{/*
          Manually setting Netlify code spliting cookie in iframe with sameSite=None and secure. 
          See : https://answers.netlify.com/t/running-split-tests-in-an-iframe-adjust-nf-ab-cookie-settings/28754
        */}
				<Script id="script-netlify">
					{`
          if (window.location.href.includes('iframe')) {
            let cookieIsSet = document.cookie.includes('nf_ab')
            if (!cookieIsSet) {
              document.cookie = "nf_ab=${Math.random()}; sameSite=None; secure=true"
              window.location.reload(true) // We need to reload the page for the client to match the server
            }
          }
          `}
				</Script>
			</head>

			<body className={inter.className}>
				<Script id="script-user-agent">{`
          var b = document.documentElement
          b.setAttribute('data-useragent', navigator.userAgent)
        `}</Script>

				{/* Matomo */}
				<Script id="script-matomo">{`
          var _paq = window._paq || []
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          if (!window.location.pathname.match(/\/(sondage|conférence|enquête)\//)) {
            _paq.push(['trackPageView'])
          }
          _paq.push(['enableLinkTracking'])
          ;(function () {
            var u = '//stats.data.gouv.fr/'
            _paq.push(['setTrackerUrl', u + 'matomo.php'])
            _paq.push(['setSiteId', '153'])

            var d = document,
              g = d.createElement('script'),
              s = d.getElementsByTagName('script')[0]
            g.type = 'text/javascript'
            g.async = true
            g.defer = true
            g.src = u + 'matomo.js'
            s.parentNode.insertBefore(g, s)
          })()
        `}</Script>
				{/* End Matomo Code */}

				{/*
          Polyfill and source for old browser
          Add polyfill.io for a very narrow web feature
          IntersectionObserver : SAFARI 11 & 12.0  https://caniuse.com/#search=intersectionobserver
        */}
				<Script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver" />
				{children}
			</body>
		</html>
	)
}
