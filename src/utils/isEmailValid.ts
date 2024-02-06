export const isEmailValid = (email: string | undefined): boolean => {
  if (
    email &&
    !email.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return false
  }

  return true
}
