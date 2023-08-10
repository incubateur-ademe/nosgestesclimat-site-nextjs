import { slugifyString } from './slugifyString'

export const getPath = (index: number, data: Array<{ name: string }>) => {
	return `${'/nouveautes'}/${slugifyString(data[index]?.name)}`
}
