const $ground = $('#ground');

const size = 9;

const ITEMS = [' ', 'img/path.png', 'img/aubergine.svg', 'img/beer.svg', 'img/carrot.svg', 'img/rice.svg', 'img/watermelon.svg', 'img/cup.svg'];

let firstRandom = true;

let SELECT_X = 0;
let SELECT_Y = 0;

let SELECT = false;

let MOVETO_X = 0;
let MOVETO_Y = 0;

let SELECT_ITEM = '';

let WORLD = [[]];

createWorld();

function createWorld(){
	console.log('Создание мира...');
	let tr = '';
	for(let x = 0; x < size; x++) {
		WORLD[x] = [];
		let td = '';
		for(let y=0; y < size; y++) {
			WORLD[x][y] = 0;
			td += `<td data-y=${y} data-x=${x} data-content="free">${y} ${y}</td>`;
		}
		tr += `<tr> ${td} </tr>`;
	}
	$ground.append(tr);
	createRandomBalls();
	console.log(WORLD)
}

function createRandomBalls() {
	console.log('Расставляем шарики...');
	for(let i=0; i<3; i++) {
		let randomX = Math.floor(Math.random() * size);
		let randomY = Math.floor(Math.random() * size);
		let randomFigure = Math.floor(Math.random() * (ITEMS.length+1 - 3)) + 1;
		if(WORLD[randomX][randomY] === 0) {
			WORLD[randomX][randomY] = randomFigure;
			drawItem(randomX, randomY, randomFigure);
		} else {
			i--;
			break;
		}
	}
}
function drawItem(x, y, item) {
	$ground.find(`td[data-x="${x}"][data-y="${y}"]`).attr('data-content', 'busy').append(`<img src="${ITEMS[item]}"/>`)
}

