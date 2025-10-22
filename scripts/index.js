document.addEventListener("DOMContentLoaded", () => {
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

  const editProfileModal = document.querySelector(".modal_type_edit");
  const addCardModal = document.querySelector(".modal_type_add");
  const imagePreviewModal = document.querySelector("#image-preview-modal");

  const editProfileForm = editProfileModal.querySelector(".modal__form");
  const nameInput = editProfileForm.querySelector("#profile-name");
  const descriptionInput = editProfileForm.querySelector("#profile-description");

  const addCardForm = addCardModal.querySelector(".modal__form");
  const cardTitleInput = addCardForm.querySelector("#card-title");
  const cardLinkInput = addCardForm.querySelector("#card-link");

  const previewImage = imagePreviewModal?.querySelector(".modal__image");
  const previewCaption = imagePreviewModal?.querySelector(".modal__caption");

  const editButton = document.querySelector(".profile__edit-btn");
  const addButton = document.querySelector(".profile__add-btn");
  const closeButtons = document.querySelectorAll(".modal__close");



  function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      if (openedModal) closeModal(openedModal);
    }
  }

  function resetValidation(formEl) {
    const inputs = formEl.querySelectorAll(".modal__input");
    const errors = formEl.querySelectorAll(".modal__error");
    inputs.forEach((input) => input.classList.remove("modal__input_type_error"));
    errors.forEach((error) => (error.textContent = ""));
  }

  function disableButton(buttonEl) {
    if (!buttonEl) return;
    buttonEl.classList.add("modal__button_disabled");
    buttonEl.disabled = true;
  }

  function createCard(data) {
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
      cardElement.querySelector(".card").remove?.() || cardElement.remove();
    });

    cardImage.addEventListener("click", () => {
      if (previewImage && previewCaption) {
        previewImage.src = data.link;
        previewImage.alt = data.name;
        previewCaption.textContent = data.name;
        openModal(imagePreviewModal);
      }
    });

    return cardElement;
  }

  function renderCard(item) {
    const cardElement = createCard(item);
    cardsList.prepend(cardElement);
  }


  initialCards.forEach(renderCard);

  if (editButton) {
    editButton.addEventListener("click", () => {
      nameInput.value = profileName.textContent;
      descriptionInput.value = profileDescription.textContent;
      resetValidation(editProfileForm);
      openModal(editProfileModal);
    });
  }

  if (addButton) {
    addButton.addEventListener("click", () => {
      resetValidation(addCardForm);
      openModal(addCardModal);
    });
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
  });


  editProfileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editProfileModal);
  });

  addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };
    renderCard(newCard);
    addCardForm.reset();
    disableButton(addCardForm.querySelector(".modal__button"));
    closeModal(addCardModal);
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeModal(modal);
      }
    });
  });
});

