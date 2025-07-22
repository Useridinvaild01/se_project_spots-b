const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#name-post-modal");

const profileFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const jobInput = editProfileModal.querySelector("#profile-discription-input");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardLinkInput = newPostModal.querySelector("#Card-image-input");
const cardCaptionInput = newPostModal.querySelector("#Card-caption-input");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPostBtn = document.querySelector(".profile__add-btn");

const closeButtons = document.querySelectorAll(".modal__close-btn");

const cardsList = document.querySelector(".cards__list");

function openModal(modal) {
  if (modal === editProfileModal) {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
  }
  modal.classList.add("modal_is-open");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}

editProfileBtn.addEventListener("click", () => openModal(editProfileModal));
addPostBtn.addEventListener("click", () => openModal(newPostModal));

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = document.createElement("li");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <img src="${cardLinkInput.value}" alt="${cardCaptionInput.value}" class="card__image" />
    <div class="card__content">
      <h2 class="card__title">${cardCaptionInput.value}</h2>
      <button type="button" class="card__like-btn" aria-label="Like this post"></button>
    </div>
  `;

  cardsList.prepend(newCard);

  addCardFormElement.reset();
  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
