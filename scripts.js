const $ground = $('#ground');

const size = 9;

const items = ['aubergine.svg', 'beer.svg', 'carrot.svg', 'rice.svg', 'watermelon.svg', 'cup.svg'];

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
      td += `<td data-y=${i} data-x=${j} data-busy="false">`;
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

      $ground.find(`td[data-x="${coord.x}"][data-y="${coord.y}"]`).attr('data-busy', true).append(`<img src="img/${item}"/>`)

      i++;
    }
  }
}

// Генерация случайных координат
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

// Генерация случайного предмета
function generateRandomItem() {
  return items[Math.floor(Math.random() * (items.length - 1)) + 1]
}

// Проверка занята ли ячейка
function checkBusyCell(coord) {
  return $ground.find(`td[data-x="${coord.x}"][data-y="${coord.y}"]`).is(':empty') ? true : false
}

// Перемещение
function moveTo(x, y, target) {
  let item = $('.selected').find('img');

  let selectCoord = [$('.selected').data('x'), $('.selected').data('y')];
  let movetoCoord = [x, y];

  $(target).append(`<img src="${SELECT_ITEM}"/>`);
  $('.selected').removeClass('selected').empty();

  console.log(target)
}

// Получить координаты выбранного предмета
function getItemCoord(e) {

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

