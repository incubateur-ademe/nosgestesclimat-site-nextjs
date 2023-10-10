export function isMosaicQuestion(body) {
  return body.find('[data-cypress-id="mosaic-question"]')?.length > 0
}
