export const extractImage = (body: string) =>
	body.match(/!\[.*?\]\((.*?)\)/)?.[1] || '/images/petit-logo@2x.png'
