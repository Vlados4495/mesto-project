import { openPopup, closePopup } from '../components/modal.js'
import { cardImagePopup, cardsContainer, cardImageLink, cardImageTitle, placeName, placeLink, popupAddImage , profileFormAdd, confirmDeletePopup, cardsTemplate, btn} from '../components/variables.js'; 
import { addNewCard, addLike, removeLike, deleteCard} from '../components/api.js'
import { userId} from '../pages/index.js'

export default class card {
  constructor(link, name, owner, id, likes) {
    this.link = link
    this.name = name
    this.owner = owner
    this.id = id
    this.likes = likes
  }

  _getTemplate() {
    const cardsElement = cardsTemplate
    .querySelector(".cards__item")
    .cloneNode(true)

    return cardsElement
 }

    generateCard() {
      
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
    cardsImg.id = id
    cardsTitle.textContent = name;

    const likesCounter = cardsElement.querySelector(".cards__likes-counter");
    likesCounter.textContent = likes.length;

    if(likes.some(item => item._id === userId)) {
        cardsLikeBtn.classList.add('cards__like_active');
    }

  
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
    



if(owner=== userId) {
 
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
      addCard(res.link, res.name, res.owner._id, res._id, res.likes);
      evt.preventDefault();
      profileFormAdd.reset();
    
      btn.disabled = true;
      btn.classList.add('popup__button_inactive');
      closePopup(popupAddImage);
    })
    .catch((err) => {
      console.log(err.message)
    })
}