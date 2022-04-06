const editButton = document.querySelector('.profile__edit-button'); //Кнопка редактировать профиль
const editButtonSave = document.querySelector('.popup__button'); //Кнопка сохранить изменения в профиле
const addButton = document.querySelector('.profile__add-button');//Кнопка добавить новое место
const addButtonSave = document.querySelector('#popup__button_save');//Кнопка сохранить новое место

const popupOpened = document.querySelector('.popup') //Попап 
const popupClosed = document.querySelector('.popup__closed') //Кнопка закрыть попап

const popupAddImage = document.getElementById('popup-add');//Второй поп с добавлением нового места
const popupAddImageClosed = document.getElementById('popup__close') //Кнопка Закрыть попап

const profileName = document.querySelector('.profile__title')
const jobName = document.querySelector('.profile__subtitle')

//Открываем попап
function openPopup() {
    popupOpened.classList.add('popup_opened')
}

function closePopup() {
    popupOpened.classList.remove('popup_opened')
}

editButton.addEventListener('click', openPopup);
popupClosed.addEventListener('click', closePopup);

//Открываем попап новое место
addButton.addEventListener('click', function() {
    popupAddImage.classList.add('popup_opened')
})

//Закрываем попап
popupAddImageClosed.addEventListener('click', function() {
    popupAddImage.classList.remove('popup_opened')
}); 

popupOpened.addEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
        closePopup()
    
    }
})

popupAddImage.addEventListener('click', function(event){
    if(event.target === event.currentTarget) {
        popupAddImage.classList.remove('popup_opened')
    
    }
})



// Находим форму в DOM
const formElement = document.querySelector('.popup__form')

// Находим поля формы в DOM
const nameInput = document.querySelector('#input-popup-title');
const jobInput = document.querySelector('#input-popup-subtitle');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
// Эта строчка отменяет стандартную отправку формы.

profileName.textContent = nameInput.value;
jobName.textContent = jobInput.value;

popupOpened.classList.remove('popup_opened');
}

//Заполненная форрма в профиле
function fillProfilePopup(){
    popupOpened.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = jobName.textContent;
}


formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click',fillProfilePopup);