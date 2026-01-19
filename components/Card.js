export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._element = this.getTemplate();
    const cardImageEl = this._element.querySelector(".card__photo");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const likeButton = this._element.querySelector(".card__like-button");

    // delete button
    deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    // image click
    cardImageEl.addEventListener("click", () => {
      this.handleImageClick(this.name, this.link);
    });

    likeButton.addEventListener("click", (evt) => this._handleLikeButton(evt));
    // like button
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  getTemplate() {
    return document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this.getTemplate();
    this._element.querySelector(".card__title").textContent = this.name;
    const cardImageEl = this._element.querySelector(".card__photo");
    cardImageEl.src = this.link;
    cardImageEl.alt = this.name;

    return this._element;
  }
}
