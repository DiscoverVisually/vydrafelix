import { BaseScene } from './BaseScene';
export class InfoScene extends BaseScene{constructor(key:string,private title:string,private lines:string[]){super(key);}create(){this.add.text(70,50,this.title,{fontSize:'44px',color:'#123'});this.add.text(70,140,this.lines.join('\n'),{fontSize:'26px',color:'#234',wordWrap:{width:1040}});this.button(1070,620,'Späť',()=>this.scene.start('menu'));}}
