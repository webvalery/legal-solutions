const HOST = 'http://127.0.0.1:3001';


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
let consulOpenPopupBtn = document.querySelectorAll('.home-info__call');
let consulPopupBg = document.querySelector('.consultation-popup-bg');
let consulPopup = consulPopupBg.querySelector('.consultation-popup');
let consulClosePopupBtn = consulPopupBg.querySelector('.consultation-close-btn');
let btnConsulFeedbackCall = consulPopupBg.querySelector('.consultation__feedback-call-btn');

if (consulPopup) {
  consulOpenPopupBtn.forEach(consulOpenPopupBtn => {
    consulOpenPopupBtn.addEventListener('click', (event) => {
      event.preventDefault();
      consulOpenPopup();
    });
  });

  consulClosePopupBtn.addEventListener('click', (event) => {
    event.preventDefault();
    consulClosePopup();
  });

  btnConsulFeedbackCall.addEventListener('click', (event) => {
    consulClosePopup();
    openBackCallModal();
  });

  document.addEventListener('click', (event) => {
    if (event.target === consulPopupBg) {
      consulClosePopup();
    }
  })
}

function consulOpenPopup() {
  consulPopupAdaptive();
  let screenHeight = document.documentElement.clientHeight;
  let modalHeight = consulPopup.offsetHeight;

  if (screenHeight < modalHeight) {
    document.body.classList.add('active');
    consulPopupBg.style.overflow = 'auto';
    consulPopup.classList.add('active-adaptive');
  } else {
    consulPopup.classList.add('active');
  }
  consulPopupBg.classList.add('active');
}

function consulClosePopup() {
  let screenHeight = document.documentElement.clientHeight;
  let modalHeight = consulPopup.offsetHeight;
  if (screenHeight < modalHeight) {
    document.body.classList.remove('active');
    consulPopupBg.style.overflow = 'none';
    consulPopup.classList.remove('active-adaptive');
  }
  consulPopupBg.classList.remove('active');
  consulPopup.classList.remove('active');
}

function consulPopupAdaptive() {
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
    let response = await fetch(`${HOST}/backcall`, {
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
  let formReq = form.querySelectorAll('._req');

  for (let i = 0; i < formReq.length; i++) {
    let input = formReq[i];
    formRemoveError(input);

    if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
      formAddError(input);
      error++;;
    } else {
      if (input.value === '') {
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


// MODAL BACK CONNECTION
let modalBackConnectionBg = document.querySelector('.back-connection-modal-bg');
let modalBackConnection = document.querySelector('.back-connection-modal');
let openBackConnectionBtn = document.querySelector('.consultation__feedback-text-link');
let closeBackConnectionBtn = document.querySelector('.back-connection__head-close');

if (modalBackConnection) {
  let modalBackConnectionForm = document.querySelector('.back-connection__form');
  openBackConnectionBtn.addEventListener('click', (e) => {
    openBackConnection(e);
  });

  closeBackConnectionBtn.addEventListener('click', (e) => {
    closeBackConnection(e);
  })

  document.addEventListener('click', (event) => {
    if (event.target === modalBackConnectionBg) {
      closeBackConnection();
    }
  });

  modalBackConnectionForm.addEventListener('submit', (e) => {
    modalBackConnectionSendBtn(e, modalBackConnectionForm);
  })
}

function openBackConnection(e) {
  consulClosePopup();
  let screenHeight = document.documentElement.clientHeight;
  let modalHeight = modalBackConnection.offsetHeight;
  if (screenHeight < modalHeight) {
    document.body.classList.add('active');
    modalBackConnectionBg.style.overflow = 'auto';
    modalBackConnection.classList.add('active-adaptive')
  } else {
    modalBackConnection.classList.add('active');
  }
  modalBackConnectionBg.classList.add('active');
}
function closeBackConnection(e) {
  let screenHeight = document.documentElement.clientHeight;
  let modalHeight = modalBackConnection.offsetHeight;
  if (screenHeight < modalHeight) {
    document.body.classList.remove('active');
    modalBackConnectionBg.style.overflow = 'none';
    modalBackConnection.classList.remove('active-adaptive')
  }
  modalBackConnectionBg.classList.remove('active');
  modalBackConnection.classList.remove('active');
}
// Отправка формы MODAL BACK CONNECTION

async function modalBackConnectionSendBtn(e, form) {
  e.preventDefault();

  let error = formValidate(form);
  let formData = new FormData(form);
  let formDataObject = Object.fromEntries(formData.entries());
  let formDataObjectJSON = JSON.stringify(formDataObject); 
  console.log(formDataObjectJSON);

  if (error === 0) {
    form.classList.add('_sending');
    let response = await fetch(`${HOST}/backconnection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: formDataObjectJSON,
    });
    if (response.ok) {
      let result = await response.json();
      console.log(result);
      form.reset();
      form.classList.remove('_sending');
      closeBackConnection();
    } else {
      alert('Неизвестная ошибка. Форма не отправлена. Попробуйте снова');
      form.classList.remove('_sending');
    }
  } else {
    alert('Заполните все обязательные поля')
  }
}
