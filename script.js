const editButton = document.querySelector(".profile__edit-button"); //Кнопка редактировать профиль
const editButtonSave = document.querySelector(".popup__button"); //Кнопка сохранить изменения в профиле
const addButton = document.querySelector(".profile__add-button"); //Кнопка добавить новое место
const addButtonSave = document.querySelector("#popup__button_save"); //Кнопка сохранить новое место

const popupOpened = document.querySelector(".popup"); //Попап
const popupClosed = document.querySelector(".popup__closed"); //Кнопка закрыть попап

const popupAddImage = document.getElementById("popup-add"); //Второй поп с добавлением нового места
const popupAddImageClosed = document.getElementById("popup__close"); //Кнопка Закрыть попап

const profileName = document.querySelector(".profile__title");
const jobName = document.querySelector(".profile__subtitle");

const placesSection = document.querySelector(".cards__items");
const placeTitle = document.querySelector(".cards__title");
const placeImg = document.querySelector(".cards__item-image");

//Открываем попап
function openPopup() {
  popupOpened.classList.add("popup_opened");
}

function closePopup() {
  popupOpened.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);
popupClosed.addEventListener("click", closePopup);

//Открываем попап новое место
addButton.addEventListener("click", function () {
  popupAddImage.classList.add("popup_opened");
});

//Закрываем попап
popupAddImageClosed.addEventListener("click", function () {
  popupAddImage.classList.remove("popup_opened");
});

popupOpened.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

popupAddImage.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    popupAddImage.classList.remove("popup_opened");
  }
});

//Работаем с карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(info => {
const cardsTemplate = document.querySelector('#cards__template').content;
console.log(cardsTemplate)
const cardsContainer = document.querySelector('.cards__items');
const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);


cardsElement.querySelector('.cards__item-image').src = info.link;
cardsElement.querySelector('.cards__title').alt = info.name;
cardsElement.querySelector('.cards__title').textContent = info.name;
cardsElement.querySelector('.cards__like').addEventListener('click', function(evt){
  evt.target.classList.toggle('cards__like_active')
})
cardsElement.querySelector('#delete_button').addEventListener('click', function() { 
cardsElement.remove()
})

cardsContainer.append(cardsElement);
});

//Редактирование профиля
// Находим форму в DOM
const formElement = document.querySelector(".popup__form");

// Находим поля формы в DOM
const nameInput = document.querySelector("#input-popup-title");
const jobInput = document.querySelector("#input-popup-subtitle");

function formSubmitHandler(evt) {
  evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  popupOpened.classList.remove("popup_opened");
}

//Заполненная форрма в профиле
function fillProfilePopup() {
  popupOpened.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

formElement.addEventListener("submit", formSubmitHandler);

editButton.addEventListener("click", fillProfilePopup);

