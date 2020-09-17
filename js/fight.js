import {player1,player2,endTurn} from "./Player.js";
import { max,rint,rnd } from "./configUtils.js";

export function fight(attacker,target){
    //Me attacks Him
    let Me=attacker;
    let Him=target;
    
    Me.canPlay=false;
    //10% de chance d'esquiver
    if ( rnd()>0.1 ) {

        let dmg=Me.weapon.weaponDMGOuput();
        let critChance=3+max(15-Me.HP/5,0)+max(18-dmg/2,0);
        console.log("crit for "+Me.name + " "+critChance );
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
        $("#liste").append("<li class='item'>"+Him.name+" a esquivé l'attque de "+Me.name+" !</li>") ;
    }

    endTurn(Me);
    $('#overlay').html("");

}