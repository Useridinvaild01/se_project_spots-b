const initialCards = [
  { name: "Val Thorens", link: "./images/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "./images/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "./images/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest...", link: "./images/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "./images/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "./images/6-photo-by-moritz-feldmann-from-pexels.jpg" }
];

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".cards__list");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = document.forms["profile-form"];
const editProfileNameInput = editProfileForm.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileForm.querySelector("#profile-description-input");

const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = document.forms["post-form"];
const newPostImageInput = newPostForm.querySelector("#card-image-input");
const newPostCaptionInput = newPostForm.querySelector("#card-caption-input");

const imagePreviewModal = document.querySelector("#image-preview-modal");
const previewImage = imagePreviewModal.querySelector(".modal__image");
const previewCaption = imagePreviewModal.querySelector(".modal__caption");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const newPostBtn = document.querySelector(".profile__add-btn");
const closeButtons = document.querySelectorAll(".modal__close-btn");


function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", closeModalOnEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", closeModalOnEsc);
}

function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-open");
    if (openedModal) closeModal(openedModal);
  }
}


document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});


function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-btn_active");
  });

  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".card").remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardElement;
}


function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

initialCards.forEach(cardData => renderCard(cardData));


editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = { name: newPostCaptionInput.value, link: newPostImageInput.value };
  renderCard(newCard);
  newPostForm.reset();
  closeModal(newPostModal);
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});
