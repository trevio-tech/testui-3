// @ts-nocheck
export default () => {
  const hexValues = '0123456789abcdef'

  let hexCode = ''

  for ( let i = 0; i < 6; i++ ) {
    hexCode += hexValues.charAt(Math.floor(Math.random() * hexValues.length))
  }

  return `#${hexCode}`
}