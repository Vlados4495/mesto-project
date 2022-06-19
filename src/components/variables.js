export const editButton = document.querySelector(".profile__edit-button"); //Кнопка редактировать профиль
export const editAvatarButton = document.querySelector(".profile__btn-edit");
export const editButtonSave = document.querySelector(".popup__button"); //Кнопка сохранить изменения в профиле
export const addButton = document.querySelector(".profile__add-button"); //Кнопка добавить новое место
export const addButtonSave = document.querySelector("#popup-add_submit"); //Кнопка сохранить новое место

export const profilePopup = document.querySelector("#popup-edit"); //Попап редактировать профиль popupOpened
export const avatarPopup = document.querySelector("#popup__edit_avatar"); //
export const profileCloseButton = document.querySelector("#popup__close-btn"); //Кнопка закрыть попап

export const popupAddImage = document.getElementById("popup-add"); //Второй поп с добавлением нового места
export const popupAddImageClosed = document.getElementById("popup__close"); //Кнопка Закрыть попап

export const cardImagePopup = document.querySelector(".popup__card"); // Попап с картинкой
export const cardImagePopupClose = document.querySelector("#popup__card_close"); //Кнопка закрыть попап
export const popups = document.querySelectorAll('.popup');
export const confirmDeletePopup = document.querySelector('#popup__confirm-delete');

export const profileName = document.querySelector(".profile__title");
export const jobName = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar")

export const cardsTemplate = document.querySelector("#cards__template").content;
export const cardsContainer = document.querySelector(".cards__items");

export const cardImageLink = document.querySelector(".popup__card_image");
export const cardImageTitle = document.querySelector(".popup__card_title");

export const placeName = document.querySelector("#input-popup-name");
export const placeLink = document.querySelector("#input-popup-link");
export const avatarLink = document.querySelector(".popup__avatar");

export const profileFormAdd = document.querySelector(".popup__form_add");
export const btn = profileFormAdd.querySelector('.popup__button');

export const profileForm = document.querySelector(".popup__form"); 
export const profileAvatarForm = document.querySelector(".popup__form_avatar");
export const profileAvatarSubmitBtn = document.querySelector(".popup__avatar_submit")

// Находим поля формы в DOM
export const nameInput = document.querySelector("#input-popup-title");
export const jobInput = document.querySelector("#input-popup-subtitle");
