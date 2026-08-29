export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this.name = data.name;
    this.link = data.link;
    this._id = data._id;
    this.cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._element = this.getTemplate();
    const cardImageEl = this._element.querySelector(".card__photo");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const likeButton = this._element.querySelector(".card__like-button");

    const cardTitleEl = this._element.querySelector(".card__title");
    cardTitleEl.textContent = this.name;
    cardImageEl.src = this.link;
    cardImageEl.alt = this.name;

    // delete button
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    // image click
    cardImageEl.addEventListener("click", () => {
      this.handleImageClick(this.name, this.link);
    });

    // like button
    likeButton.addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });
  }

  _handleDeleteClick() {
    this._handleDeleteClick(this);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  removeCard() {
    this._element.remove();
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

    this._setEventListeners();
    return this._element;
  }
}
