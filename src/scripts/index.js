import '../styles/style.css';
import { editButton, addButton, profilePopup, popups, popupAddImage, cardsContainer,  profileFormAdd , profileForm} from '../components/variables.js'; 
import { openPopup, closePopup , handleProfileFormSubmit, openProfilePopup} from '../components/modal.js'
import { initialCards, createCard, handleAddFormSubmit} from '../components/card.js'
import { enableValidation } from '../components/validate.js'


editButton.addEventListener("click", function () {
  openPopup(profilePopup);
});


//Открываем попап новое место
addButton.addEventListener("click", function () {
  openPopup(popupAddImage);
});

//Закрываем попап
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__closed')) {
          closePopup(popup)
        }
    })
})

//Работаем с карточками

initialCards.forEach((element) => {
  const cardElement = createCard(element);
  cardsContainer.append(cardElement);
});

profileFormAdd.addEventListener("submit", handleAddFormSubmit);

profileForm.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", openProfilePopup);

//Валидация формы


 enableValidation({
    formListSelector: '.form',
    formSet: '.form__set',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_inactive',
    errorClass: 'popup__input-error_active'
 });

