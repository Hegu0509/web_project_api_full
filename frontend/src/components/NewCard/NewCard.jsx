import React from "react";
import line from "../../images/input_line.png";
import FormValidator from "../../utils/FormValidator";
import { useRef, useEffect } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const titleRef = useRef();
  const linkRef = useRef();
  const formRef = useRef();

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
    onAddPlaceSubmit({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
  };

  return (
    <form
      className="popup__form form"
      name="card-form"
      id="new-card-form"
      noValidate
      ref={formRef}
    >
      <fieldset className="form__fieldset">
        <div className="form__element">
          <input
            type="text"
            id="inputTitle"
            name="inputTitle"
            placeholder="Titulo"
            className="form__input"
            minLength="2"
            maxLength="30"
            required
            ref={titleRef}
          />

          <img
            src={line}
            alt="Linea de caja de texto"
            className="form__input-line"
          />
          <span className="form__input-error inputTitle-error"></span>
        </div>

        <div className="form__element">
          <input
            type="url"
            id="inputLink"
            name="inputLink"
            placeholder="Enlace de la imagen"
            className="form__input"
            required
            ref={linkRef}
          />

          <img
            src={line}
            alt="Linea de caja de texto"
            className="form__input-line"
          />
          <span className="form__input-error inputLink-error"></span>
        </div>

        <button type="submit" className="form__button" onClick={handleSubmit}>
          Crear
        </button>
      </fieldset>
    </form>
  );
}
