export class UserInfo {
  constructor(profileName, jobName, profileAvatar) {
    this._titleProfile = document.querySelector(profileName);
    this._subtitleProfile = document.querySelector(jobName);
    this._editAvatarButton = document.querySelector(profileAvatar);
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
