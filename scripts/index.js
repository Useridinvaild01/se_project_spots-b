
const editProfileBtneEditBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm - editProfileModal.querySelector(".modal__form")
const editProfileNameInputprofileNameInput = document.querySelector("#profile-name-input");

const editProfileDescriptionInput = document.querySelector("#profile-discription-input");

const newdPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");


const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function() {
  editProfileNameInput.value = profileNameEl.textContent;
  //TODO 
  editProfileModal.classList.add("modal_is-opened");

  editProfileCloseBtn.addEventListener("click", function() {
    editProfileModal.classList.remove("modal_is-opened");
  });

  newPostBtn.addEventListener("click", function() {
    newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function() {
  newPostModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt){
  evt.preventDefault(); 
  profileNameEl.textContent = editProfileNameInput.value;
  //TODO
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit");
