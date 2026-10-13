export class ErrorWithCode<Code extends string = string> extends Error {
  public code: Code

  constructor(code: Code, message: string = code) {
    super(message)
    this.code = code
    // The `code` rather than the class name: a build renames
    // `ZeroFootprintError` to a letter, which is what Sentry and PostHog would
    // then file the issue under.
    this.name = code
  }

  toJSON() {
    return {
      ...this,
    }
  }
}

export abstract class DomainError<
  Code extends string = string,
> extends ErrorWithCode<Code> {}

export class InvalidPayloadError extends DomainError<'invalid_payload'> {
  constructor(message: string = 'Invalid payload') {
    super('invalid_payload', message)
  }
}
