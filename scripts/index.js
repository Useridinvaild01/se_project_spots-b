
import "../pages/index.css";
import { enableValidation } from "../scripts/validation.js";
import Api from "../src/components/Api.js";

document.addEventListener("DOMContentLoaded", () => {
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "208db24f-c486-4bc9-86fd-a521fd1db8d7",
      "Content-Type": "application/json",
    },
  });

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

      if (openedModal) {
        closeModal(openedModal);
      }
    }
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".modal"));
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target === modal) {
        closeModal(modal);
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

  const isLiked = likeButton.classList.contains(
    "card__like-btn_active"
  );

  const request = isLiked
    ? api.unlikeCard(data._id)
    : api.likeCard(data._id);

  request
    .then((updatedCard) => {
      data.isLiked = updatedCard.isLiked;

      if (data.isLiked) {
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
      if (!data._id) {
        card.remove();
        return;
      }

      api
        .deleteCard(data._id)
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          console.error("Error deleting card:", err);
        });
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

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      console.log("Profile data:", userData);
      console.log("Cards data:", cardsData);
      console.log("Is cardsData an array?", Array.isArray(cardsData));

      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;

      cardsList.innerHTML = "";

      if (Array.isArray(cardsData) && cardsData.length > 1) {
        cardsData.forEach(renderCard);
      } else {
        initialCards.forEach(renderCard);
      }
    })
    .catch((err) => {
      console.error("Error loading profile or cards:", err);

      cardsList.innerHTML = "";
      initialCards.forEach(renderCard);
    });

  editButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editModal);
  });

  addButton.addEventListener("click", () => {
    addForm.reset();
    openModal(addModal);
  });

  editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

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
      });
  });

  addForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    api
      .addCard({
        name: cardTitleInput.value,
        link: cardLinkInput.value,
      })
      .then((newCard) => {
        renderCard(newCard);
        addForm.reset();
        closeModal(addModal);
      })
      .catch((err) => {
        console.error("Error adding card:", err);
      });
  });

  enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  });
});
