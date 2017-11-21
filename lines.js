(function(){
  let canvas = null;
  let ctx = null;
  let spritesheet = null;
  let spritesheetLoaded = false;
  let world = [];
  let worldWidth = 9;
  let worldHeight = 9;

  let figureCount = 9;

  let tileWidth = 50;
  let tileHeight = 50;

  let pathStart = [worldWidth, worldHeight];
  let pathEnd = [0,0];
  let currentPath = [];

  $(document).ready(function(){
    console.log('Cтраница загружена.');
    canvas = $('#gameCanvas')[0];
    canvas.width = worldWidth * tileWidth;
    canvas.height = worldHeight * tileHeight;
    ctx = canvas.getContext('2d');
    spritesheet = new Image();
    spritesheet.src = 'img/spritesheet.png';
    spritesheet.onload = loaded;
  });
  $('#gameCanvas').on('click', function(e){
		canvasClick(e);
  });

  function loaded(){
    console.log("Картинка загружена");
    spritesheetLoaded = true;
    createWorld();
  }

  function createWorld(){
    console.log('Создание мира...');
    for(let x = 0; x < worldWidth; x++) {
      world[x] = [];
      for(let y=0; y < worldHeight; y++) {
        world[x][y] = 0;
      }
    }
    createRandomBalls();
  }

  function createRandomBalls() {
    console.log('Расставляем шарики...');
    for(let i=0; i<3; i++) {
      let randomX = Math.floor(Math.random() * worldWidth);
      let randomY = Math.floor(Math.random() * worldHeight);
      let randomFigure = Math.floor(Math.random() * (figureCount+1 - 1)) + 1;
      if(world[randomX][randomY] === 0) {
        world[randomX][randomY] = randomFigure
      } else {
        i--;
        break;
      }
    }
    redraw();
  }

  function redraw() {

    if(!spritesheetLoaded) return;

    console.log('Рисуем мир ...');


    let spriteNum = 0;

    ctx.fillStyle='#000000';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for(let x = 0; x < worldWidth; x++) {
      for(let y = 0; y < worldHeight; y++) {
        spriteNum = world[x][y];
        ctx.drawImage(spritesheet,
          spriteNum*tileWidth, 0,
          tileWidth, tileHeight,
          x*tileWidth, y*tileHeight,
          tileWidth, tileHeight);
      }
    }
  }

	function canvasClick(e)
	{
		let x;
		let y;

		// grab html page coords
		if (e.pageX != undefined && e.pageY != undefined)
		{
			x = e.pageX;
			y = e.pageY;
		}
		else
		{
			x = e.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}

		// make them relative to the canvas only
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		// return tile x,y that we clicked
		let cell =
			[
				Math.floor(x/tileWidth),
				Math.floor(y/tileHeight)
			];

		// now we know while tile we clicked
		console.log('we clicked tile '+cell[0]+','+cell[1]);

		pathStart = pathEnd;
		pathEnd = cell;

		// calculate path
		//currentPath = findPath(world,pathStart,pathEnd);
		//redraw();
	}



})();