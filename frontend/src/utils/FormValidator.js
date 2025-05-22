export default class FormValidator {
  constructor(configForm, element) {
    this.configForm = configForm;
    this.element = element;
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.configForm.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.configForm.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.configForm.inputErrorClass);
    errorElement.classList.remove(this.configForm.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.configForm.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.configForm.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this.configForm.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this.configForm.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this.configForm.formSelector)
    );

    formList.forEach((formElement) => {
      formElement.addEventListener(this.element, (evt) => {
        evt.preventDefault();
      });

      const fieldsetList = Array.from(
        formElement.querySelectorAll(this.configForm.fieldsetSelector)
      );

      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
      });
    });
  }
}
