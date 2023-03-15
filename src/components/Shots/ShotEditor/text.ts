// @ts-nocheck
import { fabric } from 'fabric'
import hexGenerator from './hex-generator'

const textAdd = (fontFamily: string = '') => {
  const { shotEditor } = window

  const activeObject = shotEditor.getActiveObject()

  if (activeObject?.type === 'textbox') {
    activeObject.set({ fontFamily })
  } else {
    const text = new fabric.Textbox('Съешь еще этих мягких французских булок, да выпей чаю', {
      width: shotEditor.width - 40,
      fontFamily,
      fontSize: 32,
      textAlign: 'center',
      fontWeight: 400,
      lineHeight: 1.2,
      borderDashArray: [6, 6],
      borderScaleFactor: 2
    })

    text.setControlsVisibility({
      mb: false,
      mt: false,
    })

    if (shotEditor.backgroundImage) {
      text.set({
        textBackgroundColor: 'white',
        color: 'black'
      })
    }

    shotEditor.add(text)

    text.center()

    console.log('ShotEditor: Add text')
  }

  shotEditor.renderAll()
}

const textSetBackgroundColor = (color: string) => {
  const { shotEditor } = window

  let object = shotEditor.getActiveObject()

  if (object?.type === 'textbox') {
    object.set('textBackgroundColor', color)
    shotEditor.renderAll()
  }
}

const textSetColor = (color) => {
  const { shotEditor } = window

  const object = shotEditor.getActiveObject()

  if (object) {
    object.set('fill', color)
    shotEditor.renderAll()
    console.log('ShotEditor: Change text color')
  }
}

const textSetRandomGradient = () => {
  const { shotEditor } = window
  let object = shotEditor.getActiveObject()

  if (object?.type === 'textbox') {
    object.set('fill', new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
      },
      gradientUnits: 'percentage',
      colorStops: [{
        offset: 0,
        color: hexGenerator(),
      }, {
        offset: 1,
        color: hexGenerator()
      }]
    }))

    shotEditor.renderAll()
  }
}

export {
  textAdd,
  textSetBackgroundColor,
  textSetColor,
  textSetRandomGradient,
}