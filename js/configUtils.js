//fonctions utiles 
//entier avec probabilité	
export function rint(n) {
  let wat=n;
  let num=n-parseInt(n);
if (Math.random()<num) { wat++; }
  return parseInt(wat); 
}
  
export  function int(n) {
  return Math.floor(n);
}
  
export function rnd(p=1){
  return	Math.pow(Math.random(),p);
}


export function max(a,b) {
  return ( a > b  ? a :b  );
}

//CONFIG
export const sizeX=10;
export const sizeY=10;

//important pour le styleSheets
export let scale=0.8 //0.9
export let shiftX=-10;//0
export let shiftY=-10;//0



/*

0.9>>>-5
0.75>>-12
0.5>>>-25
0.3>>>-35
0.25>>>-38

(0.75-1)*50


shift (1-scale)*50
scale 1 >>> shift 0   marge 108 
scale 0.75            marge 83
scale 0.5 >>> shift 50  marge 58
scale 0.25>>> shift -50
*/
