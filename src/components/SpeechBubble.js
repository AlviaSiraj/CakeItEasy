export default class SpeechBubble extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, text) {
    super(scene, x, y);
    scene.add.existing(this);

    // Speech bubble background
    this.bubble = scene.add.graphics();
    this.bubble.fillStyle(0xffffff, 1); // White background
    this.bubble.fillRoundedRect(0, 0, width, height, 20);
    this.bubble.lineStyle(4, 0x000000, 1); // Black border
    this.bubble.strokeRoundedRect(0, 0, width, height, 20);
    this.add(this.bubble);

    // Instruction text
    this.text = scene.add.text(20, 20, text, {
      fontSize: "24px",
      fill: "#000",
      wordWrap: { width: width - 40 },
    });
    this.add(this.text);
  }

  // Method to update text
  updateText(newText) {
    this.text.setText(newText);
  }
}
