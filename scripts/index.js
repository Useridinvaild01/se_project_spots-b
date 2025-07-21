const profileEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector("#profile-discription-input");

const addPostBtn = document.querySelector(".profile__add-btn");
const addPostModal = document.querySelector("#name-post-modal");
const addPostCloseBtn = addPostModal.querySelector(".modal__close-btn");
const addPostForm = addPostModal.querySelector(".modal__form");
const postImageInput = document.querySelector("#Card-image-input");
const postCaptionInput = document.querySelector("#Card-caption-input");

const cardsList = document.querySelector(".cards__list");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


function openModal(modal) {
  modal.classList.add("modal_is-open");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}

profileEditBtn.addEventListener("click", () => openModal(editProfileModal));
editProfileCloseBtn.addEventListener("click", () => closeModal(editProfileModal));

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
});

addPostBtn.addEventListener("click", () => openModal(addPostModal));
addPostCloseBtn.addEventListener("click", () => closeModal(addPostModal));

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = document.createElement("li");
  newCard.classList.add("card");

  newCard.innerHTML = `
    <img src="${postImageInput.value}" alt="${postCaptionInput.value}" class="card__image" />
    <div class="card__content">
      <h2 class="card__title">${postCaptionInput.value}</h2>
      <button type="button" class="card__like-btn" aria-label="Like this post"></button>
    </div>
  `;

  cardsList.prepend(newCard);
  addPostForm.reset();
  closeModal(addPostModal);
});