import Cell from "./Cell.js";
let debug=1;
export default class Grid {
	constructor(sizeX,sizeY)
	{
		this.sizeX=sizeX;
		this.sizeY=sizeY;
		this.cells=[];


	}
	
	generate(sizeX,sizeY) {
		console.log("Grid Generate "+sizeX+" : "+sizeY)
		this.sizeX=sizeX;
		this.sizeY=sizeY;
		
		for (let xxx=0;xxx<sizeX;xxx++) {
	

			let cellsX=[];

			for (let yyy=0;yyy<sizeY;yyy++) {
				
				let newCell=$("<div class='cell void'></div>");
				newCell.attr("coord",xxx+":"+yyy);
				newCell.css("position","absolute").css("margin-left",100+100*xxx).css("margin-top",100+100*yyy);
				let cell= new Cell(xxx,yyy,"cell void");
				cellsX.push(cell);


				//10% de chance d'avoir un mur lors de la génération (A RETIRER)
				if ( rnd()>0.9 && true ) {
					newCell.addClass("mur").removeClass("void");
				}
			
				$("#grid").append(newCell);

				//alert("X"+xxx+"Y"+yyy);
				if (debug==1) {
					
					$( ".cell[coord='"+xxx+":"+yyy+"']" ).html(xxx+":"+yyy) ;
				}

			}		
			this.cells.push(cellsX)
		}
	}


	pickCell(x,y){
		return this.cells[parseInt(x)][parseInt(y)];
	}

	random(number) {
		return Math.floor(Math.random()*number);
	}

	randomCell() {
	   let x = this.random(sizeX);
	   let y = this.random(sizeY);
	   return this.cells[parseInt(x)][parseInt(y)];
	}

	getClasses(x,y){
		let cell=this.cells[parseInt(x)][parseInt(y)];
		let cellinfo=cell.content;
		return cell.content.split(' ');
	}


}


