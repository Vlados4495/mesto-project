import { nameInput, jobInput, profileName, jobName, profilePopup } from '../components/variables.js'; 

//Открываем попап
export function openPopup(popup) {
    popup.classList.add("popup_opened");
  }
  //Закрываем попап
 export function closePopup(popup) {
    popup.classList.remove("popup_opened");
  }
  
 export function handleProfileFormSubmit(evt) {

    evt.preventDefault();
  
  
    profileName.textContent = nameInput.value;
    jobName.textContent = jobInput.value;
  
    closePopup(profilePopup);
  }
  
  //Заполненная форрма в профиле
 export function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = jobName.textContent;
  }