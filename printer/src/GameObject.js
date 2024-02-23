import {Vector2} from "./Vector2.js";
import {events} from "./Events.js";
import { HoverHelper } from "./helpers/HoverHelper.js";
import { Sprite } from "./Sprite.js";
import { resources } from "./Resource.js";

export class GameObject extends HoverHelper {
  constructor({ position }) {
    super({});
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
    this.width = 0;
    this.hight = 0;
    this.scale = 1;
  }

  // First entry point of the loop
  stepEntry(delta, root) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call ready on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented Step code
    this.step(delta, root);
  }

  // Called before the first `step`
  ready() {
    // ...
  }

  // Called once every frame
  step(_delta) {
    // ...
  }

  /* draw entry */
  draw(ctx, x, y) {
    this.drawPosX = x + this.position.x;
    this.drawPosY = y + this.position.y;

    // Do the actual rendering for Images
    this.drawImage(ctx, this.drawPosX, this.drawPosY);

    // Pass on to children
    this.children.forEach((child) => child.draw(ctx, this.drawPosX, this.drawPosY));
  }

  drawImage(ctx, drawPosX, drawPosY) {
    //...
  }

  // Remove from the tree
  destroy() {
    this.children.forEach(child => {
      child.destroy();
    })
    this.parent.removeChild(this)
  }

  /* Other Game Objects are nestable inside this one */
  addChild(gameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
    if (gameObject instanceof Sprite){
      if ( (gameObject.position.x + gameObject.frameSize.x * gameObject.scale) > this.width) {
        this.width = gameObject.position.x + gameObject.frameSize.x * gameObject.scale
      }
      if ( (gameObject.position.y + gameObject.frameSize.y * gameObject.scale) > this.hight) {
        this.hight = gameObject.position.y + gameObject.frameSize.y * gameObject.scale
      }
    }
  }

  removeChild(gameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter(g => {
      return gameObject !== g;
    })
  }

  checkHover({mouseX, mouseY, toFalse}) {
    this.isHovered = false
    this.children.forEach((child) => {
      if (child.resource == resources.images.word_box) {
        console.log('here')
      }
      if ( child.checkHover({mouseX, mouseY, toFalse}) ) {
        if (!this.isHovered && child.isHovered) {
          this.isHovered = true
        }
      }
    });
    if (toFalse) {
      this.isHovered = false
    } else if (!this.isHovered){
        if (
          (this.drawPosX < mouseX) && (mouseX < (this.drawPosX + this.width )) &&
          (this.drawPosY < mouseY) && ( mouseY < (this.drawPosY + this.hight))
        ) {
          this.isHovered = true
        }
    }
    if (this.isHovered) {
      this.onHover()
    }
  }
    
  
}