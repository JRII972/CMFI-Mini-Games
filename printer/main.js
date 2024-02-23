// import './style.css'
import {resources} from "./src/Resource.js";
import {Sprite} from "./src/Sprite.js";
import {Vector2} from "./src/Vector2.js";
import {GameLoop} from "./src/GameLoop.js";
import {Input} from "./src/Input.js";
import {gridCells} from "./src/helpers/grid.js";
import {GameObject} from "./src/GameObject.js";
import {Hero} from "./src/objects/Hero/Hero.js";
import {Camera} from "./src/Camera.js";
import {Rod} from "./src/objects/Rod/Rod.js";
import {Inventory} from "./src/objects/Inventory/Inventory.js";
import {WordPrinterButton, WORD_RECTOVERSO_MENU} from "./src/objects/Word/Word.js";
import {FillText} from "./src/TextObject.js";
import { ArrowBottom } from "./src/objects/helpers/Arrow.js";

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0,0)
})

// Build up the scene by adding a sky, ground, and hero
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
})

const skyView = new Sprite({
  resource: resources.images.skyView,
  frameSize: new Vector2(820, 820)
})

mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod);

const inventory = new Inventory();


// Add an Input class to the main scene
mainScene.input = new Input();


// Establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)


  canvas.onmousemove = function(e) {
    var r = canvas.getBoundingClientRect(),
        x = e.clientX - r.left, y = e.clientY - r.top;
    mainScene.checkHover({
      mouseX:x, mouseY:y, toFalse:false
    })
    WORD_RECTOVERSO_MENU.checkHover({
      mouseX:x, mouseY:y, toFalse:false
    })
  }
};
const draw = () => {

  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sky
  skySprite.drawImage(ctx, 0, 0)
  
  skyView.drawImage(ctx, 0,0)

  // Save the current state (for camera offset)
  ctx.save();

  //Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  // Restore to original state
  ctx.restore();
  WORD_RECTOVERSO_MENU.draw(ctx, 35, 350)
  
  // Draw anything above the game world
  inventory.draw(ctx, 0, 0)

  // const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(200 0 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgb(0 0 200 / 50%)";
  ctx.fillRect(30, 30, 50, 50);

}

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
