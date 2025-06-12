const editProfileBtn = ocument.querySelector(".profile__edit-btn")
const editProfileModal = document.querySelector("#edit-profile-modal")
const editPRofileCloseBtn = editProfileModal.querySelector(".modal__close-btn")

const newPostBtn = document.querySelector(".profile__newpost-btn");
const newPostmodal = document.querySelector("#new-post-modal");
const newPstCLosdBtn = document.querySelector("modal__close-btn")

editProfileBtn.addEventListener("click", function() {
 editProfileModal.classList.add(modal_is-opened);
});

editPRofileCloseBtn.addEventListener("click", function() {
    editProfileModal.classList.remove(modal_is-opened);
});

editProfileBtn.addEventListener("click", function() {
 newPostmodal.classList.add(modal_is-opened);
});

editPRofileCloseBtn.addEventListener("click", function() {
    newPostmodal.classList.remove(modal_is-opened);
});
