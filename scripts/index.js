const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);

const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-discription-input"
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
  editProfileModal.classList.add("modal_is-open"); // ✅ Fixed to match CSS
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEL.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-open");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const newPostBtn = document.querySelector(".profile__add-btn"); // ✅ Fixed
const newPostModal = document.querySelector("#name-post-modal"); // ✅ Fixed
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = addCardFormElement.querySelector(".modal__input_type_name");
const linkInput = addCardFormElement.querySelector(".modal__input_type_link");

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-open");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-open");
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log("Name:", nameInput.value);
  console.log("Link:", linkInput.value);
  newPostModal.classList.remove("modal_is-open");
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
