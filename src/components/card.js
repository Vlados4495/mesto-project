export class Card {
  constructor(data, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
  	this.title = data.title;
		this.imageUrl = data.imageUrl;
		this.template = document.querySelector(templateSelector);
		this._likes = data.likes || [];
		this._myId = data._id;
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
		this._card.querySelector(".cards__item-delete").classList.add("cards__item-delete-hide");
	}

	_createCardFromTemplate() {
		const card = this._getNewCardElement();
    const cardTitle = card.querySelector(".cards__title");
		cardTitle.textContent = this.title;
		const cardImage = card.querySelector(".cards__item-image");
		cardImage.src = this.imageUrl
		cardImage.alt = this.title
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
		return this._likes.some(user => {
			return user._id === this._myId;
		});
	}

    // Отображение активных лайков
  _setLikeIfActive() {
     const isLiked = this._isLiked();

    if (isLiked) {
      this._card.querySelector(".cards__like").classList.add("cards__like_active");
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Получаем шаблон из разметки
  // _getTemplate() {
  //   const cardsElement = cardsTemplate
  //     .querySelector(".cards__item")
  //     .cloneNode(true);

  //   return cardsElement;
  // }




//   createCard() {
//     this._element = this._getTemplate();
//     this._cardsImg = this._element.querySelector(".cards__item-image");
//     this._cardsTitle = this._element.querySelector(".cards__title");
//     this._cardsLikeBtn = this._element.querySelector(".cards__like");
//     this._cardsDeleteBtn = this._element.querySelector("#delete_button");
//     this._cardsLikeCounter = this._element.querySelector(
//       ".cards__likes-counter"
//     );

//     this._cardsImg.src = this._link;
//     this._cardsImg.alt = this._name;
//     this._cardsTitle.textContent = this._name;
//     this._element.id = this._id;
//     this._cardsLikeCounter.textContent = this._likes.length;

//     return this._element;
//   }

//     _setEventListeners() {
//       if (this._owner === this._userId) {
//         this._cardsDeleteBtn.style.display = "block";
//         this._cardsDeleteBtn.addEventListener("click", function () {
//           deleteCard(id)
//             .then((res) => {
//               this._cardsElement.remove();
//             })
//             .catch((err) => {
//               console.log(err.message);
//             });
//         });
//       }

//       if (this._likes.some((item) => item._id === userId)) {
//         this._cardsLikeBtn.classList.add("cards__like_active");
//       }
    
//       this._cardsLikeBtn.addEventListener("click", function (evt) {
//         if (!evt.target.classList.contains("cards__like_active")) {
//           addLike(id, likesCounter)
//             .then((res) => {
//               evt.target.classList.add("cards__like_active");
//             })
//             .catch((err) => {
//               console.log(err.message);
//             });
//         } else {
//           removeLike(id, likesCounter)
//             .then((res) => {
//               evt.target.classList.remove("cards__like_active");
//             })
//             .catch((err) => {
//               console.log(err.message);
//             });
//         }
//       });

//     }
// }

// export function createCard(link, name, owner, id, likes) {
//   const cardsElement = cardsTemplate
//     .querySelector(".cards__item")
//     .cloneNode(true);
//   const cardsImg = cardsElement.querySelector(".cards__item-image");
//   const cardsTitle = cardsElement.querySelector(".cards__title");
//   const cardsLikeBtn = cardsElement.querySelector(".cards__like");
//   const cardsDeleteBtn = cardsElement.querySelector("#delete_button");

//   cardsImg.src = link;
//   cardsImg.alt = name;
//   cardsImg.id = id;
//   cardsTitle.textContent = name;

//   const likesCounter = cardsElement.querySelector(".cards__likes-counter");
//   likesCounter.textContent = likes.length;

//   if (likes.some((item) => item._id === userId)) {
//     cardsLikeBtn.classList.add("cards__like_active");
//   }

//   cardsLikeBtn.addEventListener("click", function (evt) {
//     if (!evt.target.classList.contains("cards__like_active")) {
//       addLike(id, likesCounter)
//         .then((res) => {
//           evt.target.classList.add("cards__like_active");
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     } else {
//       removeLike(id, likesCounter)
//         .then((res) => {
//           evt.target.classList.remove("cards__like_active");
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     }
//   });

//   // if (owner === userId) {
//   //   cardsDeleteBtn.style.display = "block";
//   //   cardsDeleteBtn.addEventListener("click", function () {
//   //     deleteCard(id)
//   //       .then((res) => {
//   //         cardsElement.remove();
//   //       })
//   //       .catch((err) => {
//   //         console.log(err.message);
//   //       });
//   //   });
//   // }

//   cardsImg.addEventListener("click", function () {
//     openPopup(cardImagePopup);
//     cardImageLink.src = link;
//     cardImageLink.alt = name;
//     cardImageTitle.textContent = name;
//   });

//   return cardsElement;
// }

// export function addCard(link, name, owner, id, likes) {
//   const cardsElement = createCard(link, name, owner, id, likes);
//   cardsContainer.prepend(cardsElement);
// }


// export function handleAddFormSubmit(evt) {
//   addNewCard(placeLink.value, placeName.value)
//     .then((res) => {
//       addCard(res.link, res.name, res.owner._id, res._id, res.likes);
//       evt.preventDefault();
//       profileFormAdd.reset();

//       btn.disabled = true;
//       btn.classList.add("popup__button_inactive");
//       closePopup(popupAddImage);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }
