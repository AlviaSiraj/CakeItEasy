export class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, callback) {
    super(scene, x, y);

    //create button background
    this.button = scene.add
      .rectangle(0, 0, 300, 100, 0xffe59a, 1)
      .setStrokeStyle(4, 0xccac4e)
      .setInteractive({ useHandCursor: true });

    this.text = scene.add
      .text(0, 0, text, {
        fontSize: "40px",
        fontFamily: "Arial",
        fontStyle: "bold",
        color: "#42381A",
      })
      .setOrigin(0.5, 0.5);

    this.add(this.button);
    this.add(this.text);

    // Enable interactivity
    this.button.on("pointerover", () => {
      this.button.setScale(1.1); // Slightly enlarges the button on hover
    });

    this.button.on("pointerout", () => {
      this.button.setScale(1); // Resets size when not hovered
    });

    this.button.on("pointerdown", () => {
      callback(); // Call the provided function on click
    });

    scene.add.existing(this);
  }
}
