const $ground = $('#ground');

const size = 9;
const line = [];

const items = ['aubergine.svg', 'beer.svg', 'carrot.svg', 'rice.svg', 'watermelon.svg', 'cup.svg'];

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
      let coord = generateRandomCoord();
      let item = generateRandomItem();

      $ground.find(`td[data-x="${coord.x}"][data-y="${coord.y}"]`).append(`<img src="img/${item}"/>`)

      i++;
    }
  }
}

function generateRandomCoord() {
  let coord = {
    x: Math.floor(Math.random() * (size - 1)) + 1,
    y: Math.floor(Math.random() * (size - 1)) + 1
  };
  if(checkBusyCell(coord)) {
    return coord;
  } else {
    generateRandomCoord();
  }
}
function generateRandomItem() {
  return items[Math.floor(Math.random() * (items.length - 1)) + 1]
}
function checkBusyCell(coord) {
  return $ground.find(`td[data-x="${coord.x}"][data-y="${coord.y}"]`).is(':empty') ? true : false
}

createCells();
setRandomItems();