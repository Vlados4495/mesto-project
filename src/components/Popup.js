export default class Popup {
  constructor(popupSelector) {
    this._rootElement = document.querySelector(popupSelector);
    this._closeButtonElement =
      this._rootElement.querySelector(".popup__closed");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._rootElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._rootElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._rootElement.addEventListener("mousedown", (event) =>
      this._handleOverlayClick(event)
    );
    this._closeButtonElement.addEventListener("click", () => this.close());
  }
}
