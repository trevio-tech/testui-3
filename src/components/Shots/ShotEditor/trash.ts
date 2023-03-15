// @ts-nocheck
import store from './store'

const trashAdd = () => {
  const { shotEditor } = window

  const activeObject = shotEditor.getActiveObject()

  if (activeObject) {
    shotEditor.remove(activeObject)
  }
}

const trashShow = () => {
  if (! store.value.isTrash) {
    store.value.isTrash = true
    console.log('ShotEditor: Show trash')
  }
}

const trashHide = () => {
  if (store.value.isTrash) {
    store.value.isTrash = false
    console.log('ShotEditor: Hide trash')
  }
}

export {
  trashAdd,
  trashHide,
  trashShow,
}