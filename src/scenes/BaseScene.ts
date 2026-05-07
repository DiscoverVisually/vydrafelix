import Phaser from 'phaser';
export class BaseScene extends Phaser.Scene{button(x:number,y:number,t:string,cb:()=>void){const b=this.add.text(x,y,t,{fontSize:'30px',backgroundColor:'#dff',color:'#123',padding:{x:16,y:8}}).setOrigin(0.5).setInteractive();b.on('pointerdown',cb);return b;}}
