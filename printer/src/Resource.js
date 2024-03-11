class Resources {
  constructor(toLoad) {
    // Everything we plan to download
    this.toLoad = toLoad

    // A bucket to keep all of our images
    this.images = {};

    // Load each image
    Object.keys(this.toLoad).forEach(key => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false
      }
      img.onload = () => {
        this.images[key].isLoaded = true;
      }
    })
  }
}




// Create one instance for the whole app to use
export const resources = new Resources({
  sky: "./public/sprites/sky.png",
  ground: "./public/sprites/ground.png",
  hero: "./public/sprites/hero-sheet.png",
  shadow: "./public/sprites/shadow.png",
  rod: "./public/sprites/rod.png",
  printer: "./1x/printer_sprite.png",
  skyView: "./picture/background_v1.png",

  anne: "./public/asset/personnage/anne.png",
});

const WORD_ASSET_PATH = "./public/asset/word/"
export const wordResources = new Resources({
  //Word
  word_box : WORD_ASSET_PATH + "1x/box.png", //new Vector2(174,34)
  word_box_hover : WORD_ASSET_PATH + "1x/box-hover.png", //new Vector2(174,34)
  word_box_menu : WORD_ASSET_PATH + "1x/box-menu.png", //new Vector2(174,34)
  word_box_menu_hover : WORD_ASSET_PATH + "1x/box-menu-hover.png", //new Vector2(174,34)
  word_menu_item : WORD_ASSET_PATH + "1x/box-menu-item.png", //new Vector2(174,34)
  word_menu_item_hover : WORD_ASSET_PATH + "1x/box-menu-item-hover.png", //new Vector2(174,34)
  word_recto : WORD_ASSET_PATH + "recto.png", //new Vector2(174,34)

  //ICON
  iconAcceuil: WORD_ASSET_PATH + "1x/BTNAcceuil.png",
  iconNew: WORD_ASSET_PATH + "1x/BTNNew.png",
  iconOpenFile: WORD_ASSET_PATH + "1x/BTNOpenFile.png",
  iconRetour: WORD_ASSET_PATH + "1x/BTNRetour.png",
  LogoWord: WORD_ASSET_PATH + "1x/LogoWord.png",
  btnImprimer: './capture/btn imprimer.png',

  //Page
  pageNumResp: WORD_ASSET_PATH + "page/Qu’est-ce que le numérique responsable.png"
});
