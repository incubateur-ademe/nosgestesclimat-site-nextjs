export class ErrorWithCode<Code extends string = string> {
  public code: Code
  public readonly name: string
  public readonly message: string

  constructor(code: Code, message: string = code) {
    this.code = code
    this.message = message
    this.name = this.constructor.name
  }
}

export abstract class DomainError<
  Code extends string = string,
> extends ErrorWithCode<Code> {}
