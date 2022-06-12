import { nameInput, jobInput, profileName, jobName, profilePopup } from '../components/variables.js'; 


//Открываем попап
export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEscape);
  }
  //Закрываем попап
 export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closeByEscape);
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

  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup);
    }
  }