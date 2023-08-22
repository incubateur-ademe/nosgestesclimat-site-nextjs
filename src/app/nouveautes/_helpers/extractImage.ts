export const extractImage = (body: string) =>
	body.match('<img.+src=(?:"|\')(.+?)(?:"|\')(?:.+?)>')?.[1]
