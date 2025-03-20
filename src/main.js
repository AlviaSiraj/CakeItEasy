import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { Select } from "./scenes/Select";
import { BakingScene } from "./scenes/bakingScene";

//Configure phaser
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth, // Set width to full window size
  height: window.innerHeight, // Set height to full window size
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [Preload, Select, BakingScene],
};

const game = new Phaser.Game(config);
