import {Vector2} from "./Vector2.js";
import { HoverHelper } from "./helpers/HoverHelper.js";
import { measureText } from "./helpers/helper.js";

export class TextObject extends HoverHelper {
    constructor({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle, underline = false, maxWidth, trim = true, wrapText = false, lineHeight = 25}) {
        super({});
        this.text = text ??  "Hello World"
        this.position = position ?? new Vector2(0, 0);
        this.font = font ?? "48px serif";
        this.textAlign = textAlign ?? "start";
        this.textBaseline = textBaseline ?? "top";
        this.direction = direction ?? "ltr";
        this.fillStyle = fillStyle ?? "black"
        this.strokeStyle = strokeStyle ?? "black"
        this.underline = underline

        this.maxWidth = maxWidth
        this.trim = trim
        this.wrapText = wrapText
        this.lineHeight = lineHeight
      }


    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        let drawPosY = y + this.position.y;

        ctx.font = this.font
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline
        ctx.direction = this.direction
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
    
        // Do the actual rendering for Images
        if ( this.underline ){ this.underlineText(ctx, x, y) }
        if ( this.maxWidth ) {
          if ( this.wrapText ){
            var words = this.text.split(' ');
            var line = '';

            for(var n = 0; n < words.length; n++) {
              var testLine = line + words[n] + ' ';
              var metrics = ctx.measureText(testLine);
              var testWidth = metrics.width;
              if (testWidth > this.maxWidth && n > 0) {
                this.drawText(ctx, line, drawPosX, drawPosY);
                line = words[n] + ' ';
                drawPosY += this.lineHeight;
              }
              else {
                line = testLine;
              }
            }
            this.drawText(ctx, line, drawPosX, drawPosY);
            return;
          }

          if ( this.trim ) {
            if ( ctx.measureText(this.text).width > this.maxWidth ){
              let text = this.text
              while (ctx.measureText(text + '...').width > this.maxWidth){
                text = text.slice(0, -1);
                if ( text.length == 0 ){
                  this.drawText(ctx, this.text, x, y, this.maxWidth);
                }
              }
              this.drawText(ctx, text + '...', drawPosX, drawPosY);
              return;
            }
          }
        }
        this.drawText(ctx, this.text, drawPosX, drawPosY);
      }

    drawText(ctx, text, x, y){
    }

    underlineText(ctx, x, y) {
      let metrics = measureText(ctx, this.text)
      let fontSize = Math.floor(metrics.actualHeight * 1.4) // 140% the height 
      switch (ctx.textAlign) {
        case "center" : x -= (metrics.width / 2) ; break
        case "right"  : x -= metrics.width       ; break
        case "end"  : x -= metrics.width       ; break
      }
      switch (ctx.textBaseline) {
        case "top"    : y += (fontSize) *.85    ; break
        case "middle" : y += (fontSize / 2) ; break
      }
      ctx.save()
      ctx.beginPath()
      ctx.strokeStyle = ctx.fillStyle
      ctx.lineWidth = Math.ceil(fontSize * 0.08)
      ctx.moveTo(x, y)
      ctx.lineTo(x + metrics.width, y)
      ctx.stroke()
      ctx.restore()
    }

    checkHover({mouseX, mouseY, toFalse}) {
      this.isHovered = false
      if (toFalse) {
        this.isHovered = false
      }
      if (this.isHovered) {
        this.onHover()
      }
    }
}

export class FillText extends TextObject {
    constructor({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle, underline = false, maxWidth, trim = true, wrapText = false, lineHeight = 25}) {
        super({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle, underline, maxWidth, trim, wrapText, lineHeight});
      }

    drawText(ctx, text, x, y){
        ctx.fillText(text, x, y);
    }
}
export class StrokeText extends TextObject {
    constructor({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle, underline = false, maxWidth, trim = true, wrapText = false, lineHeight = 25}) {
      super({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle, underline, maxWidth, trim, wrapText, lineHeight});
      }

    drawText(ctx, text, x, y){
        ctx.strokeText(text, x, y);
    }
}
