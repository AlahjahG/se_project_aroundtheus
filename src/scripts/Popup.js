export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    //open the popup by adding the "modal_opened" class to the popup element
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    //close the popup by removing the "modal_opened" class from the popup element
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose() {
    //close the popup when the "Escape" key is pressed
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //add event listeners to the popup element to close the popup when the user clicks on the close button or clicks outside the popup content
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
