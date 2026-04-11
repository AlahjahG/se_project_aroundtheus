class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._popupElement.querySelector(".modal__image").src = link;
    this._popupElement.querySelector(".modal__caption").textContent = name;
    super.open();
  }
}

export default PopupWithImage;
