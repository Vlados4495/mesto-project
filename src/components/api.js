export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
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
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(res => _checkResponse(res))

  };

  /* Получение карточек с сервера */
    getInitialCards(res){
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(res => _checkResponse(res))
   
  }
/* Добавляем новую карточку на сервер */

    addNewCard(link, name) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(res => _checkResponse(res))
  }

  /* Удаляем карточку с сервера */
    deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => _checkResponse(res))
  }

  /* Добавляем лайк на публикации */
    addLike(cardId, counter) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => _checkResponse(res))
    .then((res) => {
      counter.textContent = res.likes.length;
    })
  }

  /* Убираем лайк на публикации */
  removeLike(cardId, counter) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => _checkResponse(res))
    .then((res) => {
      counter.textContent = res.likes.length;
    })
  }

/* Меняем аватарку профиля */
    changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => _checkResponse(res))
  }

  /* Редатируем профиль */
    editUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => checkResponse(res))
  }

}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
    headers: {
      authorization: '2ce78970-65cf-4453-9ecd-08fb86edda40',
      'Content-Type': 'application/json'
    }
  })
  