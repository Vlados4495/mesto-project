export class UserInfo {
    constructor({profileName, jobName, profileAvatar}, apiData) {
      this._profileName = profileName;
      this._jobName = jobName;
      this._profileAvatar = profileAvatar;
      this._apiData = apiData;
    }
  
    getUserInfo() {
      return this._apiData()
    }
  
    setUserInfo(data) {
      this.userId = data._id;
      this._profileName.textContent = data.name;
      this._jobName.textContent = data.about;
      this._profileAvatar.src = data.avatar;
    }
  }
