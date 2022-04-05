const editButton = document.querySelector('.profile__edit-button');
const editButtonSave = document.querySelector('.popup__button');
const addButton = document.querySelector('.profile__add-button');
const addButtonSave = document.querySelector('#popup__button_save');

const popupOpened = document.querySelector('.popup')
const popupClosed = document.querySelector('.popup__closed')

const popupAddImage = document.getElementById('popup-add');
const popupAddImageClosed = document.getElementById('popup__close')


editButton.addEventListener('click', function() {
    popupOpened.classList.add('popup_opened')
}); 

popupClosed.addEventListener('click', function() {
    popupOpened.classList.remove('popup_opened');
}); 


addButton.addEventListener('click', function() {
    popupAddImage.classList.add('popup_opened')
})

popupAddImageClosed.addEventListener('click', function() {
    popupAddImage.classList.remove('popup_opened')
}); 

// editButtonSave.addEventListener('click', function () {
//     const nameInput = document.querySelector('#input-popup-title');
//     const jobInput = document.querySelector('#input-popup-subtitle');
  
//     console.log(nameInput.value)
//   });



// Находим форму в DOM
const formElement = document.querySelector('.popup__form')
// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM

const nameInput = document.querySelector('#input-popup-title');
const jobInput = document.querySelector('#input-popup-subtitle');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
// Эта строчка отменяет стандартную отправку формы.

let profileName = document.querySelector('.profile__title')
let jobName = document.querySelector('.profile__subtitle')

profileName.textContent = nameInput.value;
jobName.textContent = jobInput.value;

popupOpened.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:

// он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler);