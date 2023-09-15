export const extractImageSrc = (body: string) => {
  const firstOpenParenthesis = body.indexOf('(')
  const firstCloseParenthesis = body.indexOf(')')

  return body.substring(firstOpenParenthesis + 1, firstCloseParenthesis)
}
