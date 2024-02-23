import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {events} from "../../Events.js";
import {FillText} from "../../TextObject.js"
import { ArrowBottom } from "../helpers/Arrow.js";

export class WordPrinterButton extends GameObject {
  constructor({x, y, scale, image, main_text, second_text}) {
    super({
      name: "WordPrinterButton",
      position: new Vector2(x,y),
    });
    
    this.scale = scale ?? 1
    this.image = image ?? null
    this.main_text = main_text ?? "Hello your forgot the text"
    this.second_text = second_text ?? "Hello your forgot the text"
    this.render()
    
  }

  render() {
    this.children = []
    this.box = new Sprite({
      resource: resources.images.word_box,
      position: new Vector2(0, 0), // nudge upwards visually
      frameSize : new Vector2(174,34),
      scale : 1.8 * this.scale,
      onHoverResource: resources.images.word_box_hover
    })
    this.picture = new Sprite({
      resource: this.image,
      position: new Vector2(10 * this.scale, ((this.box.frameSize.y * this.box.scale) - (36*1.2*this.scale)) / 2), // nudge upwards visually
      frameSize : new Vector2(29,36),
      scale : 1.2 * this.scale
    })
    this.main_text = new FillText({ 
      text : this.main_text, 
      position : new Vector2(
        this.picture.frameSize.x * this.picture.scale + this.picture.position.x + 30 * this.scale, 
        this.picture.position.y),
      font : 14*this.scale + "px Aptos"
    })
    this.second_text = new FillText({ 
      text : this.second_text, 
      position : new Vector2(
        this.picture.frameSize.x * this.picture.scale + this.picture.position.x + 30 * this.scale, 
        (this.box.frameSize.y * this.box.scale) - (20 * this.scale)),
      font : 13*this.scale + "px Aptos"
    })
    this.arrow = new ArrowBottom({
      position : new Vector2(this.box.width - 25 * this.scale, this.box.hight/2), 
      scale : this.scale * 0.5
    })
    this.addChild(this.box);
    this.addChild(this.picture);
    this.addChild(this.main_text)
    this.addChild(this.second_text)
    this.addChild(this.arrow)
  }
  

  ready() {
    // events.on("HERO_POSITION", this, pos => {
    //   // detect overlap...
    //   // const roundedHeroX = Math.round(pos.x);
    //   // const roundedHeroY = Math.round(pos.y);
    //   if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
    //     this.onCollideWithHero();
    //   }
    // })
  }

  

  onHover() {
    console.log('lOn Hover ' + this.width)
  }


}

var WORD_RECTOVERSO_MENU = new WordPrinterButton({
  x: 0, 
  y: 0, 
  scale: 1, 
  image: resources.images.word_recto, 
  main_text: "Impression Recto", 
  second_text: "Imprimer uniquement sur..."
})

export {WORD_RECTOVERSO_MENU}