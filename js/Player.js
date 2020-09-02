import { weapon0 } from "./weapons.js";

class Player {
    constructor(name, posX,posY) {
		this.name = name;
		this.HP=100;
		this.weapon = weapon0;
		this.prevWeapon=weapon0;
		this.posX = posX;
		this.posY = posY;
		this.myTurn = true;
		this.myAction="";
		this.canPlay=true;
		
   
    }
}