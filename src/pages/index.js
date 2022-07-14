import '../pages/index.css';
import { editButton, addButton, profilePopup, popups, popupAddImage, cardsContainer,  profileFormAdd , profileForm, editAvatarButton, avatarPopup, profileAvatarForm, profileName, jobName, profileAvatar, editAvatarButtonSelector, cardImagePopup, confirmDeletePopup , myId} from '../components/variables.js'; 
import { openPopup, closePopup , handleProfileFormSubmit, openProfilePopup, handleProfileAvatarSubmit} from '../components/modal.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js';
import { enableValidation } from '../components/validate.js'
import { Api , config} from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import Popup  from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmation from '../components/PopupConfirmation.js';


export let userId


const api = new Api(config);

// Получение информации о профиле пользователя  и получение списка карточек
const userInfo = new UserInfo(profileName, jobName, profileAvatar);
    Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData._id);
    myId.id = userData._id;
    userInfo.setUserAvatar(userData.avatar);
    cardsSection.setItems(cardsData);
	  cardsSection.renderItems();
  })
  .catch(err => {
    console.log(err);
  });
  

const cardsSection = new Section ({
	items: [],
	renderer: (item) => {
		const card = createCard(item)
		cardsSection.addItem(card);
	}}, cardsContainer);

// Добавление новой карточки и её отправка на сервер:
const popupAdd = new PopupWithForm("#popup-add", function(data) {
	return api.addNewCard(data.name, data.link)
	.then((data) => {
		const card = createCard(data)
		cardsSection.addItem(card);
		popupAdd.close();
	})
	.catch((err) => {
		console.log(err);
	});
});
popupAdd.setEventListeners();

// Получение информации о профиле пользователя с сервера:
const popupEdit = new PopupWithForm("#popup-edit", function(data) {
	return api.editUserData(data)
	.then(() => {
		userInfo.setUserInfo(data);
		popupEdit.close();
	})
	.catch((err) => {
		console.log(err);
	});
});
popupEdit.setEventListeners();

// Изменение аватара пользователя:
const popupNewAvatar = new PopupWithForm("#popup__edit_avatar", function(data) {
	return api.changeAvatar(data)
  .then(() => {
    console.log(data)
    userInfo.setUserAvatar(data);
    popupNewAvatar.close();
  })
	.catch((err) => {
		console.log(err);
	});
});
popupNewAvatar.setEventListeners();


// Открытие попапа обновления аватара пользователя:
editAvatarButtonSelector.addEventListener("click", () => {
  popupNewAvatar.open();
})

// 1 попап - Редактирование профиля:
// Открытие попапа редактирования профиля:
editButton.addEventListener("click", () => {
  popupEdit.open();
	popupEdit.setInputValues(userInfo.getUserInfo());
})

// 2 попап - Добавление нового места:
addButton.addEventListener("click", function() {
	popupAdd.open();
});

// 3 попап - Раскрытие картинки на весь экран:
const popupWithGallery = new PopupWithImage(".popup__card");
popupWithGallery.setEventListeners();

function openGallery(name, link) {
	popupWithGallery.open({src: link, alt: name});
};

// 4 отрисовка списка карточек
const popupConfirmDelete = new PopupConfirmation('#popup__confirm-delete');
popupConfirmDelete.setEventListeners();

  function createCard({name, link, likes, _id, owner}) {
    const data = {
      title: name,
      imageUrl: link,
      likes: likes,
      myId: userInfo.getUserId(),
      id: _id,
      owner: owner
    };

    const card = new Card(data, "#cards__template", openGallery, handleLikeClick, handleDeleteClick);
   
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

    

    function handleDeleteClick() {
      popupConfirmDelete.setHandleFormSubmit(() => {
        api.deleteCard(_id)
        .then(() => {
          cardElement.remove();
          popupConfirmDelete.close()
        })
        .catch((err) => {
          console.log(err);
        });
      });
      popupConfirmDelete.open();
    }

    return cardElement;
  };

 //////////////////////////////////////////////////////////    






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

