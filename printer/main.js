// import './style.css'
import {resources, wordResources} from "./src/Resource.js";
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
import { ON_CLIC, ON_HOVER, events } from "./src/Events.js";
import { WordInterface } from './src/objects/Word/Word.js'
import { GameRender } from "./src/GameRender.js";

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0,0)
})


const gameRender = new GameRender(canvas)

// mainScene.addChild(WordMenuTest);

const inventory = new Inventory();


// Add an Input class to the main scene
mainScene.input = new Input();

canvas.onmousemove = function(e) {
  var r = canvas.getBoundingClientRect(),
      x = e.clientX - r.left, y = e.clientY - r.top;
  events.emitOnHover({
    mouseX : x, mouseY : y, boundingClientRect: r, toFalse: false
  })
}
canvas.onclick = function(e) {
  var r = canvas.getBoundingClientRect(),
  x = e.clientX - r.left, y = e.clientY - r.top;
  events.emitOnClick({
    mouseX : x, mouseY : y
  })
};



// Establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)

  
};
const draw = () => {

  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sky

  // Save the current state (for camera offset)
  // ctx.save();

  // //Offset by camera position

  // // Draw objects in the mounted scene
  // // Restore to original state
  // ctx.restore();
  
  // Draw anything above the game world
  gameRender.draw(ctx, 0, 0)

  // // const ctx = canvas.getContext("2d");
  // ctx.fillStyle = "rgb(200 0 0)";
  // ctx.fillRect(10, 10, 50, 50);

  // ctx.fillStyle = "rgb(0 0 200 / 50%)";
  // ctx.fillRect(30, 30, 50, 50);

}

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
