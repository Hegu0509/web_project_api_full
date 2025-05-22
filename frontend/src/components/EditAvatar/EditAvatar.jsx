import React from "react";
import line from "../../images/input_line.png";
import FormValidator from "../../utils/FormValidator";
import { useRef, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
export default function EditAvatar() {
  const avatarRef = useRef();
  const formRef = useRef();
  const { handleUpdateAvatar } = React.useContext(CurrentUserContext);

  const formConfig = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    fieldsetSelector: ".form__fieldset",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  };

  useEffect(() => {
    const formValidator = new FormValidator(formConfig, formRef.current);
    formValidator.enableValidation();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateAvatar(avatarRef.current.value);
  };

  return (
    <form
      className="popup__form form"
      name="card-form"
      id="edit-avatar-form"
      noValidate
      ref={formRef}
    >
      <fieldset className="form__fieldset">
        <div className="form__element">
          <input
            type="url"
            id="inputLink"
            name="inputLink"
            ref={avatarRef}
            placeholder="Enlace de la imagen"
            className="form__input"
            required
          />

          <img
            src={line}
            alt="Linea de caja de texto"
            className="form__input-line"
          />
          <span className="form__input-error inputLink-error"></span>
        </div>

        <button type="submit" className="form__button" onClick={handleSubmit}>
          Guardar
        </button>
      </fieldset>
    </form>
  );
}
