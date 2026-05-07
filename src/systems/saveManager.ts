import { FACTS } from '../data/gameData';
import type { SaveData } from '../types';
const KEY='vydria-save-v2';
export const defaultSave=():SaveData=>({version:2,unlockedOtters:['riko','nela'],selectedOtter:'riko',bestEndless:0,coins:0,facts:[FACTS[0]],milestones:[],settings:{music:0.6,sfx:0.8,muted:false,touchControls:true}});
export function loadSave():SaveData{try{const raw=JSON.parse(localStorage.getItem(KEY)||'{}');return {...defaultSave(),...raw,settings:{...defaultSave().settings,...raw.settings}};}catch{return defaultSave();}}
export const writeSave=(s:SaveData)=>localStorage.setItem(KEY,JSON.stringify(s));
