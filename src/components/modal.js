// import { nameInput, jobInput, profileName, jobName, profilePopup, profileAvatar, avatarLink, avatarPopup, editButtonSave, profileAvatarSubmitBtn} from '../components/variables.js'; 

// import { Api } from './Api.js';

// //Открываем попап
// export function openPopup(popup) {
//     popup.classList.add("popup_opened");
//     document.addEventListener('keydown', closeByEscape);
//   }
//   //Закрываем попап
//  export function closePopup(popup) {
//     popup.classList.remove("popup_opened");
//     document.removeEventListener('keydown', closeByEscape);
//   }
  
//  export function handleProfileFormSubmit(evt) {
//   renderLoading(true, editButtonSave)
//     evt.preventDefault();
  
  
   
//     editUserData(nameInput.value, jobInput.value)
//     .then(res => {
//       profileName.textContent = nameInput.value;
//       jobName.textContent = jobInput.value;
//       closePopup(profilePopup);
//     })
//     .catch((err) => {
//       console.log(err.message)
//     })
   
//   }
  
//   export function handleProfileAvatarSubmit(evt) {
//     renderLoading(true, profileAvatarSubmitBtn)
//     evt.preventDefault();
//      changeAvatar(avatarLink.value)
//     .then(res => {
//       profileAvatar.src = avatarLink.value;
//       closePopup(avatarPopup);
//     })
//     .catch((err) => {
//       console.log(err.message)
//     })
   
  
    
//   }

//   //Заполненная форрма в профиле
//  export function openProfilePopup() {
//     nameInput.value = profileName.textContent;
//     jobInput.value = jobName.textContent;
//   }

//   function closeByEscape(evt) {
//     if (evt.key === 'Escape') {
//       const openedPopup = document.querySelector('.popup_opened')
//       closePopup(openedPopup);
//     }
//   }

//   function renderLoading(isLoading, btnSubmit) {
//     if (isLoading) {
//       btnSubmit.textContent = 'Сохранение...'
//     } else {
//       btnSubmit.textContent = 'Сохранить'
//     } }