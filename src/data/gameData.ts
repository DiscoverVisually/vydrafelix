import type { Otter, Region } from '../types';
export const REGIONS: Region[] = ['Jarný prameň','Vŕbový breh','Kamienkové pereje','Lesná hlbočina','Mesačný záliv'];
export const OTTERS: Otter[] = [
{id:'riko',name:'Riko Rýchlik',speed:9,agility:6,health:4,oxygen:5,pebble:5,passive:'Rýchlostný bonus po sérii zberu',unlockCost:0},
{id:'nela',name:'Nela Hlbinka',speed:6,agility:6,health:5,oxygen:9,pebble:5,passive:'Pomalšia strata kyslíka',unlockCost:0},
{id:'bruno',name:'Bruno Silák',speed:5,agility:5,health:9,oxygen:5,pebble:8,passive:'Šanca na zníženie zásahu',unlockCost:120},
{id:'mia',name:'Mia Plutvička',speed:7,agility:9,health:5,oxygen:5,pebble:5,passive:'Lepšia obratnosť',unlockCost:100},
{id:'tino',name:'Tino Fúzik',speed:6,agility:6,health:6,oxygen:6,pebble:6,passive:'Magnet na predmety',unlockCost:80},
{id:'perla',name:'Perla Lovkyňa',speed:6,agility:6,health:5,oxygen:6,pebble:4,passive:'Viac bonusových odmien',unlockCost:140},
{id:'kaja',name:'Kaja Kameňka',speed:6,agility:5,health:6,oxygen:4,pebble:9,passive:'Rýchlejší cooldown',unlockCost:160},
{id:'luna',name:'Luna Strážkyňa',speed:8,agility:8,health:8,oxygen:8,pebble:8,passive:'Malý all-stat bonus',unlockCost:300},
];
export const FACTS = ['Vydry sú cicavce.','Vydry majú hustú srsť, ktorá ich hreje.','Vydry majú plávacie blany.','Fúziky vydry cítia pohyb vody.','Vydra sa musí nadýchnuť nad hladinou.','Vydry často jedia ryby, raky a mäkkýše.','Čisté rieky sú pre vydry dôležité.','Mláďa vydry sa volá šteniatko.','Niektoré vydry používajú kamene ako nástroj.','Vydry žijú v brlohoch blízko vody.'];
export const ENEMIES=['Nezbedná ryba','Úhor','Krab','Korytnačka','Čajka','Sumec mini-boss'];
export const HAZARDS=['Ostré skaly','Plávajúce poleno','Rybárska sieť','Háčik','Vír','Silný prúd','Blatová škvrna','Odpadový mrak','Loď'];
export const COLLECTIBLES=['Ryba','Rak','Mušľa','Slimák','Žabka','Poklad','Bublina','List srdca','Zlatá rybka','Perla','Hviezda','Štít','Magnet'];
