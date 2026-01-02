export default class Card {
  constructor({ name, link }, cardSelector) {
    this.name = name;
    this.link = link;
    this.cardSelector = cardSelector;
  }

  _setEventListeners(cardElement) {
    // like button
    this.cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    // delete button
    const deleteButton = this.cardElement.querySelector(".card__delete-button");
  }

  _handleLikeButton() {
    this.cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getTemplate() {
    const cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // set event listeners
    this._setEventListeners(cardElement);
  }
}
