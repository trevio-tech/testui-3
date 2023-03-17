// @ts-nocheck

export default (url, name, width, height) => {
  const { innerWidth, innerHeight } = window
  const left = (innerWidth - width) / 2
  const top = (innerHeight - height) / 2

  return open(url, name, `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=${width},height=${height},left=${left},top=${top}`)
}