import React from "react";
import logo from "../../images/logo_around.svg";
import lineHeader from "../../images/line_header.png";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

export default function Header({ handleLogout, email }) {
  let { currentUser } = React.useContext(CurrentUserContext);
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Logotipo Around US" className="header__logo" />
      <img
        src={lineHeader}
        alt="Linea para el encabezado"
        className="header__line"
      />

      <div className="header__user">
        <p className="header__user-email"> {currentUser ? email : ""}</p>

        {location.pathname == "/home" && (
          <a className="header__user-close" onClick={handleLogout}>
            Cerrar sesión
          </a>
        )}
      </div>
    </header>
  );
}
