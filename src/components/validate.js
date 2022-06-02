import { addButtonSave, editButtonSave } from '../components/variables.js'; 

export const formSubmit = (event) => {
    event.preventDefault();
  };
  //Попап добавления места, проверяем валидность
  export const checkInputValidity = (config, form, input) => {
    const errorMessage = form.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      errorMessage.textContent = "";
      input.classList.remove(config.inputErrorClass);
    } else {
      errorMessage.textContent = input.validationMessage;
      input.classList.add(config.inputErrorClass);
    }
  };
  //Ред профиль валидность
  export const checkEditInputValidity = (config, editForm, input) => {
    const errorMessage = editForm.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      errorMessage.textContent = "";
      input.classList.remove(config.inputErrorClass);
    } else {
      errorMessage.textContent = input.validationMessage;
      input.classList.add(config.inputErrorClass);
    }
  };
  
  export const checkButtonValidity = (config, form, addButtonSave) => {
    if (form.checkValidity()) {
      addButtonSave.removeAttribute("disabled", "");
      addButtonSave.classList.remove(config.disabledButtonClass);
    } else {
      addButtonSave.setAttribute("disabled", "");
      addButtonSave.classList.add(config.disabledButtonClass);
    }
  };
  
  export const checkEditButtonValidity = (config, editForm, editButtonSave) => {
    if (editForm.checkValidity()) {
      editButtonSave.removeAttribute("disabled", "");
      editButtonSave.classList.remove(config.disabledButtonClass);
    } else {
      editButtonSave.setAttribute("disabled", "");
      editButtonSave.classList.add(config.disabledButtonClass);
    }
  };
  
  export function enableValidation(config) {
    //Подключаем формы
    const form = document.querySelector(config.formSelector);
    const editForm = document.querySelector(config.editFormSelector);
  
    form.addEventListener("submit", formSubmit);
    editForm.addEventListener("submit", formSubmit);
  
    const editFormInputs = editForm.querySelectorAll(config.inputSelector);
  
    const inputs = form.querySelectorAll(config.inputSelector);
  
  
    checkButtonValidity(config, form, addButtonSave);
    checkEditButtonValidity(config, editForm, editButtonSave);
  
    editFormInputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        checkEditInputValidity(config, editForm, input);
        checkEditButtonValidity(config, editForm, editButtonSave);
      });
    });
  
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => {
        checkInputValidity(config, form, input);
        checkButtonValidity(config, form, addButtonSave);
      });
    });
  }