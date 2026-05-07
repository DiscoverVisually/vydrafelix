import Phaser from 'phaser';
import { FACTS, OTTERS, REGIONS } from '../data/gameData';
import type { Mode, SaveData } from '../types';
import { loadSave, writeSave } from '../systems/saveManager';
import { BaseScene } from './BaseScene';
import { ChunkGenerator } from '../systems/chunkGenerator';
import { AudioManager } from '../systems/audioManager';

export class GameScene extends BaseScene {
  constructor() { super('game'); }
  private mode: Mode = 'endless';
  private player!: Phaser.GameObjects.Arc;
  private keys!: any;
  private items!: Phaser.Physics.Arcade.Group;
  private hazards!: Phaser.Physics.Arcade.Group;
  private enemies!: Phaser.Physics.Arcade.Group;
  private pebbles!: Phaser.Physics.Arcade.Group;
  private hud!: Phaser.GameObjects.Text;
  private tutorial!: Phaser.GameObjects.Text;
  private health = 5;
  private oxygen = 100;
  private score = 0;
  private distance = 0;
  private cool = 0;
  private paused = false;
  private generator!: ChunkGenerator;
  private save!: SaveData;
  private audio!: AudioManager;

  init(data: { mode: Mode }) { this.mode = data.mode; }

  create() {
    this.save = loadSave();
    const otter = OTTERS.find(o => o.id === this.save.selectedOtter)!;
    this.audio = new AudioManager();
    this.audio = new AudioManager(this);
    this.audio.setMuted(this.save.settings.muted);
    this.health = otter.health + (otter.id === 'luna' ? 1 : 0);
    this.oxygen = 70 + otter.oxygen * 4;

    const colors = [0xdff3ff, 0xcce3b7, 0xb8efff, 0x95dff9, 0x6dc6eb, 0x479ec7, 0x2f6d95];
    colors.forEach((c, i) => this.add.rectangle(600, i * 96 + 48, 1200, 96, c).setAlpha(0.95));

    this.player = this.add.circle(220, 340, 24, 0x7a4f2c) as Phaser.GameObjects.Arc;
    this.add.circle(230, 332, 7, 0xffffff);
    this.physics.add.existing(this.player);

    this.items = this.physics.add.group();
    this.hazards = this.physics.add.group();
    this.enemies = this.physics.add.group();
    this.pebbles = this.physics.add.group();
    this.keys = this.input.keyboard?.addKeys('W,A,S,D,SPACE,ESC');

    this.physics.add.overlap(this.player, this.items, (_, i) => {
      i.destroy();
      this.score += 10;
      this.save.coins++;
      this.audio.collect();
      if (this.save.facts.length < FACTS.length && Math.random() > 0.92) this.save.facts.push(FACTS[this.save.facts.length]);
    });

    this.physics.add.overlap(this.player, this.hazards, () => { this.health -= 0.8; this.audio.hit(); });
    this.physics.add.overlap(this.player, this.enemies, (_, e) => {
      ((e as Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }).body).setVelocityX(-80);
      (e.body as Phaser.Physics.Arcade.Body).setVelocityX(-80);
      this.health -= 0.6;
      this.audio.hit();
    });
    this.physics.add.overlap(this.pebbles, this.enemies, (p, e) => {
      p.destroy();
      ((e as Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }).body).setVelocityX(-420);
      (e.body as Phaser.Physics.Arcade.Body).setVelocityX(-420);
      this.score += 25;
    });

    this.hud = this.add.text(20, 16, '', { fontSize: '24px', color: '#123' }).setScrollFactor(0);
    this.button(1130, 30, 'II', () => this.togglePause());
    this.input.keyboard?.on('keydown-ESC', () => this.togglePause());

    if (this.save.settings.touchControls) {
      this.button(1000, 610, '↑', () => (this.player.y -= 35));
      this.button(1080, 610, '↓', () => (this.player.y += 35));
      this.button(1160, 610, '●', () => this.throwPebble());
    }

    this.tutorial = this.add.text(600, 80, 'TIP: WASD pohyb • SPACE kameň • Dýchaj pri hladine', { fontSize: '24px', color: '#103' }).setOrigin(0.5);
    this.time.delayedCall(6000, () => this.tutorial.destroy());

    this.generator = new ChunkGenerator(this, (kind, x, y) => this.spawn(kind, x, y));
  }

  private spawn(kind: 'item' | 'hazard' | 'enemy', x: number, y: number) {
    if (kind === 'item') {
      const c = this.add.circle(x, y, 12, 0xffdc7a); this.physics.add.existing(c); ((c as Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }).body).setVelocityX(-260); this.items.add(c); return;
    }
    if (kind === 'hazard') {
      const r = this.add.rectangle(x, y, 28, 28, 0x836953); this.physics.add.existing(r); ((r as Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }).body).setVelocityX(-280); this.hazards.add(r); return;
    }
    const e = this.add.ellipse(x, y, 40, 24, 0x8c5be8); this.physics.add.existing(e); ((e as Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }).body).setVelocityX(-240); this.enemies.add(e);
      const c = this.add.circle(x, y, 12, 0xffdc7a); this.physics.add.existing(c); (c.body as Phaser.Physics.Arcade.Body).setVelocityX(-260); this.items.add(c); return;
    }
    if (kind === 'hazard') {
      const r = this.add.rectangle(x, y, 28, 28, 0x836953); this.physics.add.existing(r); (r.body as Phaser.Physics.Arcade.Body).setVelocityX(-280); this.hazards.add(r); return;
    }
    const e = this.add.ellipse(x, y, 40, 24, 0x8c5be8); this.physics.add.existing(e); (e.body as Phaser.Physics.Arcade.Body).setVelocityX(-240); this.enemies.add(e);
  }

  private throwPebble() {
    if (this.cool > 0) return;
    const peb = this.add.circle(this.player.x + 26, this.player.y, 8, 0x666);
    this.physics.add.existing(peb);
    ((peb as Phaser.GameObjects.GameObject & { body: Phaser.Physics.Arcade.Body }).body).setVelocityX(460);
    (peb.body as Phaser.Physics.Arcade.Body).setVelocityX(460);
    this.pebbles.add(peb);
    const otter = OTTERS.find(o => o.id === this.save.selectedOtter)!;
    this.cool = 700 - otter.pebble * 40;
    this.audio.throwPebble();
  }

  private togglePause() { this.paused = !this.paused; this.physics.world.isPaused = this.paused; }

  update(_: number, dt: number) {
    if (this.paused) return;
    const otter = OTTERS.find(o => o.id === this.save.selectedOtter)!;
    const b = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = 190 + otter.agility * 8;

    b.setVelocity(80, 0);
    if (this.keys.W.isDown) b.setVelocityY(-speed); else if (this.keys.S.isDown) b.setVelocityY(speed); else b.setVelocityY(0);
    if (this.keys.A.isDown) b.setVelocityX(-100);
    if (this.keys.D.isDown) b.setVelocityX(220);
    this.player.x = Phaser.Math.Clamp(this.player.x, 120, 360);
    this.player.y = Phaser.Math.Clamp(this.player.y, 80, 655);
    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) this.throwPebble();

    this.cool -= dt;
    this.distance += dt * 0.08;
    this.generator.advance(3.2);
    this.generator.update(this.distance);

    this.oxygen += this.player.y < 250 ? 0.28 : -0.09 * (11 - otter.oxygen);
    this.oxygen = Phaser.Math.Clamp(this.oxygen, 0, 100);
    if (this.oxygen === 0) this.health -= 0.03;

    const region = REGIONS[Math.min(4, Math.floor(this.distance / 450))];
    this.hud.setText(`HP:${this.health.toFixed(0)} ❤️  Kyslík:${this.oxygen.toFixed(0)}%  Skóre:${this.score}  Vzdialenosť:${this.distance.toFixed(0)}m  Región:${region}`);

    if (this.health <= 0) {
      if (this.mode === 'endless' && this.score > this.save.bestEndless) this.save.bestEndless = this.score;
      writeSave(this.save);
      this.audio.gameOver();
      this.scene.start('result', { score: this.score, distance: this.distance, mode: this.mode });
    }
  }
}
