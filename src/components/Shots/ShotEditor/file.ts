// @ts-nocheck
const selectImage = (callback: Function) => {
  const { shotEditor } = window

  const input = document.createElement('input', {})
  input.type = 'file'
  input.accept = 'image/*'
  input.click()

  const onChange = (event) => {
    const files = event.target.files

    if (files.length === 0) {
      return
    }

    // document.removeChild(input)

    const fileReader = new FileReader()

    fileReader.readAsDataURL(files[0])

    fileReader.onload = (event) => {
      callback(event)
      shotEditor.renderAll()
      input.removeEventListener('change', onChange)
    }
  }

  input.addEventListener('change', onChange)
}

export {
  selectImage
}
