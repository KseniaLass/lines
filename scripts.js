const $ground = $('#ground');

const size = 9;

const items = ['img/aubergine.svg', 'img/beer.svg', 'img/carrot.svg', 'img/rice.svg', 'img/watermelon.svg', 'img/cup.svg'];

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
	for(let x = 0; x < size; x++) {
		WORLD[x] = [];
		for(let y=0; y < size; y++) {
			WORLD[x][y] = 0;
		}
	}
	createRandomBalls();
	console.log(WORLD)
}

function createRandomBalls() {
	console.log('Расставляем шарики...');
	for(let i=0; i<3; i++) {
		let randomX = Math.floor(Math.random() * size);
		let randomY = Math.floor(Math.random() * size);
		let randomFigure = Math.floor(Math.random() * (items.length+1 - 1)) + 1;
		if(WORLD[randomX][randomY] === 0) {
			WORLD[randomX][randomY] = randomFigure
		} else {
			i--;
			break;
		}
	}
	//redraw();
}

