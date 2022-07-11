import '../pages/index.css';
import { editButton, addButton, profilePopup, popups, popupAddImage, cardsContainer,  profileFormAdd , profileForm, editAvatarButton, avatarPopup, profileAvatarForm, profileName, jobName, profileAvatar} from '../components/variables.js'; 
import { openPopup, closePopup , handleProfileFormSubmit, openProfilePopup, handleProfileAvatarSubmit} from '../components/modal.js'
import { handleAddFormSubmit, createCard} from '../components/Card.js'
import { enableValidation } from '../components/validate.js'

import { Api , config} from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import Section from '../components/Section.js';

export let userId;

const api = new Api(config);

function getUserApi() {
  return api.getUserData()
}

const userInfo = new UserInfo({profileName, jobName, profileAvatar}, getUserApi)
  userInfo.getUserInfo()
    .then((res) => {
      profileName.textContent = res.name;
      jobName.textContent = res.about;
      profileAvatar.src = res.avatar;
      userId = res._id
    })



// Promise.all([api.getUserData(), api.getInitialCards()])
//   .then(([data, res]) => {
//     profileName.textContent = data.name;
//     jobName.textContent = data.about;
//     profileAvatar.src = data.avatar;
//     userId = data._id
//     res.forEach(function(res) {
//       const cardElement = createCard(res.link, res.name, res.owner._id, res._id, res.likes);
//       cardsContainer.append(cardElement);
//     })
//   })
//   .catch(err => {
//     console.log(err);
//   });

   
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






profileFormAdd.addEventListener("submit", handleAddFormSubmit);

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit);



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

