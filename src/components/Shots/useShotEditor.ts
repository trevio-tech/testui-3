import './ShotEditor/renderTextLinesBackground'
import './ShotEditor/fabric.brushes.min'
import { fabric } from 'fabric'
import { onMounted, onBeforeMount, ref } from 'vue'
import store from './ShotEditor/store'
import { useQuery } from '#imports'

import {
  setBackgroundColor,
  setBackgroundImage,
  setRandomBackgroundGradient,
} from './ShotEditor/background'

import {
  setBrush,
  setBrushColor,
} from './ShotEditor/brushes'

import {
  trashAdd,
  trashHide,
  trashShow,
} from './ShotEditor/trash'

import {
  textAdd,
  textSetBackgroundColor,
  textSetColor,
  textSetRandomGradient,
} from './ShotEditor/text'

const isLoading = ref(false)

const objectCommonOptions = {
  lockSkewingY: true,
  borderDashArray: [6, 6],
  borderScaleFactor: 2
}

let canvas = null

const createShotEditor = () => {
  onMounted(() => {
    canvas = window.shotEditor = new fabric.Canvas('shot', {
      backgroundColor : '#fff',
      preserveObjectStacking: true,
      selection: false,
      isDrawingMode: false
    })

    console.log('ShotEditor: Initialization')

    canvas.setWidth(480)
    canvas.setHeight(840)

    setRandomBackgroundGradient()

    canvas.on({
      'object:moving': trashShow,
      'mouse:up': trashHide,
      'text:editing:exited': ({ target }) => {
        const text = target.text.trim()

        if (text.length === 0) {
          setTimeout(() => canvas.remove(target), 0)
        } else {
          target.text = text
        }
      }
    })

    document.addEventListener('keydown', deleteObject)
  })

  onBeforeMount(() => {
    document.removeEventListener('keydown', deleteObject)
  })
}

export default () => {
  return {
    shotEditor: window.shotEditor,
    createShotEditor,
    shotEditorStore: store,
    addSticker,
    addImage,
    isLoading,
    onSubmit,
    setBackgroundColor,
    setBackgroundImage,
    setRandomBackgroundGradient,

    // trash
    trashAdd,

    // text
    textAdd,
    textSetBackgroundColor,
    textSetColor,
    textSetRandomGradient,

    // Brushes
    setBrush,
    setBrushColor
  }
}

const deleteObject = (event) => {
  if (event.key === 'Delete') {
    const activeObject = canvas.getActiveObject()

    if (activeObject !== null) {
      canvas.remove(activeObject)
    }
  }
}

const addSticker = (url) => {
  fabric.Image.fromURL(url, function(image) {
    image.setControlsVisibility({
      mb: false,
      mt: false,
      ml: false,
      mr: false,
    }).scaleToHeight(240)

    canvas.add(image)

    image.center()
  }, {
    ...objectCommonOptions
  })
}

const addImage = () => {
  const input = document.createElement('input', {})
  input.type = 'file'
  input.click()

  const onChange = (event) => {
    const files = event.target.files

    if (files.length === 0) {
      return
    }

    const fileReader = new FileReader()

    fileReader.readAsDataURL(files[0])

    fileReader.onload = (event) => {
      fabric.Image.fromURL(event.target.result.toString(), (image) => {
        image.scaleToWidth(canvas.getWidth() - 40)

        image.setControlsVisibility({
          ml: false,
          mr: false,
          mt: false,
          mb: false,
        })

        image.center()

        canvas.add(image)

        document.removeChild(input)
      })

      canvas.renderAll()

      input.removeEventListener('change', onChange)
    }
  }

  input.addEventListener('change', onChange)
}


const canvasToFile = async (): Promise<File> => {
  return await new Promise((resolve) => {
    let file: File = null

    canvas
      .discardActiveObject()
      .renderAll()
      .clone((clone) => {
        clone.setDimensions({ width: 480, height: 840 })
        clone.renderAll()

        const selection = new fabric.ActiveSelection(clone.getObjects(), {
          canvas: clone
        })

        /*if (canvas.height < 840) {
          selection.set('top', 840 - selection.height)
        } else if (canvas.height > 840) {
          selection.set('top', (840 - canvas.height) / 2)
        }

        if (canvas.width != 480) {
          selection.set('left', (480 - selection.width) / 2)
        }*/

        selection.destroy()

        let dataUrl = clone.toDataURL({
          height: clone.height,
          width: clone.width,
        })
            .split(',')

        let mime = dataUrl[0].match(/:(.*?);/)[1]
        let bstr = atob(dataUrl[1])
        let n = bstr.length
        let uint8Array = new Uint8Array(n)

        while (n--) {
          uint8Array[n] = bstr.charCodeAt(n)
        }

        file = new File([
          new Blob([uint8Array], { type: mime })
        ], 'shot.png')

        resolve(file)
      })
  })
}

const onSubmit = async (callback: Function, isTravel) => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  try {
    const formData = new FormData()

    const file = await canvasToFile()

    formData.append('image', file)

    formData.set('operations', JSON.stringify({
      query: `
        mutation ($image: Upload!) {
          createShot(image: $image) {
            id
            user_id
            image
            user {
              id
              name
              avatar
            }
          }
        }
      `,
      variables: {
        image: null,
      }
    }))

    formData.set('operationName', null)
    formData.set('map', JSON.stringify({
      image: ['variables.image'],
    }))

    const { data } = await useQuery({
      query: formData
    })

    if (typeof callback === 'function') {
      callback(data)
    }
  } catch (error) {

  } finally {
    isLoading.value = false
  }
}
