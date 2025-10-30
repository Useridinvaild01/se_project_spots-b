export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    function showInputError(input) {
      const error = form.querySelector(`#${input.id}-error`);
      input.classList.add(config.inputErrorClass);
      error.textContent = input.validationMessage;
    }

    function hideInputError(input) {
      const error = form.querySelector(`#${input.id}-error`);
      input.classList.remove(config.inputErrorClass);
      error.textContent = "";
    }

    function checkInputValidity(input) {
      if (!input.validity.valid) showInputError(input);
      else hideInputError(input);
    }

    function toggleButtonState() {
      if (form.checkValidity()) {
        submitButton.disabled = false;
        submitButton.classList.remove(config.inactiveButtonClass);
      } else {
        submitButton.disabled = true;
        submitButton.classList.add(config.inactiveButtonClass);
      }
    }

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        checkInputValidity(input);
        toggleButtonState();
      });
    });

    toggleButtonState(); // initialize button state
  });
}
