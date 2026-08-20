import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fab1123a-2719-4ac9-92b1-75f431aa66e0",
    "Content-Type": "application/json",
  },
});

api.getAppInfo().then(([cardsData, userData]) => {
  console.log("Cards Data:", cardsData);
  console.log("User Data:", userData);

  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
  });
});

api.setUserInfo({
  name: "Alahjah",
  about: "Filmmaker and Developer",
});
// Constants //

const cardsWrap = document.querySelector(".cards__list");
const profileEditBtn = document.querySelector("#profile-edit-button");
const addCardBtn = document.querySelector("#add-card-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCardModal = document.querySelector("#profile-card-modal");
const profileCardCloseModal = document.querySelector(
  "#profile-close-card-modal",
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
  "#profile-description-input",
);

const modalPreviewImage = document.querySelector("#profile-image-modal");
const closeModalPreviewBtn = document.querySelector(".modal__close-image");

const cardListEl = document.querySelector(".cards__list");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileCardForm = profileCardModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Function //

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscUp);
// }

// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscUp);
// }

// function handleEscUp(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     if (openedModal) {
//       closePopup(openedModal);
//     }
//   }
// }

// Declare the variables for the preview modal in the global scope
const previewImage = document.querySelector(".modal__image");
const previewTitle = document.querySelector(".modal__image-title");

function handleImageClick(name, link) {
  previewImage.src = link;
  previewTitle.textContent = name;
  previewImage.alt = name;
  imagePopup.open();
}

// Function to render a card

// function renderCard(cardData) {
//   const card = new Card(cardData, "#card__template", handleImageClick);
//   const cardElement = card.getView();
//   cardsWrap.prepend(cardElement);
// }

// Event Handler //
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;

  renderCard({ name, link });

  closePopup(profileCardModal);
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
  profileEditForm,
);
profileEditFormValidator.enableValidation();

const profileCardFormValidator = new FormValidator(
  validateSettings,
  profileCardForm,
);
profileCardFormValidator.enableValidation();

// Event Listeners //

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditFormValidator.resetValidation();

  editProfilePopup.open();
});

closeProfileModal.addEventListener("click", () => {
  editProfilePopup.close();
});

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// profileCardForm.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach(renderCard);

addCardBtn.addEventListener("click", () => {
  newCardPopup.open();
});

profileCardCloseModal.addEventListener("click", () => {
  newCardPopup.close();
});

closeModalPreviewBtn.addEventListener("click", () => {
  imagePopup.close();
});

// User Info instance

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

// section instance

const cardSection = new Section({
  items: initialCards,
  containerSelector: ".cards__list",
  renderer: (item) => {
    const card = new Card(item, "#card__template", handleImageClick);
    const cardElement = card.getView();
    cardSection.addItem(cardElement);
  },
});
cardSection.renderItems();

// Popup instance

const imagePopup = new Popup("#profile-image-modal", handleImageClick);
imagePopup.setEventListeners();
// PopupWithForm instance

const newCardPopup = new PopupWithForm(" #profile-card-modal", (formData) => {
  const name = formData["title"];
  const link = formData["description"];
  const cardData = { name, link };
  const card = new Card(cardData, "#card__template", handleImageClick);
  const cardElement = card.getView();
  cardSection.addItem(cardElement);
});

newCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData["name"],
      about: formData["about"],
    });
  },
);

editProfilePopup.setEventListeners();

// PopupWithImage instance

const imagePopupWithImage = new PopupWithImage("#profile-image-modal");
imagePopupWithImage.setEventListeners();
