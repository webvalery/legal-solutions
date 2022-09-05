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
let consulOpenPopupBtn = document.querySelectorAll('.home-info__call');
let consulClosePopupBtn = document.querySelector('.consultation-close-btn');
let btnConsulFeedbackCall = document.querySelector('.consultation__feedback-call-btn');

consulOpenPopupBtn.forEach((consulOpenPopupBtn) => {
  consulOpenPopupBtn.addEventListener('click', (event) => {
    event.preventDefault();
    consulOpenPopup();
  })
});


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
let backCallForm = document.getElementById('back-call-form');
let backCallModalBg = document.querySelector('.back-call-modal-bg');
let backCallModal = document.querySelector('.back-call-modal');
let openBtnBackCallModal = document.querySelector('.home__contacts-call');
let closeBtnBackCallModal = document.querySelector('.back-call-modal__btn-close');

openBtnBackCallModal.addEventListener('click', (event) => {
  event.preventDefault();
  openBackCallModal();
});

closeBtnBackCallModal.addEventListener('click', (event) => {
  event.preventDefault();
  closeBackCallModal();
});

document.addEventListener('click', (event) => {
  if (event.target === backCallModalBg) {
    closeBackCallModal();
  }
});

backCallForm.addEventListener('submit', (event) => {
  backCallFormSend(event);
});

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

// Отправка формы модального окна ОБРАТНЫЙ ЗВОНОК
async function backCallFormSend(event) {
  event.preventDefault();
  let error = formValidate(backCallForm);
  
  let formData = new FormData(backCallForm);
  let formDataObject = Object.fromEntries(formData.entries());
  let formDataObjectJSON = JSON.stringify(formDataObject); 
  console.log(formDataObjectJSON);
  if (error === 0) {
    backCallModal.classList.add('_sending');
    let response = await fetch('http://127.0.0.1:3001/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: formDataObjectJSON,
    });
    if(response.ok){
      let result = await response.json();
      console.log(result);
      backCallForm.reset();
      backCallModal.classList.remove('_sending');
      closeBackCallModal();
    } else {
      alert('Неизвестная ошибка. Форма не отправлена. Попробуйте снова');
      backCallModal.classList.remove('_sending');
    }
  } else {
    alert('Заполните все обязательные поля');
  }
}

// Валидация форм
function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll('._req');

  for (let i = 0; i < formReq.length; i++) {
    let input = formReq[i];
    formRemoveError(input);

    if (input.classList.contains('_number')) {
      if (!testFormPhone(+input.value)) {
        formAddError(input)
        error++;
      }
    } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
      formAddError(input);
      error++;;
    } else {
      if(input.value === '') {
        formAddError(input)
        error++;
      }
    }
  }
  return error;
}
function formAddError(input) {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
}

function formRemoveError(input) {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
}

function testFormPhone(phone) {
  let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return regex.test(phone);
}

