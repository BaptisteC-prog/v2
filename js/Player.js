import { weapon0,weapon1,weapon2,weapon3,weapon4 } from "./Weapon.js";
import { playboard } from "./Grid.js";

import Cell from "./Cell.js";
import Grid from "./Grid.js";
import Weapon from "./Weapon.js"; 
import weaponsList from "./Weapon.js"; 
import { rint,int,rnd } from "./configUtils.js";
import { rollStuff } from "./fight.js"

export default class Player {
    constructor(name, posX,posY) {
		this.name = name;
		this.HP=100;
		this.weapon =weapon0;
		this.prevWeapon=weapon0;
		this.posX = posX;
		this.posY = posY;
		this.myTurn = true;
		this.isAttacking=true; //isAttacking
		this.canPlay=true;
		this.CSSName="";

		///V3///

		this.att=100;
		this.def=100;
		this.spd=100;
		this.chance=1.0;
		this.vamp=0;
		this.rebound=0;
				
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
				if ((cell.checkFree() || cell.checkWeapon() || cell.checkTrap())
					&& okMove
					&& this.posX - left >= 0
					&& !playboard.fightStarted ) {
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
				if ((cell.checkFree() || cell.checkWeapon() || cell.checkTrap())
					&& okMove
					&& cellAdd < playboard.sizeY
					&& !playboard.fightStarted ) {
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
				if ((cell.checkFree() || cell.checkWeapon() || cell.checkTrap())
					&& okMove
					&& cellAdd < playboard.sizeX
					&& !playboard.fightStarted ) {
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
				if ((cell.checkFree() || cell.checkWeapon() || cell.checkTrap())
					&& okMove
					&& this.posY - up >= 0
					&& !playboard.fightStarted ) {
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
//
	move(x,y,player){
		if (player.myTurn) {
			let cell=playboard.pickCell(x,y);
			let origin=playboard.pickCell(player.posX,player.posY);

			if ( cell.checkTrap() ) { 
				let dmg=rint(10+20*rnd(3));
				player.HP-=dmg;
				$("#liste").append("<li class='item'>Piege ! "+player.name+" a perdu "+dmg+" HP!</li>") ;
				playboard.remAll(x,y);
				playboard.synchro(x,y);
				$("#hp1").html(player1.HP);
				$("#hp2").html(player2.HP);
			}

			if ( !cell.checkWeapon()){
				
				if ( player.canPlay){
					$("#liste").append("<li class='item'>"+player.name+" se déplace</li>") ;
					playboard.remPlayer(player.posX,player.posY);
					if ( !origin.checkWeapon()) { 
						origin.content+=" void";
						//playboard.setObject(player.posX,player.posY,"void");
						$( `.cell[coord='${player.posX}:${player.posY}']` ).addClass("void");
						playboard.synchro(player.posX,player.posY);

					 }
					else 
					{
						$( `.cell[coord='${player.posX}:${player.posY}']` ).removeClass(player.weapon.CSSName);
						
					}
					playboard.setObject(x,y,player.CSSName);
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
			if ( player.canPlay) {
				//playboard.remObject(player1.posX,player1.posY);
				playboard.remPlayer(player.posX, player.posY);
				playboard.synchro(player.posX, player.posY);
				playboard.remObject(x, y, player.weapon.CSSName);
				playboard.setObject(x, y, player.CSSName);
				player.equip(cell.getWeapon());
				$("#liste").append("<li class='item'>"+player.name+" a ramassé :"+player.weapon.name+"</li>") ;
				player.moveUpdate(x, y);
			}

			playboard.setObject(x, y, "weapon" + player.prevWeapon.ID);
		}
	}

	resetStats(){
		this.att=100;
		this.spd=100;
		this.chance=1.0;
		this.vamp=0;
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



export function endTurn(who){

	let Me;
	let Him;

	if (playboard.fightStarted) {
	$( "#attP1" ).removeClass("secret");
	$( "#defP1" ).removeClass("secret");
	$( "#attP2" ).removeClass("secret");
	$( "#defP2" ).removeClass("secret");
	}

	if (who === player1) {
		Me=player1;
		Him=player2;
	}

	if (who === player2) {
		Me=player2;
		Him=player1;
	}

	if (who === Me) {
		Me.myTurn=false;
		Him.myTurn=true;
		Me.canPlay=false;

		$( ".panel-joueur1" ).toggleClass("active-joueur1");
		$( ".panel-joueur2" ).toggleClass("active-joueur2");
	}

	if (rnd()>0.666*0 && playboard.fightStarted) { rollStuff(Me); }

}

export let player1=new Player("bleu",0,0);
export let player2=new Player("rouge",0,0);
player1.CSSName="player1";
player2.CSSName="player2";
player2.myTurn=false;
player2.canPlay=false;
//Blue.weapon=weapon0;
