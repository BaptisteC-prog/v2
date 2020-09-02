$(document).ready(function () {
let debug=1;

function addCell(x,y) {
	let newCell=$("<div class='cell void'></div>");
	newCell.attr("coord",x+":"+y);
	newCell.css("position","absolute").css("margin-left",100+100*x).css("margin-top",100+100*y);
	//10% de chance d'avoir un mur
	if ( rnd()>0.9 ) {
		newCell.addClass("mur").removeClass("void");
	}
	
	$("#grid").append(newCell);
	
	//des coordonnées pour aider
	if (debug==1) {
		$( ".cell[coord='"+x+":"+y+"']" ).html(x+":"+y) ;
	}
		 
}

class Grid {
	constructor(sizeX,sizeY)
	{
		this.sizeX=sizeX;
		this.sizeY=sizeY;
	}
	
	generate() {
		for (let xxx=0;xxx<sizeX;xxx++) {
	
			for (let yyy=0;yyy<sizeY;yyy++) {
	
				addCell(xxx,yyy);

			}		
	
		}
	}
}



$( ".panel-joueur2" ).toggleClass("active-joueur2");

function placeObject(x,y,what){

	// si c'est occupé on cherche ailleurs
	while (	$( ".cell[coord='"+x+":"+y+"']" ).hasClass("void") == false) {
			x=int(rnd()*sizeX);
			y=int(rnd()*sizeY);
	}

	$( ".cell[coord='"+x+":"+y+"']" ).addClass(what).removeClass("void");


	return [x,y];

}



function distance(x1,y1,x2,y2){
	return Math.sqrt( Math.pow(x2-x1,2)+Math.pow(y2-y1,2)  );
	
}

//alert (distance(3,7,3,8));
	



//generation de la grille
/*
for (let xxx=0;xxx<sizeX;xxx++) {
	
	for (let yyy=0;yyy<sizeY;yyy++) {
	
	addCell(xxx,yyy);

	}
	
}
	*/
	
	playboard=new Grid(sizeX,sizeY) ;
	playboard.generate();

//place les joueurs
let pos1=[0,0];
let pos2=[0,0];

  //position de depart des joueurs
	let p1x=int(rnd()*sizeX);
	let p1y=int(rnd()*sizeY);

	let p2x=int(rnd()*sizeX);
	let p2y=int(rnd()*sizeY);


 /*p1x=0;  p1y=0;
 p2x=0;  p2y=1;*/

//alert(j2x);

pos1=placeObject(p1x,p1y,"player1");

//console.log("avant "+distance(pos1[0],pos1[1],p2x,p2y));
while (  distance(pos1[0],pos1[1],p2x,p2y) < 3  ) {

	 p2x=int(rnd()*sizeX);
	 p2y=int(rnd()*sizeY);

}

//pos2=placeObject(j2x,j2y,"player2");
//alert(j2x);alert(j2y);
$( ".cell[coord='"+p2x+":"+p2y+"']" ).addClass("player2").removeClass("void");
$("#p1x").val(pos1[0]); $("#p1y").val(pos1[1]);
$("#p2x").val(p2x); $("#p2y").val(p2y);

//console.log("apres "+distance(pos1[0],pos1[1],p2x,p2y))

//place des armes au hasard	
	for (i=1;i<5;i++) {
		
	let randx=int(rnd()*sizeX);
	let randy=int(rnd()*sizeY);
	placeObject(randx,randy,"weapon"+i);
	
	}

//EXTRA : place des kits de soin au hasard	
	for (i=1;i<4;i++) {
	let type=1+rint(rnd());
	let randx=int(rnd()*sizeX);
	let randy=int(rnd()*sizeY);
	placeObject(randx,randy,"heal"+type);
	
	}	
	
	
});