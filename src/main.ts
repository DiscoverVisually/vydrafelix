import Phaser from 'phaser';
import { FACTS } from './data/gameData';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { CharacterSelectScene } from './scenes/CharacterSelectScene';
import { ModeSelectScene } from './scenes/ModeSelectScene';
import { GameScene } from './scenes/GameScene';
import { ResultScene } from './scenes/ResultScene';
import { InfoScene } from './scenes/InfoScene';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1200,
  height: 675,
  parent: 'app',
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: [
    BootScene,
    MenuScene,
    CharacterSelectScene,
    ModeSelectScene,
    GameScene,
    ResultScene,
    new InfoScene('how', 'Ako hrať', ['W A S D: pohyb', 'Medzerník: hod kameňom', 'ESC / II: pauza', 'Dýchaj pri hladine', 'Zbieraj jedlo a bonusy.']),
    new InfoScene('pedia', 'Otterpedia', FACTS.map((f, i) => `${i + 1}. ${f}`)),
    new InfoScene('settings', 'Nastavenia', ['Hudba / SFX: pripravené pre AudioManager', 'Touch ovládanie: voliteľné', 'Postup sa ukladá automaticky']),
    new InfoScene('credits', 'Kredity', ['Vydria Výprava MVP+', 'Phaser 3 + TypeScript + Vite', 'Placeholder art a systémy pripravené na výmenu']),
  ],
});
