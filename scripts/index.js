
import "../pages/index.css";
import {
  enableValidation,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../src/components/Api.js";

document.addEventListener("DOMContentLoaded", () => {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "208db24f-c486-4bc9-86fd-a521fd1db8d7",
      "Content-Type": "application/json",
    },
  });

  const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };

  const initialCards = [
    {
      name: "Golden Gate Bridge",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
    {
      name: "Val Thorens",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
      name: "Restaurant terrace",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
      name: "An outdoor cafe",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
      name: "A very long bridge, over the forest and through the trees",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
      name: "Tunnel with morning light",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
      name: "Mountain house",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },
  ];

  const cardTemplate = document.querySelector("#card-template").content;
  const cardsList = document.querySelector(".cards__list");

  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(
    ".profile__description"
  );
  const editButton = document.querySelector(".profile__edit-btn");
  const addButton = document.querySelector(".profile__add-btn");

  const editModal = document.querySelector(".modal_type_edit");
  const avatarModal = document.querySelector(".modal_type_avatar");
  const addModal = document.querySelector(".modal_type_add");
  const imagePreviewModal = document.querySelector("#image-preview-modal");
  const deleteModal = document.querySelector(".modal_type_delete");

  const avatarEditButton = document.querySelector(
    ".profile__avatar-edit-btn"
  );
  const avatarImage = document.querySelector(".profile__avatar");
  const avatarForm = avatarModal.querySelector(".modal__form");
  const avatarLinkInput = avatarForm.querySelector("#avatar-link");

  const closeButtons = document.querySelectorAll(".modal__close");

  const editForm = editModal.querySelector(".modal__form");
  const nameInput = editForm.querySelector("#profile-name");
  const descriptionInput = editForm.querySelector("#profile-description");

  const addForm = addModal.querySelector(".modal__form");
  const cardTitleInput = addForm.querySelector("#card-title");
  const cardLinkInput = addForm.querySelector("#card-link");

  const previewImage = imagePreviewModal.querySelector(".modal__image");
  const previewCaption = imagePreviewModal.querySelector(".modal__caption");

  const confirmDeleteButton = deleteModal.querySelector(
    ".modal__button_type_delete"
  );
  const cancelDeleteButton = deleteModal.querySelector(
    ".modal__button_type_cancel"
  );

  let cardToDelete = null;
  let isDeleting = false;

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

      if (openedModal) {
        if (openedModal === deleteModal && isDeleting) {
          return;
        }

        closeModal(openedModal);

        if (openedModal === deleteModal) {
          cardToDelete = null;
        }
      }
    }
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");

      if (modal === deleteModal && isDeleting) {
        return;
      }

      closeModal(modal);

      if (modal === deleteModal) {
        cardToDelete = null;
      }
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target === modal) {
        if (modal === deleteModal && isDeleting) {
          return;
        }

        closeModal(modal);

        if (modal === deleteModal) {
          cardToDelete = null;
        }
      }
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

    if (data.isLiked) {
      likeButton.classList.add("card__like-btn_active");
    }

    likeButton.addEventListener("click", () => {
      if (!data._id) {
        likeButton.classList.toggle("card__like-btn_active");
        return;
      }

      const request = likeButton.classList.contains(
        "card__like-btn_active"
      )
        ? api.unlikeCard(data._id)
        : api.likeCard(data._id);

      request
        .then((updatedCard) => {
          if (updatedCard.isLiked) {
            likeButton.classList.add("card__like-btn_active");
          } else {
            likeButton.classList.remove("card__like-btn_active");
          }
        })
        .catch((err) => {
          console.error("Error updating like:", err);
        });
    });

    deleteButton.addEventListener("click", () => {
      if (isDeleting) {
        return;
      }

      cardToDelete = { card, data };
      openModal(deleteModal);
    });

    cardImage.addEventListener("click", () => {
      previewImage.src = data.link;
      previewImage.alt = data.name;
      previewCaption.textContent = data.name;
      openModal(imagePreviewModal);
    });

    return cardElement;
  }

  confirmDeleteButton.addEventListener("click", () => {
    if (!cardToDelete || isDeleting) {
      return;
    }

    const selectedCard = cardToDelete;

    if (!selectedCard.data._id) {
      selectedCard.card.remove();
      cardToDelete = null;
      closeModal(deleteModal);
      return;
    }

    isDeleting = true;
    confirmDeleteButton.disabled = true;
    confirmDeleteButton.textContent = "Deleting...";

    api
      .deleteCard(selectedCard.data._id)
      .then(() => {
        selectedCard.card.remove();
        cardToDelete = null;
        closeModal(deleteModal);
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      })
      .finally(() => {
        isDeleting = false;
        confirmDeleteButton.disabled = false;
        confirmDeleteButton.textContent = "Yes, delete";
      });
  });

  cancelDeleteButton.addEventListener("click", () => {
    if (isDeleting) {
      return;
    }

    cardToDelete = null;
    closeModal(deleteModal);
  });

  function renderCard(item) {
    const cardElement = createCard(item);
    cardsList.prepend(cardElement);
  }

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;

      const placeholderAvatar =
        "https://practicum-content.s3.amazonaws.com/resources/avatar_placeholder_1704989734.svg";

      avatarImage.src =
        userData.avatar && userData.avatar !== placeholderAvatar
          ? userData.avatar
          : "./images/avatar.jpg";

      cardsList.innerHTML = "";

      if (Array.isArray(cardsData)) {
        cardsData.forEach(renderCard);
      } else {
        initialCards.forEach(renderCard);
      }
    })
    .catch((err) => {
      console.error("Error loading profile or cards:", err);

      avatarImage.src = "./images/avatar.jpg";
      cardsList.innerHTML = "";
      initialCards.forEach(renderCard);
    });

  editButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    resetValidation(editForm, validationConfig);
    openModal(editModal);
  });

  avatarEditButton.addEventListener("click", () => {
    avatarForm.reset();
    openModal(avatarModal);
  });

  addButton.addEventListener("click", () => {
    addForm.reset();
    resetValidation(addForm, validationConfig);
    openModal(addModal);
  });

  editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const saveButton = editForm.querySelector('button[type="submit"]');
    const originalText = saveButton.textContent;

    saveButton.textContent = "Saving...";
    saveButton.disabled = true;

    api
      .updateUserInfo({
        name: nameInput.value,
        about: descriptionInput.value,
      })
      .then((userData) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(editModal);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      })
      .finally(() => {
        saveButton.textContent = originalText;
        saveButton.disabled = false;
      });
  });

  avatarForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const saveButton = avatarForm.querySelector('button[type="submit"]');
    const originalText = saveButton.textContent;

    saveButton.textContent = "Saving...";
    saveButton.disabled = true;

    api
      .updateAvatar({
        avatar: avatarLinkInput.value,
      })
      .then((userData) => {
        avatarImage.src = userData.avatar;
        closeModal(avatarModal);
        avatarForm.reset();
      })
      .catch((err) => {
        console.error("Error updating avatar:", err);
      })
      .finally(() => {
        saveButton.textContent = originalText;
        saveButton.disabled = false;
      });
  });

  addForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const saveButton = addForm.querySelector('button[type="submit"]');
    const originalText = saveButton.textContent;

    saveButton.textContent = "Saving...";
    saveButton.disabled = true;

    api
      .addCard({
        name: cardTitleInput.value,
        link: cardLinkInput.value,
      })
      .then((newCard) => {
        renderCard(newCard);
        addForm.reset();
        resetValidation(addForm, validationConfig);
        closeModal(addModal);
      })
      .catch((err) => {
        console.error("Error adding card:", err);
      })
      .finally(() => {
        saveButton.textContent = originalText;
        saveButton.disabled = !addForm.checkValidity();
        saveButton.classList.toggle(
          validationConfig.inactiveButtonClass,
          saveButton.disabled
        );
      });
  });

  enableValidation(validationConfig);
});
