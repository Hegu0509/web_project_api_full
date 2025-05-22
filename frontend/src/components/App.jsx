import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import api from "./../utils/api";
import auth from "./../utils/auth";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoToolTip from "./InfoTooltip/InfoTooltip";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { CurrentUserContext } from "./../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(console.error);

      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkUserInfo();
    } else {
      navigate("/login");
    }
  }, []);

  const checkUserInfo = () => {
    auth.getUserInfo().then((data) => {
      if (data) {
        setEmail(data.email);
        setLoggedIn(true);
        navigate("/home");
      }
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser();
    setLoggedIn(false);
    setEmail("");
    navigate("/login");
  };

  const onLogin = (email, password) => {
    return auth
      .login(email, password)
      .then(({ token }) => {
        console.log("token", token);
        if (token) {
          localStorage.setItem("jwt", token);
          checkUserInfo();
        }
      })
      .catch(() => {
        setIsRegistered(false);
        setOpen(true);
      });
  };

  const onRegister = (email, password) => {
    return auth
      .register(email, password)
      .then((data) => {
        console.log("onRegister", data);
        if (data && data._id) {
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
        setOpen(true);
      })
      .catch((error) => {
        setOpen(true);
        setIsRegistered(false);
        console.log("error register", error);
      });
  };

  function handleUpdateUser(user) {
    api.updateUser(user).then((newUser) => {
      setCurrentUser(newUser);
      handleClosePopup();
    });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((updateUser) => {
        setCurrentUser(updateUser);
      })
      .then(() => {
        handleClosePopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes?.includes(currentUser?._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        handleClosePopup();
      })
      .catch((error) => {
        console.log("Invalid", error);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          popup,
          cards,
          handleUpdateUser,
          handleUpdateAvatar,
          handleCardLike,
          handleCardDelete,
          handleAddPlaceSubmit,
        }}
      >
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header handleLogout={handleLogOut} email={email} />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              {true && (
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute loggedIn={loggedIn}>
                      <>
                        <Main
                          onOpenPopup={handleOpenPopup}
                          onClosePopup={handleClosePopup}
                          popup={popup}
                        />
                      </>
                    </ProtectedRoute>
                  }
                />
              )}
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              <Route
                path="/register"
                element={<Register onRegister={onRegister} />}
              />
            </Route>
          </Routes>

          {open && (
            <InfoToolTip
              isRegistered={isRegistered}
              handleClose={handleClose}
            />
          )}

          <script type="module" src="./index.js"></script>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
