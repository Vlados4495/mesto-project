class UserInfo {
    constructor({profileName, jobName}) {
      this._title = document.querySelector(profileName)
      this._description = document.querySelector(jobName)
    }
  
    getUserInfo() {
      const title = this._title.textContent
      const description = this._description.textContent
      return {title, description}
    }
  
    setUserInfo({title, description}) {
      this._title.textContent = title
      this._description.textContent = description
    }
  }
  export default UserInfo;