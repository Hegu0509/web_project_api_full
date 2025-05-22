import React from "react";
import NewCard from "../NewCard/NewCard";
import Popup from "./components/Popup/Popup";
import EditProfile from "../EditProfile/EditProfile";
import EditAvatar from "../EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import pen from "../../images/icons/pen.png";
import editButton from "../../images/icons/edit.svg";

import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

export default function Main(props) {
  let { currentUser } = React.useContext(CurrentUserContext);
  const { popup } = React.useContext(CurrentUserContext);
  const { cards } = React.useContext(CurrentUserContext);
  const { handleCardLike } = React.useContext(CurrentUserContext);
  const { handleCardDelete } = React.useContext(CurrentUserContext);
  const { handleAddPlaceSubmit } = React.useContext(CurrentUserContext);
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile" id="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img
              src={currentUser?.avatar}
              alt="Foto de Jacques Cousteau"
              className="profile__avatar"
            />
            <div className="overlay">
              <img
                src={pen}
                alt="Icono editar foto"
                className="profile__avatar-icon"
                onClick={() => props.onOpenPopup(editAvatarPopup)}
              />
            </div>
          </div>

          <div className="profile__info-column">
            <div className="profile__info-row">
              <p className="profile__info-name">{currentUser?.name}</p>
              <button
                className="profile__info-edit-button"
                type="button"
                onClick={() => props.onOpenPopup(editProfilePopup)}
              >
                <img src={editButton} alt="Icono editar" />
              </button>
            </div>

            <p className="profile__info-occupation">{currentUser?.about}</p>
          </div>
        </div>
        <button
          className="profile__info-add-button"
          type="button"
          onClick={() => props.onOpenPopup(newCardPopup)}
        >
          +
        </button>
      </section>

      <section>
        <ul className="place-grid">
          {cards.map((card) => (
            <Card
              onClick={props.onOpenPopup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              key={card._id}
              card={card}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={props.onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
