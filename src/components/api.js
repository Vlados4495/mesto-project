export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-11",
  headers: {
    authorization: "2ce78970-65cf-4453-9ecd-08fb86edda40",
    "Content-Type": "application/json",
  }
};

export class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /* Проверяем ответ от сервера */
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
  }

  /* Получение инфо о пользователе */
    getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
    .then(res => this._checkResponse(res))
};

  /* Получение карточек с сервера */
    getInitialCards(res){
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers ,
    })
    .then(res => this._checkResponse(res))
   }

/* Добавляем новую карточку на сервер */

    addNewCard(link, name) {
    return fetch(`${this.baseUrl}/cards/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(res => this._checkResponse(res))
  }

  /* Удаляем карточку с сервера */
    deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => this._checkResponse(res))
  }

  /* Добавляем лайк на публикации */
    addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(res => this._checkResponse(res))
  }

  /* Убираем лайк на публикации */
    removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => this._checkResponse(res))
  }

/* Меняем аватарку профиля */
    changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => this._checkResponse(res))
  }

  /* Редатируем профиль */
    editUserData(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
  }

}

