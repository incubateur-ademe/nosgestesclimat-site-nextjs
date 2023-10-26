import Script from 'next/script'
import { setABTestingUrlParamFunctionString } from '../constants/setABTestingUrlParamFunctionString'

export default function AbTestingCouleurPalette() {
  const abTestingKey = 'changement-couleur-palette'

  return (
    <Script id={abTestingKey}>
      {`
		var _paq = _paq || [];
		_paq.push(['AbTesting::create', {
			name: "${abTestingKey}", // you can also use '4' (ID of the experiment) to hide the name
			percentage: 100,
			includedTargets: [{"attribute":"url","inverted":"0","type":"any","value":""}],
			excludedTargets: [],
			variations: [
				{
					name: 'original',
					activate: function (event) {
						// usually nothing needs to be done here
					}
				},
				{
					name: 'new-colors', // you can also use '4' (ID of the variation) to hide the name
					percentage: 50,
					activate: function() {
						${setABTestingUrlParamFunctionString.replace('abTestingKey', abTestingKey)}
					}
				}            
			],
			trigger: function () {
				return true; // here you can further customize which of your visitors will participate in this experiment
			}
		}]);
	`}
    </Script>
  )
}
