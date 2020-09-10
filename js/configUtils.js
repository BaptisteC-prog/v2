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

//CONFIG
export const sizeX=10;
export const sizeY=10;

//important pour le styleSheets
export const shiftX=0;
export const shiftY=0;
export const scale=0.9;