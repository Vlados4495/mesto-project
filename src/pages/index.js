import '../pages/index.css';
import { editButton, addButton, profilePopup, popups, popupAddImage, cardsContainer,  profileFormAdd , profileForm, editAvatarButton, avatarPopup, profileAvatarForm, profileName, jobName, profileAvatar} from '../components/variables.js'; 
import { openPopup, closePopup , handleProfileFormSubmit, openProfilePopup, handleProfileAvatarSubmit} from '../components/modal.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js';
import { enableValidation } from '../components/validate.js'
import { Api , config} from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import Popup  from '../components/Popup.js';
import  PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


export let userId;

const api = new Api(config);

// Получение информации о профиле пользователя  и получение списка карточек
const userInfo = new UserInfo(profileName, jobName, profileAvatar);
    Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData._id);
    userInfo.setUserAvatar(userData.avatar);
    cardsSection.setItems(cardsData);
	  cardsSection.renderItems();
  })
  .catch(err => {
    console.log(err);
  });

//   // 3 попап - Раскрытие картинки на весь экран:
// const popupGallerySelector = document.querySelector('#popup__card')
// const popupWithGallery = new PopupWithImage(popupGallerySelector);
// popupWithGallery.setEventListeners();

// function openGallery(name, link) {
// 	popupWithGallery.open({src: link, alt: name});
// };

const cardsSection = new Section ({
	items: [],
	renderer: (item) => {
		const card = createCard(item)
		cardsSection.addItem(card);
	}}, cardsContainer);

  function createCard({name, link, likes, _id, owner}) {
    const data = {
      title: name,
      imageUrl: link,
      likes: likes,
      myId: userInfo.getUserId(),
      id: _id,
      owner: owner
    };
   
    const card = new Card(data, "#cards__template", handleLikeClick, handleDeleteClick);
    const cardElement = card.buildCard();
    function handleLikeClick(id, isLiked) {
      if (isLiked) {
        api.removeLike(id)
        .then((data) => {
          card.setLikesCounter(data.likes.length);
          card.updateLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        api.addLike(id)
        .then((data) => {
          card.setLikesCounter(data.likes.length);
          card.updateLikes(data.likes);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }

      function handleDeleteClick () {
              api.deleteCard(_id)
                .then((res) => {
                  cardElement.remove();
                })
                .catch((err) => {
                  console.log(err.message);
                });
            }
    return cardElement;
  };

 //////////////////////////////////////////////////////////    



   
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






// profileFormAdd.addEventListener("submit", handleAddFormSubmit);
// profileForm.addEventListener("submit", handleProfileFormSubmit);
// profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit);
// editButton.addEventListener("click", openProfilePopup);

//Валидация формы


 enableValidation({
    formListSelector: '.form',
    formSet: '.form__set',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_inactive',
    errorClass: 'popup__input-error_active'
 });

