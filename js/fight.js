import {player1,player2,endTurn} from "./Player.js";
import { max,rint,rnd,int } from "./configUtils.js";
import { playboard } from "./Grid.js";

export function fight(attacker,target){
    if (playboard.fightStarted) {
        //Me attacks Him
        let Me=attacker;
        let Him=target;
        //alert(Me.name+" my turn:"+Me.myTurn+" can play"+ Me.canPlay +" is attacking"+ Me.isAttacking)
        Me.canPlay=false;
        //10% de chance d'esquiver
        if ( rnd()>0.1 * Him.spd/Me.spd){

            let dmg=Me.weapon.weaponDMGOuput();
            let critChance=3+max(15-Me.HP/5,0)+max(18-dmg/2,0);

            if (useV3){
                dmg=dmg*Me.att/Him.def;
                critChance*=Me.chance;
                Me.HP+=dmg*Me.vamp;
                Me.HP-=dmg*Him.rebound;
                
                Me.resetStats();
                Him.def=100;
                Him.rebound=0;

                
         
            }

            //console.log("crit for "+Me.name + " "+critChance );
            if (rnd()*100<critChance)
            { dmg=rint(dmg*(1.5+1.5*rnd(2))) ; 
                $("#liste").append("<li class='item'> coup critique pour "+Me.name+" !!!</li>") ;
            }
            if (!Him.isAttacking) {dmg=rint(dmg/2); }
            Him.HP-=dmg;
            $("#liste").append("<li class='item'>"+Me.name+" attaque "+Him.name+" pour "+dmg+" degats !</li>") ;
    
        }  
        else
        { 
            $("#liste").append("<li class='item'>"+Him.name+" a esquivé l'attaque de "+Me.name+" !</li>") ;
        }

        endTurn(Me);
        $('#overlay').html("");
    }
}

function attackRoll(){
    let listAtt=["soft","soft","soft","spd","spd","gambit","gambit","vamp","att","pow","charge"];
    let choice=int(rnd()*listAtt.length);
   //alert("/img/"+listAtt[choice]+".png");
   return listAtt[choice];
   // return `img/${listAtt[choice]}.png`;
}

function defenseRoll(){
    let listDef=["vit","vit","vit","pills","pills","heal","ninja","rebond"];
    let choice=int(rnd()*listDef.length);
  // alert("/img/"+listAtt[choice]+".png");
  return listDef[choice];
   // return `img/${listAtt[choice]}.png`;
}

