// @ts-expect-error - vi is available in test environment
export const parse = vi.fn()
// @ts-expect-error - vi is available in test environment
export const stringify = vi.fn()

const yaml = {
  parse,
  stringify,
}

export default yaml
