import { Button } from "../components/Button.js";
export class Select extends Phaser.Scene {
  constructor() {
    super("Select");
  }

  create() {
    const { width, height } = this.scale;

    // Background
    const bg = this.add
      .image(width / 2, height / 2, "background")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height);

    //Frames
    const frame1 = this.add
      .image(width / 10, height / 10, "frame")
      .setOrigin(0.42, 0.05)
      .setDisplaySize(width, height);
    const frame2 = this.add
      .image(width / 10, height / 10, "frame")
      .setOrigin(0.17, 0.05)
      .setDisplaySize(width, height);
    const frame3 = this.add
      .image(width / 10, height / 10, "frame")
      .setOrigin(-0.08, 0.05)
      .setDisplaySize(width, height);

    //Cakes
    const cakes = [
      { key: "vanillaCake", x: width * 0.25, y: height / 2, scale: 0.5 },
      { key: "chocolateCake", x: width / 2, y: height / 2, scale: 0.65 },
      { key: "strawberryCake", x: width * 0.75, y: height / 2, scale: 0.65 },
    ];

    let selectedCake = null;
    let startButton = null;

    // add animation
    cakes.forEach(({ key, x, y, scale }) => {
      const cake = this.add
        .image(x, y, key)
        .setOrigin(0.51, 0.52)
        .setScale(scale)

        .setInteractive({
          hitArea: new Phaser.Geom.Rectangle(
            390,
            390,
            width - 1260,
            height - 570
          ),
          hitAreaCallback: Phaser.Geom.Rectangle.Contains,
          useHandCursor: true,
        });

      cake.on("pointerover", () => {
        cake.setScale(scale * 1.2);
      });

      cake.on("pointerout", () => {
        if (selectedCake !== cake) cake.setScale(scale);
      });

      cake.on("pointerdown", () => {
        if (selectedCake) {
          //  selectedCake.clearTint(); // Remove highlight from previously selected cake
          selectedCake.setScale(selectedCake.originalScale); // Reset size
        }
        selectedCake = cake;
        //selectedCake.setTint(0xefd7979); // Highlight new selection
        selectedCake.originalScale = scale;
        selectedCake.setScale(scale * 1.2); // Slightly enlarge selected cake

        console.log(cake.texture.key);

        if (!startButton) {
          startButton = new Button(
            this,
            width / 2,
            height * 0.7,
            "START",
            () => {
              this.scene.stop("BakingScene"); // Stop old instance
              this.scene.start("BakingScene", {
                selectedCake: selectedCake.texture.key,
              });
            }
          );
        }
      });
    });
  }
}
