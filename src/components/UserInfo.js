export class UserInfo {
  constructor(profileName, jobName, profileAvatar) {
    this._titleProfile = document.querySelector(".profile__title");
    this._subtitleProfile = document.querySelector(".profile__subtitle");
    this._editAvatarButton = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._titleProfile.textContent,
      about: this._subtitleProfile.textContent,
    };
  }

  setUserInfo(data) {
    this._titleProfile.textContent = data.name;
    this._subtitleProfile.textContent = data.about;
  }

  setUserAvatar(avatar) {
    this._editAvatarButton.src = avatar;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
