const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const addPostBtn = document.querySelector(".profile__add-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#name-post-modal");


const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardImageInput = document.querySelector("#card-image-input");
const cardCaptionInput = document.querySelector("#card-caption-input");

editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  editProfileModal.classList.add("modal_is-open");
});

addPostBtn.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-open");
});

document.querySelectorAll(".modal__close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").classList.remove("modal_is-open");
  });
});

profileFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  editProfileModal.classList.remove("modal_is-open");
});

addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log("Image URL:", cardImageInput.value);
  console.log("Caption:", cardCaptionInput.value);
  newPostModal.classList.remove("modal_is-open");
});
