//import Cell from "./Cell.js";
import Grid from "./Grid.js";

$(document).ready(function () {
	//alert();



	let playboard=new Grid(sizeX,sizeY) ;
	playboard.generate(sizeX,sizeY);

	//let cellrandom=playboard.randomCell();

	let test=playboard.pickCell(5,3);

	console.log (playboard.getClasses(test.x,test.y));
	
	test.content="cell mur";
	
	console.log (playboard.getClasses(test.x,test.y));
	
	
   //console.log
});