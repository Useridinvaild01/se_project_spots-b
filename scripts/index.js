const editProfileBtn = document.querySelector(".profile__edit-btn");
const newPostForm = document.querySelector(".new-post-form");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__newpost-btn");
const newPostmodal = document.querySelector("new-post-modal");
const newPostClosedBtn = document.querySelector("modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  editProfileModal.classList.remove("modal_is-opened");
});

editProfileBtn.addEventListener("click", function () {
  newPostmodal.classList.add("modal_is-opened");
});

editProfileCloseBtn("click", function () {
  newPostmodal.classList.remove("modal_is-opened");
});
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
