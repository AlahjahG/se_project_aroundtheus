import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._PopupForm = this._popupElement.querySelector(".modal__form");
    this._submitHandler = submitHandler;
  }

  close() {
    super.close();
    this._PopupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._PopupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  _getInputValues() {
    this._inputList = this._PopupForm.querySelectorAll(".modal__input");
    this._formValues = {
      title: this._inputList[0].value,
      link: this._inputList[1].value,
    };
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
}

export default PopupWithForm;
