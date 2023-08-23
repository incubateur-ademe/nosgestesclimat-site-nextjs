import { useMemo } from 'react'

import Engine from 'publicodes'

export default function useEngine(rules: any) {
	// TODO: catch error on evaluate or getRue
	const engine = useMemo(() => new Engine(rules), [rules])

	return engine
}
