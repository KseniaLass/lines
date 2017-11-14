(function(){
  var canvas = null;
  var ctx = null;
  var spritesheet = null;
  var spritesheetLoaded = false;
  var world = [];
  var worldWidth = 9;
  var worldHeight = 9;

  var tileWidth = 50;
  var tileHeight = 50;

  var pathStart = [worldWidth, worldHeight];
  var pathEnd = [0,0];
  var currentPath = [];

  $('document').ready(function(e){
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

  function loaded(){}
})();