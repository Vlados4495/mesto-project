import { openPopup, closePopup } from '../components/modal.js'
import { cardImagePopup, cardsContainer, cardImageLink, cardImageTitle, placeName, placeLink, popupAddImage , profileFormAdd} from '../components/variables.js'; 

export const initialCards = [
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

 export function createCard(item) {
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

  export function addCard(nameValue, linkValue) {
    const item = {
      name: nameValue,
      link: linkValue,
    };
    const cardsElement = createCard(item);
    cardsContainer.prepend(cardsElement);
  }

  
export function handleAddFormSubmit(evt) {
    addCard(placeName.value, placeLink.value);
    evt.preventDefault();
    profileFormAdd.reset();
    const btn = profileFormAdd.querySelector('.popup__button');
    btn.disabled = true;
    btn.classList.add('popup__button_inactive');
    closePopup(popupAddImage);
  }
  