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

$ground.append(createCells());


// Создаем поле
function createCells() {
  let tr = '';
  for(let i=1; i < size+1; i++) {
    let td = '';
    for(let j=1; j < size+1; j++) {
      td += `<td data-y=${i} data-x=${j} data-busy="false"></td>`;
    }
    tr += `<tr> ${td} </tr>`;
  }
  return tr
}

// Заполняем случайные ячейки
function setRandomItems() {
  if(firstRandom) {
    let i = 0;
    while(i < 3) {
      let coord = generateRandomCoord();
      let item = generateRandomItem();

      drawItem(coord.x, coord.y, item)

      i++;
    }
  }
}

// Рисуем предмет по координатам
function drawItem(x, y, item) {
  $ground.find(`td[data-x="${x}"][data-y="${y}"]`).attr('data-busy', true).append(`<img src="${item}"/>`)
}

function removeItem(x, y) {
  $ground.find(`td[data-x="${x}"][data-y="${y}"]`).attr('data-busy', false).empty();
}

// Генерация случайных координат
function generateRandomCoord() {
  let coord = {
    x: Math.floor(Math.random() * (size - 1)) + 1,
    y: Math.floor(Math.random() * (size - 1)) + 1
  };
  if(checkBusyCell(coord)) {

    console.log(coord)
    return coord;
  } else {
    generateRandomCoord();
  }
}

// Генерация случайного предмета
function generateRandomItem() {
  return items[Math.floor(Math.random() * (items.length - 1)) + 1]
}

// Проверка занята ли ячейка
function checkBusyCell(coord) {
  return $ground.find(`td[data-x="${coord.x}"][data-y="${coord.y}"]`).is(':empty') ? coord : false
}

// Перемещение
function moveTo(x, y) {
  let item = $('.selected').find('img');

  let select = [$('.selected').data('x'), $('.selected').data('y')];
  let target = [x, y];

  let Way = createWayCoord(select[0], target[0], select[1], target[1]);

  Way.forEach(function(item,i){
    console.log(item)
    drawItem(item.x, item.y, SELECT_ITEM)
  });

  // $(target).attr('data-busy', true).append(`<img src="${SELECT_ITEM}"/>`);
  // $('.selected').removeClass('selected').empty();

  checkLine(x,y)
}

function createWayCoord(xStart, xEnd, yStart, yEnd) {
  var result = [];
  var x = xStart;
  var y = yStart;
  //if (xStart < xEnd) {
  while(x !== xEnd) {
    x = x + 1;

    console.log(`ceil x: ${x}, y: ${y} is ${checkBusyCell({x: x, y: y})}`)

    if(!checkBusyCell({x: x, y: y})) {
      x = x - 1;
      y = y + 1;
    } else {
      result.push({x: x, y: y})
    }


    if(x === size) {
      x = 0;
    }

  }
  while(y !== yEnd) {
    y = y + 1;

    console.log(`ceil x: ${x}, y: ${y} is ${checkBusyCell({x: x, y: y})}`)

    if(!checkBusyCell({x: x, y: y})) {
      x = x + 1;
      y = y - 1;
    } else {
      result.push({x: x, y: y})
    }

    if(y === size) {
      y = 0;
    }

  }
  //} else if(xStart > xEnd) {
  //   while(xStart !== xEnd && xStart < size) {
  //     xStart = xStart - 1;
  //     result.push({x: xStart, y: yStart})
  //   }
  //}
  // if(yStart < yEnd) {
  //   while(yStart !== yEnd && yStart > 0) {
  //     yStart = yStart + 1;
  //     result.push({x: xStart, y: yStart})
  //   }
  // } else if(yStart > yEnd) {
  //   while(yStart !== yEnd && yStart < size) {
  //     yStart = yStart - 1;
  //     result.push({x: xStart, y: yStart})
  //   }
  // }

  return result
}


function checkLine(x,y) {

}


// Инициализация
//createCells();
setRandomItems();

$('body').on('click', 'td[data-busy="true"]', function(e){
  let $target = $(e.target).closest('td') || $(e.target);
  if(!$target.hasClass('selected')) {
    $ground.find('.selected').removeClass('selected');
    $target.addClass('selected');
    SELECT = true;
    SELECT_ITEM = $target.find('img').attr('src');
  } else {
    $target.removeClass('selected');
    SELECT = false;
    SELECT_ITEM = '';
  }
});

$('body').on('click', 'td[data-busy="false"]', function(e){
  if(!SELECT) {
    return false
  }

  moveTo($(e.target).data('x'), $(e.target).data('y'), $(e.target));
});

