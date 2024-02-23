

export class HoverHelper {
    constructor({  }) {
        this.isHovered = false
      }
    checkHover({mouseX, mouseY, toFalse}) {
        this.isHovered = false
        this.children.forEach((child) => {
          if ( child.checkHover({mouseX, mouseY, toFalse}) ) {
            if (!this.isHovered && child.isHovered) {
              this.isHovered = true
            }
          }
        });
        if (toFalse) {
          this.isHovered = false
        }
        if (this.isHovered) {
          this.onHover()
        }
      }
    
      onHover() {
        //
      }
}