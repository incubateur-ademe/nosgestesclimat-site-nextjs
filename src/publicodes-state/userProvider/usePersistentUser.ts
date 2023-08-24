import { useState, useEffect } from 'react'

type Props = {
	storageKey: string
}
export default function usePersistentUser({ storageKey }: Props) {
	const [user, setUser] = useState({})

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem(storageKey) || '{}').user || {})
	}, [storageKey])

	useEffect(() => {
		const currentStorage = JSON.parse(localStorage.getItem(storageKey) || '{}')
		const updatedStorage = { ...currentStorage, user }
		localStorage.setItem(storageKey, JSON.stringify(updatedStorage))
	}, [storageKey, user])

	return { user, setUser }
}
