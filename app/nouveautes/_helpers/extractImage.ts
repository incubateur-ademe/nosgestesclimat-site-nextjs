export const extractImage = (body: string) =>
	body.match('<img.+src=(?:"|\')(.+?)(?:"|\')(?:.+?)>')?.[1] ||
	'/assets/images/petit-logo@2x.png'
