export default class Cell {
	constructor(x,y,content) {
		this.x=x;
		this.y=y;
		this.content=content;

		this.test=false;
	}
//
	checkFree() {
		this.test=false;
		if (this.content.search("void")>-1) { this.test=true;}
		//console.log("is cell "+this.x+":"+this.y+" free ? "+test);
		return this.test;
	}

	checkPlayer() {
		this.test=false;
		let reg=/player/g;
		if (this.content.search(reg)>0) { this.test=true;}
		//console.log("is cell "+this.x+":"+this.y+" a player ? "+test);
		return this.test;
	}

	checkWeapon() {
		this.test=false;
		let reg=/weapon/g;
		if (this.content.search(reg)>0) { this.test=true;}
		//console.log("is cell "+this.x+":"+this.y+" a weapon ? "+test);
		return this.test;
	}

	checkWall() {
		this.test=false;
		if (this.content.search("mur")>-1) { this.test=true;}
		//console.log("is cell "+this.x+":"+this.y+" a wall ? "+test);
		return this.test;
	}

	checkTrap() {
		this.test=false;
		if (this.content.search("trap")>-1) { this.test=true;}
		//console.log("is cell "+this.x+":"+this.y+" a wall ? "+test);
		return this.test;
	}

	getWeapon(){
		let stuff=this.content.split(' ');
		let reg=/weapon/g;
		for (let w in stuff) {
			let test=stuff[w];
			
			if (test.search(reg)===0) { return stuff[w];  }
		}

	}


}
