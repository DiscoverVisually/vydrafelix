export type Mode = 'adventure' | 'endless';
export type Region = 'Jarný prameň' | 'Vŕbový breh' | 'Kamienkové pereje' | 'Lesná hlbočina' | 'Mesačný záliv';
export interface Otter { id:string; name:string; speed:number; agility:number; health:number; oxygen:number; pebble:number; passive:string; unlockCost:number; }
export interface Settings { music:number; sfx:number; muted:boolean; touchControls:boolean; }
export interface SaveData { version:number; unlockedOtters:string[]; selectedOtter:string; bestEndless:number; coins:number; facts:string[]; milestones:string[]; settings:Settings; }
