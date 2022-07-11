export class UserInfo {
    constructor({profileName, jobName, profileAvatar}) {
      this._profileName = profileName;
      this._jobName = jobName;
      this._profileAvatar = profileAvatar;
      this._title = document.querySelector(".profile__title");
      this._description = document.querySelector(".profile__subtitle");
      this._userAvatar = document.querySelector(".profile__avatar");
    }
  
    getUserInfo() {
      return {
          name: this._title.textContent,
          about: this._description.textContent,
      };
    }
  
    setUserInfo(data) {
      this.userId = data._id;
      this._title.textContent = data.name;
      this._description.textContent = data.about;
      this._userAvatar.src = data.avatar;
    }
  }
