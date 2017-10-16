/****** СТРОКА ПОИСКА ВРАЧЕЙ ******/
let search = document.querySelector('.doctors-nav__search-input');
let searchClearButton = document.querySelector('.doctors-nav__search-clear');

search.addEventListener('keypress', function() {
  searchClearButton.style.display = 'block';
});

search.addEventListener('focus', function() {
  this.classList.add('doctors-nav__search-input_open');

  if (this.value !== '') {
    this.addEventListener('transitionend', showClearButton);
  }
});

let doctorsNav = document.querySelector('.doctors-nav');
doctorsNav.addEventListener('click', closeSearch);

/**
 *closeSearch() уменьшает ширину input-а ("закрывает его"),
 *когда пользователь кликает вне этого элемента
 */
function closeSearch(e) {
  let searchContainer = document.querySelector('.doctors-nav__search');

  if (isMouseOver(searchContainer, e) === false) {
    search.classList.remove('doctors-nav__search-input_open');
    searchClearButton.style.display = 'none';
    search.removeEventListener('transitionend', showClearButton);
  }
}

function isMouseOver(elem, e) {
  let elemCoordinates = elem.getBoundingClientRect();

  if (
    (e.clientX >= elemCoordinates.left) &&
    (e.clientX <= elemCoordinates.right) &&
    (e.clientY >= elemCoordinates.top) &&
    (e.clientY <= elemCoordinates.bottom)
  ) {
    return true;
  } 

  return false;
}

function showClearButton() {
  searchClearButton.style.display = 'block';
}


/****** КНОПКИ С ВЫПАДАЮЩИМ СПИСКОМ ДЛЯ ФИЛЬТРАЦИИ ВРАЧЕЙ ******/
let dropdown = document.querySelectorAll('.doctors-nav__dropdown');

dropdown[0].addEventListener('click', function() {
  openDropDownMenu(this);
});

dropdown[1].addEventListener('click', function() {
  openDropDownMenu(this);
});

dropdown[2].addEventListener('click', function() {
  openDropDownMenu(this);
});

function openDropDownMenu(dropdown) {
  dropdown.classList.toggle('doctors-nav__dropdown_open');
  changeBorderRadius(dropdown);
}

function changeBorderRadius(dropdown) {
  let dropdownList = dropdown.querySelector('.doctors-nav__dropdown-list');
  let dropdownBtn = dropdown.querySelector('.doctors-nav__dropdown-btn');

  if (dropdownList.offsetWidth === dropdownBtn.offsetWidth) {
    dropdownList.style.borderTopRightRadius = '0';
  } else {
    dropdownList.style.borderTopRightRadius = '1rem';
  }
}


/****** ВКЛАДКИ НАД РЕЗУЛЬТАТАМИ ПОИСКА ПО ВРАЧАМ ******/
let backgroundElem = document.createElement('div');

backgroundElem.classList.add('search-result__title_background');
document.querySelector('.search-result__header').appendChild(backgroundElem);

let doctorsTabs = document.querySelectorAll('.search-result__title');

doctorsTabs[0].addEventListener('click', function(e) {
  e.preventDefault();
  makeTabActive(this);
  doctorsTabs[1].classList.remove('search-result__title_active');
});

doctorsTabs[1].addEventListener('click', function(e) {
  e.preventDefault();
  makeTabActive(this);
  doctorsTabs[0].classList.remove('search-result__title_active');
});

function makeTabActive(elem) {
  elem.classList.add('search-result__title_active');

  let header = document.querySelector('.search-result__header');
  let headerLeft = header.getBoundingClientRect().left;
  let elemLeft = elem.getBoundingClientRect().left;

  backgroundElem.style.left = elemLeft - headerLeft + 'px';
  backgroundElem.style.width = elem.offsetWidth + 'px';
}


/****** КНОПКИ "ДОБАВИТЬ В ИЗБРАННЫЕ" ******/
let favouritesBtn = document.querySelectorAll('.specialist__favourites');

favouritesBtn[0].addEventListener('click', function() {
  addToFavourites(this);
});

favouritesBtn[1].addEventListener('click', function() {
  addToFavourites(this);
});

function addToFavourites(node) {
  let favouritesHeart = node.querySelector('.heart-icon');
  let favouritesText = node.querySelector('.specialist__favourites-text');

  node.classList.toggle('specialist__favourites_active');
  changeText(node, favouritesText);
  animate(favouritesText, 'fadeIn');
  animate(favouritesHeart, 'increase');
}

function changeText(mainNode, textNode) {
  if (mainNode.classList.contains('specialist__favourites_active')) {
    textNode.textContent = 'Убрать из избранных';
  } else {
    textNode.textContent = 'Добавить в избранные';
  }
}

function animate(node, animation) {
  node.classList.add(animation);

  node.addEventListener('animationend', function() {
    this.classList.remove(animation);
  });
}
