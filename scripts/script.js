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

const placeName = document.querySelector("#input-popup-name");
const placeLink = document.querySelector("#input-popup-link");

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

function addCard(nameValue, linkValue) {
  const item = {
    name: nameValue,
    link: linkValue,
  };
  const cardsElement = createCard(item);
  cardsContainer.prepend(cardsElement);
}

const profileFormAdd = document.querySelector(".popup__form_add");

function addButtonSaved(evt) {
  addCard(placeName.value, placeLink.value);
  evt.preventDefault();
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

//Валидация формы
const formSubmit = (event) => {
  event.preventDefault();
};
//Попап добавления места, проверяем валидность
const checkInputValidity = (config, form, input) => {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorMessage.textContent = "";
    input.classList.remove(config.inputErrorClass);
  } else {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
};
//Ред профиль валидность
const checkEditInputValidity = (config, editForm, input) => {
  const errorMessage = editForm.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorMessage.textContent = "";
    input.classList.remove(config.inputErrorClass);
  } else {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
};

const checkButtonValidity = (config, form, addButtonSave) => {
  if (form.checkValidity()) {
    addButtonSave.removeAttribute("disabled", "");
    addButtonSave.classList.remove(config.disabledButtonClass);
  } else {
    addButtonSave.setAttribute("disabled", "");
    addButtonSave.classList.add(config.disabledButtonClass);
  }
};

const checkEditButtonValidity = (config, editForm, editButtonSave) => {
  if (editForm.checkValidity()) {
    editButtonSave.removeAttribute("disabled", "");
    editButtonSave.classList.remove(config.disabledButtonClass);
  } else {
    editButtonSave.setAttribute("disabled", "");
    editButtonSave.classList.add(config.disabledButtonClass);
  }
};

function enableValidation(config) {
  //Подключаем формы
  const form = document.querySelector(config.formSelector);
  const editForm = document.querySelector(config.editFormSelector);

  form.addEventListener("submit", formSubmit);
  editForm.addEventListener("submit", formSubmit);

  const editFormInputs = editForm.querySelectorAll(config.inputSelector);

  const inputs = form.querySelectorAll(config.inputSelector);


  checkButtonValidity(config, form, addButtonSave);
  checkEditButtonValidity(config, editForm, editButtonSave);

  editFormInputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      checkEditInputValidity(config, editForm, input);
      checkEditButtonValidity(config, editForm, editButtonSave);
    });
  });

  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      checkInputValidity(config, form, input);
      checkButtonValidity(config, form, addButtonSave);
    });
  });
}

enableValidation({
  formSelector: '.popup__form_add',
  editFormSelector: '.popup__form',
  inputSelector: '.popup__input',
  disabledButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input-error_active'
});

window.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    closePopup(cardImagePopup);
    closePopup(profilePopup);
    closePopup(popupAddImage);
  }
});