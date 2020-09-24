"use strict";
import Cell from "./Cell.js";
import {player1,player2} from "./Player.js";
import weaponsList from "./Weapon.js"; 
import { sizeX,sizeY,shiftX,shiftY,scale,int } from "./configUtils.js";


let debug=0;
export default class Grid {
	constructor(sizeX,sizeY)
	{
		this.sizeX=sizeX;
		this.sizeY=sizeY;
		this.cells=[];
		this.player1=player1;
		this.player2=player2;
		this.weapons;
		this.shiftX=shiftX;
		this.shiftY=shiftY;
		this.scale=scale;
		this.margin=30;
		this.fightStarted=false;
	}

	generate(sizeX,sizeY) {
		//console.log("Grid Generate "+sizeX+" : "+sizeY);
		this.sizeX=sizeX;
		this.sizeY=sizeY;
		
		for (let xxx=0;xxx<sizeX;xxx++) {
	

			var cellsX=[];
 			for (let yyy=0;yyy<sizeY;yyy++) {
				
			let cell =this.generateCol(xxx,yyy);
			cellsX.push(cell);

			}		
			this.cells.push(cellsX)
		}
	}

	generateCol(xxx,yyy){
		//console.log("generate col : "+xxx+" : "+yyy);
		let newCell=$("<div class='cell void'></div>");
		newCell.attr("coord",xxx+":"+yyy);
		newCell.css("position","absolute").css("margin-left",this.margin+100*xxx).css("margin-top",this.margin+100*yyy);
		//newCell.css("position","absolute").css("margin-left",100+100*xxx).css("margin-top",100+100*yyy);
		let cell= new Cell(xxx,yyy,"cell void");

		$("#grid").append(newCell);

		if (debug===1) {
			
			$( ".cell[coord='"+xxx+":"+yyy+"']" ).html(xxx+":"+yyy) ;
		}
		return cell;
	}

	generateWall(num){
		for (let i=0;i<num;i++){
			let cell=this.randomCell();
			if  (cell.checkFree() ) { this.setObject(cell.x,cell.y,"mur") }
		}
	}

	generateTraps(num){
		for (let i=0;i<num;i++){
			let cell=this.randomCell();
			if  (cell.checkFree() ) { this.setObject(cell.x,cell.y,"trap") }
		}
	}

	pickCell(x,y){
		//console.log("pickCell : "+x+" : "+y);
		if ( x>=0
			 && x<sizeX
			 && y<sizeY 
			 && y>=0 ) {return this.cells[parseInt(x)][parseInt(y)];}
			// else { console.log("No cell in "+x+":"+y); }
	}

	random(number) {
		//console.log("Random : "+number);
		return Math.floor(Math.random()*number);
	}

	randomCell() {
		
	   let x = this.random(sizeX);
	   let y = this.random(sizeY);
	   //console.log(`RandomCell: ${x}:${y}`);
	   return this.cells[parseInt(x)][parseInt(y)];
	}

	randomFreeCell() {
		//console.log("RandomCell");
	   let x = this.random(sizeX);
	   let y = this.random(sizeY);
	   let testCell=this.cells[parseInt(x)][parseInt(y)];

	   while (!testCell.checkFree()  )
	   {	
		testCell=this.randomCell();
	   }

	   return testCell;
	}

	getClasses(x,y){
		let cell=this.cells[parseInt(x)][parseInt(y)];
		//console.log(`getClasses : ${x}:${y} >>> ${cell.content}`);
		//console.log("getClasses : "+x+":"+y+" >>> "+cell.content);
		return cell.content.split(' ');
	}

	setObject(x,y,what)
	{
		//console.log(`SETOBJECT on ${x}:${y} with ${what}`);
		//console.log("SETOBJECT on "+x+":"+y+" with "+what)
		let cell=this.cells[parseInt(x)][parseInt(y)];
		
		while ( !cell.checkFree() ) 
		{
			cell=this.randomCell();
			//console.log(`cell occupied, trying with ${cell.x}:${cell.y} ` );
		}

		//cell.content=cell.content.replace("void","");
		//cell.content+=what;
		$( `.cell[coord='${x}:${y}']` ).addClass(what).removeClass("void");
		this.synchro(x,y);
	}

	remObject(x,y,what)
	{
		//console.log(`REMOVE OBJECT on ${x}:${y}`);
		let cell=this.cells[parseInt(x)][parseInt(y)];
		//let str=cell.content
		//str=str.replace(what,"");
		$( `.cell[coord='${x}:${y}']` ).addClass("cell").removeClass(what);
		this.synchro(x,y);
	}

	remAll(x,y)
	{
		//console.log(`REMOVE ALL on ${x}:${y}`);
		let cell=this.cells[parseInt(x)][parseInt(y)];
		cell.content="cell void";
		$( `.cell[coord='${x}:${y}']` ).attr("class","cell void");
	}

