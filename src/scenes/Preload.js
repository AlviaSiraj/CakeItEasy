import { Button } from "../components/Button.js";
export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.image("background", "assets/background.jpeg");
    this.load.image("frame", "assets/select-scene/frame.png");
    this.load.image("chocolateCake", "assets/select-scene/chocolateCake.png");
    this.load.image("vanillaCake", "assets/select-scene/vanillaCake.png");
    this.load.image("strawberryCake", "assets/select-scene/strawberryCake.png");
    //baking scene
    this.load.image("milk", "assets/level-1/milk.png");
  }

  create() {
    const { width, height } = this.scale;

    // Background
    const bg = this.add
      .image(width / 2, height / 2, "background")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height);

    //Add Start Button
    new Button(this, width / 2, height * 0.7, "START", () => {
      this.scene.start("Select"); //start the select screen
    });
  }
}
