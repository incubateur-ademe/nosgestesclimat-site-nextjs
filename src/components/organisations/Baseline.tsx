'use client'
import TransClient from '../translation/trans/TransClient'

export default function Baseline() {
  return (
    <p>
      <strong className="text-secondary-700">
        <TransClient>Entreprises</TransClient>
      </strong>
      ,{' '}
      <strong className="text-secondary-700">
        <TransClient>collectivités</TransClient>
      </strong>
      ,{' '}
      <strong className="text-secondary-700">
        <TransClient>associations</TransClient>
      </strong>
      ,{' '}
      <strong className="text-secondary-700">
        <TransClient>écoles</TransClient>
      </strong>{' '}
      ou encore{' '}
      <strong className="text-secondary-700">
        <TransClient>festivals</TransClient>
      </strong>
       :{' '}
      <TransClient>
        vous souhaitez lancer une campagne Nos Gestes Climat et sensibiliser
        toutes vos parties prenantes ? Découvrez nos outils 100% gratuits !
      </TransClient>
    </p>
  )
}
