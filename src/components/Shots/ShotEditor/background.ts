// @ts-nocheck
import { fabric } from 'fabric'
import { selectImage } from './file'
import hexGenerator from './hex-generator';

const setBackgroundColor = (color: string) => {
  const { shotEditor } = window

  shotEditor.set({
    backgroundImage: null,
    backgroundColor: color,
  })

  shotEditor.renderAll()
}


const setBackgroundImage = () => {
  const { shotEditor } = window
  selectImage((event) => {
    fabric.Image.fromURL(event.target.result, (image) => {
      shotEditor.setBackgroundColor(null)
      shotEditor.setBackgroundImage(image, shotEditor.renderAll.bind(shotEditor))
      shotEditor.backgroundImage.scaleToHeight(840)
      shotEditor.backgroundImage.center()

      /*shotEditor.backgroundImage.filters.push(new fabric.Image.filters.Blur({
        blur: 1
      }))
      shotEditor.backgroundImage.applyFilters()*/
    })
  })
}

const setRandomBackgroundGradient = () => {
  const { shotEditor } = window

  shotEditor.set({
    backgroundImage: null,
    backgroundColor: new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: -shotEditor.width / 4,
        y1: -shotEditor.height / 4,
        x2: shotEditor.width,
        y2: shotEditor.height,
      },
      gradientUnits: 'percentage',
      colorStops: [{
        offset: 0,
        color: hexGenerator(),
      }, {
        offset: 1,
        color: hexGenerator()
      }]
    })
  })

  shotEditor.renderAll()
}

export {
  setBackgroundColor,
  setBackgroundImage,
  setRandomBackgroundGradient,
}