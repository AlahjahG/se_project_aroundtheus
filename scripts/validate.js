function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function toggleButtonState(inputElements, submitButtonElement, options) {
  let foundInvalid = false;
  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      foundInvalid = true;
    }
  });
  // The inputElement parameter should be inputElements (an array), not a single element.
  // So, replace inputElement.forEach(...) with inputElements.forEach(...)
  if (foundInvalid) {
    submitButtonElement.classList.add(options.inactiveButtonClass);
    submitButtonElement.disabled = true;
  } else {
    submitButtonElement.classList.remove(options.inactiveButtonClass);
    submitButtonElement.disabled = false;
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [
    ...formElement.querySelectorAll(options.inputSelector),
  ];
  const submitButtonElement = formElement.querySelector(
    options.submitButtonSelector
  );
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButtonElement, options);
    });
  });

  const closeModal = formElement.querySelector(
    options.formSelector + " .modal__close"
  );
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      closePopup(formElement.closest(".modal"));
    });
  }
}

function resetValidation(formElement, options) {
  const inputElements = [
    ...formElement.querySelectorAll(options.inputSelector),
  ];
  const submitButtonElement = formElement.querySelector(
    options.submitButtonSelector
  );
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, options);
  });
  toggleButtonState(inputElements, submitButtonElement, options);
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(".modal__form")];

  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
