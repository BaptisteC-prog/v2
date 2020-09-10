import Cell from "./Cell.js";
import Grid from "./Grid.js";
import {playboard} from "./Grid.js";
import Weapon from "./Weapon.js";  // les METHODES de weapon
import Player from "./Player.js"; 
import {player1,player2,endTurn} from "./Player.js";
import {weapon0,weapon1,weapon2,weapon3,weapon4} from "./Weapon.js"; //les OBJETS de weapon
import { sizeX,sizeY,shiftX,shiftY,scale,rint,rnd } from "./configUtils.js";

$(document).ready(function () {
	
	let dmgchart=false;

	$( ".panel-joueur2" ).toggleClass("active-joueur2");


	function coordGet(coords){
		let cg=coords.split(':');
		return cg;
	}
	
	function refresh(){

		$("#weapon1").html(player1.weapon.name);
		$("#weapon2").html(player2.weapon.name);
	
		$("#hp1").html(player1.HP);
		$("#hp2").html(player2.HP);
	
		player1.name=$("#namePlayer1").val();
		player2.name=$("#namePlayer2").val();


		
	}

	refresh();
	playboard.generate(sizeX,sizeY);

	let numWalls=Math.ceil((0.075+rnd()*0.075)*sizeX*sizeY);

	playboard.generateWall(numWalls);
	console.log("###END GENERATION###______________________________________________________________________________________________");

	playboard.spawnPlayers();
	playboard.spawnWeapons();

	//console.log(test.getWeapon());


 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //MOUVEMENTS

	$('#grid').on('click','.player1', function(){
		
		if (player1.myTurn) {
			player1.checkMoves();
			player1.canPlay=true;
		}
		refresh();
	});

	$('#grid').on('click','.player2', function(){

		if (player2.myTurn) {
			player2.checkMoves();
			player2.canPlay=true;
		}
		refresh();
	});


	$('#overlay').on('click','.check', function(){
		let newX=coordGet($(this).attr("coord"))[0];
		let newY=coordGet($(this).attr("coord"))[1];
		if (player1.myTurn) { player1.move(newX,newY,player1); }
		if (player2.myTurn) { player2.move(newX,newY,player2); }
		refresh();
	});

 /////////////////////////////////////////////////////////////////////////////////
 // COMBAT
 $('#overlay').on('click','.fight', function(){

	player1.canPlay=true;
	player2.canPlay=true;
	
	if (player1.myTurn && player1.canPlay && player1.isAttacking ) {
		player1.canPlay=false;
		let dmg=player1.weapon.weaponDMGOuput();
		if (!player2.isAttacking) {dmg=rint(dmg/2); }
		player2.HP-=dmg;
		endTurn(player1);
		refresh();
		$('#overlay').html("");
		return;
	}

	if (player2.myTurn && player2.canPlay && player2.isAttacking ) {
		player2.canPlay=false;
		let dmg=player2.weapon.weaponDMGOuput();
		if (!player1.isAttacking) {dmg=rint(dmg/2); }
		player1.HP-=dmg;
		endTurn(player2);
		refresh();
		$('#overlay').html("");
		return;
	}

 });

 ///////////////////////////////////////////////////////////////////////////////
 ///INTERACT
 $('#attP1').on('click', function(){
	player1.isAttacking=true;
	$("#liste").append("<li class='item'>"+player1.name+" passe a l'attaque</li>") ;
	refresh();
});


$('#defP1').on('click', function(){
	player1.isAttacking=false;
	endTurn(player1);
	$("#liste").append("<li class='item'>"+player1.name+" choisit de se défendre</li>") ;
	refresh();
	return;
});

$('#attP2').on('click', function(){
	player2.isAttacking=true;
	$("#liste").append("<li class='item'>"+player2.name+" passe a l'attaque</li>") ;
	refresh();
});


$('#defP2').on('click', function(){
	player2.isAttacking=false;
	endTurn(player2);
	$("#liste").append("<li class='item'>"+player2.name+" choisit de se défendre</li>") ;
	refresh();
	return;
});


 //bilan
	if ( dmgchart === true ) {
	console.log("0 :"+weapon0.minDmg+"-"+weapon0.maxDmg+ "   rnd:"+weapon0.randomTier);
	console.log("1 :"+weapon1.minDmg+"-"+weapon1.maxDmg+ "   rnd:"+weapon1.randomTier);
	console.log("2 :"+weapon2.minDmg+"-"+weapon2.maxDmg+ "   rnd:"+weapon2.randomTier);
	console.log("3 :"+weapon3.minDmg+"-"+weapon3.maxDmg+ "   rnd:"+weapon3.randomTier);
	console.log("4 :"+weapon4.minDmg+"-"+weapon4.maxDmg+ "   rnd:"+weapon4.randomTier);
	}
	//player1.weapon=weapon4;
	//console.log(player1.weapon.name);


	//playboard.setObject(5,0,"mur");
	//playboard.setObject(4,0,"mur");
	//playboard.setObject(5,1,"mur");
	//playboard.setObject(6,0,"mur");

	//console.log(playboard.canEscape(5,0));

	//let cellrandom=playboard.randomCell();



	//playboard.setObject(cellrandom.x,cellrandom.y,"test")
 /*
	let test=playboard.pickCell(5,3);
	let test2=playboard.pickCell(8,4);

	let aaa=playboard.distance_man(test,test2);

	console.log(aaa);*/

	//console.log (playboard.getClasses(test.x,test.y));

	//playboard.setObject(5,3,"test")

	//test.checkFree();

	//test.content="cell mur";
	
	//console.log (playboard.getClasses(test.x,test.y));
	
	
   //console.log
});