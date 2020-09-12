export default class Cell {
	constructor(x,y,content) {
		this.x=x;
		this.y=y;
		this.content=content;
	}
//
	checkFree() {
		let str=this.content;
		let test=false;
		if (str.search("void")>-1) { test=true;}
		//console.log("is cell "+this.x+":"+this.y+" free ? "+test);
		return test;
	}

	checkPlayer() {
		let str=this.content;
		let test=false;
		let reg=/player/g;
		if (str.search(reg)>0) { test=true;}
		//console.log("is cell "+this.x+":"+this.y+" a player ? "+test);
		return test;
	}

	checkWeapon() {
		let str=this.content;
		let test=false;
		let reg=/weapon/g;
		if (str.search(reg)>0) { test=true;}
		//console.log("is cell "+this.x+":"+this.y+" a weapon ? "+test);
		return test;
	}

	checkWall() {
		let str=this.content;
		let test=false;
		if (str.search("mur")>-1) { test=true;}
		//console.log("is cell "+this.x+":"+this.y+" a wall ? "+test);
		return test;
	}

	getWeapon(){
		let str=this.content;
		let stuff=str.split(' ');
		let reg=/weapon/g;
		for (let w in stuff) {
			let test=stuff[w];
			
			if (test.search(reg)===0) { return stuff[w];  }
		}

	}


}
