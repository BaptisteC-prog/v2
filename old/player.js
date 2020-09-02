$(document).ready(function () {
	
class Weapon {
	constructor(ID,wname,dmg)
	{
		this.ID=ID;
		this.wname=wname;
		this.dmg=dmg;
	}
}
	
	let weapon0=new Weapon(0,"Defaut",10);
	let weapon1=new Weapon(1,"Cuillere",15);
	let weapon2=new Weapon(2,"Cravate",15);
	let weapon3=new Weapon(3,"Cable WiFi",20);
	let weapon4=new Weapon(4,"Clippy",30);


class Player {
    constructor(name, posX,posY) {
		this.name = name;
		this.HP=100;
		//this.move = 3000;
		this.weapon = weapon0;
		this.prevWeapon=weapon0;
		this.posX = posX;
		this.posY = posY;
		this.myTurn = true;
		this.myAction="";
		this.canPlay=true;
		
   
    }
}


	let Bleu= new Player($("#namePlayer1").val(),$("#p1x").val(),$("#p1y").val());
	let Rouge= new Player($("#namePlayer2").val(),$("#p2x").val(),$("#p2y").val());	
	
		


	
function placeObject(x,y,quoi){
//setClass(x,y,"");
	$(".cell[coord='"+x+":"+y+"']").addClass("cell").addClass(quoi);
	return [x,y];
	}	
	
function add(a,b) {
	return int(a)+int(b);
}

function Victory(who) {
	
	console.log("victory "+who.name);
	$('#grid').css("display","none");
	$('#joueurs').css("display","none");
	$('#action').css("display","none");
	$('#action').css("display","none");
	$('#win').html("<h1>Félicitations ! "+who.name+ " a remporté la victoire !<br> avec "+who.HP+" HP restants</h1>" );
}

//Victory(Bleu);

function coordGet(coords){
	let cg=coords.split(':');
	return cg;
}

//Victory(Bleu);

/*
function coordGetX(coords){
	let cgx=coords.split(':');
	return cgx[0];
}

function coordGetY(coords){
	let cgy=coords.split(':');
	return cgy[1];
}*/

function setClass(x,y,what) {
	$(".cell[coord='"+x+":"+y+"']").attr("class",what).addClass("cell");
	}

function getClass(x,y) {
	let elem=$(".cell[coord='"+x+":"+y+"']").attr("class");
	let ret=elem.split(' ');
	return ret;
	}


function isBlock(x,y) {
	return $(".cell[coord='"+x+":"+y+"']").hasClass("mur");
}

function isPlayer(x,y) {
	//return $(".cell[coord='"+x+":"+y+"']").hasClass("[^player]");
	return $(".cell[coord='"+x+":"+y+"']").hasClass("player1") 
	|| $(".cell[coord='"+x+":"+y+"']").hasClass("player2"); 
}
	
function isWeapon(x,y) {
	//return $(".cell[coord='"+x+":"+y+"']").hasClass("[^weapon]");
	return $(".cell[coord='"+x+":"+y+"']").hasClass("weapon0") 
	|| $(".cell[coord='"+x+":"+y+"']").hasClass("weapon1") 
	|| $(".cell[coord='"+x+":"+y+"']").hasClass("weapon2")
	|| $(".cell[coord='"+x+":"+y+"']").hasClass("weapon3")
	|| $(".cell[coord='"+x+":"+y+"']").hasClass("weapon4");
}	
	
function isMedic(x,y)	{
	let tab=[false,"0"];
	
	if ($(".cell[coord='"+x+":"+y+"']").hasClass("heal1")) { tab=[true,1]; }
	if ($(".cell[coord='"+x+":"+y+"']").hasClass("heal2")) { tab=[true,2]; }
	/*return $(".cell[coord='"+x+":"+y+"']").hasClass("heal1") 
	|| $(".cell[coord='"+x+":"+y+"']").hasClass("heal2") ;*/
	return tab;
}
/*	
function getAction(who) {
	let res;
	if (who ==="Bleu" && $('input[id=p1Attack]').prop('checked') == true ) {
		res="att";
		Bleu.myAction=res;}
		
	if (who ==="Bleu" && $('input[id=p1Defense]').prop('checked') == true ) {
		res="def";
		Bleu.myAction=res;}
	
	if (who ==="Rouge" && $('input[id=p2Attack]').prop('checked') == true ) {
		res="att";
		Rouge.myAction=res;}
		
	if (who ==="Rouge" && $('input[id=p2Defense]').prop('checked') == true ) {
		res="def";
		Rouge.myAction=res;}
	
	
	return res;
}
	*/
	
function refresh(){

	$("#weapon1").html(weaponDisp(Bleu));
	$("#weapon2").html(weaponDisp(Rouge));

	$("#hp1").html(Bleu.HP);
	$("#hp2").html(Rouge.HP);

	Bleu.name=$("#namePlayer1").val();
	Rouge.name=$("#namePlayer2").val();

	if (Bleu.myAction === "att") { $("#modeP1").html("en attaque");  }
	if (Bleu.myAction === "def") { $("#modeP1").html("en défense");  }
	
	if (Rouge.myAction === "att") { $("#modeP2").html("en attaque");  }
	if (Rouge.myAction === "def") { $("#modeP2").html("en défense");  }
	
	
	let numItems = $('.item').length;
	if (numItems >10 ) { $(".item").eq(0).remove(); }
	
	if ( Bleu.HP <= 0 ) { Victory(Rouge); }
	if ( Rouge.HP <= 0 ) { Victory(Bleu); }
	
}	
	
function placeOverlay(x,y) {
	//console.log("place OVERLAY"+x+":"+y);
	let newCell=$("<div class='check'></div>");
	$("#overlay").append(newCell);
	newCell.attr("coord",x+":"+y);
	newCell.css("position","absolute").css("margin-left",scale*(shiftX+100*x)).css("margin-top",scale*(shiftY+100*y));
	
// l'overlay sera effacé des qu'on clique dessus, et effectura le déplacement
}	
	
function placeFight(x,y) {
	//console.log("place FIGHT"+x+":"+y);
	let newCell=$("<div class='fight'></div>");
	$("#overlay").append(newCell);
	newCell.attr("coord",x+":"+y);
	newCell.css("position","absolute").css("margin-left",scale*(shiftX+100*x)).css("margin-top",scale*(shiftY+100*y));
}		

	
function checkMoves(who) {

	
	let playerX=who.posX;
	let playerY=who.posY;
	let ok_move=true;

	//en haut
	for (let up=1;up<4;up++) {


		let cell=$(".cell[coord='"+playerX+":"+(playerY-up)+"']");


if ( (cell.hasClass("player1") || cell.hasClass("player2"))&& ok_move && up==1  ) {  placeFight(playerX,playerY-up);   }

		if ( isPlayer(playerX,playerY-up) || isBlock(playerX,playerY-up)   ) { ok_move=false; }
	
		if ((cell.hasClass("void") || isWeapon(playerX,playerY-up)  || isMedic(playerX,playerY-up) )
		&& ok_move  == true
		&& playerY-up>=0) {

			placeOverlay(playerX,playerY-up);    }
		}
		
		ok_move=true;
		
		//a droite
	for (let right=1;right<4;right++) {
let add_move=add(playerX,right);
		let cell=$(".cell[coord='"+add_move+":"+(playerY)+"']");
		
		if ( (cell.hasClass("player1") || cell.hasClass("player2"))&& ok_move && right==1 ) { placeFight(add_move,playerY);   }
		
//console.log(".cell[coord='"+add_move+":"+(playerY)+"']");	
		if ( isPlayer(add_move,playerY) || isBlock(add_move,playerY)   ) { ok_move=false; }

		if ( (cell.hasClass("void") || isWeapon(add_move,playerY)  || isMedic(add_move,playerY) )
		&& ok_move  == true
		&& add_move<sizeX ) {

			placeOverlay(add_move,playerY);    }
		}
		
		ok_move=true;
		
		//en bas
	for (let down=1;down<4;down++) {
let add_move=add(playerY,down);
		let cell=$(".cell[coord='"+playerX+":"+add_move+"']");
		
		if ( (cell.hasClass("player1") || cell.hasClass("player2"))&& ok_move&& down ==1 ) { placeFight(playerX,add_move);   }
		
		if ( isPlayer(playerX,add_move) || isBlock(playerX,add_move)   ) { ok_move=false; }

		if ( (cell.hasClass("void") || isWeapon(playerX,add_move) || isMedic(playerX,add_move) )
		&& ok_move  == true
		&& add_move<sizeY ) {

			placeOverlay(playerX,add_move);    }
		}
		
		ok_move=true;
		
		//a gauche
	for (let left=1;left<4;left++) {

		let cell=$(".cell[coord='"+(playerX-left)+":"+playerY+"']");
		
		if ( (cell.hasClass("player1") || cell.hasClass("player2"))&& ok_move && left==1) {placeFight(playerX-left,playerY);   }
		
		if ( isPlayer(playerX-left,playerY) || isBlock(playerX-left,playerY)   ) { ok_move=false; }

		if ( (cell.hasClass("void") || isWeapon(playerX-left,playerY)   || isMedic(playerX-left,playerY) )
		&& ok_move  == true
		&& playerX-left>=0 ) {

			placeOverlay(playerX-left,playerY);    }
		}

}

function endTurn(who){
	
	if ( who == Bleu ) {	
	console.log("fin du tour bleu");
	$( ".panel-joueur1" ).toggleClass("active-joueur1");
	$( ".panel-joueur2" ).toggleClass("active-joueur2");
	Bleu.myTurn=false;
	Rouge.myTurn=true;
	Rouge.canPlay=true;
	$('#overlay').html("");
	
	}
	
	if ( who == Rouge ) {
	console.log("fin du tour rouge");
	$( ".panel-joueur1" ).toggleClass("active-joueur1");
	$( ".panel-joueur2" ).toggleClass("active-joueur2");
	Rouge.myTurn=false;
	Bleu.myTurn=true;
	Bleu.canPlay=true;
	$('#overlay').html("");
	
	}
	
	
}


function equipXY(who,posX,posY){
	//console.log("equipXY:"+who);
if ( $(".cell[coord='"+posX+":"+posY+"']").hasClass("weapon0")) { equip(who,weapon0); console.log("EQUIP XY weapon0");   }	
if ( $(".cell[coord='"+posX+":"+posY+"']").hasClass("weapon1")) { equip(who,weapon1); console.log("EQUIP XY weapon1");  }
if ( $(".cell[coord='"+posX+":"+posY+"']").hasClass("weapon2")) { equip(who,weapon2); console.log("EQUIP XY weapon2");  }
if ( $(".cell[coord='"+posX+":"+posY+"']").hasClass("weapon3")) { equip(who,weapon3); console.log("EQUIP XY weapon3");  }
if ( $(".cell[coord='"+posX+":"+posY+"']").hasClass("weapon4")) { equip(who,weapon4); console.log("EQUIP XY weapon4");  }



/*	let classes=getClass(posX,posY);
	for (let elem of classes)
	{
		if (elem="weapon1") { equip("Bleu",1);   }
		if (elem="weapon2") { equip("Bleu",2);   }
		if (elem="weapon3") { equip("Bleu",3);   }
		if (elem="weapon4") { equip("Bleu",4);   }
	}*/

	weaponDisp(who);
}


function equip(who,weapon) {
		//console.log("equip:"+who);
	console.log("EQUIP "+who.name+","+weapon.wname);
	who.weapon=weapon;
	$("#weapon1").html(weaponDisp(Bleu));
	$("#weapon2").html(weaponDisp(Rouge));
	$("#liste").append("<li class='item'>"+who.name+" a ramassé :"+weaponDisp(who)+"</li>") ;
	/*
	if ( who == Bleu ) {
	Bleu.weapon=weapon;
	
	$("#weapon1").html(weaponDisp(Bleu));
	$("#liste").append("<li class='item'>"+Bleu.name+" a ramassé :"+weaponDisp(Bleu)+"</li>") ;
	}
	
	if ( who == Rouge ) {
	Rouge.weapon=weapon;
	$("#weapon2").html(weaponDisp(Rouge));
	$("#liste").append("<li class='item'>"+Rouge.name+" a ramassé :"+weaponDisp(Rouge)+"</li>") ;
	}
*/
}

function weaponDisp(who) {
	/*
	let weapon=who.weapon;
	let weapon_disp=["Defaut","Cuillere","Cravate","Cable Wifi","Clippy"];
	return weapon_disp[weapon];*/
	//let pre="weapon"+who.weapon;

	return who.weapon.wname;
	//return weapon1.name;
}

//alert(weaponDisp(Bleu));

//0 : defaut
//1 : cuillere
//2 : cravate
//3 : cable WIFI
//4 : clippy

	
	Bleu.myTurn=true;
	Rouge.myTurn=false;
	Bleu.myAction="att";
	Rouge.myAction="att";

	
	//alert(weaponDisp(Bleu));
	
	//Bleu.HP=50;
	//Rouge.HP=-1200;
		//equip("Bleu","weapon1");
refresh();

$('#attP1').on('click', function(){
	Bleu.myAction="att";
	$("#liste").append("<li class='item'>"+Bleu.name+" passe a l'attaque</li>") ;
	refresh();
});


$('#defP1').on('click', function(){
	Bleu.myAction="def";
	endTurn(Bleu);
	$("#liste").append("<li class='item'>"+Bleu.name+" choisit de se défendre</li>") ;
	refresh();
	return;
});

$('#attP2').on('click', function(){
	Rouge.myAction="att";
	$("#liste").append("<li class='item'>"+Rouge.name+" passe a l'attaque</li>") ;
	refresh();
});


$('#defP2').on('click', function(){
	Rouge.myAction="def";
	endTurn(Rouge);
	$("#liste").append("<li class='item'>"+Rouge.name+" choisit de se défendre</li>") ;
	refresh();
	return;
});




///COMBAT/////////////////////////////////////////////////////////

$('#overlay').on('click','.fight', function(){

	//getAction("Bleu");
	//getAction("Rouge");
	if (Bleu.myTurn && Bleu.canPlay && Bleu.myAction === "att" ) {

	Bleu.canPlay=false;
	let dmg=Bleu.weapon.dmg;
	//alert(dmg);
/*	if (Bleu.weapon==0) { dmg=10;}
	if (Bleu.weapon==1) { dmg=add(5,rint(rnd()*20));}
	if (Bleu.weapon==2) { dmg=add(10,rint(rnd(0.5)*8));}
	if (Bleu.weapon==3) { dmg=add(15,rint(rnd(2)*20));}
	if (Bleu.weapon==4) { dmg=add(20,rint(rnd(3)*80));}*/
	if (Rouge.myAction === "def") { dmg=rint(dmg/2); }
	Rouge.HP=Rouge.HP-dmg;
	refresh();
	$("#liste").append("<li class='item'>"+Bleu.name+" attaque "+Rouge.name+" pour "+dmg+" degats!</li>") ;
	endTurn(Bleu);
	return;
	
}

	if (Rouge.myTurn && Rouge.canPlay && Rouge.myAction === "att" ) {

	Rouge.canPlay=false;
	let dmg=Rouge.weapon.dmg;
	/*if (Rouge.weapon==0) { dmg=10;}
	if (Rouge.weapon==1) { dmg=add(5,rint(rnd()*20));}
	if (Rouge.weapon==2) { dmg=add(10,rint(rnd(0.5)*8));}
	if (Rouge.weapon==3) { dmg=add(15,rint(rnd(2)*20));}
	if (Rouge.weapon==4) { dmg=add(20,rint(rnd(3)*80));}*/
	if (Bleu.myAction === "def") { dmg=rint(dmg/2); }
	Bleu.HP=Bleu.HP-dmg;
	refresh();
	$("#liste").append("<li class='item'>"+Rouge.name+" attaque "+Bleu.name+" pour "+dmg+" degats!</li>") ;
	endTurn(Rouge);
	return;
	
}

$('#overlay').html("");
refresh();
});

///MOUVEMENTS//////////////////////////////////////////////////////////


$('#grid').on('click','.player1', function(){
	//console.log("je suis le joueur 1!");
	if (Bleu.myTurn) { checkMoves(Bleu); }
});

$('#grid').on('click','.player2', function(){
	//console.log("je suis le joueur 2!");
	if (Rouge.myTurn) {checkMoves(Rouge); }
});


//event delegation sinon ca prend pas
$('#overlay').on('click','.check', function(){
	
			if (Bleu.myTurn) { 

		let newX=coordGet($(this).attr("coord"))[0];
		let newY=coordGet($(this).attr("coord"))[1];
		//console.log(newX+":"+newY);
		$("#liste").append("<li class='item'>"+Bleu.name+" se déplace</li>") ;
		
	if (!isWeapon(newX,newY) ) {
		$(".cell[coord='"+Bleu.posX+":"+Bleu.posY+"']").removeClass("player1");
		placeObject(Bleu.posX,Bleu.posY,"void");
		placeObject(newX,newY,"player1");
		}

	if (isWeapon(newX,newY) ) {
		Bleu.prevWeapon=Bleu.weapon;
		//alert("equpxy");
		equipXY(Bleu,newX,newY);
		$(".cell[coord='"+Bleu.posX+":"+Bleu.posY+"']").removeClass("player1");  ///supprimé de l'ancienne place pour eviter la duplication
		$(".cell[coord='"+newX+":"+newY+"']").removeClass("weapon"+Bleu.weapon.ID);  ///on ramasse la nouvelle arme
		$(".cell[coord='"+newX+":"+newY+"']").addClass("weapon"+Bleu.prevWeapon.ID); ///depot ancienne arme
		setClass(newX,newY,"void player1 weapon"+Bleu.prevWeapon.ID);
		placeObject(Bleu.posX,Bleu.posY,"void"); 
		refresh();
	}

	if (isMedic(newX,newY)[0]) {
		let heal=0;
		
		if (isMedic(newX,newY)[1]==1) { 
		heal=-10+rint(40*rnd());
		Bleu.HP=add(Bleu.HP,heal);
		}
		
		if (isMedic(newX,newY)[1]==2) { 
		heal=10+rint(80*rnd(2));
		Bleu.HP=add(Bleu.HP,heal);
		}
	
		if (Bleu.HP>100) { Bleu.HP=100; }
	setClass(newX,newY,"void player1 cell");
	//$(".cell[coord='"+Bleu.posX+":"+Bleu.posY+"']").removeClass("heal1").removeClass("heal2").addClass("void");	
	if ( heal > 0 ) { $("#liste").append("<li class='item'>"+Bleu.name+" a gueri "+heal+" HP</li>") ; }
	if ( heal < 0 ) { $("#liste").append("<li class='item'>Berk ! "+Bleu.name+" a perdu "+heal+" HP</li>") ; }
	refresh();
	}

		Bleu.posX=newX;
		Bleu.posY=newY;

		$('#overlay').html("");
		endTurn(Bleu);
		return;
		
		}
		
		if (Rouge.myTurn) { 
		
		let newX=coordGet($(this).attr("coord"))[0];
		let newY=coordGet($(this).attr("coord"))[1];
		//console.log(newX+":"+newY);
		
		$("#liste").append("<li class='item'>"+Rouge.name+" se déplace</li>") ;
		
	if (!isWeapon(newX,newY) ) {
		$(".cell[coord='"+Rouge.posX+":"+Rouge.posY+"']").removeClass("player2");
		placeObject(Rouge.posX,Rouge.posY,"void");
		placeObject(newX,newY,"player2");
		}

	if (isWeapon(newX,newY) ) {
		Rouge.prevWeapon=Rouge.weapon;
		equipXY(Rouge,newX,newY);
		$(".cell[coord='"+Rouge.posX+":"+Rouge.posY+"']").removeClass("player2");  ///supprimé de l'ancienne place pour eviter la duplication
		$(".cell[coord='"+newX+":"+newY+"']").removeClass("weapon"+Rouge.weapon.ID);  ///on ramasse la nouvelle arme
		$(".cell[coord='"+newX+":"+newY+"']").addClass("weapon"+Rouge.prevWeapon.ID); ///depot ancienne arme
		setClass(newX,newY,"void player2 weapon"+Rouge.prevWeapon.ID);
		placeObject(Rouge.posX,Rouge.posY,"void"); 
		refresh();
	}

	if (isMedic(newX,newY)[0]) {
		let heal=0;
		
		if (isMedic(newX,newY)[1]==1) { 
		heal=-10+rint(40*rnd());
		Rouge.HP=add(Rouge.HP,heal);
		}
		
		if (isMedic(newX,newY)[1]==2) { 
		heal=10+rint(80*rnd(2));
		Rouge.HP=add(Rouge.HP,heal);
		}
	
		if (Rouge.HP>100) { Rouge.HP=100; }
	setClass(newX,newY,"void player2 cell");

	if ( heal > 0 ) { $("#liste").append("<li class='item'>"+Rouge.name+" a gueri "+heal+" HP</li>") ; }
	if ( heal < 0 ) { $("#liste").append("<li class='item'>Berk ! "+Rouge.name+" a perdu "+heal+" HP</li>") ; }
	refresh();
	}


		Rouge.posX=newX;
		Rouge.posY=newY;

		$('#overlay').html("");
		endTurn(Rouge);
		return;
		}

	refresh();
});

$('#joueurs').on('click', function(){
	refresh();
});
	
$('#grid').on('click', function(){
	refresh();
	//console.log("bleu:"+Bleu.weapon);
	//console.log("rouge:"+Rouge.weapon);

	
});
	
$('#endP1').on('click', function(){
/*
if ($('input[id=p1Choose]').prop('checked')) {
	alert("je dois choisir mon action pour le prochain combat !");
}

if ( Bleu.myTurn && $('input[id=p1Choose]').prop('checked') == false ) {	
	$( ".panel-joueur1" ).toggleClass("active-joueur1");
	$( ".panel-joueur2" ).toggleClass("active-joueur2");
	Bleu.myTurn=false;
	Rouge.myTurn=true;
	Rouge.canPlay=true;
	$('#overlay').html("");
	}
	else { alert("ce n'est pas votre tour !");}
});
*/

/*
$('#endP2').on('click', function(){
	
	if ($('input[id=p2Choose]').prop('checked')) {
	alert("je dois choisir mon action pour le prochain combat !");
}
	
	if ( Rouge.myTurn && $('input[id=p2Choose]').prop('checked') == false ) {
	$( ".panel-joueur1" ).toggleClass("active-joueur1");
	$( ".panel-joueur2" ).toggleClass("active-joueur2");
	Rouge.myTurn=false;
	Bleu.myTurn=true;
	Bleu.canPlay=true;
	$('#overlay').html("");
	}
	else { alert("ce n'est pas votre tour !");}
	*/
});		


//Victory(Rouge);
/*
$( "#p1Attack" ).attr( "checked" );
$( "#p2Attack" ).attr( "checked" );
*/


////////////////////////////////////////////////////	
});
