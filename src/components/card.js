import { openPopup, closePopup } from '../components/modal.js'
import { cardImagePopup, cardsContainer, cardImageLink, cardImageTitle, placeName, placeLink, popupAddImage , profileFormAdd} from '../components/variables.js'; 
import { addNewCard, addLike, removeLike, deleteCard} from '../components/api.js'

 export function createCard(link, name, owner, id, likes) {
    const cardsTemplate = document.querySelector("#cards__template").content;
    const cardsElement = cardsTemplate
      .querySelector(".cards__item")
      .cloneNode(true);
    const cardsImg = cardsElement.querySelector(".cards__item-image");
    const cardsTitle = cardsElement.querySelector(".cards__title");
    const cardsLikeBtn = cardsElement.querySelector(".cards__like");
    const cardsDeleteBtn = cardsElement.querySelector("#delete_button");
  
    


    cardsImg.src = link;
    cardsImg.alt = name;
    cardsImg.id = id
    cardsTitle.textContent = name;

    const likesCounter = cardsElement.querySelector(".cards__likes-counter");

    cardsLikeBtn.addEventListener("click", function (evt) {
      // evt.target.classList.toggle("cards__like_active");

      if(!evt.target.classList.contains('cards__like_active')) {
        evt.target.classList.add('cards__like_active');
        addLike(id, likesCounter);
      } else {
        evt.target.classList.remove('cards__like_active');
        removeLike(id, likesCounter);
      }
    });
    
likesCounter.textContent = likes;

const ownerId = owner;
if(ownerId === 'e262b97f0d05a1bc5248b5ec') {
 
  cardsDeleteBtn.style.display = 'block';
 
}



    cardsDeleteBtn.addEventListener("click", function () {
      cardsElement.remove();
      deleteCard(id);
    });
  
    cardsImg.addEventListener("click", function () {
      openPopup(cardImagePopup);
      cardImageLink.src = link;
      cardImageLink.alt = name;
      cardImageTitle.textContent = name;
    });
  
    return cardsElement;
  } 

  export function addCard(link, name) {
    
    const cardsElement = createCard(name, link);
    cardsContainer.prepend(cardsElement);
  }

  
export function handleAddFormSubmit(evt) {
    addCard(placeName.value, placeLink.value);
    addNewCard(placeName.value, placeLink.value);
    evt.preventDefault();
    profileFormAdd.reset();
    const btn = profileFormAdd.querySelector('.popup__button');
    btn.disabled = true;
    btn.classList.add('popup__button_inactive');
    closePopup(popupAddImage);
  }
  
 