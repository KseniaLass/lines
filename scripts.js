const $ground = $('#ground');

const size = 9;
const line = [];

const items = ['aubergine.svg', 'beer.svg', 'carrot.svg', 'rice.svg', 'watermelon.svg'];

let firstRandom = true;

$ground.append(createCells());

function createCells() {
  let tr = '';
  for(let i=1; i < size+1; i++) {
    let td = '';
    for(let j=1; j < size+1; j++) {
      td += `<td data-y=${i} data-x=${j}>`;
    }
    tr += `<tr> ${td} </tr>`;
  }
  return tr
}

function setRandomItems() {
  if(firstRandom) {
    let i = 0;
    while(i < 3) {
      let x = generateRandom(1, 9);
      let y = generateRandom(1, 9);
      let item = generateRandom(0, items.length);

      $ground.find(`td[data-x="${x}"][data-y="${y}"]`).append(`<img src="img/${items[item]}"/>`)

      i++;
    }
  }
}

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max-min))+min
}
console.log(generateRandom(0, 9))

createCells();
setRandomItems();