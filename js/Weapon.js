"use strict";
import { rint,int,rnd } from "./configUtils.js";

export default class Weapon {
	constructor(ID,name,minDmg,maxDmg,randomTier)
	{
		this.ID=ID;
		this.name=name;
		this.minDmg=minDmg;
		this.maxDmg=maxDmg;
		this.randomTier=randomTier;
		this.CSSName="";
	}

	weaponDMGOuput(){
		return rint(rnd(this.randomTier)*(this.maxDmg-this.minDmg)+this.minDmg);
	}
	
}

let powerMin=11;
//defaut
let weapon0 = new Weapon(0,"Defaut",10,10,0);
let weapon1 = new Weapon(1,"Cuillere",10,15,0.5);
let weapon2 = new Weapon(2,"Cravate",15,20,1);
let weapon3 = new Weapon(3,"Cable WiFi",20,30,2);
let weapon4 = new Weapon(4,"Clippy",30,45,3);

randomizeWeapons();
weapon0.CSSName="weapon0";
weapon1.CSSName="weapon1";
weapon2.CSSName="weapon2";
weapon3.CSSName="weapon3";
weapon4.CSSName="weapon4";


export { weapon0,weapon1,weapon2,weapon3,weapon4 };

export let weaponsList = [];
//les fourchettes peuvent etre random mais elle ne se croisent pas

weaponsList.push(weapon1,weapon2,weapon3,weapon4);

function randomizeWeapons() {
	let weaponsList2 = [];
	weaponsList2.push(weapon1, weapon2, weapon3, weapon4);

	for (let i = 0; i < 4; i++) {
		let indexWeapon = Math.floor(Math.random() * weaponsList2.length);
		let thatWeapon = weaponsList2[indexWeapon];
		if (i === 0) {
			thatWeapon.minDmg = 3;
			thatWeapon.maxDmg = 3 + Math.floor(Math.random() * 7);
			thatWeapon.randomTier = 0.5+0.1 * Math.floor(Math.random() * 25);
		}
		else {
			thatWeapon.minDmg = powerMin;
			thatWeapon.maxDmg = powerMin + 3 + Math.floor(Math.random() * 7);
			thatWeapon.randomTier = 0.5+0.1 * Math.floor(Math.random() * 10);
			powerMin = thatWeapon.maxDmg + 1;
		}
		weaponsList2.splice(indexWeapon, 1);
	}
}