	remPlayer(x,y)
	{
		//console.log(`REMOVE PLAYER on ${x}:${y}`);
		let cell=this.cells[parseInt(x)][parseInt(y)];
		$( `.cell[coord='${x}:${y}']` ).removeClass("player1").removeClass("player2");
		this.synchro(x,y);
	}

	setOverlay(x,y,what)
	{
		//console.log(`SET OVERLAY on ${x}:${y} with ${what}`);

		let newCell=$(`<div class='${what}'></div>`);
		$("#overlay").append(newCell);
		newCell.attr("coord",x+":"+y);//100+scale(100*)
		newCell.css("position","absolute").css("margin-left",playboard.shiftX+int(scale*(this.margin+100*x))).css("margin-top",playboard.shiftY+int(scale*(this.margin+100*y)));
		//console.log(playboard.shiftX);
	}

	//la distance de manhattan est plus adaptée pour les plateaux de jeu
	distanceMan(cellA,cellB){
		//console.log(`distance manhattan between : ${cellA.x}:${cellA.y} and ${cellB.x}:${cellB.y} `);
		return Math.ceil(Math.abs(cellB.x-cellA.x)+Math.abs(cellB.y-cellA.y));
		
	}

	isOnBoard(x,y) {
		return x >= 0 && x < sizeX && y >= 0 && y < sizeY  ;
	}

	// suis je entre 4 murs ? (ou le bord)
	canEscape(x,y){
		let escape=true;
		let nbWalls=4;
		let cellTest;
		if ( x > 0) {
			cellTest=this.pickCell(x-1,y);
			if ( !cellTest.checkWall()  ) { nbWalls--;}
		}
		
		if ( x < this.sizeX-1 ) {
			cellTest=this.pickCell(x+1,y);
			if ( !cellTest.checkWall()  ) { nbWalls--;}
		}
		
		if ( y < this.sizeY-1 ) {
			cellTest=this.pickCell(x,y+1);
			if ( !cellTest.checkWall()  ) { nbWalls--;}
		}

		if ( y > 0) {
			cellTest=this.pickCell(x,y-1);
			if ( !cellTest.checkWall()  ) { nbWalls--;}
		}

		if ( nbWalls===4 ) {
			escape=false;
		}

		//console.log(`can escape from ${x}:${y} ? ${escape}`);

		return escape;
	}

	spawnPlayers(){
		//console.log ("spawning players...");
		let p1= this.randomFreeCell();
		let p2= this.randomFreeCell();
		while ( !this.canEscape(p1.x,p1.y))  {
			p1= this.randomFreeCell();
			//console.log ("trying another cell for p1");
		}
		//console.log("#################################################player 1 set in "+p1.x+":"+p1.y);


		while ( !this.canEscape(p2.x,p2.y) || this.distanceMan(p1,p2) <= 3 )  {
			
			p2= this.randomFreeCell();
			//console.log ("trying another cell for p2");
		}
		//console.log("#################################################player 2 set in "+p2.x+":"+p2.y);
		this.setObject(p1.x,p1.y,"player1");
		this.setObject(p2.x,p2.y,"player2");

		this.player1.posX=p1.x;
		this.player1.posY=p1.y;
		this.player2.posX=p2.x;
		this.player2.posY=p2.y;

	}

	spawnWeapons(){
		//console.log ("spawning weapons...");
		for (let i=1;i<5;i++) {
			let cell = this.randomFreeCell();
			this.setObject(cell.x,cell.y,"weapon"+i);
		}
	}

	isPlayerNear(x,y){
		//console.log ("is player near "+x+":"+y);
		let playerNear = false;
		let cellTest;
		cellTest=this.pickCell(x-1,y);
		if ( x > 0) {
			if ( cellTest.checkPlayer()  ) { playerNear = true;}
		}
		
		cellTest=this.pickCell(x,y-1);
		if ( y > 0 ) {
			if ( cellTest.checkPlayer()  ) { playerNear = true;}
		}
		
		cellTest=this.pickCell(x,int(y)+int(1));
		if ( y < this.sizeY-1 ) {
			if ( cellTest.checkPlayer()  ) { playerNear = true;}
		}
		
		cellTest=this.pickCell(int(x)+int(1),y);
		if ( x < this.sizeX-1 ) {
			if ( cellTest.checkPlayer()  ) { playerNear = true;}
		}
		
		
		if (playerNear) { playboard.fightStarted=true; }

		return playerNear;
	}

	synchro(x,y){
		let elem=$(".cell[coord='"+x+":"+y+"']").attr("class");
		if (elem === "cell") { $(".cell[coord='"+x+":"+y+"']").addClass("void");  } 
		let cell=playboard.pickCell(x,y);
		cell.content=elem;
	}

}

export let playboard=new Grid(sizeX,sizeY) ;


