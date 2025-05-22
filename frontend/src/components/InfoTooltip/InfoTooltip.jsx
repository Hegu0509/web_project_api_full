import React from "react";
import CloseIcon from "../../images/icons/close.png";
import registerGood from "../../images/icons/allowed.png";
import registerError from "../../images/icons/notAllowed.png";

export default function InfoToolTip({ isRegistered, handleClose }) {
  console.log(open);
  return (
    <div className="popup popup-register">
      <div className="popup__overlay"></div>

      <div className="popup__wrapper-register">
        <img
          className="popup__image-register"
          src={isRegistered ? registerGood : registerError}
          alt="status"
        />

        <button
          type="button"
          className="popup__close-icon"
          onClick={handleClose}
        >
          <img src={CloseIcon} alt="imagén de una cruz" />
        </button>

        <p className="popup_register-title">
          {isRegistered
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}
