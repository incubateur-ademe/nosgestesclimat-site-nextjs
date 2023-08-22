import { slugifyString } from './slugifyString'

export const getPath = (index: number, data: Array<{ name: string }>) => {
	return `${'/nouveautes'}/${encodeURI(slugifyString(data[index]?.name))}`
}
