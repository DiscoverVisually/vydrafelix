import { BaseScene } from './BaseScene';
export class BootScene extends BaseScene{constructor(){super('boot');}create(){this.scene.start('menu');}}