export function rollStuff(player){
    if ( player === player1) { 
        if (useV3 && playboard.fightStarted && player1.isAttacking) {
            let stuff=attackRoll();
            if (rnd()>0.2){  $("#act11").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=attackRoll();
            if (rnd()>0.2){  $("#act12").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=attackRoll();
            if (rnd()>0.2){  $("#act13").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
        }

        if (useV3 && playboard.fightStarted && !player1.isAttacking) {
            let stuff=defenseRoll();
            if (rnd()>0.2){  $("#act11").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=defenseRoll();
            if (rnd()>0.2){  $("#act12").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=defenseRoll();
            if (rnd()>0.2){  $("#act13").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
        }
    }

    if ( player === player2) { 

        if (useV3 && playboard.fightStarted && player2.isAttacking) {
            let stuff=attackRoll();
            if (rnd()>0.2){  $("#act21").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=attackRoll();
            if (rnd()>0.2){  $("#act22").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=attackRoll();
            if (rnd()>0.2){  $("#act23").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
        }

        if (useV3 && playboard.fightStarted && !player2.isAttacking) {
            let stuff=defenseRoll();
            if (rnd()>0.2){  $("#act21").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=defenseRoll();
            if (rnd()>0.2){  $("#act22").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
            stuff=defenseRoll();
            if (rnd()>0.2){  $("#act23").html("<img class='"+stuff+"' src='img/"+stuff+".png'>"); }
        }
    }
}

let currentPlayer;

$('.panel-joueur1').on('mouseover', function(){
  
    if (player1.myTurn) {
        currentPlayer=player1;
    }
    $('.debug').html(player1.name+" att:"+player1.att+" def:"+player1.def+" spd:"+player1.spd+" vamp:"+player1.vamp+" reb:"+player1.rebound+" current:"+currentPlayer.name);
});

$('.panel-joueur2').on('mouseover', function(){
    
    if (player2.myTurn) {
        currentPlayer=player2;
    }
    $('.debug').html(player2.name+" att:"+player2.att+" def:"+player2.def+" spd:"+player2.spd+" vamp:"+player2.vamp+" reb:"+player2.rebound+" current:"+currentPlayer.name);
});

$('#joueurs').on('click','.att', function(){
    alert();
   currentPlayer.att=150;
   currentPlayer.spd=66;
   $( "#defP1" ).addClass("secret"); $( "#defP2" ).addClass("secret");
});

$('#joueurs').on('click','.pow', function(){
    currentPlayer.att=300;
    currentPlayer.spd=33;
   $( "#defP1" ).addClass("secret"); $( "#defP2" ).addClass("secret");
 });

$('#joueurs').on('click','.gambit', function(){
    currentPlayer.att=50;
    currentPlayer.chance=3;
   $( "#defP1" ).addClass("secret"); $( "#defP2" ).addClass("secret");
 });

 $('#joueurs').on('click','.spd', function(){
    currentPlayer.att=66;
    currentPlayer.spd=200;
   $( "#defP1" ).addClass("secret"); $( "#defP2" ).addClass("secret");
 });

 $('#joueurs').on('click','.vamp', function(){
   currentPlayer.vamp=0.5;
   $( "#defP1" ).addClass("secret"); $( "#defP2" ).addClass("secret");
 });

 $('#joueurs').on('click','.soft', function(){
    currentPlayer.att=66;
    currentPlayer.def=150;
   $( "#defP1" ).addClass("secret"); $( "#defP2" ).addClass("secret");
 });

 $('#joueurs').on('click','.charge', function(){
    currentPlayer.att=200;
    currentPlayer.spd=150;
    currentPlayer.def=33;
   $( "#defP1" ).addClass("secret"); $( "#defP2" ).addClass("secret");
 });

////////////////

 $('#joueurs').on('click','.vit', function(){
    currentPlayer.def=33; //   66/2  car la def sera x2 avec le bouton def
    currentPlayer.spd=300;
    $( "#attP1" ).addClass("secret"); $( "#attP2" ).addClass("secret");
 });

 $('#joueurs').on('click','.ninja', function(){
    currentPlayer.def=33/2;
    currentPlayer.spd=666;
    $( "#attP1" ).addClass("secret"); $( "#attP2" ).addClass("secret");
 });

 $('#joueurs').on('click','.rebond', function(){
    currentPlayer.rebound=0.5;
    $( "#attP1" ).addClass("secret"); $( "#attP2" ).addClass("secret");
 });

 $('#joueurs').on('click','.heal', function(){
    let heal=10+rint(80*rnd(2));
    currentPlayer.HP+=heal;
    if ( currentPlayer.HP>100) { currentPlayer.HP=100; }
    $("#liste").append("<li class='item'>"+player.name+" se soigne est gagne " +heal+" HP</li>") ;
    $( "#attP1" ).addClass("secret"); $( "#attP2" ).addClass("secret");
});

 $('#joueurs').on('click','.pills', function(){
    let heal=-10+rint(40*rnd());
    currentPlayer.HP+=heal;
    if ( currentPlayer.HP>100) { currentPlayer.HP=100; }
    $("#liste").append("<li class='item'>"+player.name+" prend des pillules et ses HP sont modifié de " +heal+"</li>") ;
    $( "#attP1" ).addClass("secret"); $( "#attP2" ).addClass("secret"); 
});


$('#actiontable').on('click', function(){
    $('#act11').html(""); $('#act12').html(""); $('#act13').html("");
});

$('#actiontable2').on('click', function(){
    $('#act21').html(""); $('#act22').html(""); $('#act23').html("");
});


export const useV3=true;