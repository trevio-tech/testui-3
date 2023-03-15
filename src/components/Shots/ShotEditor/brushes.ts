// @ts-nocheck
import { fabric } from 'fabric'

const setBrush = (name: string) => {
  window.shotEditor.set({
    isDrawingMode: true
  })

  window.shotEditor.freeDrawingBrush = new fabric[`${name}Brush`](window.shotEditor)
}

const setBrushColor = (color) => {
  window.shotEditor.freeDrawingBrush.color = color
}

export {
  setBrush,
  setBrushColor
}