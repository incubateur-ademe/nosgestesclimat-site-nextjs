type Color = {
  r: number
  g: number
  b: number
  a: number
}

const baseColors: Color[] = [
  { r: 15, g: 171, b: 46, a: 255 },
  { r: 184, g: 138, b: 0, a: 255 },
  { r: 222, g: 103, b: 0, a: 255 },
  { r: 178, g: 18, b: 38, a: 255 },
]

function interpolateColor(color1: Color, color2: Color, factor: number): Color {
  const result: Color = { r: 0, g: 0, b: 0, a: 0 }
  for (const key in color1) {
    if (Object.hasOwn(color1, key) && Object.hasOwn(result, key)) {
      result[key as keyof Color] = Math.round(
        color1[key as keyof Color] +
          factor * (color2[key as keyof Color] - color1[key as keyof Color])
      )
    }
  }
  return result
}

export function getColorAtPosition(
  position: number,
  colors: Color[] = baseColors
): Color {
  const segment = 1 / (colors.length - 1)
  const index = Math.min(Math.floor(position / segment), colors.length - 2)
  const factor = (position - index * segment) / segment
  return interpolateColor(colors[index], colors[index + 1], factor)
}
