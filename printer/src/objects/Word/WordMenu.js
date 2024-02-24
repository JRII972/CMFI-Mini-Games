import { ON_CLIC, events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { wordResources } from "../../Resource.js";
import { Vector2 } from "../../Vector2.js";
import { WORD_RECTOVERSO_MENU, WORD_RECTOVERSO_MENU_1, WordPrinterButton } from "./Word.js";

class WordMenu extends GameObject {
    constructor({x, y, scale}) {
        super({
          name: "WordPrinterMenu",
          position: new Vector2(x,y),
        });
        
        this.scale = scale
        this.items = [
          {
            index: 1,
            button: new WordPrinterButton({
              x: 0, 
              y: 0, 
              scale: 1, 
              image: wordResources.images.word_recto, 
              main_text: "Impression Recto verso", 
              second_text: "Imprimer uniquement sur..."
            }),
            menu: new WordPrinterButton({
              x: 0, 
              y: 0, 
              scale: 1, 
              image: wordResources.images.word_recto, 
              main_text: "Impression Recto verso", 
              second_text: "Imprimer uniquement sur..."
            }),
            selected: true
          },
          {
            index: 2,
            button: WORD_RECTOVERSO_MENU_1,
            menu: new WordPrinterButton({
              x: 0, 
              y: 0, 
              scale: 1, 
              image: wordResources.images.word_recto, 
              main_text: "Impression Recto", 
              second_text: "Imprimer uniquement sur..."
            }),
          }
        ]
        // this.items.forEach(wordPrinterButton => {
        //   wordPrinterButton.parent = this
        // });
        
        this.open = false
        
        this.items.forEach( item => {
          item.button.initOnHover();
          item.menu.toMenuItem();
          item.menu.onClick = function(value) {
            if ( this.parent ){
              this.parent.selectItem(this)
            }
          }
          item.menu.parent = this
          events.onClick(item.menu, item.menu.checkClick)
          item.button.onClick = function(value) {
            if ( this.parent ){
              this.parent.openMenu(this)
            }
          }
          item.button.parent = this
        })
        this.items.forEach( item => {
          events.unsubscribeFromEvent(item.button, ON_CLIC)
          if (item.selected){
            events.onClick(item.button, item.button.checkClick)
          } 
        })

        events.onClick(this, this.clickOutside)
      }   

    
    close() {
      this.children.forEach( child => this.removeChild(child))
      this.items[0].toButton()
      this.addChild(this.items[0])
    }
    
    open() {
      this.children.forEach( child => this.removeChild(child))
      this.items.forEach(wordPrinterButton => {
        
      });
      this.items[0].button.toButton()
    }

    draw(ctx, x, y) {
      this.drawPosX = x + this.position.x;
      this.drawPosY = y + this.position.y;
      
      this.items.forEach( item => {
        if (item.selected){
          item.button.draw(ctx, this.drawPosX, this.drawPosY)
        }
      })
      
      if (this.open){
        this.items.forEach((item) => {
          item.menu.draw(ctx, this.drawPosX, this.drawPosY + (item.button.hight-4) * item.index)
        });
      }
    }

    selectItem(selected) {
      this.items.forEach( item => {
        if ( item.menu == selected ){
          item.selected = true
          events.unsubscribeFromEvent(item.button, ON_CLIC)
          events.onClick(item.button, item.button.checkClick)
        } else {
          item.selected = false
          events.unsubscribeFromEvent(item.button, ON_CLIC)
        }
      })
    }

    openMenu() {
      this.open = !this.open
    }

    clickOutside() {
      this.items.forEach( item => {
        if ( !item.button.isHovered ){
          if ( !item.menu.isHovered ) {
            this.open = false;
          }
        }
        events.unsubscribeFromEvent(item.button, ON_CLIC)
        if (item.selected){
          events.onClick(item.button, item.button.checkClick)
        } 
      })
      
    }
  

}

export const WordMenuTest = new WordMenu({
  x : 0,
  y : 0,
  scale : 1
})
