import { weapon0,weapon1,weapon2,weapon3,weapon4 } from "./Weapon.js";
import { playboard } from "./Grid.js";
import Cell from "./Cell.js";
import Grid from "./Grid.js";
import Weapon from "./Weapon.js"; 
import weaponsList from "./Weapon.js"; 

export default class Player {
    constructor(name, posX,posY) {
		this.name = name;
		this.HP=100;
		this.weapon =weapon0;
		this.prevWeapon=weapon0;
		this.posX = posX;
		this.posY = posY;
		this.myTurn = true;
		this.myAction=""; //isAttacking
		this.canPlay=true;
		
	}

	checkMoves(){
		this.checkUp();

		this.checkRight();

		this.checkDown();

		this.checkLeft();
	}

	checkLeft() {
		let okMove = true;
		//a gauche
		for (let left = 1; left < 4; left++) {
			let cell = playboard.pickCell(this.posX - left, this.posY);
			if (playboard.isOnBoard(this.posX - left, this.posY)) {
				if (cell.checkPlayer() && okMove && left === 1) { playboard.setOverlay(this.posX - left, this.posY, "fight"); }
				if (cell.checkPlayer() || cell.checkWall()) { okMove = false; }
				if ((cell.checkFree() || cell.checkWeapon())
					&& okMove
					&& this.posX - left >= 0) {
					playboard.setOverlay(this.posX - left, this.posY, "check");
				}
			}
		}
	}

	checkDown() {
		let okMove = true;
		// en bas
		for (let down = 1; down < 4; down++) {

			//let cellAdd=(this.posY,down);
			let cellAdd = int(this.posY) + down;

			let cell = playboard.pickCell(this.posX, cellAdd);
			if (playboard.isOnBoard(this.posX, cellAdd)) {
				if (cell.checkPlayer() && okMove && down === 1) { playboard.setOverlay(this.posX, cellAdd, "fight"); }
				if (cell.checkPlayer() || cell.checkWall()) { okMove = false; }
				if ((cell.checkFree() || cell.checkWeapon())
					&& okMove
					&& cellAdd < playboard.sizeY) {
					playboard.setOverlay(this.posX, cellAdd, "check");
				}
			}
		}
	}

	checkRight() {
		let okMove = true;
		//a droite
		for (let right = 1; right < 4; right++) {
			//let cellAdd=add(this.posX,right);
			let cellAdd = int(this.posX) + right;
			let cell = playboard.pickCell(cellAdd, this.posY);
			if (playboard.isOnBoard(cellAdd, this.posY)) {
				if (cell.checkPlayer() && okMove && right === 1) { playboard.setOverlay(cellAdd, this.posY, "fight"); }
				if (cell.checkPlayer() || cell.checkWall()) { okMove = false; }
				if ((cell.checkFree() || cell.checkWeapon())
					&& okMove
					&& cellAdd < playboard.sizeX) {
					playboard.setOverlay(cellAdd, this.posY, "check");
				}
			}
		}
	}

	checkUp() {
		let okMove = true;
		//en haut
		for (let up = 1; up < 4; up++) {

			let cell = playboard.pickCell(this.posX, this.posY - up);
			if (playboard.isOnBoard(this.posX, this.posY - up)) {
				if (cell.checkPlayer() && okMove && up === 1) { playboard.setOverlay(this.posX, this.posY - up, "fight"); }
				if (cell.checkPlayer() || cell.checkWall()) { okMove = false; }
				if ((cell.checkFree() || cell.checkWeapon())
					&& okMove
					&& this.posY - up >= 0) {
					playboard.setOverlay(this.posX, this.posY - up, "check");

				}
			}
		}
	}

	moveUpdate(x,y){
		this.posX=x;
		this.posY=y;
		$('#overlay').html("");
		endTurn(this);
	}

	move(x,y,player){
		if (player.myTurn) {
			let cell=playboard.pickCell(x,y);
			let origin=playboard.pickCell(player.posX,player.posY);
			if ( !cell.checkWeapon()){
				
				if (player === player1 && player.canPlay){
					//playboard.remObject(player1.posX,player1.posY);
					playboard.remPlayer(player1.posX,player1.posY);
					if ( !origin.checkWeapon()) { 
						origin.content+=" void";
						//playboard.setObject(player.posX,player.posY,"void");
						$( `.cell[coord='${player.posX}:${player.posY}']` ).addClass("void");
						playboard.synchro(player.posX,player.posY);

					 }
					else 
					{
						$( `.cell[coord='${player.posX}:${player.posY}']` ).removeClass(player1.weapon.CSSName);
						
					}
					playboard.setObject(x,y,"player1");
					player.moveUpdate(x,y);
				}

				if (player === player2 && player.canPlay){
					//playboard.remObject(player2.posX,player2.posY);
					playboard.remPlayer(player2.posX,player2.posY);
					if ( !origin.checkWeapon()) { 
						origin.content+=" void";
						//playboard.setObject(player.posX,player.posY,"void");
						$( `.cell[coord='${player.posX}:${player.posY}']` ).addClass("void");
						playboard.synchro(player.posX,player.posY);
					 }
					else
					{
						$( `.cell[coord='${player.posX}:${player.posY}']` ).removeClass(player2.weapon.CSSName);
					}
					playboard.setObject(x,y,"player2");
					player.moveUpdate(x,y);
				}
			}
			this.cellCheckWeapon(cell, player, x, y);
		}
	}

	cellCheckWeapon(cell, player, x, y) {
		if (cell.checkWeapon()) {

			player.prevWeapon = player.weapon;
			//alert(player.weapon.name);
			if (player === player1 && player.canPlay) {
				//playboard.remObject(player1.posX,player1.posY);
				playboard.remPlayer(player1.posX, player1.posY);
				playboard.synchro(player.posX, player.posY);
				playboard.remObject(x, y, player1.weapon.CSSName);
				playboard.setObject(x, y, "player1");
				player.equip(cell.getWeapon());
				player.moveUpdate(x, y);
			}
			if (player === player2 && player.canPlay) {
				playboard.remPlayer(player2.posX, player2.posY);
				playboard.synchro(player.posX, player.posY);
				//playboard.remObject(player2.posX,player2.posY);
				playboard.remObject(x, y, player2.weapon.CSSName);
				playboard.setObject(x, y, "player2");
				player.equip(cell.getWeapon());
				player.moveUpdate(x, y);
			}

			playboard.setObject(x, y, "weapon" + player.prevWeapon.ID);
		}
	}

	equip(weapon){
		switch (weapon) {
			case "weapon0":
				this.weapon=weapon0;
				break;
			
			case "weapon1":
				this.weapon=weapon1;
			break

			case "weapon2":
				this.weapon=weapon2;
			break
			
			case "weapon3":
				this.weapon=weapon3;
			break
			
			case "weapon4":
				this.weapon=weapon4;
			break

			default:
				break;
		}
	}
}

function add(a,b){
	return int(a)+int(b);
}

function endTurn(who){

	if (who === player1) {
		player1.myTurn=false;
		player2.myTurn=true;
		console.log("end of turn for player1");
		player1.canPlay=false;
	}
	if (who === player2) {
		player2.myTurn=false;
		player1.myTurn=true;
		console.log("end of turn for player2");
		player2.canPlay=false;
	}

}

export let player1=new Player("bleu",0,0);
export let player2=new Player("rouge",0,0);
player2.myTurn=false;
player2.canPlay=false;
//Blue.weapon=weapon0;
