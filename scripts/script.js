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

const cardImageLink = document.querySelector(".popup__card_image");
const cardImageTitle = document.querySelector(".popup__card_title");

const name = document.querySelector("#input-popup-name");
const link = document.querySelector("#input-popup-link");

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

//Original Code

// initialCards.forEach((info) => {
//   const cardsTemplate = document.querySelector("#cards__template").content;
//   const cardsElement = cardsTemplate
//     .querySelector(".cards__item")
//     .cloneNode(true);
//   const cardsImg = cardsElement.querySelector(".cards__item-image");
//   const cardsTitle = cardsElement.querySelector(".cards__title");
//   const cardsLikeBtn = cardsElement.querySelector(".cards__like");
//   const cardsDeleteBtn = cardsElement.querySelector("#delete_button");

//   cardsImg.src = info.link;
//   cardsImg.alt = info.name;
//   cardsTitle.textContent = info.name;
//   cardsLikeBtn.addEventListener("click", function (evt) {
//     evt.target.classList.toggle("cards__like_active");
//   });
//   cardsDeleteBtn.addEventListener("click", function () {
//     cardsElement.remove();
//   });

//   cardsImg.addEventListener("click", function () {
//     openPopup(cardImagePopup);
//     cardImageLink.src = info.link;
//     cardImageLink.alt = info.name;
//     cardImageTitle.textContent = info.name;
//   });

//   cardsContainer.append(cardsElement);
// });

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
    cardImageLink.src = linkValue;
    cardImageTitle.textContent = nameValue;
  });

  cardsContainer.prepend(cardsElement);
}

//New version

function createCard(item) {
  const cardsTemplate = document.querySelector("#cards__template").content;
  const cardsElement = cardsTemplate
    .querySelector(".cards__item")
    .cloneNode(true);
  const cardsImg = cardsElement.querySelector(".cards__item-image");
  const cardsTitle = cardsElement.querySelector(".cards__title");
  const cardsLikeBtn = cardsElement.querySelector(".cards__like");
  const cardsDeleteBtn = cardsElement.querySelector("#delete_button");

  cardsImg.src = item["link"];
  cardsImg.alt = item["name"];
  cardsTitle.textContent = item["name"];

  cardsLikeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("cards__like_active");
  });
  cardsDeleteBtn.addEventListener("click", function () {
    cardsElement.remove();
  });

  cardsImg.addEventListener("click", function () {
    openPopup(cardImagePopup);
    cardImageLink.src = item["link"];
    cardImageLink.alt = item["name"];
    cardImageTitle.textContent = item["name"];
  });

  return cardsElement;
}

initialCards.forEach((element) => {
  const cardElement = createCard(element);
  cardsContainer.append(cardElement);
});

function addcard(item) {
  const cardElement = createCard(item);
  cardsContainer.prepend(cardElement);
}

const profileFormAdd = document.querySelector(".popup__form_add");

function addButtonSaved(evt) {
  evt.preventDefault();

  addCard(name.value, link.value);

  name.value = "";
  link.value = "";

  closePopup(popupAddImage);
}

profileFormAdd.addEventListener("submit", addButtonSaved);

//Редактирование профиля
// Находим форму в DOM

const profileForm = document.querySelector(".popup__form"); //formElement

// Находим поля формы в DOM
const nameInput = document.querySelector("#input-popup-title");
const jobInput = document.querySelector("#input-popup-subtitle");

function handleProfileFormSubmit(evt) {
  //formSubmitHandler
  evt.preventDefault();
  // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  closePopup(profilePopup);
}

//Заполненная форрма в профиле
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", openProfilePopup);
