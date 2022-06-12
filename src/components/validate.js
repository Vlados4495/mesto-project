const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input-error_active');
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

const toggleButtonState  = (inputList, buttonElement) => {
   
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute("disabled", "");
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.removeAttribute("disabled", "");
  }
};


export const enableValidation = ({formListSelector, formSet}) => {
  const formList = Array.from(document.querySelectorAll(formListSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      
    });

   
    const fieldsetList = Array.from(formElement.querySelectorAll(formSet));

fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
});
  });
  
  
};


