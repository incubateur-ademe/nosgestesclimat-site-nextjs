export function uuidToNumber(uuid: string) {
  // Remove dashes from the UUID and convert it to a hexadecimal string
  const hexString = uuid.replace(/-/g, '')

  // Convert the hexadecimal string to a number
  let number = 0
  for (let i = 0; i < hexString.length; i++) {
    number = number * 16 + parseInt(hexString[i], 16)
  }

  // Map the number to the range 0-9
  const mappedNumber = number % 10

  return mappedNumber
}
