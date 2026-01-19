import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
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

// Constants //

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

const modalPreviewImage = document.querySelector("#profile-image-modal");
const closeModalPreviewBtn = document.querySelector(".modal__close-image");

const cardListEl = document.querySelector(".cards__list");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileCardForm = profileCardModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Function //

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscUp);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscUp);
}

function handleEscUp(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}

// Declare the variables for the preview modal in the global scope
const previewImage = document.querySelector(".modal__image");
const previewTitle = document.querySelector(".modal__image-title");

function handleImageClick(name, link) {
  previewImage.src = link;
  previewTitle.textContent = name;
  previewImage.alt = name;
  openPopup(modalPreviewImage);
}

// Function to render a card

function renderCard(cardData, initialCards) {
  const card = new Card(
    cardData,
    "#card__template",
    handleImageClick,
    initialCards
  );
  const cardElement = card.getView();
  cardsWrap.prepend(cardElement);
}

// Event Handler //
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  profileEditForm.reset();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;

  renderCard({ name, link });

  closePopup(profileCardModal);
  profileCardForm.reset();
}

// Form Validation //
const validateSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Initialize form validators
const profileEditFormValidator = new FormValidator(
  validateSettings,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const profileCardFormValidator = new FormValidator(
  validateSettings,
  profileCardForm
);
profileCardFormValidator.enableValidation();

// Event Listeners //

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditFormValidator.resetValidation();

  openPopup(profileEditModal);
});

closeProfileModal.addEventListener("click", () => {
  closePopup(profileEditModal);
  profileEditFormValidator.resetValidation(profileEditForm);
  profileEditForm.reset();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileCardForm.addEventListener("submit", handleAddCardFormSubmit);

addCardBtn.addEventListener("click", () => {
  openPopup(profileCardModal);
});

profileCardCloseModal.addEventListener("click", () => {
  closePopup(profileCardModal);
  profileCardForm.reset();
});

closeModalPreviewBtn.addEventListener("click", () => {
  closePopup(modalPreviewImage);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePopup(modal);
    }
  });
});
