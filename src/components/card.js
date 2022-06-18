import { openPopup, closePopup } from '../components/modal.js'
import { cardImagePopup, cardsContainer, cardImageLink, cardImageTitle, placeName, placeLink, popupAddImage , profileFormAdd, confirmDeletePopup, cardsTemplate} from '../components/variables.js'; 
import { addNewCard, addLike, removeLike, deleteCard} from '../components/api.js'
import { userId} from '../scripts/index.js'


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
    cardsImg.id = id
    cardsTitle.textContent = name;

    const likesCounter = cardsElement.querySelector(".cards__likes-counter");
    likesCounter.textContent = likes;

    cardsLikeBtn.addEventListener("click", function (evt) {
        if(!evt.target.classList.contains('cards__like_active')) {
       
        addLike(id, likesCounter)
        .then(res => {
          evt.target.classList.add('cards__like_active')
        })
        .catch((err) => {
          console.log(err.message)
        })
      } else {
       
        removeLike(id, likesCounter)
        .then(res => {
          evt.target.classList.remove('cards__like_active')
        })
        .catch((err) => {
          console.log(err.message)
        })
      }
    });
    


const ownerId = owner;
if(ownerId=== userId) {
 
  cardsDeleteBtn.style.display = 'block';
  cardsDeleteBtn.addEventListener("click", function () {
    deleteCard(id)
      .then(res => {
      cardsElement.remove();
    })
    .catch((err) => {
      console.log(err.message)
    })
    // openPopup(confirmDeletePopup)
})
  // const submitDeleteBtn = confirmDeletePopup.querySelector('.popup__button')
  // submitDeleteBtn.addEventListener("click", function () {
  //     cardsElement.remove();
  //     deleteCard(id);
  //     closePopup(confirmDeletePopup);
  // })
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
    .then(res => {
      addCard(placeLink.value, placeName.value)
      evt.preventDefault();
      profileFormAdd.reset();
      const btn = profileFormAdd.querySelector('.popup__button');
      btn.disabled = true;
      btn.classList.add('popup__button_inactive');
      closePopup(popupAddImage);
    })
    .catch((err) => {
      console.log(err.message)
    })
}