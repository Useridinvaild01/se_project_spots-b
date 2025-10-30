document.addEventListener("DOMContentLoaded", () => {
 
  const initialCards = [
    { name: "Val Thorens", link: "../images/1-photo-by-moritz-feldmann-from-pexels.jpg" },
    { name: "Restaurant terrace", link: "../images/2-photo-by-ceiline-from-pexels.jpg" },
    { name: "An outdoor cafe", link: "../images/3-photo-by-tubanur-dogan-from-pexels.jpg" },
    { name: "A very long bridge, over the forest...", link: "../images/4-photo-by-maurice-laschet-from-pexels.jpg" },
    { name: "Tunnel with morning light", link: "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
    { name: "Mountain house", link: "../images/6-photo-by-moritz-feldmann-from-pexels.jpg" }
  ];

 
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsList = document.querySelector(".cards__list");

  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  const editButton = document.querySelector(".profile__edit-btn");
  const addButton = document.querySelector(".profile__add-btn");

  const editModal = document.querySelector(".modal_type_edit");
  const addModal = document.querySelector(".modal_type_add");
  const imagePreviewModal = document.querySelector("#image-preview-modal");

  const closeButtons = document.querySelectorAll(".modal__close");

  const editForm = editModal.querySelector(".modal__form");
  const nameInput = editForm.querySelector("#profile-name");
  const descriptionInput = editForm.querySelector("#profile-description");

  const addForm = addModal.querySelector(".modal__form");
  const cardTitleInput = addForm.querySelector("#card-title");
  const cardLinkInput = addForm.querySelector("#card-link");

  const previewImage = imagePreviewModal.querySelector(".modal__image");
  const previewCaption = imagePreviewModal.querySelector(".modal__caption");

  
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

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("mousedown", (evt) => {
      if(evt.target === modal) closeModal(modal);
    });
  });


  function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector(".card");
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
      card.remove();
    });

    cardImage.addEventListener("click", () => {
      previewImage.src = data.link;
      previewImage.alt = data.name;
      previewCaption.textContent = data.name;
      openModal(imagePreviewModal);
    });

    return cardElement;
  }

  function renderCard(item) {
    const cardElement = createCard(item);
    cardsList.prepend(cardElement);
  }

  
  initialCards.forEach(renderCard);


  function showInputError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add("modal__input_type_error");
    error.textContent = input.validationMessage;
  }

  function hideInputError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove("modal__input_type_error");
    error.textContent = "";
  }

  function checkInputValidity(form, input) {
    if (!input.validity.valid) showInputError(form, input);
    else hideInputError(form, input);
  }

  function toggleButtonState(form) {
    const button = form.querySelector(".modal__button");
    if (form.checkValidity()) {
      button.disabled = false;
      button.classList.remove("modal__button_disabled");
    } else {
      button.disabled = true;
      button.classList.add("modal__button_disabled");
    }
  }

  function setFormListeners(form) {
    Array.from(form.querySelectorAll(".modal__input")).forEach(input => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input);
        toggleButtonState(form);
      });
    });
    toggleButtonState(form);
  }

  function resetForm(form) {
    form.reset();
    Array.from(form.querySelectorAll(".modal__input")).forEach(input => hideInputError(form, input));
    toggleButtonState(form);
  }

  setFormListeners(editForm);
  setFormListeners(addForm);

 
  editButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    resetForm(editForm);
    openModal(editModal);
  });

  addButton.addEventListener("click", () => {
    resetForm(addForm);
    openModal(addModal);
  });


  editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editModal);
  });

  addForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCard = { name: cardTitleInput.value, link: cardLinkInput.value };
    renderCard(newCard);
    resetForm(addForm);
    closeModal(addModal);
  });
});
