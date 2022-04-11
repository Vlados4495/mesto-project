const editButton = document.querySelector(".profile__edit-button"); //Кнопка редактировать профиль
const editButtonSave = document.querySelector(".popup__button"); //Кнопка сохранить изменения в профиле
const addButton = document.querySelector(".profile__add-button"); //Кнопка добавить новое место
const addButtonSave = document.querySelector("#popup-add_submit"); //Кнопка сохранить новое место

const profilePopup = document.querySelector("#popup-edit"); //Попап редактировать профиль popupOpened
const profileCloseButton = document.querySelector("#popup__close-btn"); //Кнопка закрыть попап

const popupAddImage = document.getElementById("popup-add"); //Второй поп с добавлением нового места
const popupAddImageClosed = document.getElementById("popup__close"); //Кнопка Закрыть попап

const cardImagePopup = document.querySelector(".popup__card"); // Попап с картинкой
const cardImagePopupClose = document.querySelector("#popup__card_close"); //Кнопка закрыть попап

const profileName = document.querySelector(".profile__title");
const jobName = document.querySelector(".profile__subtitle");

const cardsContainer = document.querySelector(".cards__items");


//Открываем попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
//Закрываем попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Закрываем попап с картинкой
cardImagePopupClose.addEventListener("click", function () {
  closePopup(cardImagePopup);
});

editButton.addEventListener("click", function () {
  openPopup(profilePopup);
});

profileCloseButton.addEventListener("click", function () {
  closePopup(profilePopup);
});

//Открываем попап новое место
addButton.addEventListener("click", function () {
  openPopup(popupAddImage);
});

//Закрываем попап
popupAddImageClosed.addEventListener("click", function () {
  closePopup(popupAddImage);
});

profilePopup.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(profilePopup);
  }
});

popupAddImage.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupAddImage);
  }
});

cardImagePopup.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    closePopup(cardImagePopup);
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

initialCards.forEach((info) => {
  const cardsTemplate = document.querySelector("#cards__template").content;
  const cardsElement = cardsTemplate
    .querySelector(".cards__item")
    .cloneNode(true);
  const cardsImg = cardsElement.querySelector(".cards__item-image");
  const cardsTitle = cardsElement.querySelector(".cards__title");
  const cardsLikeBtn = cardsElement.querySelector(".cards__like");
  const cardsDeleteBtn = cardsElement.querySelector("#delete_button");

  cardsImg.src = info.link;
  cardsImg.alt = info.name;
  cardsTitle.textContent = info.name;
  cardsLikeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__like_active");
  });
  cardsDeleteBtn.addEventListener("click", function () {
    cardsElement.remove();
  });

  cardsImg.addEventListener("click", function () {
    openPopup(cardImagePopup)
    const cardImageLink = document.querySelector(".popup__card_image");
    const cardImageTitle = document.querySelector(".popup__card_title");
    cardImageLink.src = info.link;
    cardImageTitle.textContent = info.name;

    profileCloseButton.addEventListener("click", function () {
      cardImagePopup.classList.remove("popup_opened");
    });
  });

  cardsContainer.append(cardsElement);

  editButton.addEventListener("click", openPopup);
});

//Добавляем новую карточку
function addCard(nameValue, linkValue) {
  const cardsTemplate = document.querySelector("#cards__template").content;
  const cardsElement = cardsTemplate
    .querySelector(".cards__item")
    .cloneNode(true);

  cardsElement.querySelector(".cards__item-image").src = linkValue;
  cardsElement.querySelector(".cards__title").alt = nameValue;
  cardsElement.querySelector(".cards__title").textContent = nameValue;
  cardsElement
    .querySelector(".cards__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("cards__like_active");
    });
  cardsElement
    .querySelector("#delete_button")
    .addEventListener("click", function () {
      cardsElement.remove();
    });

  const cardsImg = cardsElement.querySelector(".cards__item-image");

  cardsImg.addEventListener("click", function () {
    const cardImagePopup = document.querySelector(".popup__card");
    cardImagePopup.classList.add("popup_opened");
    const cardImageLink = document.querySelector(".popup__card_image");
    const cardImageTitle = document.querySelector(".popup__card_title");
    cardImageLink.src = linkValue;
    cardImageTitle.textContent = nameValue;
  });

  cardsContainer.prepend(cardsElement);
}

const formElementAdd = document.querySelector(".popup__form_add");

// addButtonSave.addEventListener('click', function (evt) {
function addButtonSaved(evt) {
  evt.preventDefault();
  const name = document.querySelector("#input-popup-name");
  const link = document.querySelector("#input-popup-link");

  addCard(name.value, link.value);

  name.value = "";
  link.value = "";

  popupAddImage.classList.remove("popup_opened");
}

formElementAdd.addEventListener("submit", addButtonSaved);

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

  closePopup();
}

//Заполненная форрма в профиле
function fillProfilePopup() {
  profilePopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

formElement.addEventListener("submit", formSubmitHandler);

editButton.addEventListener("click", fillProfilePopup);
