var initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
console.log(initialCards);

const cardsWrap = document.querySelector(".cards__list");
const profileEditBtn = document.querySelector("#profile-edit-button");
const addCardBtn = document.querySelector("#add-card-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCardModal = document.querySelector("#profile-card-modal");
const profileCardCloseModal = document.querySelector(
  "#profile-close-card-modal"
);
const closeProfileModal = document.querySelector("#profile-close-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImage = document.querySelector(".card__photo");
const cardTitle = document.querySelector(".card__title");
const cardDescriptionInput = document.querySelector("#card-description-input");
const cardImageInput = document.querySelector("#card-image-input");
const cardDescription = document.querySelector(".card__description");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardListEl = document.querySelector(".cards__list");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileCardForm = profileCardModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Function //

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  profileCardModal.classList.remove("modal_opened");
}

function renderCard(cardData, Wrapper) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

// Function to create a card element
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__photo");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;

  return cardElement;
}

// Event Handler //
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;

  renderCard({ name, link });

  closePopup();
}

// Event Listeners //

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileEditModal.classList.add("modal_opened");
});

closeProfileModal.addEventListener("click", () => {
  closePopup();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

addCardBtn.addEventListener("click", () => {
  profileCardModal.classList.add("modal_opened");
});

profileCardCloseModal.addEventListener("click", () => {
  closePopup();
});

const likeCardBtns = document.querySelectorAll(".card__like-button");
likeCardBtns.forEach((likeCardBtn) => {
  likeCardBtn.addEventListener("click", () => {
    likeCardBtn.classList.toggle("card__like-button_active");
  });
});
