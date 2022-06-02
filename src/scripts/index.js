import '../styles/style.css';
import { editButton, addButton, profilePopup, profileCloseButton, popupAddImage, popupAddImageClosed, cardImagePopup, cardImagePopupClose, cardsContainer,  profileFormAdd , profileForm} from '../components/variables.js'; 
import { openPopup, closePopup , handleProfileFormSubmit, openProfilePopup} from '../components/modal.js'
import { initialCards, createCard, addButtonSaved} from '../components/card.js'
import { enableValidation } from '../components/validate.js'

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

initialCards.forEach((element) => {
  const cardElement = createCard(element);
  cardsContainer.append(cardElement);
});

profileFormAdd.addEventListener("submit", addButtonSaved);

profileForm.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", openProfilePopup);

//Валидация формы
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