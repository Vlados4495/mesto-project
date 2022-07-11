import { openPopup, closePopup } from "./modal.js";
import {
  cardImagePopup,
  cardsContainer,
  cardImageLink,
  cardImageTitle,
  placeName,
  placeLink,
  popupAddImage,
  profileFormAdd,
  cardsTemplate,
  btn,
} from "./variables.js";
import { Api } from "./Api.js";
import { userId } from "../pages/index.js";

export class Card {
  constructor(
    { link, name, owner, id, likes },
    templateSelector,
    handleCardClick
  ) {
    this._link = link;
    this._name = name;
    this._owner = owner;
    this._id = id;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  //Получаем шаблон из разметки
  _getTemplate() {
    const cardsElement = cardsTemplate
      .querySelector(".cards__item")
      .cloneNode(true);

    return cardsElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardsImg = this._element.querySelector(".cards__item-image");
    this._cardsTitle = this._element.querySelector(".cards__title");
    this._cardsLikeBtn = this._element.querySelector(".cards__like");
    this._cardsDeleteBtn = this._element.querySelector("#delete_button");
    this._cardsLikeCounter = this._element.querySelector(
      ".cards__likes-counter"
    );

    this._cardsImg.src = this._link;
    this._cardsImg.alt = this._name;
    this._cardsTitle.textContent = this._name;
    this._cardsLikeCounter.textContent = this._likes.length;

    return this._element;
  }
}

export function createCard(link, name, owner, id, likes) {
  const cardsElement = cardsTemplate
    .querySelector(".cards__item")
    .cloneNode(true);
  const cardsImg = cardsElement.querySelector(".cards__item-image");
  const cardsTitle = cardsElement.querySelector(".cards__title");
  const cardsLikeBtn = cardsElement.querySelector(".cards__like");
  const cardsDeleteBtn = cardsElement.querySelector("#delete_button");

  cardsImg.src = link;
  cardsImg.alt = name;
  cardsImg.id = id;
  cardsTitle.textContent = name;

  const likesCounter = cardsElement.querySelector(".cards__likes-counter");
  likesCounter.textContent = likes.length;

  if (likes.some((item) => item._id === userId)) {
    cardsLikeBtn.classList.add("cards__like_active");
  }

  cardsLikeBtn.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("cards__like_active")) {
      addLike(id, likesCounter)
        .then((res) => {
          evt.target.classList.add("cards__like_active");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      removeLike(id, likesCounter)
        .then((res) => {
          evt.target.classList.remove("cards__like_active");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });

  if (owner === userId) {
    cardsDeleteBtn.style.display = "block";
    cardsDeleteBtn.addEventListener("click", function () {
      deleteCard(id)
        .then((res) => {
          cardsElement.remove();
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  }

  cardsImg.addEventListener("click", function () {
    openPopup(cardImagePopup);
    cardImageLink.src = link;
    cardImageLink.alt = name;
    cardImageTitle.textContent = name;
  });

  return cardsElement;
}

export function addCard(link, name, owner, id, likes) {
  const cardsElement = createCard(link, name, owner, id, likes);
  cardsContainer.prepend(cardsElement);
}

export function handleAddFormSubmit(evt) {
  addNewCard(placeLink.value, placeName.value)
    .then((res) => {
      addCard(res.link, res.name, res.owner._id, res._id, res.likes);
      evt.preventDefault();
      profileFormAdd.reset();

      btn.disabled = true;
      btn.classList.add("popup__button_inactive");
      closePopup(popupAddImage);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
