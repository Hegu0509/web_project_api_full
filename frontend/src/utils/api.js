class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this.headers },
    };

    const token = localStorage.getItem("jwt");
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => console.error("Error:", error));
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  updateUser({ name, about }) {
    return this._makeRequest("/users/me", "PATCH", { name, about });
  }
  addCard({ name, link }) {
    return this._makeRequest("/cards", "POST", { name, link });
  }
  updateAvatar(avatar) {
    console.log(avatar);
    return this._makeRequest(`/users/me/avatar`, "PATCH", { avatar });
  }
  deleteCard(id) {
    return this._makeRequest(`/cards/${id}`, "DELETE");
  }

  changeLikeCardStatus(id, isLiked) {
    return this._makeRequest(`/cards/likes/${id}`, isLiked ? "PUT" : "DELETE");
  }

  signin({ email, password }) {
    return this._makeRequest("/signin", "POST", { email, password });
  }

  signup({ name, about, avatar, email, password }) {
    return this._makeRequest("/signup", "POST", {
      name,
      about,
      avatar,
      email,
      password,
    });
  }
}

const api = new Api({
  baseUrl: "https://api.bootcamp.jumpingcrab.com",
});
export default api;
