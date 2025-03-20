import SpeechBubble from "../components/speechBubble";
export class BakingScene extends Phaser.Scene {
  constructor() {
    super("BakingScene");
  }

  init(data) {
    this.selectedCake = data.selectedCake || "defaultCake"; // Fallback if no cake is selected
  }
  preload() {
    this.load.image("table-bg", "assets/level-1/table.png");
    this.load.image("round-table", "assets/level-1/round-table.png");
    this.load.image("bowl", "assets/level-1/bowl.png");
    //ingredients
    this.load.image("eggCarton", "assets/level-1/egg-carton.png");
    this.load.image("flour", "assets/level-1/flour.png");
    this.load.image("sugar", "assets/level-1/sugar.png");
    this.load.image("salt", "assets/level-1/salt.png");
    this.load.image("vanilla", "assets/level-1/vanilla.png");
    this.load.image("whisk", "assets/level-1/whisk.png");
    this.load.image("spoon", "assets/level-1/spoon.png");
    this.load.image("butter", "assets/level-1/butter.png");
    this.load.image("bakingPowder", "assets/level-1/baking-powder.png");

    //in bowl
    this.load.image("sugarPile", "assets/level-1/sugarPile.png");
    this.load.image("creamed", "assets/level-1/creamed.png");

    this.load.spritesheet("egg", "assets/level-1/egg.png", {
      frameWidth: 360,
      frameHeight: 360,
    });
  }
  create() {
    this.input.setTopOnly(false); // (Ignore if not available, but try it)
    this.input.dragDistanceThreshold = 0; // Make dragging more responsive

    this.setBg();
    this.setIngredients();
    // this.setInstructions();

    this.currentStep = 0;

    //start steps
    this.addButter();
    console.log("Selected Cake:", this.selectedCake);
    // Use this.selectedCake to load appropriate assets
  }
  markStepCompleted() {
    this.currentStep++;
  }

  addCenteredImage(
    key,
    x,
    y,
    originX = 0.5,
    originY = 0.56,
    applyVignette = true
  ) {
    const image = this.add.image(x, y, key).setOrigin(originX, originY);

    // Apply vignette effect if supported
    if (applyVignette && image.preFX) {
      image.preFX.addVignette(0.5, 0.5, 0.9, 0.5);
    }

    return image;
  }

  setBg() {
    const bg = this.add.image(0, 0, "table-bg");
    bg.setOrigin(0, 0);
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // Get the center coordinates of the game screen
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Round Table
    this.addCenteredImage("round-table", centerX, centerY);

    //add bowl
    this.bowl = this.addCenteredImage("bowl", centerX, centerY);
  }
  setIngredients() {
    console.log(
      this.textures.get("butter").getSourceImage().width,
      this.textures.get("butter").getSourceImage().height
    );
    console.log(
      this.textures.get("eggCarton").getSourceImage().width,
      this.textures.get("eggCarton").getSourceImage().height
    );

    const createItem = (x, y, key, scale, origin) => {
      const item = this.add
        .image(x, y, key)
        .setScale(scale)
        .setOrigin(origin.x, origin.y)
        .setInteractive({
          useHandCursor: true,
        })
        .setDepth(2);
      item.preFX.addShadow(0, 0, 0.1, 1, "0x000000", 6, 0.5);
      return item;
    };

    // Define your items
    this.items = {
      eggCarton: {
        x: 0,
        y: 0,
        key: "eggCarton",
        scale: 0.15,
        origin: { x: 0, y: 0 },
      },
      milk: {
        x: 0,
        y: 0,
        key: "milk",
        scale: 0.1,
        origin: { x: -1.1, y: -1.5 },
      },
      butter: {
        x: 150, // Move it farther
        y: 100, // Ensure it's clearly visible
        key: "butter",
        scale: 0.1,
        origin: { x: -0.9, y: 0.3 },
      },
      flour: {
        x: 0,
        y: 0,
        key: "flour",
        scale: 0.2,
        origin: { x: 0.0, y: -1.4 },
      },
      sugar: {
        x: 10,
        y: 20,
        key: "sugar",
        scale: 0.12,
        origin: { x: -1.0, y: -4.0 },
      },
      salt: {
        x: 0,
        y: 0,
        key: "salt",
        scale: 0.09,
        origin: { x: -13.9, y: -1.1 },
      },
      bakingPowder: {
        x: 0,
        y: 0,
        key: "bakingPowder",
        scale: 0.15,
        origin: { x: -6.0, y: -0.2 },
      },
      spoon: {
        x: 0,
        y: 0,
        key: "spoon",
        scale: 0.25,
        origin: { x: -4.3, y: -1.0 },
      },
      whisk: {
        x: 0,
        y: 0,
        key: "whisk",
        scale: 0.3,
        origin: { x: -2.9, y: -0.7 },
      },
      vanilla: {
        x: 0,
        y: 0,
        key: "vanilla",
        scale: 0.16,
        origin: { x: -6.7, y: -0.35 },
      },
    };

    // Loop through items and create them
    Object.entries(this.items).forEach(([key, item]) => {
      const createdItem = createItem(
        item.x,
        item.y,
        item.key,
        item.scale,
        item.origin || undefined
      );
      let glow;
      createdItem.on("pointerover", () => {
        glow = createdItem.preFX.addGlow("0xffc75e", 5, 0, false);
      });
      createdItem.on("pointerout", () => {
        glow?.setActive(false);
      });

      this.items[key] = createdItem;
    });
    this.setEggs();
  }

