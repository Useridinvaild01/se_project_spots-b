const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__forum")
const editlProfileNameInput = editProfileModal.querySelector("#profile-name-input")
const editlProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input")

const newPostBtn = document.querySelector(".profile__newpost-btn");
const newPostmodal = document.querySelector("#new-post-modal");
const newPostCLosdBtn = document.querySelector("modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function() {
 editProfileModal.classList.add(modal_is-opened);
});

editPRofileCloseBtn.addEventListener("click", function() {
    editlProfileNameInput.value= profileNameEl.textContent;
   // TODO- fill desctription input
    editProfileModal.classList.remove(modal_is-opened);
});

editProfileBtn.addEventListener("click", function() {
 newPostmodal.classList.add(modal_is-opened);
});

editPRofileCloseBtn.addEventListener("click", function() {
    newPostmodal.classList.remove(modal_is-opened);
});
function handleEditProfileSubmit(evt){
    evt.preventDefault();
    ProfileNameEl.textContent = editProfileNameInput.value;
    //TODO - handle the other input
    editProfileModal.classList.remove("modal_is-opened");

}

editProofileForm.addEventListener("submit", handleEditProfileSubmit);