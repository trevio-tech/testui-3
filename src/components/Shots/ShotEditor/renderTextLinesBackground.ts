// @ts-nocheck
import { fabric } from 'fabric'

/**
 * Renders the text background for lines, taking care of style
 * @private
 * @param {CanvasRenderingContext2D} ctx Context to render on
 */
fabric.Text.prototype._renderTextLinesBackground = function(ctx) {
  if (!this.textBackgroundColor && !this.styleHas('textBackgroundColor')) {
    return;
  }
  var heightOfLine,
      lineLeftOffset, originalFill = ctx.fillStyle,
      line, lastColor,
      leftOffset = this._getLeftOffset(),
      lineTopOffset = this._getTopOffset(),
      boxStart = 0, boxWidth = 0, charBox, currentColor, path = this.path,
      drawStart;

  for (let i = 0, len = this._textLines.length; i < len; i++) {
    heightOfLine = this.getHeightOfLine(i);

    if (! this.textBackgroundColor && !this.styleHas('textBackgroundColor', i)) {
      lineTopOffset += heightOfLine
      continue
    }

    line = this._textLines[i];
    lineLeftOffset = this._getLineLeftOffset(i);
    boxWidth = 0;
    boxStart = 0;
    lastColor = this.getValueOfPropertyAt(i, 0, 'textBackgroundColor');

    for (let j = 0, jlen = line.length; j < jlen; j++) {
      charBox = this.__charBounds[i][j]
      currentColor = this.getValueOfPropertyAt(i, j, 'textBackgroundColor')

      if (!path || currentColor !== lastColor) {
        boxWidth += charBox.kernedWidth
      }
    }

    if (currentColor && !path) {
      drawStart = leftOffset + lineLeftOffset + boxStart

      if (this.direction === 'rtl') {
        drawStart = this.width - drawStart - boxWidth
      }

      ctx.fillStyle = currentColor

      ctx.fillRect(
          drawStart - 10,
          lineTopOffset - 8,
          boxWidth + 20,
          heightOfLine / this.lineHeight + 16
      )
    }

    lineTopOffset += heightOfLine
  }

  ctx.fillStyle = originalFill

  this._removeShadow(ctx)
}