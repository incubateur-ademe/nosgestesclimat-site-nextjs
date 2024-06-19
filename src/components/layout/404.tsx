import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'
import Trans from '../translation/Trans'

export default async function Route404() {
  const { t } = await getServerTranslation()
  return (
    <div className="mx-auto text-center text-primary-700">
      <div className="fixed left-0 right-0 h-screen">
        <svg
          id="svg"
          viewBox="0 0 1440 590"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-0 h-screen w-[1000px] fill-primary-700 md:w-auto">
          <path
            d="M 0,600 L 0,150 C 35.54632560876084,136.91760519273473 71.09265121752168,123.83521038546944 112,123 C 152.90734878247832,122.16478961453056 199.17572073867416,133.57676365085692 236,133 C 272.82427926132584,132.42323634914308 300.20446582778186,119.85773501110287 341,122 C 381.79553417221814,124.14226498889713 436.0064159501984,140.99229630473152 486,149 C 535.9935840498016,157.00770369526848 581.7698703714248,156.173079769971 621,169 C 660.2301296285752,181.826920230029 692.9141025641026,208.3153846153846 731,200 C 769.0858974358974,191.6846153846154 812.5737193721651,148.56538176849057 848,135 C 883.4262806278349,121.43461823150942 910.7910199472375,137.42308831065307 945,137 C 979.2089800527625,136.57691168934693 1020.2622008388848,119.7422649888971 1063,115 C 1105.7377991611152,110.2577350111029 1150.1601766972233,117.60785173375848 1194,140 C 1237.8398233027767,162.39214826624152 1281.0970923722218,199.82632807606902 1322,204 C 1362.9029076277782,208.17367192393098 1401.4514538138892,179.0868359619655 1440,150 L 1440,600 L 0,600 Z"
            className="path-0 w-full fill-primary-600"
            transform="translate(0, -20)"></path>
          <path
            d="M 0,600 L 0,350 C 51.81871832830383,347.69078175710297 103.63743665660766,345.381563514206 139,364 C 174.36256334339234,382.618436485794 193.26897170187323,422.164527700279 228,401 C 262.7310282981268,379.835472299721 313.28667653589935,297.960325684678 362,289 C 410.71332346410065,280.039674315322 457.58432215452945,343.9941695610089 499,372 C 540.4156778454706,400.0058304389911 576.3760348459831,392.06299607128625 613,383 C 649.6239651540169,373.93700392871375 686.9115384615384,363.7538461538461 727,363 C 767.0884615384616,362.2461538461539 809.9778113078631,370.9216193133292 850,351 C 890.0221886921369,331.0783806866708 927.177216307009,282.5596765928372 970,302 C 1012.822783692991,321.4403234071628 1061.3133234641007,408.839674315322 1102,414 C 1142.6866765358993,419.160325684678 1175.5694898365882,342.08162614587485 1212,339 C 1248.4305101634118,335.91837385412515 1288.4087171895465,406.83382110117867 1327,421 C 1365.5912828104535,435.16617889882133 1402.795641405227,392.58308944941064 1440,350 L 1440,600 L 0,600 Z"
            className="path-1 z-10 w-full "
            transform="translate(0, -100)"></path>
        </svg>
      </div>

      <div className="absolute left-0 right-0 top-[12rem] flex flex-col items-center justify-end">
        <h1 className="flex h-[15rem] items-center justify-center text-[10rem] text-primary-950 md:h-[20rem] md:text-[20rem]">
          <span className="island mt-24 animate-bounce">4</span>
          <span className="island relative">
            <Image
              className="absolute -top-[32px] left-0 right-0 m-auto w-10 md:top-[10px] md:w-12"
              src="/images/misc/404_bonhomme.svg"
              width="60"
              height="60"
              alt={t('Un bonhomme se demandant où il est')}
            />
            0
          </span>
          <span className="island mt-24 animate-bounce">4</span>
        </h1>

        <p className="text-base font-bold text-white sm:text-lg md:mt-8 md:text-2xl">
          <Trans>Rien à l'horizon ! La page recherchée n'existe pas.</Trans>
        </p>
        <ButtonLink
          color="secondary"
          href="/"
          className="mt-8 justify-self-center bg-white">
          <Trans>Revenir à l'accueil</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
