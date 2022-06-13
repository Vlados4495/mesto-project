const showInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

const setEventListeners = (config,formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

const toggleButtonState  = (config, inputList, buttonElement) => {
   
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.disabledButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(config.disabledButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
};


export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formListSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      
    });

   
    const fieldsetList = Array.from(formElement.querySelectorAll(config.formSet));

fieldsetList.forEach((fieldSet) => {
  setEventListeners(config, fieldSet);
});
  });
  
  
};


