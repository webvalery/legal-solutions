// Смена контактного телефона в зависимости от выбранного города
let btnCitySpb = document.querySelector('.home__contacts-city');
let btnCityMsk = document.querySelector('.home__contacts-city2');
let inputNumberPhone = document.querySelector('.home__contacts-phone');

btnCitySpb.addEventListener('click', (event) => {
  event.preventDefault();
  handlerCitySpb(event);
});
function handlerCitySpb(event) {
  btnCitySpb.classList.add('home__city-btn__active');
  btnCityMsk.classList.remove('home__city-btn__active');
  inputNumberPhone.innerHTML = '+7 (921) 789 48 44';
}

btnCityMsk.addEventListener('click', (event) => {
  event.preventDefault();
  handlerCityMsk(event);
});
function handlerCityMsk(event) {
  btnCitySpb.classList.remove('home__city-btn__active');
  btnCityMsk.classList.add('home__city-btn__active');
  inputNumberPhone.innerHTML = '+7 (999) 999 99 99';
}
document.addEventListener('DOMContentLoaded', (event) => {
  handlerCitySpb();
})

// Модальное окно Консультации
let consulPopupBg = document.querySelector('.consultation-popup-bg');
let consulPopup = document.querySelector('.consultation-popup');
let consulOpenPopupBtn = document.querySelector('.home-info__call');
let consulClosePopupBtn = document.querySelector('.consultation-close-btn');

consulOpenPopupBtn.addEventListener('click', (event) => {
  event.preventDefault();
  consulPopupBg.classList.add('active');
  consulPopup.classList.add('active');
})
consulClosePopupBtn.addEventListener('click', (event) => {
  event.preventDefault();
  consulPopupBg.classList.remove('active');
  consulPopup.classList.remove('active');
})
document.addEventListener('click', (event) => {
  if (event.target === consulPopupBg) {
    consulPopupBg.classList.remove('active');
    consulPopup.classList.remove('active');
  }
})