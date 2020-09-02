export let weapons = [];

class Weapon {
	constructor(ID,name,dmg)
	{
		this.ID=ID;
		this.name=name;
		this.dmg=dmg;
	}
}

export let weapon0=new Weapon(0,"Defaut",10);
let weapon1=new Weapon(1,"Cuillere",15);
let weapon2=new Weapon(2,"Cravate",15);
let weapon3=new Weapon(3,"Cable WiFi",20);
let weapon4=new Weapon(4,"Clippy",30);

weapons.push(weapon1,weapon2,weapon3,weapon4)