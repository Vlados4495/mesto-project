import '../styles/style.css';
import { editButton, addButton, profilePopup, popups, popupAddImage, cardsContainer,  profileFormAdd , profileForm, editAvatarButton, avatarPopup, profileAvatarForm, profileName, jobName, profileAvatar} from '../components/variables.js'; 
import { openPopup, closePopup , handleProfileFormSubmit, openProfilePopup, handleProfileAvatarSubmit} from '../components/modal.js'
import { handleAddFormSubmit, createCard, handleConfirmDelete} from '../components/card.js'
import { enableValidation } from '../components/validate.js'

import { getInitialCards, getUserData} from '../components/api.js'

export let userId;

Promise.all([getUserData(), getInitialCards()])
  .then(([data, res]) => {
    profileName.textContent = data.name;
    jobName.textContent = data.about;
    profileAvatar.src = data.avatar;
    userId = data._id
    res.forEach(function(res) {
      const cardElement = createCard(res.link, res.name, res.owner._id, res._id, res.likes);
      cardsContainer.append(cardElement);
    })
  })
  .catch(err => {
    console.log(err);
  });


editButton.addEventListener("click", function () {
  openPopup(profilePopup);
});

editAvatarButton.addEventListener("click", function () {
    openPopup(avatarPopup);
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

// initialCards.forEach((element) => {
//   const cardElement = createCard(element);
//   cardsContainer.append(cardElement);
// });





profileFormAdd.addEventListener("submit", handleAddFormSubmit);

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit);

// confirmDeletePopup.addEventListener("submit", handleConfirmDelete);

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

