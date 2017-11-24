import AStar from './modules/astar'

const $ground = $('#ground');

const size = 9;

const ITEMS = [' ', 'img/aubergine.svg', 'img/beer.svg', 'img/carrot.svg', 'img/rice.svg', 'img/watermelon.svg', 'img/cup.svg'];

let firstRandom = true;

let SELECT_X = 0;
let SELECT_Y = 0;

let SELECT = false;

let MOVETO_X = 0;
let MOVETO_Y = 0;

let SELECT_ITEM = '';

let WORLD = [[]];
let PATHSTART = [];
let PATHEND = [];
let CURRENT_VALUE = 0;

createWorld();

$('body').on('click', 'td[data-content="busy"]', function(e){
	let $target = $(e.target).closest('td') || $(e.target);
	let x = $target.data('x');
	let y = $target.data('y');
	if(!$target.hasClass('selected')) {
		$ground.find('.selected').removeClass('selected');
		$target.addClass('selected');
		SELECT = true;
		PATHSTART = [x, y];
		CURRENT_VALUE = WORLD[PATHSTART[0]][PATHSTART[1]];
	} else {
		$target.removeClass('selected');
		SELECT = false;
		SELECT_ITEM = '';
		PATHSTART = [];
	}
});

$('body').on('click', 'td[data-content="free"]', function(e){
	let $target = $(e.target).closest('td') || $(e.target);
	let x = $target.data('x');
	let y = $target.data('y');
	if(!SELECT) {
		return false
	} else {
		PATHEND = [x, y];
		//let path = findPath(WORLD, PATHSTART, PATHEND);
		let findPath = AStar({
            pathStart: PATHSTART,
            pathEnd: PATHEND,
			world: WORLD
		});
		console.log(findPath)
		return
		for(let p = 0; p < path.length; p++) {
			drawWay(path[p][0], path[p][1]);
		}
		drawItem(x, y, CURRENT_VALUE)
		refreshWorld();
		checkWorld();
	}
});

function checkWorld() {
	let linesX = [];
	for(let i = 0; i < size; i++) {
		let res = WORLD[i].sort().reduce(function(prev, cur){
			prev[cur] = (prev[cur]||0)+1;
			return prev;
		}, {});
		console.log(WORLD, res)
	}
}

function refreshWorld() {
	WORLD[PATHSTART[0]][PATHSTART[1]] = 0;
	WORLD[PATHEND[0]][PATHEND[1]] = CURRENT_VALUE;
	SELECT = false;
	SELECT_ITEM = '';
	PATHSTART = [];
	PATHEND = [];
	CURRENT_VALUE = 0;
	$('.selected').removeClass('selected');

}

function createWorld(){
	console.log('Создание мира...');
	let tr = '';
	for(let x = 0; x < size; x++) {
		WORLD[x] = [];
		let td = '';
		for(let y=0; y < size; y++) {
			WORLD[x][y] = 0;
			td += `<td data-y=${y} data-x=${x} data-content="free">${x} ${y}</td>`;
		}
		tr += `<tr> ${td} </tr>`;
	}
	$ground.append(tr);
	createRandomBalls();
}

function createRandomBalls() {
	console.log('Расставляем шарики...');
	for(let i=0; i<3; i++) {
		let randomX = Math.floor(Math.random() * size);
		let randomY = Math.floor(Math.random() * size);
		let randomFigure = Math.floor(Math.random() * (ITEMS.length - 1)) + 1;
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
	$ground.find(`td[data-x="${x}"][data-y="${y}"]`).attr('data-content', 'busy').html(`<img src="${ITEMS[item]}"/>`)
}
function drawWay(x, y) {
	$ground.find(`td[data-x="${x}"][data-y="${y}"]`).html(`<img src="../img/path.png"/>`)
}


