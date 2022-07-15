export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this.title = data.title;
    this.imageUrl = data.imageUrl;
    this.template = document.querySelector(templateSelector);
    this._likes = data.likes || [];
    this._myId = data.myId;
    this._cardId = data.id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  setLikesCounter(count) {
    this._card.querySelector(".cards__likes-counter").textContent = count;
  }

  updateLikes(likes) {
    this._likes = likes;
  }

  _disableDelete() {
    this._card
      .querySelector(".cards__item-delete")
      .classList.add("cards__item-delete-hide");
  }

  _createCardFromTemplate() {
    const card = this._getNewCardElement();
    const cardTitle = card.querySelector(".cards__title");
    cardTitle.textContent = this.title;
    const cardImage = card.querySelector(".cards__item-image");
    cardImage.src = this.imageUrl;
    cardImage.alt = this.title;
    this._card = card;
  }

  _getNewCardElement() {
    return this.template.content.querySelector(".cards__item").cloneNode(true);
  }

  //Метод навешивает обработчики событий на переданную карточку.
  _addEventListenersOnCard() {
    const cardLike = this._card.querySelector(".cards__like");
    const deleteIcon = this._card.querySelector(".cards__item-delete");
    const cardImage = this._card.querySelector(".cards__item-image");
    cardLike.addEventListener("click", (event) => this._onLikeClick(event));
    deleteIcon.addEventListener("click", (event) => this._onDeleteClick(event));
    cardImage.addEventListener("click", (event) => this._onImageClick(event));
  }

  //Обработчик клика по лайку.
  _onLikeClick(event) {
    event.target.classList.toggle("cards__like_active");
    this._handleLikeClick(this._cardId, this._isLiked());
  }

  _isLiked() {
    return this._likes.some((user) => {
      return user._id === this._myId;
    });
  }

  // Отображение активных лайков
  _setLikeIfActive() {
    const isLiked = this._isLiked();

    if (isLiked) {
      this._card
        .querySelector(".cards__like")
        .classList.add("cards__like_active");
    }
  }

  //Обработчик клика по кнопке удаления.
  _onDeleteClick() {
    this._handleDeleteClick(this._cardId);
  }

  //Обработчик клика по изображению.
  _onImageClick() {
    this._handleCardClick(this.title, this.imageUrl);
  }

  buildCard() {
    this._createCardFromTemplate();
    this._addEventListenersOnCard();
    this.setLikesCounter(this._likes.length);
    this._setLikeIfActive();
    if (this._ownerId !== this._myId) {
      this._disableDelete();
    }
    return this._card;
  }
}
