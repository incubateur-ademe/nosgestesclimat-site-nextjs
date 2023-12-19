import { Persona as PersonaType } from '@/publicodes-state/types'

async function importLocalPersonas(locale: string | undefined = 'fr') {
  try {
    return (await import(
      `../../../nosgestesclimat/public/personas-${locale}.json`
    )) as PersonaType
  } catch (e) {
    console.error(e)
  }
}

export default importLocalPersonas
