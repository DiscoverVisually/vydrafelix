import type Phaser from 'phaser';
import { SeededRandom } from './random';
import { difficultyAt } from './difficultyManager';
export class ChunkGenerator{rng=new SeededRandom(2026); nextX=1300; constructor(private scene:Phaser.Scene,private spawn:(kind:'item'|'hazard'|'enemy',x:number,y:number)=>void){}
update(distance:number){if(this.nextX>1400)return; const d=difficultyAt(distance); for(let i=0;i<5;i++){const y=this.rng.int(150,640); const roll=this.rng.next(); const kind=roll<0.5?'item':roll<0.82-d*0.2?'hazard':'enemy'; this.spawn(kind,this.nextX+i*130,y);} this.nextX+=650;}
advance(dx:number){this.nextX-=dx;}}
