export function invariant(
  condition: unknown,
  message?: string | (() => string)
): asserts condition {
  if (condition) {
    return
  }

  throw new InvariantError(typeof message === 'function' ? message() : message)
}

export class InvariantError extends Error {
  constructor(message: string = 'Invariant violation') {
    super(message)
    // A literal rather than the class name: a build renames the class to a letter.
    this.name = 'InvariantError'
  }
}