  setEggs() {
    this.items.eggs = [];
    for (let i = 0; i < 3; i++) {
      //first row
      for (let j = 0; j < 3; j++) {
        const egg = this.add
          .sprite(55 + i * 90, 55 + j * 85, "egg")
          .setScale(0.32)
          .setDepth(3)
          .setInteractive();

        egg.preFX.addShadow(0, 0, 0.1, 1, "0x000000", 6, 0.5);

        this.anims.create({
          key: "egg",
          frames: this.anims.generateFrameNumbers("egg", {
            start: 0,
            end: 8,
          }),
          frameRate: 15,
          repeat: 0,
        });
        this.items.eggs.push(egg);
      }
    }
  }

  addButter() {
    const { width, height } = this.scale;
    const { x, y } = this.items.butter;
    // Create speech bubble at the bottom of the screen
    this.speechBubble = new SpeechBubble(
      this,
      width * 0.2, // Position X
      height * 0.8, // Position Y
      width * 0.6, // Width
      height * 0.15, // Height
      "Start by adding in the butter!"
    );
    this.add.existing(this.speechBubble);

    // Make butter draggable
    if (!this.items.butter) {
      console.error("Butter sprite is missing!");
      return;
    }

    // Calculate the hit area based on the scaled width and height
    const hitAreaWidth =
      this.items.butter.width * this.items.butter.scaleX * 0.5; // Adjust this multiplier to suit your needs
    const hitAreaHeight =
      this.items.butter.height * this.items.butter.scaleY * 0.5;

    console.log("Hit Area Size:", hitAreaWidth, hitAreaHeight); // Debugging log

    // Enable input & set a smaller interactive area for the butter

    this.input.setDraggable(this.items.butter);

    // Drag events for butter
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      if (gameObject === this.items.butter) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    });

    this.input.on("dragend", (pointer, gameObject) => {
      const object1Bounds = this.items.butter.getBounds();
      const object2Bounds = this.bowl.getBounds();
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          object1Bounds,
          object2Bounds
        ) &&
        this.currentStep === 0
      ) {
        this.currentStepObj = this.add
          .image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "butter"
          )
          .setScale(0.05)
          .setOrigin(0.5, 0.5)
          .setInteractive();
        this.currentStepObj.preFX.addShadow(0, 0, 0.1, 1, "0x000000", 6, 0.5);
        // Move butter back to its original position
        gameObject.x = 150; // Reset to initial X position
        gameObject.y = 100; // Reset to initial Y position
        // Move to next step
        this.currentStep++;
        this.addSugar(); // Now sugar is added ONLY after butter is placed!
      }
    });
  }
  addSugar() {
    const { width, height } = this.scale;
    const { x, y } = this.items.sugar;
    // Create speech bubble at the bottom of the screen
    this.speechBubble = new SpeechBubble(
      this,
      width * 0.2, // Position X
      height * 0.8, // Position Y
      width * 0.6, // Width
      height * 0.15, // Height
      "Next, Add In The Sugar"
    );
    this.add.existing(this.speechBubble);

    // Make sugar draggable
    if (!this.items.sugar) {
      console.error("Sugar sprite is missing!");
      return;
    }

    // Calculate the hit area based on the scaled width and height
    const hitAreaWidth = this.items.sugar.width * this.items.sugar.scaleX * 0.5; // Adjust this multiplier to suit your needs
    const hitAreaHeight =
      this.items.sugar.height * this.items.sugar.scaleY * 0.5;

    console.log("Hit Area Size:", hitAreaWidth, hitAreaHeight); // Debugging log

    // Enable input & set a smaller interactive area for the sugar

    this.input.setDraggable(this.items.sugar);

    // Drag events for sugar
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      if (gameObject === this.items.sugar) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    });

    this.input.on("dragend", (pointer, gameObject) => {
      const object1Bounds = this.items.sugar.getBounds();
      const object2Bounds = this.bowl.getBounds();
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          object1Bounds,
          object2Bounds
        ) &&
        this.currentStep === 1
      ) {
        this.currentStepObj = this.add
          .image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "sugarPile"
          )
          .setScale(0.2)
          .setOrigin(0.5, 0.7)
          .setInteractive();
        this.currentStepObj.preFX.addShadow(0, 0, 0.1, 1, "0x000000", 6, 0.5);
        // Move sugar back to its original position
        gameObject.x = 10; // Reset to initial X position
        gameObject.y = 20; // Reset to initial Y position
        this.whisk();
      }
      if (gameObject === this.items.sugar) {
        console.log("sugar dropped at:", object1Bounds, object2Bounds);
      }
    });
  }
  whisk() {
    const { width, height } = this.scale;
    const { x, y } = this.items.whisk;
    // Create speech bubble at the bottom of the screen
    this.speechBubble = new SpeechBubble(
      this,
      width * 0.2, // Position X
      height * 0.8, // Position Y
      width * 0.6, // Width
      height * 0.15, // Height
      "Next, Whisk the ingredients"
    );
    this.add.existing(this.speechBubble);
    this.input.setDraggable(whisk);

    // Drag events for sugar
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      if (gameObject === this.items.sugar) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    });
  }
  // setInstructions() {
  //   const { width, height } = this.scale;

  //   // Create speech bubble at the bottom of the screen
  //   this.speechBubble = new SpeechBubble(
  //     this,
  //     width * 0.2, // Position X
  //     height * 0.8, // Position Y
  //     width * 0.6, // Width
  //     height * 0.15, // Height
  //     "Start by adding an ingredient!"
  //   );

  //   this.add.existing(this.speechBubble);
  // }
}
