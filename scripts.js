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
		let path = findPath(WORLD, PATHSTART, PATHEND);
		for(let p = 0; p < path.length; p++) {
			drawWay(path[p][0], path[p][1]);
		}
		drawItem(x, y, CURRENT_VALUE)
		refreshWorld();
		checkLine();
	}
});

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
	$ground.find(`td[data-x="${x}"][data-y="${y}"]`).html(`<img src="img/path.png"/>`)
}

function findPath(world, pathStart, pathEnd)
{
	// shortcuts for speed
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	// the world data are integers:
	// anything higher than this number is considered blocked
	// this is handy is you use numbered sprites, more than one
	// of which is walkable road, grass, mud, etc
	var maxWalkableTileNum = 0;

	// keep track of the world dimensions
	// Note that this A-star implementation expects the world array to be square:
	// it must have equal height and width. If your game world is rectangular,
	// just fill the array with dummy values to pad the empty space.
	var worldWidth = world[0].length;
	var worldHeight = world.length;
	var worldSize =	worldWidth * worldHeight;

	// which heuristic should we use?
	// default: no diagonals (Manhattan)
	var distanceFunction = ManhattanDistance;
	var findNeighbours = function(){}; // empty

	/*

	// alternate heuristics, depending on your game:

	// diagonals allowed but no sqeezing through cracks:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighbours;

	// diagonals and squeezing through cracks allowed:
	var distanceFunction = DiagonalDistance;
	var findNeighbours = DiagonalNeighboursFree;

	// euclidean but no squeezing through cracks:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;

	// euclidean and squeezing through cracks allowed:
	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighboursFree;

	*/

	// distanceFunction functions
	// these return how far away a point is to another

	function ManhattanDistance(Point, Goal)
	{	// linear movement - no diagonals - just cardinal directions (NSEW)
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}

	function DiagonalDistance(Point, Goal)
	{	// diagonal movement - assumes diag dist is 1, same as cardinals
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
	}

	function EuclideanDistance(Point, Goal)
	{	// diagonals are considered a little farther than cardinal directions
		// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
		// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}

	// Neighbours functions, used by findNeighbours function
	// to locate adjacent available cells that aren't blocked

	// Returns every available North, South, East or West
	// cell that is empty. No diagonals,
	// unless distanceFunction function is not Manhattan
	function Neighbours(x, y)
	{
		var	N = y - 1,
			S = y + 1,
			E = x + 1,
			W = x - 1,
			myN = N > -1 && canWalkHere(x, N),
			myS = S < worldHeight && canWalkHere(x, S),
			myE = E < worldWidth && canWalkHere(E, y),
			myW = W > -1 && canWalkHere(W, y),
			result = [];
		if(myN)
			result.push({x:x, y:N});
		if(myE)
			result.push({x:E, y:y});
		if(myS)
			result.push({x:x, y:S});
		if(myW)
			result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	// returns boolean value (world cell is available and open)
	function canWalkHere(x, y)
	{
		return ((world[x] != null) &&
			(world[x][y] != null) &&
			(world[x][y] <= maxWalkableTileNum));
	};

	// Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * worldWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
	}

	// Path function, executes AStar algorithm operations
	function calculatePath()
	{
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	// actually calculate the a-star path!
	// this returns an array of coordinates
	// that is empty if no path is possible
	return calculatePath();

} // end of findPath() function

