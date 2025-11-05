function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    
    function showInputError(form, input, config) {
      const error = form.querySelector(`#${input.id}-error`);
      input.classList.add(config.inputErrorClass);
      error.textContent = input.validationMessage;
      error.classList.add(config.errorClass);
    }

    
    function hideInputError(form, input, config) {
      const error = form.querySelector(`#${input.id}-error`);
      input.classList.remove(config.inputErrorClass);
      error.textContent = "";
      error.classList.remove(config.errorClass);
    }

    
    function checkInputValidity(form, input, config) {
      if (!input.validity.valid) {
        showInputError(form, input, config);
      } else {
        hideInputError(form, input, config);
      }
    }

    
    function toggleButtonState(form, submitButton, config) {
      if (form.checkValidity()) {
        submitButton.disabled = false;
        submitButton.classList.remove(config.inactiveButtonClass);
      } else {
        submitButton.disabled = true;
        submitButton.classList.add(config.inactiveButtonClass);
      }
    }

    
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input, config);
        toggleButtonState(form, submitButton, config);
      });
    });

  
    toggleButtonState(form, submitButton, config);
  });
}

