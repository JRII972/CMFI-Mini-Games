import {Vector2} from "./Vector2.js";
import { HoverHelper } from "./helpers/HoverHelper.js";

export class TextObject extends HoverHelper {
    constructor({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle }) {
        super({});
        this.text = text ??  "Hello World"
        this.position = position ?? new Vector2(0, 0);
        this.font = font ?? "48px serif";
        this.textAlign = textAlign ?? "start";
        this.textBaseline = textBaseline ?? "top";
        this.direction = direction ?? "ltr";
        this.fillStyle = fillStyle ?? "black"
        this.strokeStyle = strokeStyle ?? "black"
      }


    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        ctx.font = this.font
        ctx.textAlign = this.textAlign
        ctx.textBaseline = this.textBaseline
        ctx.direction = this.direction
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
    
        // Do the actual rendering for Images
        this.drawText(ctx, drawPosX, drawPosY);
      }

    drawText(ctx, x, y){
        ctx.fillText(this.text, x, y);
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
    constructor({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle }) {
        super({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle });
      }

    drawText(ctx, x, y){
        ctx.fillText(this.text, x, y);
    }
}
export class StrokeText extends TextObject {
    constructor({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle }) {
        super({ text, position, font, textAlign, textBaseline, direction, fillStyle, strokeStyle });
      }

    drawText(ctx, x, y){
        ctx.strokeText(this.text, x, y);
    }
}
