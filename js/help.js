
import {player1,player2} from "./Player.js";

$('#grid').on('mouseover','.cell', function(){
    $('#help-content').html('');
 
});
/*
$('#joueurs').on('mouseover', function(){
    $('#help-content').html('');
});*/


$('#grid').on('mouseover','.player1', function(){
    $('#help-content').html('Voici '+player1.name+' il a '+player1.HP+ ' HP  et possede l\'arme '+player1.weapon.name );
});

$('#grid').on('mouseover','.player2', function(){
    $('#help-content').html('Voici '+player2.name+' il a '+player2.HP+ ' HP  et possede l\'arme '+player2.weapon.name );
});

$('#grid').on('mouseover','.mur', function(){
    $('#help-content').html('Mur infranchissable');
});

$('#grid').on('mouseover','.weapon0', function(){
    $('#help-content').html('une arme par défaut qui a été déposée');
});

/////////////////////////////////////////////////////////////////////////

$('#joueurs').on('mouseover','.att', function(){
    $('#help-content').html('Attaque chargée : augmente les dégats mais diminune les chances de toucher');
});

$('#joueurs').on('mouseover','.pow', function(){
    $('#help-content').html('POW : puissante attaque avec peu de chances de toucher');
});

$('#joueurs').on('mouseover','.gambit', function(){
    $('#help-content').html('Gambit : diminue les dégats mais augmente les chances de coup critiques');
});

$('#joueurs').on('mouseover','.spd', function(){
    $('#help-content').html('Speed : diminue les dégats mais augmente les chances de toucher');
});

$('#joueurs').on('mouseover','.vamp', function(){
    $('#help-content').html('Vampire : soigne la moitié des dégats infligés au prochain coup !');
});

$('#joueurs').on('mouseover','.soft', function(){
    $('#help-content').html('Attaque soft : diminue les dégats mais defend contre le prochain coup');
});

$('#joueurs').on('mouseover','.charge', function(){
    $('#help-content').html('charge : attaque puissante et rapide mais gare à la riposte !');
});

$('#joueurs').on('mouseover','.vit', function(){
    $('#help-content').html('Esquive : augmente la vitesse mais diminue la défense');
});

$('#joueurs').on('mouseover','.ninja', function(){
    $('#help-content').html('Ninja : rend difficile à atteindre mais gare aux dommages si on est touché !');
});

$('#joueurs').on('mouseover','.rebond', function(){
    $('#help-content').html('Rebond : renvoie la moitié des dégats au prochain coup subi !');
});

$('#joueurs').on('mouseover','.heal', function(){
    $('#help-content').html('Kit de soin : permet de se soigner');
});

$('#joueurs').on('mouseover','.pills', function(){
    $('#help-content').html('Pillules : pillules douteuses ?');
});