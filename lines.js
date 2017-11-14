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
    canvas.click(canvasClick, false);
    ctx = canvas.getContext('2d');
    spritesheet = new Image();
    spritesheet.src = 'img/spritesheet.png';
    spritesheet.onload = loaded;
  });

  function canvasClick(){}

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
      let randomX = Math.floor(Math.random() * (worldWidth - 0)) + 0;
      let randomY = Math.floor(Math.random() * (worldHeight - 0)) + 0;
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



})();