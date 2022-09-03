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

// Модальное окно КОНСУЛЬТАЦИЯ
let consulPopupBg = document.querySelector('.consultation-popup-bg');
let consulPopup = document.querySelector('.consultation-popup');
let consulOpenPopupBtn = document.querySelector('.home-info__call');
let consulClosePopupBtn = document.querySelector('.consultation-close-btn');
let btnConsulFeedbackCall = document.querySelector('.consultation__feedback-call-btn');

consulOpenPopupBtn.addEventListener('click', (event) => {
  event.preventDefault();
  consulOpenPopup();
})

consulClosePopupBtn.addEventListener('click', (event) => {
  event.preventDefault();
  consulClosePopup();
})

document.addEventListener('click', (event) => {
  if (event.target === consulPopupBg) {
    consulClosePopup();
  }
})

function consulOpenPopup() {
  consulPopupBg.classList.add('active');
  consulPopup.classList.add('active');
  consulPopup.style.transition = '0s';
  consulPopupAdaptive();
}

function consulClosePopup() {
  consulPopupBg.classList.remove('active');
  consulPopup.classList.remove('active');
  consulPopup.style.transition = '1s';
}

btnConsulFeedbackCall.addEventListener('click', (event) => {
  consulClosePopup();
  openBackCallModal();
});
// Адаптив модального окна консультации
let screenHeight = window.screen.height;
let consulPopupHeight = consulPopup.offsetHeight;
consulPopupAdaptive();
window.addEventListener('resize', (event) => {
  consulPopupHeight = consulPopup.offsetHeight;
  screenHeight = window.screen.height;
  consulPopupAdaptive();
})

function consulPopupAdaptive() {
  if (consulPopup.classList.contains('active') & screenHeight < consulPopupHeight) {
    let documentHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    consulPopupBg.style.height = `${documentHeight}px`;
    consulPopupBg.style.position = 'absolute';
    consulPopup.style.transform = 'translate(-50%, -70%) scale(1)';
    window.scrollTo(0, 0);
  }
  if (window.screen.width <= 811 && window.screen.width >= 670) {
    consulPopup.style.maxWidth = `661px`;
  }
  if (window.screen.width <= 661) {
    consulPopup.style.maxWidth = `350px`;
  }
}

// Модальное окно ОБРАТНЫЙ ЗВОНОК
let backCallModalBg = document.querySelector('.back-call-modal-bg');
let backCallModal = document.querySelector('.back-call-modal');
let openBtnBackCallModal = document.querySelector('.home__contacts-call');
let closeBtnBackCallModal = document.querySelector('.back-call-modal__btn-close');

openBtnBackCallModal.addEventListener('click', (event) => {
  event.preventDefault();
  openBackCallModal();
})

closeBtnBackCallModal.addEventListener('click', (event) => {
  event.preventDefault();
  closeBackCallModal();
})

document.addEventListener('click', (event) => {
  if (event.target === backCallModalBg) {
    closeBackCallModal();
  }
})

function openBackCallModal() {
  backCallModalBg.classList.add('active');
  backCallModal.classList.add('active');
  backCallModalBg.style.transition = '0s';
}

function closeBackCallModal() {
  backCallModalBg.classList.remove('active');
  backCallModal.classList.remove('active');
  backCallModalBg.style.transition = '1s';
}

