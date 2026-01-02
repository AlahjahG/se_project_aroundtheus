class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _toggleButtonState(inputElements, submitButtonElement) {
    if (this._hasInvalidInput(inputElements)) {
      submitButtonElement.classList.add(this._inactiveButtonClass);
      submitButtonElement.disabled = true;
    } else {
      submitButtonElement.classList.remove(this._inactiveButtonClass);
      submitButtonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputElements) {
    return inputElements.some((inputElement) => !inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}_error`
    );
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  }

  _setEventListeners() {
    const inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    const submitButtonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElements, submitButtonElement);
      });
    });
  }

  resetValidation() {
    const inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    const submitButtonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputElements.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}_error`
      );
      inputElement.classList.remove(this._inputErrorClass);
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
      }
    });

    this._toggleButtonState(inputElements, submitButtonElement);
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
