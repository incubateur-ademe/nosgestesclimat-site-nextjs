import Script from 'next/script'

export default function DemoIframePage() {
  return (
    <div>
      <header className="p-8">
        <h2>
          Exemple d'intégration du test avec région fixée par l'intégrateur.
        </h2>
        <p>
          Ci-dessous, nosgestesclimat.fr intégré comme un iframe paramétré ne
          contenant que la partie simulation du test. Dans cet exemple, la
          Suisse a été définie comme étant la région par défaut du test.
        </p>
      </header>

      <main>
        <Script
          id="nosgestesclimat"
          src="/iframeSimulation.js"
          data-only-simulation="true"
          data-region="CH"
          data-pr="1872"
          data-lang="en"
        />
      </main>
    </div>
  )
}
